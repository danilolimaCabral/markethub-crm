# Guia Técnico - IA BRUNO CRM

**Documentação para Desenvolvedores**  
**Versão 1.0**  
**Última atualização: Janeiro 2025**

---

## Sumário

1. [Arquitetura do Sistema](#arquitetura-do-sistema)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Componentes Principais](#componentes-principais)
5. [Integração com APIs](#integração-com-apis)
6. [Autenticação e Autorização](#autenticação-e-autorização)
7. [Guia de Instalação](#guia-de-instalação)
8. [Desenvolvimento](#desenvolvimento)
9. [Deploy e Produção](#deploy-e-produção)

---

## Arquitetura do Sistema

O IA BRUNO CRM foi desenvolvido utilizando arquitetura de **Single Page Application (SPA)** com React no frontend. A aplicação é completamente client-side, com integração via API REST ao Lexos Hub para sincronização de dados.

### Padrões Arquiteturais

A aplicação segue o padrão **Component-Based Architecture**, onde cada funcionalidade é encapsulada em componentes React reutilizáveis. A comunicação entre componentes ocorre através de props e Context API para estado global.

O gerenciamento de estado utiliza **React Hooks** (useState, useEffect, useContext) para lógica de componentes e **Context API** para estado compartilhado entre múltiplos componentes (autenticação, tema, etc.).

A navegação é implementada com **Wouter**, uma biblioteca de roteamento leve e performática. As rotas são organizadas de forma hierárquica com proteção de autenticação através do componente PrivateRoute.

### Fluxo de Dados

O fluxo de dados segue o padrão unidirecional do React. Os dados fluem de componentes pai para filhos através de props, enquanto eventos fluem de filhos para pais através de callbacks.

Para dados que precisam ser acessados por múltiplos componentes não relacionados hierarquicamente (como informações do usuário autenticado), utilizamos Context API. Isso evita prop drilling e mantém o código limpo e manutenível.

A sincronização com APIs externas ocorre através de hooks customizados que encapsulam a lógica de fetch, loading e error handling. Estes hooks são reutilizáveis e seguem o padrão de composição do React.

---

## Stack Tecnológico

### Frontend

**React 18.3.1**: Biblioteca principal para construção da interface. Utilizamos a versão mais recente com suporte a Concurrent Rendering e Automatic Batching para melhor performance.

**TypeScript 5.6.2**: Superset do JavaScript que adiciona tipagem estática. Todos os componentes, funções e interfaces são fortemente tipados, reduzindo bugs e melhorando a experiência de desenvolvimento com autocomplete e validação em tempo de compilação.

**Vite 7.1.9**: Build tool moderna e extremamente rápida. Oferece Hot Module Replacement (HMR) instantâneo durante desenvolvimento e otimização agressiva de bundle para produção.

**Wouter 3.3.5**: Biblioteca de roteamento minimalista (apenas 1.5KB). Oferece API similar ao React Router mas com footprint muito menor, ideal para SPAs.

### UI e Estilização

**Tailwind CSS 4.1.0**: Framework CSS utility-first. Permite construir interfaces complexas sem sair do JSX, com sistema de design consistente através de tokens de cor, espaçamento e tipografia.

**shadcn/ui**: Coleção de componentes React acessíveis e customizáveis construídos com Radix UI e Tailwind CSS. Inclui Button, Card, Dialog, Input, Select, Table e dezenas de outros componentes prontos para uso.

**Lucide React 0.468.0**: Biblioteca de ícones SVG com mais de 1.000 ícones consistentes e customizáveis. Todos os ícones são tree-shakeable, incluindo apenas os utilizados no bundle final.

**Recharts 2.15.0**: Biblioteca de gráficos React baseada em D3. Oferece componentes declarativos para construir gráficos de linha, barra, pizza, área e outros tipos de visualização.

### Utilitários

**date-fns 4.1.0**: Biblioteca moderna para manipulação de datas. Oferece funções puras, imutáveis e tree-shakeable para formatação, cálculo e comparação de datas.

**clsx 2.1.1**: Utilitário para construção condicional de classes CSS. Permite combinar classes de forma limpa e legível.

**Sonner**: Biblioteca para exibição de toasts (notificações temporárias). Oferece API simples e animações suaves.

### Desenvolvimento

**ESLint**: Linter para identificar e corrigir problemas no código JavaScript/TypeScript. Configurado com regras específicas para React e TypeScript.

**PostCSS**: Ferramenta para processar CSS com plugins JavaScript. Utilizado pelo Tailwind CSS para gerar as classes utilitárias.

---

## Estrutura de Pastas

```
lexos-hub-web/
├── client/                      # Código do frontend
│   ├── public/                  # Arquivos estáticos
│   │   └── logo.svg            # Logo do sistema
│   ├── src/
│   │   ├── components/         # Componentes React reutilizáveis
│   │   │   ├── ui/            # Componentes shadcn/ui
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...
│   │   │   ├── AssistenteIAFloat.tsx    # Assistente IA flutuante
│   │   │   ├── CRMLayout.tsx            # Layout principal com sidebar
│   │   │   ├── DashboardFinanceiro.tsx  # Dashboard financeiro inteligente
│   │   │   ├── ErrorBoundary.tsx        # Tratamento de erros React
│   │   │   ├── GlobalSearch.tsx         # Pesquisa global (Ctrl+K)
│   │   │   └── PrivateRoute.tsx         # Proteção de rotas autenticadas
│   │   ├── contexts/           # React Contexts
│   │   │   ├── AuthContext.tsx          # Contexto de autenticação
│   │   │   └── ThemeContext.tsx         # Contexto de tema (dark/light)
│   │   ├── hooks/              # Custom React Hooks
│   │   │   ├── useLexosData.ts          # Hook para buscar dados do Lexos Hub
│   │   │   └── useTokenRefresh.ts       # Hook para renovação de token
│   │   ├── lib/                # Bibliotecas e utilitários
│   │   │   ├── auth.ts                  # Funções de autenticação OAuth2
│   │   │   ├── lexos-api.ts             # Cliente API Lexos Hub
│   │   │   └── utils.ts                 # Funções utilitárias gerais
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── AnaliseVendas.tsx        # Análise de vendas
│   │   │   ├── ChatIA.tsx               # Chat com assistente IA
│   │   │   ├── ContasPagar.tsx          # Contas a pagar
│   │   │   ├── ContasReceber.tsx        # Contas a receber
│   │   │   ├── DashboardCRM.tsx         # Dashboard principal
│   │   │   ├── Entregas.tsx             # Gestão de entregas
│   │   │   ├── FluxoCaixa.tsx           # Fluxo de caixa
│   │   │   ├── Importacao.tsx           # Calculadora de importação
│   │   │   ├── InteligenciaMercado.tsx  # Inteligência de mercado
│   │   │   ├── Login.tsx                # Página de login
│   │   │   ├── NotasFiscais.tsx         # Gestão de notas fiscais
│   │   │   ├── Pedidos.tsx              # Gestão de pedidos
│   │   │   ├── PosVendas.tsx            # Pós-vendas
│   │   │   ├── Produtos.tsx             # Gestão de produtos
│   │   │   ├── Settings.tsx             # Configurações
│   │   │   └── TabelaPreco.tsx          # Tabela de preços
│   │   ├── App.tsx             # Componente raiz com rotas
│   │   ├── main.tsx            # Entry point da aplicação
│   │   └── index.css           # Estilos globais e Tailwind
│   ├── index.html              # HTML base
│   ├── package.json            # Dependências e scripts
│   ├── tsconfig.json           # Configuração TypeScript
│   ├── tailwind.config.ts      # Configuração Tailwind CSS
│   └── vite.config.ts          # Configuração Vite
├── MANUAL_USUARIO.md           # Manual do usuário
├── GUIA_TECNICO.md             # Este arquivo
├── GANHOS_BENEFICIOS.md        # Documento de ganhos e benefícios
└── todo.md                     # Lista de tarefas do projeto
```

---

## Componentes Principais

### AuthContext

Contexto React responsável por gerenciar o estado de autenticação da aplicação. Oferece as seguintes funcionalidades:

```typescript
interface AuthContextType {
  user: User | null;              // Usuário autenticado
  isAuthenticated: boolean;       // Status de autenticação
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string, email: string) => Promise<boolean>;
}
```

O contexto mantém usuários padrão (admin/admin123 e bruno/bruno123) e permite registro de novos usuários. As credenciais são armazenadas no localStorage para persistência entre sessões.

### PrivateRoute

Componente de ordem superior (HOC) que protege rotas autenticadas. Verifica se o usuário está autenticado através do AuthContext. Se não estiver, redireciona automaticamente para a página de login.

```typescript
<PrivateRoute>
  <CRMLayout>
    <DashboardCRM />
  </CRMLayout>
</PrivateRoute>
```

### CRMLayout

Componente de layout principal que envolve todas as páginas autenticadas. Responsável por:

- Renderizar sidebar de navegação com categorias e itens
- Implementar menu hambúrguer responsivo para mobile
- Exibir informações do usuário autenticado
- Oferecer botão de logout
- Integrar pesquisa global (Ctrl+K)
- Renderizar assistente IA flutuante

### GlobalSearch

Componente de pesquisa global acessível via Ctrl+K. Implementa busca em tempo real em pedidos, produtos, clientes, anúncios e entregas. Utiliza Dialog do shadcn/ui para modal e debounce para otimizar performance.

### DashboardFinanceiro

Componente complexo que analisa contas a pagar e receber para gerar:

- Alertas de contas vencidas
- Previsão de pagamentos (7/15/30 dias)
- Previsão de recebimentos (7/15/30 dias)
- Gráfico de projeção de fluxo de caixa
- Sugestões de investimento baseadas em saldo disponível

### AssistenteIAFloat

Botão flutuante no canto inferior direito que abre painel lateral com:

- Sugestões de reuniões baseadas em dados do CRM
- Dicas para aumentar vendas
- Análise de oportunidades

---

## Integração com APIs

### Lexos Hub API

O sistema integra-se com a API REST do Lexos Hub para sincronização de dados. A integração está implementada em `client/src/lib/lexos-api.ts`.

#### Autenticação OAuth2

A API utiliza OAuth2 com fluxo Authorization Code + PKCE. O processo de autenticação envolve:

1. Gerar code_verifier e code_challenge (PKCE)
2. Redirecionar usuário para página de autorização do Lexos Hub
3. Receber authorization code via callback
4. Trocar authorization code por access_token e refresh_token
5. Armazenar tokens no localStorage
6. Incluir access_token em todas as requisições (header Authorization: Bearer)

#### Renovação Automática de Token

O hook `useTokenRefresh` monitora a expiração do token a cada 5 minutos. Quando faltam menos de 10 minutos para expirar, o sistema renova automaticamente utilizando o refresh_token.

```typescript
const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = getStoredToken();
      if (token && isTokenExpiringSoon(token)) {
        await refreshToken();
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, []);
};
```

#### Endpoints Disponíveis

**GET /api/pedidos**: Lista todos os pedidos  
**GET /api/produtos**: Lista todos os produtos  
**GET /api/anuncios**: Lista todos os anúncios  
**GET /api/clientes**: Lista todos os clientes  
**GET /api/entregas**: Lista todas as entregas  
**GET /api/notas-fiscais**: Lista todas as notas fiscais

Todos os endpoints retornam JSON e requerem autenticação via Bearer token.

### API de Cotação de Moedas

O widget de cotação utiliza a AwesomeAPI para obter cotações em tempo real:

**GET https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL**

Retorna objeto JSON com cotações atuais de Dólar, Euro e Bitcoin em relação ao Real.

---

## Autenticação e Autorização

### Sistema de Autenticação Local

O sistema implementa autenticação local com usuário e senha. As credenciais são validadas contra uma lista de usuários armazenada no localStorage.

#### Usuários Padrão

```typescript
const DEFAULT_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    email: 'admin@iabrunocrm.com',
    role: 'admin'
  },
  {
    id: '2',
    username: 'bruno',
    password: 'bruno123',
    name: 'Bruno',
    email: 'bruno@trueimportados.com.br',
    role: 'admin'
  }
];
```

#### Registro de Novos Usuários

Novos usuários podem se cadastrar através da página de login. O sistema valida se o username ou email já existem e, caso contrário, cria o novo usuário e armazena no localStorage.

```typescript
const register = async (username: string, password: string, name: string, email: string) => {
  // Verificar se usuário já existe
  const userExists = allUsers.find(u => u.username === username || u.email === email);
  if (userExists) return false;

  // Criar novo usuário
  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    name,
    email,
    role: 'user'
  };

  // Salvar no localStorage
  const savedUsers = JSON.parse(localStorage.getItem('ia_bruno_users') || '[]');
  savedUsers.push(newUser);
  localStorage.setItem('ia_bruno_users', JSON.stringify(savedUsers));

  // Login automático
  setUser(newUser);
  setIsAuthenticated(true);
  return true;
};
```

### Persistência de Sessão

A sessão do usuário é persistida no localStorage através da chave `ia_bruno_user`. Ao carregar a aplicação, o AuthContext verifica se existe uma sessão salva e restaura automaticamente o estado de autenticação.

```typescript
useEffect(() => {
  const savedUser = localStorage.getItem('ia_bruno_user');
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('ia_bruno_user');
    }
  }
}, []);
```

### Proteção de Rotas

Todas as rotas do sistema (exceto /login e /callback) são protegidas pelo componente PrivateRoute. Este componente verifica o estado de autenticação e redireciona para login caso o usuário não esteja autenticado.

```typescript
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
};
```

---

## Guia de Instalação

### Pré-requisitos

- **Node.js 18+**: Runtime JavaScript
- **pnpm 8+**: Gerenciador de pacotes (recomendado) ou npm/yarn
- **Git**: Controle de versão

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ia-bruno-crm.git
cd ia-bruno-crm
```

2. Instale as dependências:
```bash
cd client
pnpm install
```

3. Configure variáveis de ambiente (opcional):
```bash
cp .env.example .env
# Edite .env com suas credenciais
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Acesse http://localhost:3000 no navegador

### Variáveis de Ambiente

```env
# API Lexos Hub
VITE_LEXOS_API_URL=https://api.lexos.com.br
VITE_LEXOS_CLIENT_ID=seu-client-id
VITE_LEXOS_INTEGRATION_KEY=sua-integration-key

# OAuth2
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/callback
VITE_OAUTH_AUTHORIZE_URL=https://accounts.lexos.com.br/oauth2/authorize
VITE_OAUTH_TOKEN_URL=https://accounts.lexos.com.br/oauth2/token
```

---

## Desenvolvimento

### Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Gera build de produção
pnpm preview      # Preview do build de produção
pnpm lint         # Executa ESLint
pnpm type-check   # Verifica tipos TypeScript
```

### Convenções de Código

**Nomenclatura de Componentes**: PascalCase (ex: DashboardCRM.tsx)  
**Nomenclatura de Funções**: camelCase (ex: handleLogin)  
**Nomenclatura de Constantes**: UPPER_SNAKE_CASE (ex: DEFAULT_USERS)  
**Nomenclatura de Arquivos**: kebab-case para utilitários (ex: lexos-api.ts)

**Organização de Imports**:
1. Bibliotecas externas (react, wouter, etc.)
2. Componentes internos (@/components)
3. Hooks (@/hooks)
4. Utilitários (@/lib)
5. Tipos e interfaces
6. Estilos

**Tipagem TypeScript**: Todos os componentes, funções e variáveis devem ser tipados. Evite uso de `any`.

### Criando Novos Componentes

1. Crie arquivo em `client/src/components/` ou `client/src/pages/`
2. Defina interfaces para props
3. Implemente componente funcional com TypeScript
4. Exporte como default
5. Documente props complexas com JSDoc

```typescript
interface ButtonProps {
  /** Texto do botão */
  label: string;
  /** Função chamada ao clicar */
  onClick: () => void;
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### Adicionando Novas Rotas

1. Crie componente de página em `client/src/pages/`
2. Importe no `App.tsx`
3. Adicione rota dentro do Switch protegido por PrivateRoute
4. Adicione item de navegação no `CRMLayout.tsx`

```typescript
// App.tsx
import NovaPage from './pages/NovaPage';

<Route path="/nova-page" component={NovaPage} />

// CRMLayout.tsx
{
  path: '/nova-page',
  icon: <Icon size={20} />,
  label: 'Nova Página',
  color: 'text-blue-500'
}
```

---

## Deploy e Produção

### Build de Produção

```bash
cd client
pnpm build
```

O comando gera pasta `dist/` com arquivos otimizados para produção:
- HTML, CSS e JS minificados
- Assets com hash para cache busting
- Source maps para debugging
- Análise de bundle size

### Deploy em Vercel

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Configure projeto:
```bash
vercel
```

3. Deploy:
```bash
vercel --prod
```

### Deploy em Netlify

1. Conecte repositório Git no dashboard Netlify
2. Configure build:
   - Build command: `cd client && pnpm build`
   - Publish directory: `client/dist`
3. Deploy automático a cada push

### Variáveis de Ambiente em Produção

Configure as variáveis de ambiente no painel do provedor de hospedagem (Vercel, Netlify, etc.). Todas as variáveis devem começar com `VITE_` para serem acessíveis no frontend.

### Otimizações de Performance

- **Code Splitting**: Vite automaticamente divide o código em chunks
- **Tree Shaking**: Código não utilizado é removido do bundle
- **Lazy Loading**: Componentes pesados podem ser carregados sob demanda
- **Image Optimization**: Utilize formatos modernos (WebP, AVIF)
- **CDN**: Sirva assets estáticos através de CDN

---

**Desenvolvido por Manus AI**  
**Repositório: github.com/ia-bruno-crm**  
**Documentação: docs.iabrunocrm.com**
