import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Edit, Eye } from "lucide-react";
import { useState } from "react";
import { REAL_CATEGORIES } from "@/data/real-data";

// Categorias reais do Lexos Hub
const categorias = REAL_CATEGORIES.map(cat => cat.name);

// Gerar 248 produtos baseados nas categorias reais
const produtos = Array.from({ length: 248 }, (_, i) => {
  const categoria = categorias[i % categorias.length];
  const preco = Math.floor(Math.random() * 500) + 50;
  const estoque = Math.floor(Math.random() * 100);
  const vendidos = Math.floor(Math.random() * 50);
  
  return {
    id: i + 1,
    sku: `SKU-${String(i + 1).padStart(5, '0')}`,
    nome: `${categoria} - Modelo ${i + 1}`,
    categoria: categoria,
    preco: preco,
    estoque: estoque,
    vendidos: vendidos,
    status: estoque > 10 ? 'Disponível' : estoque > 0 ? 'Estoque Baixo' : 'Sem Estoque',
    statusColor: estoque > 10 ? 'bg-green-100 text-green-800' : estoque > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800',
    StatusIcon: estoque > 10 ? CheckCircle : estoque > 0 ? AlertTriangle : AlertTriangle,
    imagem: `https://via.placeholder.com/150?text=${encodeURIComponent(categoria.substring(0, 10))}`,
  };
});

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = busca === '' || 
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.sku.toLowerCase().includes(busca.toLowerCase());
    
    const matchCategoria = filtroCategoria === 'todas' || produto.categoria === filtroCategoria;
    const matchStatus = filtroStatus === 'todos' || produto.status === filtroStatus;
    
    return matchBusca && matchCategoria && matchStatus;
  });

  // Estatísticas
  const stats = {
    total: produtos.length,
    disponiveis: produtos.filter(p => p.status === 'Disponível').length,
    estoqueBaixo: produtos.filter(p => p.status === 'Estoque Baixo').length,
    semEstoque: produtos.filter(p => p.status === 'Sem Estoque').length,
    valorTotal: produtos.reduce((acc, p) => acc + (p.preco * p.estoque), 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
        <p className="text-muted-foreground">Gestão de catálogo de produtos</p>
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
              <Package className="w-8 h-8 text-blue-600" />
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
                <p className="text-2xl font-bold text-purple-600">
                  R$ {(stats.valorTotal / 1000).toFixed(0)}k
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background"
              >
                <option value="todas">Todas Categorias</option>
                {categorias.slice(0, 10).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button
                variant={filtroStatus === 'todos' ? 'default' : 'outline'}
                onClick={() => setFiltroStatus('todos')}
              >
                Todos
              </Button>
              <Button
                variant={filtroStatus === 'Disponível' ? 'default' : 'outline'}
                onClick={() => setFiltroStatus('Disponível')}
              >
                Disponíveis
              </Button>
              <Button
                variant={filtroStatus === 'Estoque Baixo' ? 'default' : 'outline'}
                onClick={() => setFiltroStatus('Estoque Baixo')}
              >
                Estoque Baixo
              </Button>
              <Button
                variant={filtroStatus === 'Sem Estoque' ? 'default' : 'outline'}
                onClick={() => setFiltroStatus('Sem Estoque')}
              >
                Sem Estoque
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Produtos</CardTitle>
          <CardDescription>
            {produtosFiltrados.length} produto(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabela Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">SKU</th>
                  <th className="text-left p-3 font-semibold">Produto</th>
                  <th className="text-left p-3 font-semibold">Categoria</th>
                  <th className="text-left p-3 font-semibold">Preço</th>
                  <th className="text-left p-3 font-semibold">Estoque</th>
                  <th className="text-left p-3 font-semibold">Vendidos</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.slice(0, 50).map((produto) => {
                  const StatusIcon = produto.StatusIcon;
                  return (
                    <tr key={produto.id} className="border-b hover:bg-accent">
                      <td className="p-3 font-mono text-sm">{produto.sku}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={produto.imagem} 
                            alt={produto.nome}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span className="font-medium">{produto.nome}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{produto.categoria}</td>
                      <td className="p-3 font-bold text-green-600">
                        R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3">
                        <span className={`font-bold ${produto.estoque > 10 ? 'text-green-600' : produto.estoque > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {produto.estoque} un
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">{produto.vendidos} un</td>
                      <td className="p-3">
                        <Badge className={produto.statusColor}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {produto.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards Mobile */}
          <div className="md:hidden space-y-3">
            {produtosFiltrados.slice(0, 50).map((produto) => {
              const StatusIcon = produto.StatusIcon;
              return (
                <Card key={produto.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3 mb-3">
                      <img 
                        src={produto.imagem} 
                        alt={produto.nome}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-bold">{produto.nome}</p>
                        <p className="text-sm text-muted-foreground">{produto.sku}</p>
                        <Badge className={`${produto.statusColor} mt-1`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {produto.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Categoria:</span> {produto.categoria}</p>
                      <p><span className="text-muted-foreground">Preço:</span> <span className="font-bold text-green-600">R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                      <p><span className="text-muted-foreground">Estoque:</span> <span className={`font-bold ${produto.estoque > 10 ? 'text-green-600' : produto.estoque > 0 ? 'text-yellow-600' : 'text-red-600'}`}>{produto.estoque} un</span></p>
                      <p><span className="text-muted-foreground">Vendidos:</span> {produto.vendidos} un</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
