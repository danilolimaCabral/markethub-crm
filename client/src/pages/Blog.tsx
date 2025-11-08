import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useLocation } from 'wouter';
import { blogPosts, categories } from '@/data/blogPosts';

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrar posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Post em destaque (mais recente)
  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation('/')}>
              <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  MarketHub CRM
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5">
                  Venda mais, lucre mais
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setLocation('/')}>
                Voltar ao Site
              </Button>
              <Button onClick={() => setLocation('/cadastro')}>
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-5xl font-bold">Blog MarketHub</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Dicas, estratégias e guias completos para vender mais e lucrar mais em marketplaces
          </p>
        </div>

        {/* Busca e Filtros */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            {Object.entries(categories).map(([key, cat]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Post em Destaque */}
        {!searchTerm && !selectedCategory && (
          <Card 
            className="max-w-5xl mx-auto mb-16 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => setLocation(`/blog/${featuredPost.slug}`)}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div 
                className="h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-purple-600 text-white">
                  ⭐ Artigo em Destaque
                </Badge>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} min
                  </div>
                </div>
                <Button className="w-fit">
                  Ler Artigo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Lista de Artigos */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {searchTerm || selectedCategory ? 'Resultados' : 'Todos os Artigos'}
            <span className="text-muted-foreground ml-2">({filteredPosts.length})</span>
          </h2>

          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado. Tente outro termo de busca.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={categories[post.category].color}>
                        {categories[post.category].name}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-purple-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.author.avatar}</span>
                        <span>{post.author.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para aplicar essas estratégias?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Teste o MarketHub CRM grátis por 14 dias e veja seus lucros aumentarem
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
              onClick={() => setLocation('/cadastro')}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 MarketHub CRM. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
