import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package, Search, TrendingUp, AlertTriangle, CheckCircle, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function ProdutosNew() {
  const [busca, setBusca] = useState('');
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);
  
  // Form
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    costPrice: 0,
    salePrice: 0,
    stock: 0,
    minStock: 10,
  });

  // Queries
  const { data: produtos = [], isLoading, refetch } = trpc.products.list.useQuery();
  
  // Mutations
  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success('Produto criado com sucesso!');
      refetch();
      setModalAdicionar(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    },
  });

  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso!');
      refetch();
      setModalEditar(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar produto: ${error.message}`);
    },
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success('Produto excluído com sucesso!');
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro ao excluir produto: ${error.message}`);
    },
  });

  // Handlers
  const handleSubmit = () => {
    if (!formData.name || !formData.sku || !formData.salePrice) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const data = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category || 'Geral',
      costPrice: Math.round(formData.costPrice * 100), // Converter para centavos
      salePrice: Math.round(formData.salePrice * 100),
      stock: formData.stock,
      minStock: formData.minStock,
    };

    if (produtoEditando) {
      updateMutation.mutate({ id: produtoEditando, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (produto: any) => {
    setProdutoEditando(produto.id);
    setFormData({
      name: produto.name,
      sku: produto.sku || '',
      category: produto.category || '',
      costPrice: produto.costPrice / 100, // Converter de centavos
      salePrice: produto.salePrice / 100,
      stock: produto.stock,
      minStock: produto.minStock,
    });
    setModalEditar(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteMutation.mutate({ id });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      costPrice: 0,
      salePrice: 0,
      stock: 0,
      minStock: 10,
    });
    setProdutoEditando(null);
  };

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    if (!busca) return true;
    const searchLower = busca.toLowerCase();
    return (
      produto.name.toLowerCase().includes(searchLower) ||
      produto.sku?.toLowerCase().includes(searchLower)
    );
  });

  // Estatísticas
  const stats = {
    total: produtos.length,
    disponiveis: produtos.filter(p => p.stock > 10).length,
    estoqueBaixo: produtos.filter(p => p.stock > 0 && p.stock <= 10).length,
    semEstoque: produtos.filter(p => p.stock === 0).length,
    valorTotal: produtos.reduce((acc, p) => acc + (p.salePrice * p.stock), 0) / 100,
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gestão de catálogo de produtos</p>
        </div>
        <Button onClick={() => setModalAdicionar(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Produto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">{stats.disponiveis}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.estoqueBaixo}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sem Estoque</p>
                <p className="text-2xl font-bold text-red-600">{stats.semEstoque}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {(stats.valorTotal / 1000).toFixed(1)}k
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou SKU..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos ({produtosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">SKU</th>
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-right p-2">Custo</th>
                  <th className="text-right p-2">Preço</th>
                  <th className="text-center p-2">Estoque</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8 text-muted-foreground">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                ) : (
                  produtosFiltrados.map((produto) => {
                    const estoque = produto.stock;
                    const status = estoque > 10 ? 'Disponível' : estoque > 0 ? 'Estoque Baixo' : 'Sem Estoque';
                    const statusColor = estoque > 10 ? 'bg-green-100 text-green-800' : estoque > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';

                    return (
                      <tr key={produto.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-mono text-sm">{produto.sku}</td>
                        <td className="p-2">{produto.name}</td>
                        <td className="p-2 text-sm text-muted-foreground">{produto.category}</td>
                        <td className="p-2 text-right">R$ {(produto.costPrice / 100).toFixed(2)}</td>
                        <td className="p-2 text-right font-semibold">R$ {(produto.salePrice / 100).toFixed(2)}</td>
                        <td className="p-2 text-center">{produto.stock}</td>
                        <td className="p-2 text-center">
                          <Badge className={statusColor}>{status}</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(produto)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(produto.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
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

      {/* Modal Adicionar/Editar */}
      <Dialog open={modalAdicionar || modalEditar} onOpenChange={(open) => {
        if (!open) {
          setModalAdicionar(false);
          setModalEditar(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{produtoEditando ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do produto
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome do produto"
              />
            </div>

            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SKU-00001"
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Eletrônicos"
              />
            </div>

            <div>
              <Label htmlFor="costPrice">Custo (R$)</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="salePrice">Preço de Venda (R$) *</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="stock">Estoque</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="minStock">Estoque Mínimo</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                placeholder="10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setModalAdicionar(false);
              setModalEditar(false);
              resetForm();
            }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
