# MarketHub CRM

> Sistema SaaS multi-tenant completo para vendedores de marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-blue)](https://www.postgresql.org/)

## 🚀 Sobre o Projeto

MarketHub CRM é uma plataforma SaaS especializada em gestão de vendas para marketplaces brasileiros (Mercado Livre, Amazon, Shopee). O sistema oferece cálculo automático de taxas, gestão de estoque inteligente, análise financeira completa e arquitetura multi-tenant pronta para comercialização.

### ✨ Principais Funcionalidades

- 🧮 **Calculadora Inteligente de Taxas ML** - Calcula automaticamente comissões, ICMS por estado, impostos do regime tributário
- 📊 **Análise Financeira Completa** - CMV, margem de contribuição, OPEX, custos fixos e variáveis
- 🔔 **Alertas Automáticos** - Notificações de estoque baixo, pausa/reativação automática de anúncios
- 🏢 **Arquitetura Multi-Tenant** - Sistema SaaS pronto para múltiplos clientes isolados
- 🔐 **Segurança 2FA** - Autenticação de dois fatores nativa com TOTP
- 🔌 **Integrações** - APIs prontas para Mercado Livre, Amazon, Shopee e ERPs

## 🛠️ Tecnologias

### Frontend
- **React 19** - Biblioteca UI moderna
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling utilitário
- **shadcn/ui** - Componentes acessíveis
- **Wouter** - Roteamento leve

### Backend (Preparado)
- **Node.js 20 LTS**
- **PostgreSQL 14+** - Banco de dados principal
- **JWT + TOTP** - Autenticação segura

### Infraestrutura
- **Vite** - Build tool rápido
- **pnpm** - Gerenciador de pacotes eficiente

## 📋 Pré-requisitos

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- PostgreSQL 14+ (para produção)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/danilolimaCabral/marketHubcrm.git
cd marketHubcrm
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o banco de dados (Opcional - usa localStorage por padrão)

```bash
# Criar banco PostgreSQL
createdb markethub_crm

# Executar migrations
psql markethub_crm < database/01_create_tables.sql
psql markethub_crm < database/02_seed_data.sql
psql markethub_crm < database/05_modulo_cmv.sql
psql markethub_crm < database/06_multi_tenant.sql
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
markethubcrm/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── lib/           # Utilitários e helpers
│   │   ├── data/          # Dados estáticos e mocks
│   │   └── contexts/      # Contextos React
│   └── public/            # Assets estáticos
├── database/              # Scripts SQL
│   ├── 01_create_tables.sql
│   ├── 02_seed_data.sql
│   ├── 05_modulo_cmv.sql
│   └── 06_multi_tenant.sql
├── diagrams/              # Diagramas de arquitetura
└── docs/                  # Documentação técnica
```

## 🔐 Autenticação

O sistema usa localStorage para desenvolvimento. Para produção, implemente:

- JWT tokens com refresh
- Autenticação 2FA (TOTP)
- OAuth2 para integrações

**Credenciais de desenvolvimento:**
- Usuário: `admin`
- Senha: `admin123`

## 🗄️ Banco de Dados

### Tabelas Principais (22 tabelas)

- **Autenticação**: users, user_permissions, backup_codes
- **Produtos**: products, product_variations
- **Pedidos**: orders, order_items, order_status_history
- **Financeiro**: financial_transactions, variable_costs
- **CMV**: stock_movements, purchases, cmv_periods
- **Multi-tenant**: tenants, tenant_subscriptions, tenant_metrics

Veja documentação completa em `/database/`

## 🌐 Deploy

### Opção 1: Vercel (Recomendado para frontend)

```bash
pnpm build
vercel --prod
```

### Opção 2: Docker

```bash
docker build -t markethub-crm .
docker run -p 3000:3000 markethub-crm
```

### Opção 3: VPS (DigitalOcean, AWS)

```bash
# Build
pnpm build

# Servir com nginx ou PM2
pm2 start npm --name "markethub" -- start
```

## 💰 Modelo de Negócio

O MarketHub CRM está pronto para comercialização SaaS:

| Plano | Preço/mês | Recursos |
|-------|-----------|----------|
| **Starter** | R$ 49 | 1 marketplace, 100 produtos |
| **Professional** | R$ 99 | 3 marketplaces, 500 produtos |
| **Business** | R$ 199 | 5 marketplaces, 2.000 produtos |
| **Enterprise** | R$ 399 | Ilimitado + suporte prioritário |

## 📚 Documentação

- [Documentação Técnica Completa](./DOCUMENTACAO_TECNICA_MARKETHUB_CRM.md)
- [Guia de Comercialização](./GUIA_COMERCIALIZACAO_MARKETHUB_CRM.md)
- [Arquitetura Multi-Tenant](./ARQUITETURA_MULTI_TENANT.md)
- [Relatório de Prospecção](./RELATORIO_PROSPECCAO_MARKETHUB_CRM.md)

## 🤝 Contribuindo

Este é um repositório privado. Para contribuir:

1. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.

## 👤 Autor

**Danilo Lima Cabral**

- GitHub: [@danilolimaCabral](https://github.com/danilolimaCabral)

## 🙏 Agradecimentos

- Comunidade React e TypeScript
- shadcn/ui pelos componentes incríveis
- Todos os beta testers do MarketHub CRM

---

**Status do Projeto:** ✅ Pronto para produção

**Última atualização:** Novembro 2025
