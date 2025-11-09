/**
 * Serviço de Sincronização com Mercado Livre
 * Importa produtos e pedidos automaticamente via API
 */

interface MLProduct {
  id: string;
  title: string;
  price: number;
  available_quantity: number;
  sold_quantity: number;
  thumbnail: string;
  permalink: string;
  category_id: string;
  listing_type_id: string;
  status: string;
}

interface MLOrder {
  id: number;
  status: string;
  date_created: string;
  buyer: {
    id: number;
    nickname: string;
    email?: string;
  };
  total_amount: number;
  paid_amount: number;
  order_items: Array<{
    item: {
      id: string;
      title: string;
    };
    quantity: number;
    unit_price: number;
  }>;
}

class MercadoLivreSync {
  private accessToken: string = '';

  /**
   * Configurar token de acesso
   */
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  /**
   * Fazer requisição para API do ML
   */
  private async request<T>(endpoint: string): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Token de acesso não configurado');
    }

    const response = await fetch(`https://api.mercadolibre.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API do ML: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Buscar informações do usuário
   */
  async getUserInfo() {
    return this.request<any>('/users/me');
  }

  /**
   * Listar todos os produtos do vendedor
   */
  async listProducts(): Promise<MLProduct[]> {
    try {
      // 1. Buscar ID do usuário
      const userInfo = await this.getUserInfo();
      const userId = userInfo.id;

      // 2. Buscar produtos do vendedor
      const searchResult = await this.request<any>(`/users/${userId}/items/search?status=active&limit=50`);
      
      if (!searchResult.results || searchResult.results.length === 0) {
        return [];
      }

      // 3. Buscar detalhes de cada produto
      const products: MLProduct[] = [];
      
      for (const productId of searchResult.results) {
        try {
          const product = await this.request<MLProduct>(`/items/${productId}`);
          products.push(product);
        } catch (error) {
          console.error(`Erro ao buscar produto ${productId}:`, error);
        }
      }

      return products;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw error;
    }
  }

  /**
   * Listar pedidos do vendedor
   */
  async listOrders(limit: number = 50): Promise<MLOrder[]> {
    try {
      // Buscar pedidos recentes
      const ordersResult = await this.request<any>(`/orders/search?seller=${await this.getUserId()}&sort=date_desc&limit=${limit}`);
      
      if (!ordersResult.results || ordersResult.results.length === 0) {
        return [];
      }

      return ordersResult.results;
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      throw error;
    }
  }

  /**
   * Buscar ID do usuário
   */
  private async getUserId(): Promise<number> {
    const userInfo = await this.getUserInfo();
    return userInfo.id;
  }

  /**
   * Sincronizar produtos do ML para o sistema local
   */
  async syncProducts(): Promise<{ imported: number; updated: number; errors: number }> {
    const stats = { imported: 0, updated: 0, errors: 0 };

    try {
      const mlProducts = await this.listProducts();
      
      // Buscar produtos existentes no sistema
      const existingProducts = JSON.parse(localStorage.getItem('markethub_produtos') || '[]');
      
      for (const mlProduct of mlProducts) {
        try {
          // Verificar se produto já existe
          const existingIndex = existingProducts.findIndex((p: any) => p.mlId === mlProduct.id);
          
          const productData = {
            id: existingIndex >= 0 ? existingProducts[existingIndex].id : `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            mlId: mlProduct.id,
            nome: mlProduct.title,
            sku: mlProduct.id,
            preco: mlProduct.price,
            custo: mlProduct.price * 0.6, // Estimar custo como 60% do preço
            estoque: mlProduct.available_quantity,
            categoria: mlProduct.category_id,
            imagem: mlProduct.thumbnail,
            linkML: mlProduct.permalink,
            status: mlProduct.status === 'active' ? 'ativo' : 'inativo',
            vendidos: mlProduct.sold_quantity,
            sincronizadoEm: new Date().toISOString()
          };

          if (existingIndex >= 0) {
            // Atualizar produto existente
            existingProducts[existingIndex] = { ...existingProducts[existingIndex], ...productData };
            stats.updated++;
          } else {
            // Adicionar novo produto
            existingProducts.push(productData);
            stats.imported++;
          }
        } catch (error) {
          console.error(`Erro ao processar produto ${mlProduct.id}:`, error);
          stats.errors++;
        }
      }

      // Salvar produtos atualizados
      localStorage.setItem('markethub_produtos', JSON.stringify(existingProducts));
      
      return stats;
    } catch (error) {
      console.error('Erro na sincronização de produtos:', error);
      throw error;
    }
  }

  /**
   * Sincronizar pedidos do ML para o sistema local
   */
  async syncOrders(): Promise<{ imported: number; updated: number; errors: number }> {
    const stats = { imported: 0, updated: 0, errors: 0 };

    try {
      const mlOrders = await this.listOrders();
      
      // Buscar pedidos existentes no sistema
      const existingOrders = JSON.parse(localStorage.getItem('markethub_pedidos') || '[]');
      
      for (const mlOrder of mlOrders) {
        try {
          // Verificar se pedido já existe
          const existingIndex = existingOrders.findIndex((p: any) => p.mlId === mlOrder.id);
          
          const orderData = {
            id: existingIndex >= 0 ? existingOrders[existingIndex].id : `ped_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            mlId: mlOrder.id,
            nomeCliente: mlOrder.buyer.nickname,
            emailCliente: mlOrder.buyer.email || '',
            dataPedido: mlOrder.date_created,
            status: this.mapMLStatus(mlOrder.status),
            valorTotal: mlOrder.total_amount,
            valorPago: mlOrder.paid_amount,
            itens: mlOrder.order_items.map(item => ({
              produtoId: item.item.id,
              nomeProduto: item.item.title,
              quantidade: item.quantity,
              precoUnitario: item.unit_price
            })),
            origem: 'Mercado Livre',
            sincronizadoEm: new Date().toISOString()
          };

          if (existingIndex >= 0) {
            // Atualizar pedido existente
            existingOrders[existingIndex] = { ...existingOrders[existingIndex], ...orderData };
            stats.updated++;
          } else {
            // Adicionar novo pedido
            existingOrders.push(orderData);
            stats.imported++;
          }
        } catch (error) {
          console.error(`Erro ao processar pedido ${mlOrder.id}:`, error);
          stats.errors++;
        }
      }

      // Salvar pedidos atualizados
      localStorage.setItem('markethub_pedidos', JSON.stringify(existingOrders));
      
      return stats;
    } catch (error) {
      console.error('Erro na sincronização de pedidos:', error);
      throw error;
    }
  }

  /**
   * Mapear status do ML para status do sistema
   */
  private mapMLStatus(mlStatus: string): string {
    const statusMap: Record<string, string> = {
      'confirmed': 'confirmado',
      'payment_required': 'pendente',
      'payment_in_process': 'processando',
      'paid': 'pago',
      'shipped': 'enviado',
      'delivered': 'entregue',
      'cancelled': 'cancelado'
    };

    return statusMap[mlStatus] || 'pendente';
  }

  /**
   * Sincronizar tudo (produtos + pedidos)
   */
  async syncAll(): Promise<{
    products: { imported: number; updated: number; errors: number };
    orders: { imported: number; updated: number; errors: number };
  }> {
    const products = await this.syncProducts();
    const orders = await this.syncOrders();

    return { products, orders };
  }
}

// Exportar instância única
export const mercadoLivreSync = new MercadoLivreSync();

// Exportar tipos
export type {
  MLProduct,
  MLOrder
};
