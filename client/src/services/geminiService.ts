/**
 * Serviço de Integração com Google Gemini
 * Chatbot inteligente para MarketHub CRM
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class GeminiService {
  private apiKey: string = '';
  private conversationHistory: Message[] = [];
  
  // Contexto do sistema sobre MarketHub CRM
  private systemContext = `Você é um assistente virtual especializado em vendas no Mercado Livre e gestão de e-commerce.

Você trabalha no MarketHub CRM, um sistema que ajuda vendedores a:
- Calcular todas as taxas do Mercado Livre (comissão, ICMS, impostos)
- Gerenciar produtos, pedidos e estoque
- Calcular lucro líquido real de cada venda
- Analisar desempenho financeiro

CONHECIMENTO SOBRE TAXAS DO MERCADO LIVRE:
- Comissão ML: varia de 11% a 19% dependendo da categoria
- ICMS: varia de 17% a 21% dependendo do estado
- Impostos: Simples Nacional (6,5%), Lucro Presumido (11,33%), Lucro Real (varia)
- Taxa Mercado Pago: 4,99% + R$ 0,40 por transação
- Frete: calculado por peso e distância

COMO CALCULAR LUCRO REAL:
1. Preço de Venda
2. Menos: Comissão ML
3. Menos: ICMS
4. Menos: Impostos do regime tributário
5. Menos: Taxa Mercado Pago
6. Menos: Custo do produto (CMV)
7. Menos: Custo de frete
= Lucro Líquido Real

DICAS PARA VENDEDORES:
- Sempre calcular todas as taxas antes de precificar
- Manter margem de lucro mínima de 20%
- Monitorar estoque para evitar rupturas
- Analisar produtos mais lucrativos
- Usar anúncios premium apenas para produtos de alta margem

Responda sempre em português brasileiro, de forma clara e objetiva.
Seja prestativo e educado. Use exemplos práticos quando possível.`;

  /**
   * Configurar API Key do Gemini
   */
  setApiKey(key: string) {
    this.apiKey = key;
  }

  /**
   * Fazer requisição para API do Gemini
   */
  private async request(messages: Message[]): Promise<string> {
    // Se não tiver API key, usar modo demo
    if (!this.apiKey) {
      return this.getDemoResponse(messages[messages.length - 1].content);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: this.systemContext + '\n\n' + messages.map(m => `${m.role === 'user' ? 'Usuário' : 'Assistente'}: ${m.content}`).join('\n')
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API do Gemini: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Resposta vazia do Gemini');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erro ao chamar Gemini:', error);
      return this.getDemoResponse(messages[messages.length - 1].content);
    }
  }

  /**
   * Respostas demo quando não tem API key
   */
  private getDemoResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('taxa') || lowerMessage.includes('comissão')) {
      return `As principais taxas do Mercado Livre são:

📊 **Comissão ML:** 11% a 19% (varia por categoria)
💳 **Taxa Mercado Pago:** 4,99% + R$ 0,40
🏛️ **ICMS:** 17% a 21% (varia por estado)
📋 **Impostos:** Depende do regime tributário

Use a **Calculadora de Taxas ML** do sistema para calcular o lucro líquido real de cada venda!`;
    }

    if (lowerMessage.includes('lucro') || lowerMessage.includes('margem')) {
      return `Para calcular o lucro real:

1. Preço de Venda: R$ 100,00
2. Menos Comissão ML (13%): -R$ 13,00
3. Menos ICMS (19%): -R$ 19,00
4. Menos Simples (6,5%): -R$ 6,50
5. Menos Taxa Pix (0,99%): -R$ 0,99
6. Menos Custo do Produto: -R$ 45,00
= **Lucro Líquido: R$ 15,51 (15,5%)**

💡 **Dica:** Mantenha margem mínima de 20% para ter lucro saudável!`;
    }

    if (lowerMessage.includes('estoque') || lowerMessage.includes('produto')) {
      return `Dicas para gestão de estoque:

✅ Configure alertas de estoque baixo
✅ Sincronize com o Mercado Livre automaticamente
✅ Analise produtos mais vendidos
✅ Evite ruptura de estoque (perde posição no ranking)
✅ Faça reposição antes de acabar

Use a página **Produtos** do sistema para gerenciar seu estoque!`;
    }

    if (lowerMessage.includes('venda') || lowerMessage.includes('vender')) {
      return `Estratégias para vender mais:

🎯 **Preço competitivo:** Use a calculadora para não perder dinheiro
📸 **Fotos de qualidade:** Mostre o produto de vários ângulos
📝 **Descrição completa:** Responda todas as dúvidas no anúncio
⚡ **Envio rápido:** Full ou Flex aumenta conversão
⭐ **Reputação:** Responda rápido e envie no prazo

O MarketHub CRM te ajuda a calcular o preço ideal!`;
    }

    return `Olá! Sou o assistente do MarketHub CRM! 👋

Posso te ajudar com:
- 📊 Cálculo de taxas do Mercado Livre
- 💰 Análise de lucro e margem
- 📦 Gestão de estoque
- 🚀 Estratégias de vendas
- ❓ Dúvidas sobre o sistema

Como posso te ajudar hoje?`;
  }

  /**
   * Enviar mensagem e receber resposta
   */
  async sendMessage(userMessage: string): Promise<string> {
    // Adicionar mensagem do usuário ao histórico
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Limitar histórico a últimas 10 mensagens
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    // Obter resposta do Gemini
    const response = await this.request(this.conversationHistory);

    // Adicionar resposta ao histórico
    this.conversationHistory.push({
      role: 'assistant',
      content: response
    });

    return response;
  }

  /**
   * Limpar histórico de conversas
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Obter sugestões inteligentes baseadas nos dados do usuário
   */
  async getSuggestions(userData: {
    totalProdutos: number;
    produtosEstoqueBaixo: number;
    pedidosPendentes: number;
    margemMedia: number;
  }): Promise<string[]> {
    const suggestions: string[] = [];

    if (userData.produtosEstoqueBaixo > 0) {
      suggestions.push(`⚠️ Você tem ${userData.produtosEstoqueBaixo} produtos com estoque baixo. Faça reposição!`);
    }

    if (userData.pedidosPendentes > 5) {
      suggestions.push(`📦 ${userData.pedidosPendentes} pedidos pendentes. Processe-os para manter boa reputação!`);
    }

    if (userData.margemMedia < 15) {
      suggestions.push(`💰 Sua margem média está em ${userData.margemMedia.toFixed(1)}%. Revise seus preços!`);
    }

    if (userData.totalProdutos < 10) {
      suggestions.push(`📈 Adicione mais produtos para aumentar suas vendas!`);
    }

    if (suggestions.length === 0) {
      suggestions.push(`✅ Tudo certo! Continue assim!`);
    }

    return suggestions;
  }
}

// Exportar instância única
export const geminiService = new GeminiService();

// Exportar tipos
export type { Message };
