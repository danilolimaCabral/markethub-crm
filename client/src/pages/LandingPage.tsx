import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Calculator, TrendingUp, Bell, Shield, Zap, Users, BarChart3, ArrowRight, Star } from 'lucide-react';
import { useLocation } from 'wouter';
import ChatbotIA from '@/components/ChatbotIA';

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Chatbot IA */}
      <ChatbotIA />
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MarketHub CRM
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#funcionalidades" className="text-sm font-medium hover:text-purple-600 transition">Funcionalidades</a>
            <a href="#precos" className="text-sm font-medium hover:text-purple-600 transition">Preços</a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-purple-600 transition">Depoimentos</a>
            <a href="#faq" className="text-sm font-medium hover:text-purple-600 transition">FAQ</a>
            <Button variant="outline" size="sm" onClick={() => setLocation('/login')}>
              Área do Cliente
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600" onClick={() => setLocation('/cadastro')}>
              Começar Grátis
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              🚀 Especializado em Marketplaces
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Venda Mais no{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mercado Livre
              </span>{' '}
              com Inteligência
            </h1>
            
            <p className="text-xl text-muted-foreground">
              O único CRM que calcula automaticamente <strong>todas as taxas do Mercado Livre</strong>, 
              gerencia seu estoque e mostra seu <strong>lucro líquido real</strong>. 
              Pare de perder dinheiro sem saber.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg px-8"
                onClick={() => setLocation('/cadastro')}
              >
                Testar 14 Dias Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Ver Demonstração
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">Cancele quando quiser</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
            <Card className="relative border-2 border-purple-200 dark:border-purple-800 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  Calculadora de Taxas ML
                </CardTitle>
                <CardDescription>Veja quanto você realmente lucra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço de Venda</p>
                    <p className="text-2xl font-bold">R$ 89,90</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Custo</p>
                    <p className="text-2xl font-bold">R$ 45,90</p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comissão ML (13%)</span>
                    <span className="text-red-600 font-semibold">-R$ 11,69</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ICMS Goiás (19%)</span>
                    <span className="text-red-600 font-semibold">-R$ 17,08</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Simples Nacional (6,5%)</span>
                    <span className="text-red-600 font-semibold">-R$ 5,84</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa Pix (0,99%)</span>
                    <span className="text-red-600 font-semibold">-R$ 0,89</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Lucro Líquido Real</span>
                    <span className="text-3xl font-bold text-green-600">R$ 8,50</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Margem: 9,45%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white dark:bg-gray-800 py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-purple-600">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Vendedores Ativos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">R$ 2M+</p>
              <p className="text-sm text-muted-foreground mt-1">Economizados em Taxas</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Satisfação</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">4.9⭐</p>
              <p className="text-sm text-muted-foreground mt-1">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema vs Solução */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 mb-4">
            ⚠️ Você está perdendo dinheiro
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sabe quanto <span className="text-red-600">realmente</span> está lucrando?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A maioria dos vendedores de marketplace não calcula corretamente suas taxas e 
            acaba vendendo com prejuízo sem perceber.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600">❌ Sem o MarketHub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Calcula taxas manualmente em planilhas</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Esquece de considerar ICMS do estado</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Não sabe margem de contribuição real</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Vende produto sem estoque</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Perde tempo com tarefas manuais</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-600">✅ Com o MarketHub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Calcula todas as taxas automaticamente</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Considera ICMS do seu estado (17-21%)</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Mostra lucro líquido após impostos</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Pausa anúncios quando zera estoque</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Economiza 10h/semana em gestão</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Funcionalidades que nenhum outro CRM ou ERP oferece para vendedores de marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Calculadora Inteligente</CardTitle>
                <CardDescription>
                  Calcula automaticamente comissões ML, ICMS por estado, impostos do regime tributário e mostra lucro líquido real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Alertas Automáticos</CardTitle>
                <CardDescription>
                  Receba notificações quando estoque baixar, pausa anúncios automaticamente quando zerar e reativa ao repor
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Análise Financeira</CardTitle>
                <CardDescription>
                  CMV, margem de contribuição, OPEX, custos fixos e variáveis. Saiba exatamente onde está seu dinheiro
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Relatórios Avançados</CardTitle>
                <CardDescription>
                  Lucratividade por produto, análise de vendas, produtos mais rentáveis e métricas de performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-pink-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Segurança 2FA</CardTitle>
                <CardDescription>
                  Autenticação de dois fatores nativa, backup codes e logs de auditoria completos para proteger seus dados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indigo-300 transition hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>
                  Conecte Mercado Livre, Amazon, Shopee e ERPs. Sincronização automática de produtos e pedidos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Pronto para aumentar seus lucros?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a centenas de vendedores que já estão economizando milhares em taxas
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8"
              onClick={() => setLocation('/cadastro')}
            >
              Começar Trial Gratuito de 14 Dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm mt-4 opacity-75">Sem cartão de crédito • Cancele quando quiser</p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MarketHub CRM</span>
              </div>
              <p className="text-sm text-gray-400">
                O CRM especializado em vendedores de marketplace
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a></li>
                <li><a href="#precos" className="hover:text-white transition">Preços</a></li>
                <li><a href="#" className="hover:text-white transition">Integrações</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition">Base de Conhecimento</a></li>
                <li><a href="#" className="hover:text-white transition">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
                <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 MarketHub CRM. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
