import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus, Eye, Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react";
import SyncIndicator from "@/components/SyncIndicator";

// Dados mockados de Contas a Receber
const contasReceber = [
  { id: 1, descricao: 'Venda Mercado Livre #ML001', valor: 1250.00, vencimento: '2025-11-08', status: 'pendente', categoria: 'Vendas Online', cliente: 'João Silva' },
  { id: 2, descricao: 'Venda Mercado Livre #ML002', valor: 890.00, vencimento: '2025-11-10', status: 'pendente', categoria: 'Vendas Online', cliente: 'Maria Santos' },
  { id: 3, descricao: 'Venda Mercado Livre #ML003', valor: 2100.00, vencimento: '2025-10-30', status: 'recebido', categoria: 'Vendas Online', cliente: 'Pedro Costa' },
  { id: 4, descricao: 'Venda Mercado Livre #ML004', valor: 450.00, vencimento: '2025-11-12', status: 'pendente', categoria: 'Vendas Online', cliente: 'Ana Oliveira' },
  { id: 5, descricao: 'Venda Mercado Livre #ML005', valor: 3200.00, vencimento: '2025-11-15', status: 'pendente', categoria: 'Vendas Online', cliente: 'Carlos Mendes' },
  { id: 6, descricao: 'Venda Mercado Livre #ML006', valor: 780.00, vencimento: '2025-10-25', status: 'recebido', categoria: 'Vendas Online', cliente: 'Juliana Lima' },
  { id: 7, descricao: 'Venda Mercado Livre #ML007', valor: 1500.00, vencimento: '2025-11-05', status: 'atrasado', categoria: 'Vendas Online', cliente: 'Roberto Alves' },
  { id: 8, descricao: 'Venda Mercado Livre #ML008', valor: 950.00, vencimento: '2025-11-18', status: 'pendente', categoria: 'Vendas Online', cliente: 'Fernanda Souza' },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: React.ReactNode, label: string, color: string }> = {
    pendente: { variant: "outline", icon: <Clock className="w-3 h-3" />, label: "Pendente", color: "text-yellow-600" },
    atrasado: { variant: "destructive", icon: <AlertCircle className="w-3 h-3" />, label: "Atrasado", color: "text-red-600" },
    recebido: { variant: "secondary", icon: <CheckCircle className="w-3 h-3" />, label: "Recebido", color: "text-green-600" },
  };
  
  const config = variants[status] || variants.pendente;
  
  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 w-fit ${config.color}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default function ContasReceber() {
  const totalPendente = contasReceber.filter(c => c.status === 'pendente').reduce((sum, c) => sum + c.valor, 0);
  const totalAtrasado = contasReceber.filter(c => c.status === 'atrasado').reduce((sum, c) => sum + c.valor, 0);
  const totalRecebido = contasReceber.filter(c => c.status === 'recebido').reduce((sum, c) => sum + c.valor, 0);
  const totalGeral = contasReceber.reduce((sum, c) => sum + c.valor, 0);

  const stats = [
    {
      title: "Total a Receber",
      value: `R$ ${totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Contas Atrasadas",
      value: `R$ ${totalAtrasado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Contas Recebidas",
      value: `R$ ${totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
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
        <h1 className="text-3xl font-bold text-foreground">Contas a Receber</h1>
        <p className="text-muted-foreground">Gerencie todas as receitas e recebimentos</p>
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
              <CardTitle>Lista de Contas a Receber</CardTitle>
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
                placeholder="Buscar por descrição, cliente ou categoria..."
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
                  <th className="text-left p-3 text-sm font-medium">Cliente</th>
                  <th className="text-left p-3 text-sm font-medium">Categoria</th>
                  <th className="text-left p-3 text-sm font-medium">Valor</th>
                  <th className="text-left p-3 text-sm font-medium">Vencimento</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contasReceber.map((conta, index) => (
                  <tr key={conta.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="p-3 text-sm font-medium">{conta.descricao}</td>
                    <td className="p-3 text-sm">{conta.cliente}</td>
                    <td className="p-3 text-sm">{conta.categoria}</td>
                    <td className="p-3 text-sm font-bold text-green-600">
                      R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(conta.vencimento).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
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
            Mostrando {contasReceber.length} lançamentos
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
