import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ShoppingCart, Package, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CurrencyWidget from '@/components/CurrencyWidget';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { usePedidos } from '@/hooks/usePedidos';

// Dados mockados para gráficos (serão substituídos por dados reais posteriormente)
const salesData = [
  { name: 'Seg', vendas: 4000 },
  { name: 'Ter', vendas: 3000 },
  { name: 'Qua', vendas: 5000 },
  { name: 'Qui', vendas: 2780 },
  { name: 'Sex', vendas: 6890 },
  { name: 'Sáb', vendas: 2390 },
  { name: 'Dom', vendas: 3490 },
];

const marketplaceData = [
  { name: 'Mercado Livre', value: 450, color: '#FFE600' },
  { name: 'Amazon', value: 320, color: '#FF9900' },
  { name: 'Shopee', value: 180, color: '#EE4D2D' },
  { name: 'Magalu', value: 150, color: '#0086FF' },
];

export default function DashboardCRM() {
  const { metrics, loading: metricsLoading, error: metricsError } = useDashboardMetrics();
  const { pedidos, loading: pedidosLoading } = usePedidos();

  // Pegar últimos 3 pedidos
  const recentOrders = pedidos.slice(0, 3).map(p => ({
    id: p.id,
    cliente: p.cliente,
    marketplace: p.marketplace || 'N/A',
    valor: p.valor,
    status: p.status,
  }));

  // Calcular estatísticas com dados reais
  const stats = [
    {
      title: "Pedidos Pendentes",
      value: metrics?.pedidosPendentes?.toString() || "0",
      change: "+2",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Produtos Ativos",
      value: metrics?.produtosAtivos?.toString() || "0",
      change: "+12",
      trend: "up",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Faturamento (Mês)",
      value: `R$ ${metrics?.totalFaturamento?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}`,
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Ticket Médio",
      value: `R$ ${metrics?.ticketMedio?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}`,
      change: "-0.5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
  ];

  if (metricsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (metricsError) {
    return (
      <div className="p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao carregar dados</CardTitle>
            <CardDescription>{metricsError}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verifique se você está autenticado e se a API está respondendo corretamente.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu e-commerce</p>
      </div>

      {/* Currency Widget */}
      <CurrencyWidget />

      {/* Stats Grid - DADOS REAIS DA API */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">vs. semana passada</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas da Semana</CardTitle>
            <CardDescription>Faturamento diário em reais</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Marketplace Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Marketplace</CardTitle>
            <CardDescription>Pedidos por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketplaceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketplaceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders - DADOS REAIS DA API */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Últimos pedidos recebidos da API</CardDescription>
        </CardHeader>
        <CardContent>
          {pedidosLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum pedido encontrado
            </p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.cliente}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{order.marketplace}</p>
                      <p className="font-semibold text-foreground">R$ {order.valor.toFixed(2)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
