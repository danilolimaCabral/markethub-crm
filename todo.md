# Lexos Hub Web - TODO

## Features Planejadas

### Interface de Configuração
- [x] Página inicial com wizard de configuração
- [x] Formulário para inserir credenciais (Client ID, Client Secret)
- [x] Assistente para obter Authorization Code
- [x] Geração automática de Access Token
- [x] Validação e teste de credenciais
- [x] Download do arquivo .env configurado

### Dashboard de Gerenciamento
- [x] Visualização de status da integração
- [x] Informações do token (validade, expiração)
- [ ] Botão para renovar token
- [ ] Logs de atividades

### Testes e Consultas
- [x] Interface para testar endpoints da API
- [ ] Visualização de pedidos
- [ ] Visualização de produtos
- [ ] Visualização de anúncios
- [ ] Geração de relatórios

###- [x] Documentação Integra- [x] Guia passo a passo integrado [ ] Exemplos de uso com Manus
- [ ] FAQ e solução de problemas
- [ ] Links para suporte

### Extras
- [x] Design responsivo
- [x] Tema claro/escuro
- [ ] Animações e transições suaves
- [ ] Feedback visual de ações


### Melhorias Solicitadas
- [x] Botão de copiar tokens no Dashboard
- [x] Recurso de mostrar/ocultar tokens com ícone de olho
- [x] Interface para consultar API do Lexos Hub (pedidos, produtos, estoque, clientes)
- [x] Visualização de dados em tabelas
- [x] Filtros e busca nos dados
- [x] Aba de chat interativo para consultar dados do Lexos Hub
- [x] Interface de conversa com histórico de mensagens
- [x] Respostas automáticas baseadas em consultas à API
- [x] Gráficos no chat para visualizar dados numéricos
- [x] Funcionalidade de drill-down nos gráficos para ver dados detalhados

### Redesign para CRM Profissional
- [x] Remover visual "Integre o Manus"
- [x] Criar layout estilo CRM com sidebar lateral
- [x] Dashboard com métricas e KPIs
- [x] Navegação lateral com ícones e categorias
- [x] Visual mais profissional e corporativo
- [x] Tema escuro como padrão

### Bugs
- [x] Corrigir erro de nested anchor tags no CRMLayout

### Integração OAuth2 e API Real
- [x] Implementar geração de PKCE (code_verifier e code_challenge)
- [x] Criar serviço de autenticação OAuth2
- [x] Implementar fluxo de login com redirecionamento
- [x] Criar página de callback OAuth2
- [x] Implementar gerenciamento de tokens (access_token, refresh_token)
- [x] Criar serviço de renovação automática de tokens
- [ ] Atualizar cliente API para usar tokens reais
- [ ] Substituir dados mockados por chamadas reais à API
- [x] Implementar tratamento de erros de autenticação
- [x] Adicionar persistência de tokens no localStorage
- [x] Adicionar página de Login
- [x] Adicionar botão de Logout
- [x] Proteger rotas com autenticação

### Página de Configurações
- [x] Criar página de configurações
- [x] Seção de preferências de tema
- [x] Seção de notificações
- [x] Seção de idioma
- [x] Seção de perfil do usuário
- [x] Seção de API e integrações

### Ajustes de Demonstração
- [x] Adicionar modo de demonstração sem autenticação

### Testes de API
- [ ] Documentar endpoints disponíveis
- [ ] Criar script de teste com API real
- [ ] Integrar API real no CRM
- [x] Implementar renovação automática de token JWT
- [x] Criar interceptor para detectar token expirado
- [x] Adicionar retry automático após renovação

### Upgrade Sidebar Estilo Pulse
- [x] Reorganizar sidebar com categorias agrupadas
- [x] Adicionar ícones coloridos para cada seção
- [x] Criar seções: Central, Operacional, Financeiro, Análise
- [x] Melhorar visual com espaçamento e divisores

### Integração ChatGPT Pro
- [x] Criar página de Chat IA
- [x] Interface de conversa profissional
- [x] Simulação de respostas inteligentes
- [x] Adicionar histórico de conversas
- [x] Criar prompts especializados para e-commerce
- [ ] Integrar API real do OpenAI (requer chave API)

