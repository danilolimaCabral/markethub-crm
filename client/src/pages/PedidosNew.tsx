import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, Search, Package, Clock, CheckCircle, XCircle, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  paid: { label: 'Pago', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Processando', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-indigo-100 text-indigo-800', icon: Package },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
  refunded: { label: 'Reembolsado', color: 'bg-gray-100 text-gray-800', icon: XCircle },
};

export default function PedidosNew() {
  const [busca, setBusca] = useState('');
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);
  
  // Form
  const [formData, setFormData] = useState({
    marketplace: 'mercado_livre' as const,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    totalAmount: 0,
    shippingCost: 0,
    items: [
      {
        productName: '',
        quantity: 1,
        unitPrice: 0,
      }
    ],
  });

  // Queries
  const { data: pedidos = [], isLoading, refetch } = trpc.orders.list.useQuery();
  
  // Mutations
  const createMutation = trpc.orders.create.useMutation({
    onSuccess: () => {
      toast.success('Pedido criado com sucesso!');
      refetch();
      setModalAdicionar(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao criar pedido: ${error.message}`);
    },
  });

  const updateMutation = trpc.orders.update.useMutation({
    onSuccess: () => {
      toast.success('Pedido atualizado com sucesso!');
      refetch();
      setModalDetalhes(false);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar pedido: ${error.message}`);
    },
  });

  // Handlers
  const handleSubmit = () => {
    if (!formData.customerName || formData.items.length === 0) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const totalAmount = formData.items.reduce((acc, item) => 
      acc + (item.unitPrice * item.quantity), 0
    );

    const data = {
      marketplace: formData.marketplace,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail || undefined,
      customerPhone: formData.customerPhone || undefined,
      totalAmount: Math.round((totalAmount + formData.shippingCost) * 100), // Converter para centavos
      shippingCost: Math.round(formData.shippingCost * 100),
      discountAmount: 0,
      marketplaceFee: 0,
      paymentFee: 0,
      icmsAmount: 0,
      taxAmount: 0,
      status: 'pending' as const,
      items: formData.items.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: Math.round(item.unitPrice * 100),
        totalPrice: Math.round(item.unitPrice * item.quantity * 100),
      })),
    };

    createMutation.mutate(data);
  };

  const handleUpdateStatus = (id: number, status: any) => {
    updateMutation.mutate({ id, status });
  };

  const handleVerDetalhes = async (pedido: any) => {
    const detalhes = await trpc.orders.getById.useQuery({ id: pedido.id });
    setPedidoSelecionado(detalhes.data);
    setModalDetalhes(true);
  };

  const resetForm = () => {
    setFormData({
      marketplace: 'mercado_livre',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      totalAmount: 0,
      shippingCost: 0,
      items: [
        {
          productName: '',
          quantity: 1,
          unitPrice: 0,
        }
      ],
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productName: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(pedido => {
    if (!busca) return true;
    const searchLower = busca.toLowerCase();
    return (
      pedido.customerName.toLowerCase().includes(searchLower) ||
      pedido.externalId?.toLowerCase().includes(searchLower)
    );
  });

  // Estatísticas
  const stats = {
    total: pedidos.length,
    pendentes: pedidos.filter(p => p.status === 'pending').length,
    processando: pedidos.filter(p => p.status === 'processing' || p.status === 'shipped').length,
    entregues: pedidos.filter(p => p.status === 'delivered').length,
    faturamento: pedidos
      .filter(p => p.status === 'delivered')
      .reduce((acc, p) => acc + p.totalAmount, 0) / 100,
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">Gestão de pedidos e vendas</p>
        </div>
        <Button onClick={() => setModalAdicionar(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Pedido
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Processamento</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processando}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entregues</p>
                <p className="text-2xl font-bold text-green-600">{stats.entregues}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faturamento</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {(stats.faturamento / 1000).toFixed(1)}k
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por cliente ou ID..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({pedidosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Cliente</th>
                  <th className="text-left p-2">Marketplace</th>
                  <th className="text-right p-2">Valor Total</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Data</th>
                  <th className="text-center p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                ) : (
                  pedidosFiltrados.map((pedido) => {
                    const statusInfo = statusConfig[pedido.status];
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={pedido.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-mono text-sm">#{pedido.id}</td>
                        <td className="p-2">{pedido.customerName}</td>
                        <td className="p-2 capitalize">{pedido.marketplace.replace('_', ' ')}</td>
                        <td className="p-2 text-right font-semibold">
                          R$ {(pedido.totalAmount / 100).toFixed(2)}
                        </td>
                        <td className="p-2 text-center">
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="p-2 text-center text-sm text-muted-foreground">
                          {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setPedidoSelecionado(pedido);
                                setModalDetalhes(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Adicionar */}
      <Dialog open={modalAdicionar} onOpenChange={(open) => {
        if (!open) {
          setModalAdicionar(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Pedido</DialogTitle>
            <DialogDescription>
              Cadastre um novo pedido manualmente
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marketplace">Marketplace *</Label>
                <select
                  id="marketplace"
                  className="w-full p-2 border rounded"
                  value={formData.marketplace}
                  onChange={(e) => setFormData({ ...formData, marketplace: e.target.value as any })}
                >
                  <option value="mercado_livre">Mercado Livre</option>
                  <option value="amazon">Amazon</option>
                  <option value="shopee">Shopee</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <Label htmlFor="customerName">Nome do Cliente *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="João Silva"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="joao@email.com"
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Telefone</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="shippingCost">Custo de Frete (R$)</Label>
                <Input
                  id="shippingCost"
                  type="number"
                  step="0.01"
                  value={formData.shippingCost}
                  onChange={(e) => setFormData({ ...formData, shippingCost: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Itens do Pedido *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Item
                </Button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-5">
                    <Input
                      placeholder="Nome do produto"
                      value={item.productName}
                      onChange={(e) => {
                        const newItems = [...formData.items];
                        newItems[index].productName = e.target.value;
                        setFormData({ ...formData, items: newItems });
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qtd"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...formData.items];
                        newItems[index].quantity = parseInt(e.target.value) || 1;
                        setFormData({ ...formData, items: newItems });
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Preço"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const newItems = [...formData.items];
                        newItems[index].unitPrice = parseFloat(e.target.value) || 0;
                        setFormData({ ...formData, items: newItems });
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted rounded">
              <p className="text-sm font-semibold">
                Total: R$ {(
                  formData.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0) +
                  formData.shippingCost
                ).toFixed(2)}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setModalAdicionar(false);
              resetForm();
            }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Criando...' : 'Criar Pedido'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Detalhes */}
      <Dialog open={modalDetalhes} onOpenChange={setModalDetalhes}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{pedidoSelecionado?.id}</DialogTitle>
          </DialogHeader>

          {pedidoSelecionado && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cliente</Label>
                  <p className="font-semibold">{pedidoSelecionado.customerName}</p>
                </div>
                <div>
                  <Label>Marketplace</Label>
                  <p className="capitalize">{pedidoSelecionado.marketplace.replace('_', ' ')}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={(statusConfig as any)[pedidoSelecionado.status].color}>
                    {(statusConfig as any)[pedidoSelecionado.status].label}
                  </Badge>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <p className="font-semibold">R$ {(pedidoSelecionado.totalAmount / 100).toFixed(2)}</p>
                </div>
              </div>

              <div>
                <Label>Alterar Status</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={pedidoSelecionado.status === status ? "default" : "outline"}
                      onClick={() => handleUpdateStatus(pedidoSelecionado.id, status)}
                      disabled={updateMutation.isPending}
                    >
                      {config.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalDetalhes(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
