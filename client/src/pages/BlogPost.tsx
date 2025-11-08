import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Calendar, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { useLocation, useRoute } from 'wouter';
import { blogPosts, categories } from '@/data/blogPosts';
import { Streamdown } from 'streamdown';
import { toast } from 'sonner';

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/blog/:slug');
  
  // Buscar post pelo slug
  const post = blogPosts.find(p => p.slug === params?.slug);

  // Artigos relacionados (mesma categoria, exceto o atual)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  // Scroll to top ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  // Se não encontrar o post
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Artigo não encontrado</h2>
          <p className="text-muted-foreground mb-6">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={() => setLocation('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Button>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copiado!', {
        description: 'O link do artigo foi copiado para a área de transferência',
      });
    }
  };

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
              <Button variant="ghost" size="sm" onClick={() => setLocation('/blog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog
              </Button>
              <Button size="sm" onClick={() => setLocation('/cadastro')}>
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div 
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <Card className="p-8 md:p-12 mb-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={categories[post.category].color}>
                {categories[post.category].name}
              </Badge>
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{post.author.avatar}</span>
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">Autor</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min de leitura
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Article Body */}
          <Card className="p-8 md:p-12 mb-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Streamdown>{post.content}</Streamdown>
            </div>
          </Card>

          {/* CTA Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Gostou do conteúdo?
              </h3>
              <p className="text-white/90 mb-6">
                Teste o MarketHub CRM grátis por 14 dias e aplique essas estratégias no seu negócio
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setLocation('/cadastro')}
              >
                Começar Agora Grátis
              </Button>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">Artigos Relacionados</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={() => setLocation(`/blog/${relatedPost.slug}`)}
                  >
                    <div 
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${relatedPost.image})` }}
                    />
                    <CardContent className="p-4">
                      <Badge className={`${categories[relatedPost.category].color} mb-2`}>
                        {categories[relatedPost.category].name}
                      </Badge>
                      <h3 className="font-bold line-clamp-2 mb-2 hover:text-purple-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

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
