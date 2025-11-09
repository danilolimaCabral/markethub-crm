/**
 * Serviço de Integração com Focus NFe
 * Emissão automática de Nota Fiscal Eletrônica (NF-e)
 */

interface NFeProduto {
  numero_item: string;
  codigo_produto: string;
  descricao: string;
  cfop: string;
  unidade_comercial: string;
  quantidade_comercial: number;
  valor_unitario_comercial: number;
  valor_bruto: number;
  icms_situacao_tributaria: string;
  icms_origem: string;
  pis_situacao_tributaria: string;
  cofins_situacao_tributaria: string;
}

interface NFeDestinatario {
  cpf_cnpj: string;
  nome_completo?: string;
  razao_social?: string;
  inscricao_estadual?: string;
  email?: string;
  telefone?: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  pais?: string;
}

interface NFeRequest {
  natureza_operacao: string;
  tipo_documento: string;
  finalidade_emissao: string;
  cnpj_emitente: string;
  nome_emitente?: string;
  nome_fantasia_emitente?: string;
  logradouro_emitente?: string;
  numero_emitente?: string;
  bairro_emitente?: string;
  municipio_emitente?: string;
  uf_emitente?: string;
  cep_emitente?: string;
  telefone_emitente?: string;
  inscricao_estadual_emitente?: string;
  regime_tributario_emitente?: string;
  destinatario: NFeDestinatario;
  itens: NFeProduto[];
  valor_frete?: number;
  valor_desconto?: number;
  valor_total: number;
  modalidade_frete?: string;
  informacoes_adicionais_contribuinte?: string;
}

interface NFeResponse {
  status: string;
  status_sefaz: string;
  mensagem_sefaz: string;
  chave_nfe: string;
  numero: string;
  serie: string;
  caminho_xml_nota_fiscal: string;
  caminho_danfe: string;
  ref: string;
}

interface NFeConsulta {
  ref: string;
  status: string;
  status_sefaz: string;
  mensagem_sefaz: string;
  chave_nfe: string;
  numero: string;
  serie: string;
  modelo: string;
  caminho_xml_nota_fiscal: string;
  caminho_danfe: string;
  protocolo: string;
  data_emissao: string;
}

class FocusNFeService {
  private apiToken: string = '';
  private baseURL: string = 'https://api.focusnfe.com.br';
  private ambiente: 'producao' | 'homologacao' = 'homologacao';

  /**
   * Configurar token de API
   */
  setApiToken(token: string) {
    this.apiToken = token;
    localStorage.setItem('focus_nfe_token', token);
  }

  /**
   * Obter token salvo
   */
  getApiToken(): string {
    if (!this.apiToken) {
      this.apiToken = localStorage.getItem('focus_nfe_token') || '';
    }
    return this.apiToken;
  }

  /**
   * Configurar ambiente (produção ou homologação)
   */
  setAmbiente(ambiente: 'producao' | 'homologacao') {
    this.ambiente = ambiente;
    localStorage.setItem('focus_nfe_ambiente', ambiente);
  }

  /**
   * Obter ambiente configurado
   */
  getAmbiente(): 'producao' | 'homologacao' {
    const saved = localStorage.getItem('focus_nfe_ambiente');
    if (saved === 'producao' || saved === 'homologacao') {
      this.ambiente = saved;
    }
    return this.ambiente;
  }

  /**
   * Fazer requisição autenticada
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getApiToken();
    
    if (!token) {
      throw new Error('Token da Focus NFe não configurado. Configure em Configurações > Nota Fiscal');
    }

    const auth = btoa(`${token}:`); // Base64 encode

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.mensagem || error.erro || `Erro na API Focus NFe: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Testar conexão com API
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // Tentar consultar uma nota inexistente para testar autenticação
      await this.request('/v2/nfe/TESTE123');
      return { success: true, message: 'Conexão OK! Token válido.' };
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        // 404 é esperado, significa que autenticou mas a nota não existe
        return { success: true, message: 'Conexão OK! Token válido.' };
      }
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Emitir NF-e
   */
  async emitirNFe(ref: string, dados: NFeRequest): Promise<NFeResponse> {
    const response = await this.request<NFeResponse>(`/v2/nfe?ref=${ref}`, {
      method: 'POST',
      body: JSON.stringify(dados)
    });

    return response;
  }

  /**
   * Consultar NF-e
   */
  async consultarNFe(ref: string): Promise<NFeConsulta> {
    return this.request<NFeConsulta>(`/v2/nfe/${ref}`);
  }

