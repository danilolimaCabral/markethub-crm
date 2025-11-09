import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { useLocation } from 'wouter';
import CRMLayout from '@/components/CRMLayout';
import { trpc } from '@/lib/trpc';

export default function DashboardNew() {
  const [, setLocation] = useLocation();
  
  // Buscar estatísticas do banco de dados
  const { data: stats, isLoading } = trpc.stats.dashboard.useQuery();

  if (isLoading) {
    return (
      <CRMLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      </CRMLayout>
    );
  }

  const produtosStats = stats?.produtos || { total: 0, ativos: 0, estoqueBaixo: 0, valorTotal: 0 };
  const pedidosStats = stats?.pedidos || { total: 0, pendentes: 0, faturamento: 0, lucro: 0 };
  const financeiroStats = stats?.financeiro || { receitas: 0, despesas: 0, saldo: 0 };
  const pedidosRecentes = stats?.pedidosRecentes || [];
  const produtosEstoqueBaixo = stats?.produtosEstoqueBaixo || [];

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do seu negócio em tempo real
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total de Produtos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Produtos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtosStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {produtosStats.ativos} ativos
              </p>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => setLocation('/produtos')}
              >
                Ver produtos →
              </Button>
            </CardContent>
          </Card>

          {/* Total de Pedidos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Pedidos
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pedidosStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {pedidosStats.pendentes} pendentes
              </p>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => setLocation('/pedidos')}
              >
                Ver pedidos →
              </Button>
            </CardContent>
          </Card>

          {/* Faturamento */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Faturamento
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {pedidosStats.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% vs mês anterior
              </div>
            </CardContent>
          </Card>

          {/* Lucro Líquido */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lucro Líquido
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {pedidosStats.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Margem: {pedidosStats.faturamento > 0 ? ((pedidosStats.lucro / pedidosStats.faturamento) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas de Estoque Baixo */}
        {produtosEstoqueBaixo.length > 0 && (
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <AlertTriangle className="h-5 w-5" />
                Produtos com Estoque Baixo
              </CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-300">
                {produtosEstoqueBaixo.length} produtos precisam de reposição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {produtosEstoqueBaixo.slice(0, 5).map((produto: any) => (
                  <div key={produto.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded">
                    <div>
                      <p className="font-medium">{produto.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {produto.sku}
                      </p>
                    </div>
                    <Badge variant="destructive">
                      {produto.estoque} unidades
                    </Badge>
                  </div>
                ))}
              </div>
              {produtosEstoqueBaixo.length > 5 && (
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setLocation('/produtos')}
                >
                  Ver todos os {produtosEstoqueBaixo.length} produtos
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Últimos pedidos recebidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pedidosRecentes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum pedido ainda</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setLocation('/pedidos')}
                >
                  Criar primeiro pedido
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {pedidosRecentes.map((pedido: any) => (
                  <div key={pedido.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">#{pedido.id}</p>
                        <Badge variant={
                          pedido.status === 'entregue' ? 'default' :
                          pedido.status === 'cancelado' ? 'destructive' :
                          'secondary'
                        }>
                          {pedido.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pedido.nomeCliente} • {new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        R$ {pedido.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      {pedido.lucroLiquido && (
                        <p className="text-sm text-green-600">
                          Lucro: R$ {pedido.lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation('/pedidos')}
                >
                  Ver todos os pedidos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumo Financeiro */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-green-600">
                Receitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {financeiroStats.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Contas a receber
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-600">
                Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {financeiroStats.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                Contas a pagar
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Saldo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${financeiroStats.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {financeiroStats.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Receitas - Despesas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
}