### Cotação de Moedas
- [ ] Integrar API de cotação (AwesomeAPI)
- [ ] Exibir Dólar, Euro, Bitcoin
- [ ] Ícone de dinheiro com cotação do dia
- [ ] Atualização automática a cada minuto

### Módulo Pós-Vendas
- [ ] Criar página de Pós-Vendas
- [ ] Sistema de tickets/chamados
- [ ] Gestão de atendimento
- [ ] Histórico de interações
- [ ] Status de tickets (aberto, em andamento, resolvido)

### Página de Login
- [ ] Redesign da página de login
- [ ] Visual moderno e profissional
- [ ] Animações e gradientes
- [ ] Responsivo

### Testes e Validação
- [x] Verificar funcionamento de todos os botões
- [x] Testar navegação entre páginas
- [x] Validar formulários
- [x] Testar responsividade

### Funcionalidades Pendentes (do Relatório de Testes)
- [x] Integrar widget de cotação de moedas no Dashboard
- [x] Adicionar módulo Pós-Vendas ao menu e rotas
- [ ] Redesenhar página de Login profissional
- [ ] Preparar estrutura para integração API real
- [x] Renomear sistema para "IA BRUNO CRM"
- [x] Criar logo moderna com tema de IA e análise
- [x] Criar funcionalidade de pesquisa global (Ctrl+K)
- [x] Buscar em clientes, pedidos, produtos, anúncios
- [x] Modal de pesquisa com resultados em tempo real
- [x] Atalho de teclado Ctrl+K
- [ ] Implementar visualização rápida (hover) nos resultados de pesquisa
- [ ] Popover com detalhes completos do item
- [ ] Informações adicionais ao passar o mouse

### Bugs Reportados
- [x] Corrigir erro RangeError no widget de cotação de moedas (maximumFractionDigits)
- [x] Implementar gráfico de linha com histórico de 24h das moedas
- [x] Adicionar seletor de moeda no widget
- [x] Buscar dados históricos da API
- [x] Criar página Métricas (erro 404)
- [x] Adicionar filtro de período (semana, mês, ano) na página Métricas
- [x] Atualizar KPIs conforme período selecionado
- [x] Atualizar gráficos conforme período selecionado

## Integração com API Lexos (Transparente)

- [ ] Criar sistema de configuração de API centralizado
- [ ] Criar página de Configurações para inserir credenciais
- [ ] Modificar hooks para usar credenciais configuradas
- [ ] Implementar fallback para dados mockados
- [ ] Testar integração com dados reais

## Atualização com Dados Reais do Lexos Hub

- [x] Atualizar métricas do Dashboard com dados reais
- [x] Criar dados mockados realistas baseados nas informações extraídas
- [x] Atualizar categorias de produtos
- [x] Ajustar valores e volumes de pedidos
- [x] Implementar gráficos com dados reais

## Sistema de Automação - Agente de Sincronização

- [ ] Criar agente de scraping do Lexos Hub
- [ ] Implementar sistema de login automatizado
- [ ] Extrair dados do dashboard periodicamente
- [ ] Criar API local para armazenar dados
- [ ] Implementar scheduler para execução automática
- [ ] Adicionar logs de sincronização
- [ ] Criar indicador de última atualização no frontend

## Sistema de Auto-Refresh e Sincronização

- [x] Adicionar indicador de última atualização no dashboard
- [x] Criar botão de atualização manual
- [x] Implementar auto-refresh a cada 5 minutos
- [ ] Adicionar status de conexão com Lexos Hub
- [ ] Criar componente de logs de sincronização

## Atualizar Páginas Operacionais com Dados Reais

- [x] Atualizar página de Pedidos com dados reais
- [ ] Atualizar página de Produtos com dados reais
- [ ] Atualizar página de Anúncios com dados reais
- [ ] Atualizar página de Clientes com dados reais
- [x] Atualizar página de Entregas com dados reais
- [ ] Adicionar funcionalidade de busca e filtros

## Módulo Financeiro - Baseado na Planilha

