import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Megaphone,
  Users,
  Truck,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  MessageSquare,
  TrendingUp,
  PieChart,
  Calculator,
  Headphones
} from 'lucide-react';
import { logout } from '@/lib/auth';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  color: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function CRMLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Navegação organizada por seções estilo Pulse
  const navSections: NavSection[] = [
    {
      title: "Central",
      items: [
        { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard", color: "text-blue-500" },
        { path: "/chat", icon: <MessageSquare size={20} />, label: "Assistente IA", color: "text-purple-500" },
      ]
    },
    {
      title: "Operacional",
      items: [
        { path: "/pedidos", icon: <ShoppingCart size={20} />, label: "Pedidos", badge: 12, color: "text-orange-500" },
        { path: "/produtos", icon: <Package size={20} />, label: "Produtos", color: "text-green-500" },
        { path: "/anuncios", icon: <Megaphone size={20} />, label: "Anúncios", color: "text-red-500" },
        { path: "/clientes", icon: <Users size={20} />, label: "Clientes", color: "text-cyan-500" },
        { path: "/entregas", icon: <Truck size={20} />, label: "Entregas", color: "text-indigo-500" },
        { path: "/pos-vendas", icon: <Headphones size={20} />, label: "Pós-Vendas", color: "text-teal-500" },
      ]
    },
    {
      title: "Financeiro",
      items: [
        { path: "/financeiro", icon: <DollarSign size={20} />, label: "Financeiro", color: "text-green-600" },
        { path: "/notas", icon: <FileText size={20} />, label: "Notas Fiscais", color: "text-slate-500" },
        { path: "/precos", icon: <Calculator size={20} />, label: "Tabela de Preços", color: "text-yellow-600" },
      ]
    },
    {
      title: "Análise",
      items: [
        { path: "/relatorios", icon: <BarChart3 size={20} />, label: "Relatórios", color: "text-violet-500" },
        { path: "/vendas", icon: <TrendingUp size={20} />, label: "Análise de Vendas", color: "text-emerald-500" },
        { path: "/metricas", icon: <PieChart size={20} />, label: "Métricas", color: "text-pink-500" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo/Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">IA BRUNO CRM</h1>
              <p className="text-xs text-muted-foreground">Sistema Inteligente de Gestão</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Title */}
              <div className="px-3 mb-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              
              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <div
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                          transition-all duration-200
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                          }
                        `}
                      >
                        <span className={isActive ? 'text-primary-foreground' : item.color}>
                          {item.icon}
                        </span>
                        <span className="flex-1 font-medium text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-border">
          <Link href="/configuracoes">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-accent transition-colors mb-2">
              <Settings size={20} className="text-muted-foreground" />
              <span className="flex-1 font-medium text-sm text-foreground">Configurações</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-3 px-3 py-2.5 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Usuário</p>
              <p className="text-xs text-muted-foreground truncate">user@lexos.com</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