  /**
   * Cancelar NF-e
   */
  async cancelarNFe(ref: string, justificativa: string): Promise<any> {
    if (justificativa.length < 15) {
      throw new Error('Justificativa deve ter no mínimo 15 caracteres');
    }

    return this.request(`/v2/nfe/${ref}`, {
      method: 'DELETE',
      body: JSON.stringify({ justificativa })
    });
  }

  /**
   * Baixar DANFE em PDF
   */
  async baixarDANFE(ref: string): Promise<Blob> {
    const token = this.getApiToken();
    const auth = btoa(`${token}:`);

    const response = await fetch(`${this.baseURL}/v2/nfe/${ref}/danfe`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao baixar DANFE');
    }

    return response.blob();
  }

  /**
   * Baixar XML da NF-e
   */
  async baixarXML(ref: string): Promise<Blob> {
    const token = this.getApiToken();
    const auth = btoa(`${token}:`);

    const response = await fetch(`${this.baseURL}/v2/nfe/${ref}/xml`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao baixar XML');
    }

    return response.blob();
  }

  /**
   * Enviar NF-e por email
   */
  async enviarEmail(ref: string, emails: string[]): Promise<any> {
    return this.request(`/v2/nfe/${ref}/email`, {
      method: 'POST',
      body: JSON.stringify({ emails })
    });
  }

  /**
   * Criar NF-e a partir de um pedido do sistema
   */
  criarNFeFromPedido(pedido: any, emitente: any): NFeRequest {
    const itens: NFeProduto[] = pedido.itens.map((item: any, index: number) => ({
      numero_item: (index + 1).toString(),
      codigo_produto: item.produtoId || item.id,
      descricao: item.nome,
      cfop: '5102', // Venda de mercadoria adquirida ou recebida de terceiros
      unidade_comercial: 'UN',
      quantidade_comercial: item.quantidade,
      valor_unitario_comercial: item.precoUnitario,
      valor_bruto: item.precoTotal || (item.precoUnitario * item.quantidade),
      icms_situacao_tributaria: '102', // Tributada pelo Simples Nacional sem permissão de crédito
      icms_origem: '0', // Nacional
      pis_situacao_tributaria: '49', // Outras Operações de Saída
      cofins_situacao_tributaria: '49' // Outras Operações de Saída
    }));

    const nfe: NFeRequest = {
      natureza_operacao: 'Venda de mercadoria',
      tipo_documento: '1', // NF-e
      finalidade_emissao: '1', // Normal
      cnpj_emitente: emitente.cnpj,
      nome_emitente: emitente.razaoSocial,
      nome_fantasia_emitente: emitente.nomeFantasia,
      logradouro_emitente: emitente.logradouro,
      numero_emitente: emitente.numero,
      bairro_emitente: emitente.bairro,
      municipio_emitente: emitente.municipio,
      uf_emitente: emitente.uf,
      cep_emitente: emitente.cep,
      telefone_emitente: emitente.telefone,
      inscricao_estadual_emitente: emitente.inscricaoEstadual,
      regime_tributario_emitente: emitente.regimeTributario || '1', // Simples Nacional
      destinatario: {
        cpf_cnpj: pedido.cpfCnpj || pedido.cpf || pedido.cnpj,
        nome_completo: pedido.cliente,
        email: pedido.email,
        telefone: pedido.telefone,
        logradouro: pedido.endereco?.logradouro || '',
        numero: pedido.endereco?.numero || 'S/N',
        complemento: pedido.endereco?.complemento,
        bairro: pedido.endereco?.bairro || '',
        municipio: pedido.endereco?.municipio || '',
        uf: pedido.endereco?.uf || '',
        cep: pedido.endereco?.cep || '',
        pais: 'Brasil'
      },
      itens,
      valor_frete: pedido.valorFrete || 0,
      valor_desconto: pedido.valorDesconto || 0,
      valor_total: pedido.total,
      modalidade_frete: '9', // Sem frete
      informacoes_adicionais_contribuinte: `Pedido #${pedido.id || pedido.mlId}`
    };

    return nfe;
  }

  /**
   * Gerar referência única para NF-e
   */
  gerarReferencia(pedidoId: string): string {
    const timestamp = Date.now();
    return `NFE_${pedidoId}_${timestamp}`;
  }
}

// Exportar instância única
export const focusNFeService = new FocusNFeService();

// Exportar tipos
export type { NFeRequest, NFeResponse, NFeConsulta, NFeProduto, NFeDestinatario };
