import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus, Eye, Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react";
import SyncIndicator from "@/components/SyncIndicator";

// Dados mockados de Contas a Pagar
const contasPagar = [
  { id: 1, descricao: 'Fornecedor - Mercadorias', valor: 15000.00, vencimento: '2025-11-10', status: 'pendente', categoria: 'Fornecedores', formaPagamento: 'Boleto' },
  { id: 2, descricao: 'Aluguel - Loja', valor: 3500.00, vencimento: '2025-11-05', status: 'vencido', categoria: 'Despesas Fixas', formaPagamento: 'Transferência' },
  { id: 3, descricao: 'Energia Elétrica', valor: 850.00, vencimento: '2025-11-15', status: 'pendente', categoria: 'Despesas Fixas', formaPagamento: 'Débito Automático' },
  { id: 4, descricao: 'Internet e Telefone', valor: 450.00, vencimento: '2025-11-20', status: 'pendente', categoria: 'Despesas Fixas', formaPagamento: 'Boleto' },
  { id: 5, descricao: 'Fornecedor - Embalagens', valor: 2800.00, vencimento: '2025-10-28', status: 'pago', categoria: 'Fornecedores', formaPagamento: 'Transferência' },
  { id: 6, descricao: 'Frete - Mercadorias', valor: 1200.00, vencimento: '2025-11-12', status: 'pendente', categoria: 'Logística', formaPagamento: 'PIX' },
  { id: 7, descricao: 'Contador - Honorários', valor: 1500.00, vencimento: '2025-11-25', status: 'pendente', categoria: 'Serviços', formaPagamento: 'Transferência' },
  { id: 8, descricao: 'Marketing - Anúncios ML', valor: 5000.00, vencimento: '2025-11-08', status: 'pendente', categoria: 'Marketing', formaPagamento: 'Cartão de Crédito' },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: React.ReactNode, label: string, color: string }> = {
    pendente: { variant: "outline", icon: <Clock className="w-3 h-3" />, label: "Pendente", color: "text-yellow-600" },
    vencido: { variant: "destructive", icon: <AlertCircle className="w-3 h-3" />, label: "Vencido", color: "text-red-600" },
    pago: { variant: "secondary", icon: <CheckCircle className="w-3 h-3" />, label: "Pago", color: "text-green-600" },
  };
  
  const config = variants[status] || variants.pendente;
  
  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 w-fit ${config.color}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default function ContasPagar() {
  const totalPendente = contasPagar.filter(c => c.status === 'pendente').reduce((sum, c) => sum + c.valor, 0);
  const totalVencido = contasPagar.filter(c => c.status === 'vencido').reduce((sum, c) => sum + c.valor, 0);
  const totalPago = contasPagar.filter(c => c.status === 'pago').reduce((sum, c) => sum + c.valor, 0);
  const totalGeral = contasPagar.reduce((sum, c) => sum + c.valor, 0);

  const stats = [
    {
      title: "Total a Pagar",
      value: `R$ ${totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Contas Vencidas",
      value: `R$ ${totalVencido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Contas Pagas",
      value: `R$ ${totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Geral",
      value: `R$ ${totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contas a Pagar</h1>
        <p className="text-muted-foreground">Gerencie todas as despesas e pagamentos</p>
      </div>

      {/* Sync Indicator */}
      <SyncIndicator />

      {/* Stats Grid */}
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
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Contas a Pagar</CardTitle>
              <CardDescription>Registre até 7.000 lançamentos por ano</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Conta
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por descrição, categoria ou forma de pagamento..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Descrição</th>
                  <th className="text-left p-3 text-sm font-medium">Categoria</th>
                  <th className="text-left p-3 text-sm font-medium">Valor</th>
                  <th className="text-left p-3 text-sm font-medium">Vencimento</th>
                  <th className="text-left p-3 text-sm font-medium">Forma Pagamento</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contasPagar.map((conta, index) => (
                  <tr key={conta.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="p-3 text-sm font-medium">{conta.descricao}</td>
                    <td className="p-3 text-sm">{conta.categoria}</td>
                    <td className="p-3 text-sm font-bold text-red-600">
                      R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(conta.vencimento).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="p-3 text-sm">{conta.formaPagamento}</td>
                    <td className="p-3">{getStatusBadge(conta.status)}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Mostrando {contasPagar.length} lançamentos
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