- [x] Criar página Contas a Pagar
- [x] Criar página Contas a Receber
- [x] Criar página Fluxo de Caixa
- [ ] Criar página Classificações
- [ ] Adicionar formulários de lançamento
- [ ] Implementar filtros por data e status
- [ ] Criar relatórios financeiros

## Melhorias de UX e Responsividade

- [ ] Aumentar limite de exibição para 50 itens nas tabelas
- [ ] Melhorar responsividade das tabelas para celular
- [ ] Criar layout de cards para mobile
- [ ] Otimizar visualização em telas pequenas

## Dashboard Financeiro Inteligente

- [x] Criar widget de contas pendentes com alertas
- [x] Adicionar previsão de pagamentos (7, 15, 30 dias)
- [x] Implementar análise de fluxo de caixa projetado
- [x] Criar sistema de sugestões de investimento
- [x] Adicionar indicadores de saúde financeira
- [x] Implementar gráficos de tendências e projeções
- [x] Criar alertas de contas vencidas e próximas do vencimento

## Menu Mobile Responsivo

- [x] Implementar menu hambúrguer para mobile
- [x] Adicionar botão de toggle do sidebar
- [x] Criar overlay escuro quando menu aberto
- [x] Ocultar sidebar por padrão no mobile
- [x] Conteúdo principal em tela cheia no mobile

## Módulo de Importação e Comex

- [x] Criar menu de Importação no CRM
- [x] Implementar calculadora de custos de importação
- [x] Adicionar campos para % de margem e comissão
- [ ] Criar gerador de proposta comercial em PDF
- [ ] Implementar importação de cotações de frete
- [ ] Criar cadastro de produtos importados
- [ ] Adicionar Assistente IA com sugestões de reunião
- [ ] Implementar dicas de negociação da IA

## Assistente IA - Sugestões de Reunião

- [x] Criar botão flutuante de IA no CRM
- [x] Implementar painel de sugestões de reunião
- [x] Analisar dados do CRM para gerar sugestões
- [x] Criar templates de pauta de reunião
- [x] Adicionar sistema de urgência (alta/média/baixa)
- [x] Implementar sugestões de melhorias no negócio
- [x] Criar dicas para aumentar vendas

## Geração de Proposta Comercial

- [x] Implementar geração de PDF da proposta
- [x] Criar template de proposta profissional
- [x] Incluir todos os dados da calculadora
- [x] Adicionar logo e dados da empresa
- [x] Permitir download do PDF

## Inteligência de Mercado - Comparação de Preços

- [x] Criar ícone de Comparação de Mercado
- [x] Implementar busca automática de preços na internet
- [x] Comparar preços dos produtos com concorrência
- [x] Criar análise de competitividade (caro/barato/médio)
- [x] Gerar sugestões de ajuste de preço
- [x] Adicionar alertas de oportunidades
- [x] Mostrar tendências de preço do mercado

- [x] Criar sistema de alertas de produtos para importar
- [x] Calcular margem de lucro potencial
- [x] Analisar demanda de mercado
- [x] Identificar diferença de preço Brasil vs importação
- [x] Gerar ranking de melhores oportunidades
- [x] Criar página de Inteligência de Mercado

## Melhorias de Detalhamento

- [ ] Criar modal de detalhes de Pedidos Pendentes
- [ ] Mostrar status detalhado de cada pedido
- [ ] Adicionar informações de cliente e produtos
- [ ] Expandir detalhes das Contas a Pagar
- [ ] Mostrar histórico e anexos de contas
- [ ] Adicionar ações (marcar como paga, editar, etc.)

## Melhorias de Detalhamento

- [ ] Criar modal de detalhes de Pedidos Pendentes
- [ ] Mostrar status detalhado de cada pedido
- [ ] Adicionar informações de cliente e produtos
- [ ] Expandir detalhes das Contas a Pagar
- [ ] Mostrar histórico e anexos de contas
- [ ] Adicionar ações (marcar como paga, editar, etc.)

## Tabela de Preços

- [x] Criar página de Tabela de Preços
- [x] Mostrar preço atual dos produtos
- [x] Mostrar preço do mercado (comparação)
- [x] Adicionar status de competitividade
- [x] Implementar sugestões de ajuste de preço
- [x] Permitir edição de preços na tabela

