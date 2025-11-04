import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Moon, Sun, Search, RefreshCw, Package, ShoppingCart, Store, Users, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function API() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pedidos");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Dados simulados - em produção viriam da API real
  const [pedidos, setPedidos] = useState([
    { id: "PED-001", cliente: "João Silva", valor: 450.00, status: "pendente", data: "04/11/2025", marketplace: "Mercado Livre" },
    { id: "PED-002", cliente: "Maria Santos", valor: 320.00, status: "enviado", data: "04/11/2025", marketplace: "Amazon" },
    { id: "PED-003", cliente: "Pedro Costa", valor: 180.00, status: "entregue", data: "03/11/2025", marketplace: "Shopee" },
  ]);

  const [produtos, setProdutos] = useState([
    { id: "PROD-001", nome: "Produto A", sku: "SKU-001", estoque: 50, preco: 149.90, status: "ativo" },
    { id: "PROD-002", nome: "Produto B", sku: "SKU-002", estoque: 3, preco: 89.90, status: "ativo" },
    { id: "PROD-003", nome: "Produto C", sku: "SKU-003", estoque: 0, preco: 199.90, status: "inativo" },
  ]);

  const [anuncios, setAnuncios] = useState([
    { id: "ANU-001", produto: "Produto A", marketplace: "Mercado Livre", preco: 149.90, status: "ativo", visualizacoes: 1234 },
    { id: "ANU-002", produto: "Produto B", marketplace: "Amazon", preco: 89.90, status: "ativo", visualizacoes: 987 },
    { id: "ANU-003", produto: "Produto C", marketplace: "Shopee", preco: 199.90, status: "pausado", visualizacoes: 0 },
  ]);

  const handleConsultarAPI = async () => {
    setLoading(true);
    toast.info("Consultando API do Lexos Hub...");
    
    // Simulação de chamada à API
    setTimeout(() => {
      setLoading(false);
      toast.success("Dados atualizados com sucesso!");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      enviado: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      entregue: "bg-green-500/10 text-green-500 border-green-500/20",
      ativo: "bg-green-500/10 text-green-500 border-green-500/20",
      inativo: "bg-red-500/10 text-red-500 border-red-500/20",
      pausado: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
    return colors[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/10">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Consultar API</h1>
              <p className="text-xs text-muted-foreground">Dados do Lexos Hub em tempo real</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Controles */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Buscar por ID, nome, cliente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="enviado">Enviado</SelectItem>
                      <SelectItem value="entregue">Entregue</SelectItem>
                      <SelectItem value="pausado">Pausado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleConsultarAPI} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Consultando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Atualizar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs com dados */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pedidos" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="produtos" className="gap-2">
                <Package className="w-4 h-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="anuncios" className="gap-2">
                <Store className="w-4 h-4" />
                Anúncios
              </TabsTrigger>
            </TabsList>

            {/* Tab Pedidos */}
            <TabsContent value="pedidos">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos</CardTitle>
                  <CardDescription>Lista de pedidos do Lexos Hub</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Marketplace</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pedidos.map((pedido) => (
                          <TableRow key={pedido.id}>
                            <TableCell className="font-mono text-sm">{pedido.id}</TableCell>
                            <TableCell>{pedido.cliente}</TableCell>
                            <TableCell>{pedido.marketplace}</TableCell>
                            <TableCell>R$ {pedido.valor.toFixed(2)}</TableCell>
                            <TableCell>{pedido.data}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(pedido.status)}`}>
                                {pedido.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Produtos */}
            <TabsContent value="produtos">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos</CardTitle>
                  <CardDescription>Catálogo de produtos e estoque</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Estoque</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {produtos.map((produto) => (
                          <TableRow key={produto.id}>
                            <TableCell className="font-mono text-sm">{produto.id}</TableCell>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell className="font-mono text-sm">{produto.sku}</TableCell>
                            <TableCell>
                              <span className={produto.estoque < 10 ? "text-red-500 font-semibold" : ""}>
                                {produto.estoque} un
                              </span>
                            </TableCell>
                            <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(produto.status)}`}>
                                {produto.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Anúncios */}
            <TabsContent value="anuncios">
              <Card>
                <CardHeader>
                  <CardTitle>Anúncios</CardTitle>
                  <CardDescription>Anúncios ativos nos marketplaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Marketplace</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Visualizações</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {anuncios.map((anuncio) => (
                          <TableRow key={anuncio.id}>
                            <TableCell className="font-mono text-sm">{anuncio.id}</TableCell>
                            <TableCell>{anuncio.produto}</TableCell>
                            <TableCell>{anuncio.marketplace}</TableCell>
                            <TableCell>R$ {anuncio.preco.toFixed(2)}</TableCell>
                            <TableCell>{anuncio.visualizacoes.toLocaleString()}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(anuncio.status)}`}>
                                {anuncio.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
