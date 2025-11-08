/**
 * Base de dados de artigos do blog MarketHub CRM
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'vendas' | 'impostos' | 'gestao' | 'dicas';
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number; // minutos
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'como-calcular-lucro-real-mercado-livre',
    title: 'Como Calcular o Lucro Real no Mercado Livre: Guia Completo 2025',
    excerpt: 'Descubra como calcular exatamente quanto você lucra em cada venda no Mercado Livre, considerando todas as taxas, impostos e custos ocultos.',
    category: 'vendas',
    tags: ['Mercado Livre', 'Lucro', 'Taxas', 'Calculadora'],
    author: {
      name: 'Equipe MarketHub',
      avatar: '👨‍💼',
    },
    publishedAt: '2025-01-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    content: `
# Como Calcular o Lucro Real no Mercado Livre

Vender no Mercado Livre pode ser muito lucrativo, mas **muitos vendedores perdem dinheiro sem saber**. Por quê? Porque não calculam corretamente todas as taxas e custos envolvidos.

## As Taxas do Mercado Livre que Você Precisa Conhecer

### 1. Comissão por Venda (11% a 19%)
A comissão varia conforme a categoria do produto:
- **Eletrônicos**: 13-16%
- **Moda**: 17-19%
- **Casa e Decoração**: 11-13%
- **Esportes**: 15-17%

### 2. Taxa de Mercado Pago (4,99% + R$ 0,40)
Se você usa Mercado Pago para receber, há uma taxa adicional de processamento.

### 3. Custo de Frete
Mesmo com "frete grátis", você paga parte ou todo o custo do envio.

### 4. ICMS (17% a 21%)
Imposto estadual sobre circulação de mercadorias, varia por estado.

### 5. Impostos do Regime Tributário
- **Simples Nacional**: 6,5% a 8,5%
- **Lucro Presumido**: 11,33%
- **Lucro Real**: Varia conforme lucro

## Fórmula do Lucro Real

\`\`\`
Lucro Líquido = Preço de Venda 
                - Comissão ML 
                - Taxa Mercado Pago 
                - Frete 
                - ICMS 
                - Impostos 
                - Custo do Produto
\`\`\`

## Exemplo Prático

**Produto**: Fone de Ouvido Bluetooth  
**Preço de Venda**: R$ 89,90  
**Custo do Produto**: R$ 35,00  

**Cálculos:**
- Comissão ML (16%): R$ 14,38
- Taxa Mercado Pago: R$ 4,88
- Frete: R$ 12,00
- ICMS SP (18%): R$ 16,18
- Simples Nacional (6,5%): R$ 5,84

**Lucro Líquido**: R$ 89,90 - R$ 14,38 - R$ 4,88 - R$ 12,00 - R$ 16,18 - R$ 5,84 - R$ 35,00 = **R$ 1,62**

😱 **Margem de lucro: apenas 1,8%!**

## Como o MarketHub CRM Ajuda

Nossa **Calculadora de Taxas ML** calcula tudo isso automaticamente:
- ✅ Comissão por categoria
- ✅ Taxa de pagamento
- ✅ ICMS por estado
- ✅ Impostos do seu regime
- ✅ Custo de frete
- ✅ Lucro líquido real

**Resultado**: Você sabe exatamente quanto vai lucrar antes de anunciar!

## Dicas para Aumentar Seu Lucro

1. **Negocie melhores preços com fornecedores** - Cada R$ 1 de desconto é R$ 1 de lucro
2. **Otimize o frete** - Use Mercado Envios Coleta para reduzir custos
3. **Escolha categorias com menor comissão** - Faça testes em categorias diferentes
4. **Precifique corretamente** - Use nossa calculadora antes de definir o preço
5. **Acompanhe CMV** - Controle rigoroso do custo de mercadoria vendida

## Conclusão

Calcular o lucro real no Mercado Livre não é simples, mas é **essencial** para ter um negócio sustentável. Com as ferramentas certas, você pode:

- 📊 Saber exatamente quanto lucra em cada venda
- 💰 Identificar produtos que dão prejuízo
- 🎯 Precificar corretamente
- 📈 Aumentar sua margem de lucro

**Experimente grátis por 14 dias** e veja a diferença que faz ter controle total sobre suas finanças!
`
  },
  {
    id: '2',
    slug: 'guia-completo-taxas-impostos-ecommerce',
    title: 'Guia Completo de Taxas e Impostos para E-commerce',
    excerpt: 'Entenda todos os impostos e taxas que incidem sobre vendas online: ICMS, ISS, PIS, COFINS, Simples Nacional e muito mais.',
    category: 'impostos',
    tags: ['Impostos', 'ICMS', 'Simples Nacional', 'Tributação'],
    author: {
      name: 'Equipe MarketHub',
      avatar: '👨‍💼',
    },
    publishedAt: '2025-01-10',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=400&fit=crop',
    content: `
# Guia Completo de Taxas e Impostos para E-commerce

Vender online envolve diversos impostos e taxas. Neste guia, você vai entender **tudo** sobre tributação no e-commerce.

## Impostos Federais

### 1. PIS e COFINS
Contribuições federais sobre o faturamento:
- **Simples Nacional**: Incluído na alíquota única
- **Lucro Presumido**: 3,65% (PIS 0,65% + COFINS 3%)
- **Lucro Real**: 9,25% (PIS 1,65% + COFINS 7,6%)

### 2. IRPJ (Imposto de Renda Pessoa Jurídica)
- **Simples Nacional**: Incluído na alíquota
- **Lucro Presumido**: 15% sobre 8% do faturamento
- **Lucro Real**: 15% sobre o lucro real

### 3. CSLL (Contribuição Social sobre Lucro Líquido)
- **Simples Nacional**: Incluído
- **Lucro Presumido**: 9% sobre 12% do faturamento
- **Lucro Real**: 9% sobre o lucro real

## Impostos Estaduais

### ICMS (Imposto sobre Circulação de Mercadorias)
**Varia por estado:**
- São Paulo: 18%
- Rio de Janeiro: 20%
- Minas Gerais: 18%
- Bahia: 19%
- Paraná: 19%
- Rio Grande do Sul: 17%

**ICMS Interestadual:**
- Sul/Sudeste para Sul/Sudeste: 12%
- Sul/Sudeste para Norte/Nordeste/Centro-Oeste: 7%
- Norte/Nordeste/Centro-Oeste entre si: 12%

**DIFAL (Diferencial de Alíquota):**
Quando vende para outro estado, você paga a diferença entre o ICMS de origem e destino.

## Impostos Municipais

### ISS (Imposto sobre Serviços)
Aplica-se a serviços digitais:
- Alíquota: 2% a 5%
- Exemplos: Cursos online, softwares, consultorias

## Regimes Tributários

### Simples Nacional
**Vantagens:**
- ✅ Alíquota única simplificada
- ✅ Menos burocracia
- ✅ Menor carga tributária (até certo faturamento)

**Alíquotas para Comércio (Anexo I):**
- Até R$ 180k: 4%
- R$ 180k - R$ 360k: 7,3%
- R$ 360k - R$ 720k: 9,5%
- R$ 720k - R$ 1,8mi: 10,7%
- R$ 1,8mi - R$ 3,6mi: 14,3%
- R$ 3,6mi - R$ 4,8mi: 19%

### Lucro Presumido
**Quando vale a pena:**
- Faturamento entre R$ 4,8mi e R$ 78mi/ano
- Margem de lucro alta (acima de 32%)

**Carga tributária total:** ~11,33% a 16,33%

### Lucro Real
**Obrigatório para:**
- Faturamento acima de R$ 78mi/ano
- Instituições financeiras
- Empresas com lucros no exterior

**Carga tributária:** Varia conforme lucro real

## Taxas de Marketplaces

### Mercado Livre
- Comissão: 11% a 19%
- Mercado Pago: 4,99% + R$ 0,40

### Amazon
- Comissão: 8% a 15%
- Taxa de envio: Varia

### Shopee
- Comissão: 12% a 18%
- Taxa de pagamento: 2,5%

## Como Calcular o Impacto Total

**Exemplo: Venda de R$ 100**

**Simples Nacional (Anexo I - 4%):**
- Impostos: R$ 4,00
- Comissão ML (16%): R$ 16,00
- Mercado Pago (5%): R$ 5,00
- **Total de taxas: R$ 25,00 (25%)**

**Lucro Presumido:**
- Impostos (11,33%): R$ 11,33
- Comissão ML: R$ 16,00
- Mercado Pago: R$ 5,00
- **Total de taxas: R$ 32,33 (32,33%)**

## Dicas para Reduzir Impostos Legalmente

1. **Escolha o regime tributário correto** - Simule todos antes de decidir
2. **Aproveite benefícios fiscais** - Alguns estados oferecem incentivos
3. **Separe produtos de serviços** - Podem ter tributações diferentes
4. **Mantenha controle rigoroso** - Evite multas e juros
5. **Consulte um contador especializado** - Vale muito a pena

## Ferramentas do MarketHub CRM

Nossa plataforma calcula automaticamente:
- ✅ ICMS por estado (origem e destino)
- ✅ Impostos do seu regime tributário
- ✅ Taxas de marketplaces
- ✅ Lucro líquido real após todos os impostos

**Resultado**: Você precifica corretamente e evita prejuízos!

## Conclusão

Entender impostos é fundamental para ter um e-commerce lucrativo. Com planejamento tributário adequado, você pode:

- 💰 Reduzir carga tributária legalmente
- 📊 Precificar produtos corretamente
- 🎯 Aumentar margem de lucro
- ⚖️ Manter-se em conformidade fiscal

**Teste grátis por 14 dias** e tenha controle total sobre sua tributação!
`
  },
  {
    id: '3',
    slug: 'estrategias-precificacao-competitiva',
    title: 'Estratégias de Precificação Competitiva para Marketplaces',
    excerpt: 'Aprenda a definir preços que maximizam lucro sem perder competitividade. Técnicas comprovadas para vender mais e lucrar mais.',
    category: 'vendas',
    tags: ['Precificação', 'Estratégia', 'Competitividade', 'Lucro'],
    author: {
      name: 'Equipe MarketHub',
      avatar: '👨‍💼',
    },
    publishedAt: '2025-01-05',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    content: `
# Estratégias de Precificação Competitiva para Marketplaces

Precificar produtos em marketplaces é uma **ciência e uma arte**. Preço muito alto? Não vende. Preço muito baixo? Prejuízo garantido.

## Os 5 Erros Mais Comuns de Precificação

### 1. Copiar o Preço da Concorrência
❌ **Erro**: "Vou vender pelo mesmo preço do concorrente"  
✅ **Correto**: Analise SEUS custos e defina SUA margem

### 2. Não Considerar Todas as Taxas
❌ **Erro**: Calcular apenas comissão do marketplace  
✅ **Correto**: Incluir TODAS as taxas e impostos

### 3. Margem Fixa para Todos os Produtos
❌ **Erro**: "Vou ter 30% de margem em tudo"  
✅ **Correto**: Margem varia por categoria e volume

### 4. Ignorar Sazonalidade
❌ **Erro**: Manter preço fixo o ano todo  
✅ **Correto**: Ajustar preços conforme demanda

### 5. Não Testar Preços
❌ **Erro**: Definir preço e nunca mais mexer  
✅ **Correto**: Testar diferentes faixas de preço

## Método de Precificação em 5 Passos

### Passo 1: Calcule o Custo Total

\`\`\`
Custo Total = Custo do Produto 
            + Frete de Compra 
            + Embalagem 
            + Armazenamento 
            + Custos Fixos Rateados
\`\`\`

**Exemplo:**
- Produto: R$ 50,00
- Frete compra: R$ 5,00
- Embalagem: R$ 2,00
- Custos fixos: R$ 3,00
- **Total: R$ 60,00**

### Passo 2: Calcule Taxas e Impostos

Use nossa calculadora para saber:
- Comissão do marketplace
- Taxa de pagamento
- ICMS
- Impostos do regime tributário
- Frete de venda

**Total de taxas: ~35% a 45% do preço de venda**

### Passo 3: Defina a Margem Desejada

**Margens recomendadas:**
- Produtos de alto giro: 15-25%
- Produtos de médio giro: 25-40%
- Produtos de baixo giro: 40-60%
- Produtos exclusivos: 60-100%+

### Passo 4: Calcule o Preço Mínimo

\`\`\`
Preço Mínimo = Custo Total / (1 - % Taxas)
\`\`\`

**Exemplo:**
- Custo: R$ 60,00
- Taxas: 40%
- **Preço Mínimo: R$ 60 / 0,6 = R$ 100,00**

### Passo 5: Analise a Concorrência

**Estratégias:**
1. **Líder de Preço**: Menor preço do mercado (alto volume, baixa margem)
2. **Preço Competitivo**: 5-10% acima do menor preço
3. **Preço Premium**: 20-50% acima (diferenciação)

## Estratégias Avançadas de Precificação

### 1. Precificação Dinâmica
Ajuste preços automaticamente baseado em:
- Estoque disponível
- Demanda do produto
- Preços da concorrência
- Hora do dia / dia da semana

### 2. Precificação Psicológica
- R$ 99,90 vende mais que R$ 100,00
- R$ 197,00 vende mais que R$ 200,00
- Termine preços em 7, 9 ou 0

### 3. Precificação por Pacotes
- Venda em combo: "Leve 3, pague 2"
- Frete grátis acima de X
- Desconto progressivo por quantidade

### 4. Precificação por Valor
Foque no valor entregue, não no custo:
- Solução de problemas
- Economia de tempo
- Status/prestígio
- Exclusividade

### 5. Teste A/B de Preços
Teste diferentes preços e veja qual converte melhor:
- Grupo A: R$ 89,90
- Grupo B: R$ 97,90
- Analise: Vendas × Lucro total

## Quando Aumentar ou Diminuir Preços

### Sinais para AUMENTAR:
✅ Taxa de conversão > 10%  
✅ Estoque baixo  
✅ Alta demanda sazonal  
✅ Produto exclusivo  
✅ Margem muito baixa  

### Sinais para DIMINUIR:
⚠️ Taxa de conversão < 2%  
⚠️ Estoque parado > 60 dias  
⚠️ Concorrência muito agressiva  
⚠️ Baixa demanda sazonal  
⚠️ Produto próximo da validade  

## Ferramentas do MarketHub CRM

Nossa plataforma oferece:
- 🧮 **Calculadora de Preços**: Calcula preço ideal considerando todas as variáveis
- 📊 **Análise de Concorrência**: Monitora preços dos concorrentes
- 📈 **Precificação Inteligente**: Sugere ajustes baseados em dados
- 💰 **Simulador de Margem**: Teste diferentes cenários

## Exemplos Práticos

### Produto de Alto Giro
- Custo: R$ 20,00
- Taxas: 40%
- Margem desejada: 20%
- **Preço sugerido: R$ 41,67**

### Produto Exclusivo
- Custo: R$ 100,00
- Taxas: 35%
- Margem desejada: 80%
- **Preço sugerido: R$ 276,92**

## Conclusão

Precificação correta é a diferença entre lucro e prejuízo. Com as estratégias certas, você pode:

- 💰 Maximizar lucro sem perder vendas
- 🎯 Ser competitivo mantendo margem saudável
- 📊 Tomar decisões baseadas em dados
- 🚀 Escalar seu negócio com sustentabilidade

**Teste grátis por 14 dias** e descubra o preço ideal para cada produto!
`
  },
  {
    id: '4',
    slug: 'gerenciar-estoque-multiplos-marketplaces',
    title: 'Como Gerenciar Estoque em Múltiplos Marketplaces',
    excerpt: 'Evite vendas duplicadas e ruptura de estoque. Aprenda a sincronizar inventário entre Mercado Livre, Amazon, Shopee e loja própria.',
    category: 'gestao',
    tags: ['Estoque', 'Gestão', 'Marketplaces', 'Sincronização'],
    author: {
      name: 'Equipe MarketHub',
      avatar: '👨‍💼',
    },
    publishedAt: '2024-12-28',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=400&fit=crop',
    content: `
# Como Gerenciar Estoque em Múltiplos Marketplaces

Vender em vários marketplaces aumenta faturamento, mas **gerenciar estoque** pode virar um pesadelo. Venda duplicada? Ruptura? Cliente insatisfeito? Não precisa ser assim!

## Os Problemas de Vender em Múltiplos Canais

### 1. Venda Duplicada
Você tem 1 produto em estoque, mas vende no ML e Shopee ao mesmo tempo. **Resultado**: Cancelamento, avaliação negativa, perda de reputação.

### 2. Ruptura de Estoque
Produto esgotou, mas ainda está anunciado. Cliente compra e você não tem para enviar.

### 3. Atualização Manual
Vendeu no ML? Tem que atualizar na Amazon, Shopee, loja própria... **Impossível de escalar!**

### 4. Falta de Visibilidade
Não sabe quanto tem disponível em tempo real.

### 5. Erros Humanos
Digitar quantidade errada, esquecer de atualizar, confundir produtos...

## A Solução: Gestão Centralizada de Estoque

### Como Funciona

\`\`\`
[Estoque Central] 
       ↓
   [Sistema]
       ↓
  ┌────┴────┬────────┬────────┐
  ↓         ↓        ↓        ↓
[ML]    [Amazon] [Shopee] [Loja]
\`\`\`

**Benefícios:**
- ✅ Atualização automática em todos os canais
- ✅ Sincronização em tempo real
- ✅ Sem vendas duplicadas
- ✅ Alertas de estoque baixo
- ✅ Relatórios consolidados

## Estratégias de Alocação de Estoque

### 1. Estoque Unificado
**Como funciona:** Todo estoque disponível para todos os canais

**Vantagens:**
- Máxima disponibilidade
- Melhor aproveitamento

**Desvantagens:**
- Risco de venda duplicada (se sincronização falhar)

**Quando usar:** Sincronização em tempo real confiável

### 2. Estoque Reservado por Canal
**Como funciona:** Divide estoque entre canais

**Exemplo:**
- Total: 100 unidades
- ML: 40 unidades
- Amazon: 30 unidades
- Shopee: 20 unidades
- Loja: 10 unidades

**Vantagens:**
- Zero risco de venda duplicada
- Controle total

**Desvantagens:**
- Pode ter estoque parado em um canal enquanto falta em outro

**Quando usar:** Produtos de alto valor ou baixo giro

### 3. Estoque Dinâmico (Recomendado)
**Como funciona:** Aloca baseado em performance de cada canal

**Lógica:**
- Canal com mais vendas recebe mais estoque
- Rebalanceamento automático diário
- Estoque mínimo garantido por canal

**Exemplo:**
- ML (60% das vendas): 60 unidades
- Amazon (25%): 25 unidades
- Shopee (15%): 15 unidades

**Vantagens:**
- Otimização automática
- Melhor ROI

**Quando usar:** Sempre que possível!

## Regras de Negócio Essenciais

### 1. Estoque de Segurança
Sempre reserve unidades para imprevistos:

\`\`\`
Estoque Disponível = Estoque Físico 
                    - Estoque de Segurança 
                    - Pedidos Pendentes
\`\`\`

**Recomendação:** 10-20% do estoque médio

### 2. Pausa Automática
Configure para pausar anúncios quando:
- Estoque < 3 unidades
- Estoque = 0
- Produto com problema

### 3. Alertas Inteligentes
Receba notificações quando:
- Estoque baixo (< 10 unidades)
- Estoque crítico (< 3 unidades)
- Produto esgotado
- Venda acima da média (possível ruptura)

### 4. Priorização de Canais
Defina prioridade para alocar estoque:
1. Canal com maior margem
2. Canal com melhor reputação
3. Canal com menor custo de envio

## Fluxo de Atualização de Estoque

### Quando Recebe Mercadoria
1. Registra entrada no sistema
2. Sistema atualiza estoque central
3. Distribui entre canais (conforme estratégia)
4. Sincroniza com marketplaces
5. Reativa anúncios pausados

### Quando Vende
1. Marketplace notifica venda
2. Sistema reserva produto
3. Atualiza estoque em todos os canais
4. Gera ordem de separação
5. Confirma envio

### Quando Devolve
1. Registra devolução
2. Inspeciona produto
3. Adiciona de volta ao estoque (se OK)
4. Atualiza todos os canais

## Integração com Marketplaces

### Mercado Livre
- API em tempo real
- Webhook de vendas
- Atualização instantânea

### Amazon
- API com delay de 15 min
- Sincronização a cada hora
- Recomendado: Estoque reservado

### Shopee
- API limitada
- Atualização manual ou via planilha
- Recomendado: Estoque conservador

## KPIs para Monitorar

### 1. Taxa de Ruptura
\`\`\`
Taxa de Ruptura = (Dias sem estoque / Total de dias) × 100
\`\`\`
**Meta:** < 5%

### 2. Giro de Estoque
\`\`\`
Giro = Vendas do período / Estoque médio
\`\`\`
**Meta:** > 4x ao ano

### 3. Acuracidade de Estoque
\`\`\`
Acuracidade = (Estoque físico / Estoque sistema) × 100
\`\`\`
**Meta:** > 98%

### 4. Taxa de Venda Duplicada
**Meta:** 0%

## Ferramentas do MarketHub CRM

Nossa plataforma oferece:
- 🔄 **Sincronização Automática**: Atualiza todos os canais em tempo real
- 📊 **Dashboard Unificado**: Veja estoque de todos os canais em um lugar
- 🔔 **Alertas Inteligentes**: Notificações de estoque baixo
- 📈 **Relatórios**: Giro, ruptura, acuracidade
- ⚙️ **Regras Personalizadas**: Configure conforme seu negócio

## Checklist de Implementação

- [ ] Fazer inventário completo
- [ ] Definir estratégia de alocação
- [ ] Configurar estoque de segurança
- [ ] Integrar marketplaces
- [ ] Testar sincronização
- [ ] Configurar alertas
- [ ] Treinar equipe
- [ ] Monitorar KPIs

## Conclusão

Gerenciar estoque em múltiplos marketplaces não precisa ser complicado. Com as ferramentas certas, você pode:

- 🚀 Vender em todos os canais sem medo
- 📊 Ter visibilidade total do estoque
- ⚡ Atualizar tudo automaticamente
- 💰 Evitar perdas por ruptura ou venda duplicada

**Teste grátis por 14 dias** e simplifique sua gestão de estoque!
`
  },
  {
    id: '5',
    slug: 'cmv-custo-mercadoria-vendida-como-calcular',
    title: 'CMV: O Que É e Como Calcular Corretamente',
    excerpt: 'Entenda o Custo de Mercadoria Vendida (CMV) e como ele impacta diretamente sua lucratividade. Aprenda a calcular e otimizar.',
    category: 'gestao',
    tags: ['CMV', 'Custos', 'Finanças', 'Lucratividade'],
    author: {
      name: 'Equipe MarketHub',
      avatar: '👨‍💼',
    },
    publishedAt: '2024-12-20',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    content: `
# CMV: O Que É e Como Calcular Corretamente

O **CMV (Custo de Mercadoria Vendida)** é um dos indicadores mais importantes para qualquer negócio de e-commerce. Mas muitos vendedores não sabem calculá-lo corretamente!

## O Que É CMV?

CMV é o **custo total** para adquirir ou produzir os produtos que você vendeu em um período.

**Não confunda com:**
- ❌ Custo do estoque total (inclui produtos não vendidos)
- ❌ Despesas operacionais (aluguel, marketing, etc)
- ❌ Preço de venda

## Fórmula do CMV

\`\`\`
CMV = Estoque Inicial 
    + Compras do Período 
    - Estoque Final
\`\`\`

### Exemplo Prático

**Janeiro/2025:**
- Estoque inicial: R$ 50.000
- Compras: R$ 30.000
- Estoque final: R$ 40.000

**CMV = R$ 50.000 + R$ 30.000 - R$ 40.000 = R$ 40.000**

Isso significa que você **vendeu R$ 40.000 em produtos** (ao custo).

## O Que Entra no CMV?

### ✅ Incluir:
- Custo de compra do produto
- Frete de compra
- Impostos de importação
- Seguro de transporte
- Custos de produção (se fabricar)
- Embalagens primárias

### ❌ NÃO Incluir:
- Frete de venda (é despesa operacional)
- Comissões de marketplace
- Marketing e publicidade
- Salários da equipe
- Aluguel e contas
- Embalagens de envio

## Por Que CMV É Importante?

### 1. Calcula Lucro Bruto

\`\`\`
Lucro Bruto = Receita - CMV
\`\`\`

**Exemplo:**
- Receita: R$ 100.000
- CMV: R$ 40.000
- **Lucro Bruto: R$ 60.000**

### 2. Determina Margem Bruta

\`\`\`
Margem Bruta = (Lucro Bruto / Receita) × 100
\`\`\`

**Exemplo:**
- Lucro Bruto: R$ 60.000
- Receita: R$ 100.000
- **Margem Bruta: 60%**

### 3. Identifica Problemas

**CMV muito alto?**
- Fornecedores caros
- Desperdício
- Furtos
- Erro de precificação

**CMV muito baixo?**
- Produtos de baixa qualidade
- Estoque desatualizado
- Erro de cálculo

## Métodos de Avaliação de Estoque

### 1. PEPS (Primeiro que Entra, Primeiro que Sai)
**Como funciona:** Vende primeiro os produtos mais antigos

**Exemplo:**
- Compra 1: 10 unidades a R$ 50 = R$ 500
- Compra 2: 10 unidades a R$ 60 = R$ 600
- Vendeu: 15 unidades

**CMV PEPS:**
- 10 unidades × R$ 50 = R$ 500
- 5 unidades × R$ 60 = R$ 300
- **Total: R$ 800**

**Vantagens:**
- Reflete fluxo físico real
- Estoque mais valorizado

**Desvantagens:**
- CMV pode ser artificialmente baixo em inflação

### 2. UEPS (Último que Entra, Primeiro que Sai)
**Como funciona:** Vende primeiro os produtos mais recentes

**CMV UEPS (mesmo exemplo):**
- 10 unidades × R$ 60 = R$ 600
- 5 unidades × R$ 50 = R$ 250
- **Total: R$ 850**

**Vantagens:**
- CMV mais realista em inflação
- Menor lucro tributável

**Desvantagens:**
- Não permitido no Brasil (IFRS)

### 3. Custo Médio (Recomendado)
**Como funciona:** Calcula média ponderada

**CMV Médio:**
- Custo médio: (R$ 500 + R$ 600) / 20 = R$ 55
- 15 unidades × R$ 55 = **R$ 825**

**Vantagens:**
- Mais simples
- Aceito fiscalmente
- Equilibrado

## Como Reduzir CMV

### 1. Negocie com Fornecedores
- Compre em maior volume
- Pagamento à vista (desconto)
- Parcerias de longo prazo
- Compare fornecedores

### 2. Otimize Logística
- Consolide fretes
- Negocie taxas de transporte
- Reduza perdas no transporte

### 3. Controle Perdas
- Inventário regular
- Controle de qualidade
- Segurança contra furtos
- Gestão de validade

### 4. Produza Internamente
Se viável, produzir pode reduzir custos:
- Elimina margem do fornecedor
- Maior controle de qualidade
- Flexibilidade

## CMV vs Despesas Operacionais

### CMV (Custos Variáveis)
- Aumenta com vendas
- Diretamente ligado ao produto
- Exemplo: R$ 40 por produto vendido

### Despesas Operacionais (Custos Fixos)
- Independe de vendas
- Necessário para operar
- Exemplo: Aluguel de R$ 5.000/mês

## Análise de CMV por Produto

**Produto A:**
- Preço: R$ 100
- CMV: R$ 40
- Margem: 60% ✅

**Produto B:**
- Preço: R$ 80
- CMV: R$ 70
- Margem: 12,5% ⚠️

**Ação:** Renegocie fornecedor do Produto B ou aumente preço!

## Ferramentas do MarketHub CRM

Nossa plataforma calcula automaticamente:
- 📊 **CMV por período**: Mensal, trimestral, anual
- 🏷️ **CMV por produto**: Identifique os menos lucrativos
- 📈 **Margem bruta**: Em tempo real
- 🔔 **Alertas**: Quando margem cai abaixo do esperado
- 📉 **Tendências**: Acompanhe evolução do CMV

## Relatórios Essenciais

### DRE Simplificado
\`\`\`
Receita Bruta:        R$ 100.000
(-) CMV:              R$  40.000
(=) Lucro Bruto:      R$  60.000
(-) Despesas:         R$  35.000
(=) Lucro Líquido:    R$  25.000
\`\`\`

### Análise de Break-Even
\`\`\`
Ponto de Equilíbrio = Custos Fixos / Margem de Contribuição
\`\`\`

## Conclusão

Controlar o CMV é essencial para ter um negócio lucrativo. Com o cálculo correto, você pode:

- 💰 Identificar produtos pouco lucrativos
- 📊 Negociar melhor com fornecedores
- 🎯 Precificar corretamente
- 📈 Aumentar margem de lucro

**Teste grátis por 14 dias** e tenha controle total sobre seus custos!
`
  }
];

export const categories = {
  vendas: { name: 'Vendas', color: 'bg-purple-100 text-purple-700' },
  impostos: { name: 'Impostos', color: 'bg-blue-100 text-blue-700' },
  gestao: { name: 'Gestão', color: 'bg-green-100 text-green-700' },
  dicas: { name: 'Dicas', color: 'bg-orange-100 text-orange-700' },
};
