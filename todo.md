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
