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
