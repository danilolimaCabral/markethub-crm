/**
 * Serviço de Integração com API do Mercado Livre
 * Sincronização automática de produtos, pedidos e estoque
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
  warranty: string;
  shipping: {
    mode: string;
    free_shipping: boolean;
  };
}

interface MLOrder {
  id: number;
  status: string;
  date_created: string;
  date_closed: string | null;
  total_amount: number;
  paid_amount: number;
  buyer: {
    id: number;
    nickname: string;
    email: string;
    phone: {
      area_code: string;
      number: string;
    };
  };
  order_items: Array<{
    item: {
      id: string;
      title: string;
      category_id: string;
    };
    quantity: number;
    unit_price: number;
    full_unit_price: number;
  }>;
  shipping: {
    id: number;
    tracking_number: string;
    tracking_method: string;
    status: string;
  };
}

interface MLUser {
  id: number;
  nickname: string;
  email: string;
  first_name: string;
  last_name: string;
  country_id: string;
  seller_reputation: {
    level_id: string;
    power_seller_status: string;
    transactions: {
      total: number;
      completed: number;
      canceled: number;
    };
  };
}

class MercadoLivreAPI {
  private accessToken: string = '';
  private baseURL: string = 'https://api.mercadolibre.com';

  /**
   * Configurar token de acesso
   */
  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('ml_access_token', token);
  }

  /**
   * Obter token salvo
   */
  getAccessToken(): string {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('ml_access_token') || '';
    }
    return this.accessToken;
  }

  /**
   * Fazer requisição autenticada
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAccessToken();
    
    if (!token) {
      throw new Error('Token de acesso não configurado. Configure em Configurações > Mercado Livre');
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expirado. Faça login novamente no Mercado Livre.');
      }
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erro na API do ML: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Obter informações do usuário
   */
  async getUser(): Promise<MLUser> {
    return this.request<MLUser>('/users/me');
  }

  /**
   * Testar conexão com API
   */
  async testConnection(): Promise<{ success: boolean; user: MLUser | null; error?: string }> {
    try {
      const user = await this.getUser();
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        user: null,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Listar produtos do vendedor
   */
  async getProducts(userId: number, offset: number = 0, limit: number = 50): Promise<{ results: MLProduct[]; paging: { total: number; offset: number; limit: number } }> {
    return this.request(`/users/${userId}/items/search?offset=${offset}&limit=${limit}`);
  }

  /**
   * Obter detalhes de um produto
   */
  async getProduct(productId: string): Promise<MLProduct> {
    return this.request(`/items/${productId}`);
  }

  /**
   * Sincronizar todos os produtos do ML para o sistema
   */
  async syncProducts(userId: number, onProgress?: (current: number, total: number) => void): Promise<MLProduct[]> {
    const allProducts: MLProduct[] = [];
    let offset = 0;
    const limit = 50;
    let total = 0;

    do {
      const response = await this.getProducts(userId, offset, limit);
      
      // Buscar detalhes de cada produto
      for (const productId of response.results) {
        try {
          const product = await this.getProduct(productId as any);
          allProducts.push(product);
          
          if (onProgress) {
            onProgress(allProducts.length, response.paging.total);
          }
        } catch (error) {
          console.error(`Erro ao buscar produto ${productId}:`, error);
        }
      }

      total = response.paging.total;
      offset += limit;
    } while (offset < total);

    return allProducts;
  }

  /**
   * Atualizar estoque de um produto no ML
   */
  async updateStock(productId: string, quantity: number): Promise<void> {
    await this.request(`/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        available_quantity: quantity
      })
    });
  }

  /**
   * Atualizar preço de um produto no ML
   */
  async updatePrice(productId: string, price: number): Promise<void> {
    await this.request(`/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        price: price
      })
    });
  }

  /**
   * Pausar anúncio
   */
  async pauseProduct(productId: string): Promise<void> {
    await this.request(`/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'paused'
      })
    });
  }

  /**
   * Reativar anúncio
   */
  async activateProduct(productId: string): Promise<void> {
    await this.request(`/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'active'
      })
    });
  }

  /**
   * Listar pedidos do vendedor
   */
  async getOrders(sellerId: number, offset: number = 0, limit: number = 50): Promise<{ results: number[]; paging: { total: number; offset: number; limit: number } }> {
    return this.request(`/orders/search?seller=${sellerId}&offset=${offset}&limit=${limit}&sort=date_desc`);
  }

  /**
   * Obter detalhes de um pedido
   */
  async getOrder(orderId: number): Promise<MLOrder> {
    return this.request(`/orders/${orderId}`);
  }

  /**
   * Sincronizar todos os pedidos do ML para o sistema
   */
  async syncOrders(sellerId: number, onProgress?: (current: number, total: number) => void): Promise<MLOrder[]> {
    const allOrders: MLOrder[] = [];
    let offset = 0;
    const limit = 50;
    let total = 0;

    do {
      const response = await this.getOrders(sellerId, offset, limit);
      
      // Buscar detalhes de cada pedido
      for (const orderId of response.results) {
        try {
          const order = await this.getOrder(orderId);
          allOrders.push(order);
          
          if (onProgress) {
            onProgress(allOrders.length, response.paging.total);
          }
        } catch (error) {
          console.error(`Erro ao buscar pedido ${orderId}:`, error);
        }
      }

      total = response.paging.total;
      offset += limit;
    } while (offset < total);

    return allOrders;
  }

  /**
   * Converter produto do ML para formato do sistema
   */
  convertMLProductToLocal(mlProduct: MLProduct): any {
    return {
      mlId: mlProduct.id,
      nome: mlProduct.title,
      preco: mlProduct.price,
      estoque: mlProduct.available_quantity,
      vendidos: mlProduct.sold_quantity,
      imagem: mlProduct.thumbnail,
      link: mlProduct.permalink,
      categoria: mlProduct.category_id,
      status: mlProduct.status,
      freteGratis: mlProduct.shipping?.free_shipping || false,
      sincronizado: true,
      ultimaSincronizacao: new Date().toISOString()
    };
  }

  /**
   * Converter pedido do ML para formato do sistema
   */
  convertMLOrderToLocal(mlOrder: MLOrder): any {
    return {
      mlId: mlOrder.id.toString(),
      cliente: mlOrder.buyer.nickname,
      email: mlOrder.buyer.email,
      telefone: `(${mlOrder.buyer.phone?.area_code}) ${mlOrder.buyer.phone?.number}`,
      total: mlOrder.total_amount,
      pago: mlOrder.paid_amount,
      status: this.convertMLStatus(mlOrder.status),
      dataCriacao: mlOrder.date_created,
      dataFechamento: mlOrder.date_closed,
      rastreio: mlOrder.shipping?.tracking_number || '',
      itens: mlOrder.order_items.map(item => ({
        produtoId: item.item.id,
        nome: item.item.title,
        quantidade: item.quantity,
        precoUnitario: item.unit_price,
        precoTotal: item.unit_price * item.quantity
      })),
      sincronizado: true,
      ultimaSincronizacao: new Date().toISOString()
    };
  }

  /**
   * Converter status do ML para status do sistema
   */
  private convertMLStatus(mlStatus: string): string {
    const statusMap: Record<string, string> = {
      'paid': 'Pago',
      'confirmed': 'Confirmado',
      'payment_required': 'Pendente',
      'payment_in_process': 'Processando',
      'partially_paid': 'Parcialmente Pago',
      'cancelled': 'Cancelado',
      'invalid': 'Inválido',
      'shipped': 'Enviado',
      'delivered': 'Entregue'
    };

    return statusMap[mlStatus] || mlStatus;
  }
}

// Exportar instância única
export const mercadoLivreAPI = new MercadoLivreAPI();

// Exportar tipos
export type { MLProduct, MLOrder, MLUser };