- [x] Implementar modal de detalhes de contas vencidas
- [x] Mostrar lista completa das contas com descrição
- [x] Adicionar ações (marcar como paga, agendar pagamento)

## Sugestões de Investimento

- [ ] Criar sistema de sugestões de investimento
- [ ] Incluir criptomoedas (Bitcoin, Ethereum, etc.)
- [ ] Incluir renda fixa (CDB, Tesouro Direto)
- [ ] Incluir ações e fundos
- [ ] Analisar saldo disponível e perfil de risco
- [ ] Mostrar rentabilidade estimada
- [x] Ativar botão Calcular Importação na Inteligência de Mercado

## Módulo de Entregas

- [x] Criar página de Entregas completa
- [x] Listar entregas com status
- [x] Integrar com dados de pedidos
- [x] Adicionar rastreamento
- [x] Mostrar métricas de desempenho

## Atualização de Módulos com Dados Reais

- [x] Atualizar página de Entregas
- [ ] Atualizar página de Produtos (248 produtos)
- [ ] Atualizar página de Clientes
- [ ] Atualizar página de Anúncios
- [ ] Atualizar página de Pós-Vendas

## Agente de Atualização Automática

- [ ] Criar script de scraping do Lexos Hub
- [ ] Implementar scheduler a cada 1 hora
- [ ] Atualizar dados de Dashboard
- [ ] Atualizar dados de Pedidos
- [ ] Atualizar dados de Produtos
- [ ] Atualizar dados de Entregas
- [ ] Criar sistema de logs de sincronização
- [ ] Adicionar indicador de última atualização
- [x] Tornar cards do dashboard clicáveis com modais detalhados
- [x] Modal de Pedidos Pendentes
- [x] Modal de Pedidos Conferidos  
- [x] Modal de Ticket Médio
- [x] Criar página de Notas Fiscais com dados reais
- [x] Listar NF-e emitidas
- [x] Mostrar status (emitida, cancelada, denegada)
- [x] Integrar com dados de pedidos
- [x] Adicionar filtros e busca
- [x] Criar página de Produtos com dados reais
- [x] Listar 248 produtos ativos
- [x] Mostrar estoque, preço, categoria
- [x] Adicionar filtros e busca
- [x] Integrar com dados do Lexos Hub
- [x] Verificar e corrigir erro na página de Análise de Vendas
- [x] Atualizar com dados reais do Lexos Hub
- [x] Adicionar gráficos de vendas por período
- [x] Mostrar análise por categoria e produto

## Remoção de Dados Fictícios e Integração de Dados Reais

- [ ] Acessar Lexos Hub e extrair lista completa de pedidos reais
- [ ] Extrair lista completa de produtos reais do Lexos Hub
- [ ] Remover dados fictícios de pedidos (REAL_RECENT_ORDERS)
- [ ] Remover dados fictícios de produtos (REAL_TOP_PRODUCTS)
- [ ] Remover dados fictícios de vendas diárias (REAL_DAILY_SALES)
- [ ] Remover dados financeiros mockados (contas a pagar/receber)
- [ ] Atualizar real-data.ts com apenas dados autênticos
- [ ] Atualizar componentes para exibir mensagem quando dados não disponíveis
- [ ] Testar sistema com apenas dados reais
- [ ] Documentar quais dados ainda precisam de integração

## Indicador Visual de Sincronização

- [ ] Corrigir warnings de refs no DashboardCRM
- [ ] Criar componente SyncIndicator
- [ ] Adicionar badge de status (Sincronizado/Sincronizando/Erro)
- [ ] Mostrar timestamp da última sincronização
- [ ] Adicionar botão de atualização manual
- [ ] Integrar com dados de sync-log.json
- [ ] Testar indicador no Dashboard

## Configuração PM2 para Scheduler em Produção

- [x] Criar arquivo ecosystem.config.cjs
- [x] Instalar PM2 globalmente
- [x] Iniciar scheduler com PM2
- [x] Configurar auto-start no boot
- [x] Testar funcionamento do scheduler
- [x] Verificar logs do PM2
- [x] Documentar comandos de gerenciamento
