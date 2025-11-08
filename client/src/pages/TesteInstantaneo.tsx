import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, Zap, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function TesteInstantaneo() {
  const [, setLocation] = useLocation();
  const [criando, setCriando] = useState(true);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    criarContaTemporaria();
  }, []);

  const criarContaTemporaria = async () => {
    try {
      // Simular progresso
      const etapas = [
        { texto: 'Criando ambiente de teste...', delay: 800 },
        { texto: 'Configurando banco de dados...', delay: 600 },
        { texto: 'Importando dados de exemplo...', delay: 700 },
        { texto: 'Ativando funcionalidades...', delay: 500 },
        { texto: 'Pronto! Redirecionando...', delay: 400 },
      ];

      for (let i = 0; i < etapas.length; i++) {
        setProgresso(((i + 1) / etapas.length) * 100);
        toast.info(etapas[i].texto, { duration: etapas[i].delay });
        await new Promise(resolve => setTimeout(resolve, etapas[i].delay));
      }

      // Criar conta temporária
      const userId = `temp_${Date.now()}`;
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 48); // 48 horas

      const contaTemporaria = {
        id: userId,
        nome: 'Usuário Teste',
        email: `teste_${Date.now()}@temp.markethubcrm.com.br`,
        role: 'admin',
        temporary: true,
        expiresAt: expiresAt.toISOString(),
        criadoEm: new Date().toISOString(),
      };

      localStorage.setItem('markethub_user', JSON.stringify(contaTemporaria));

      // Criar tokens de autenticação
      const authTokens = {
        accessToken: `temp_token_${userId}`,
        expiresAt: expiresAt.getTime(),
      };
      localStorage.setItem('auth_tokens', JSON.stringify(authTokens));

      // Criar tenant temporário
      const tenantTemporario = {
        id: `tenant_temp_${Date.now()}`,
        nomeEmpresa: 'Empresa Teste',
        plano: 'professional',
        email: contaTemporaria.email,
        telefone: '(11) 99999-9999',
        status: 'trial_24h',
        temporary: true,
        criadoEm: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      };

      localStorage.setItem('markethub_tenant', JSON.stringify(tenantTemporario));

      // Criar dados de exemplo
      criarDadosExemplo();

      toast.success('Ambiente de teste criado! 🎉', {
        description: 'Você tem 48 horas para explorar todas as funcionalidades',
      });

      // Redirecionar para dashboard
      setTimeout(() => {
        setLocation('/dashboard');
      }, 1000);

    } catch (error) {
      toast.error('Erro ao criar ambiente de teste');
      setTimeout(() => setLocation('/'), 2000);
    }
  };

  const criarDadosExemplo = () => {
    // Produtos de exemplo
    const produtosExemplo = [
      {
        id: '1',
        nome: 'Camiseta Básica',
        sku: 'CAM001',
        custo: 25.00,
        preco: 89.90,
        estoque: 50,
        categoria: 'Vestuário',
        marketplace: 'Mercado Livre',
      },
      {
        id: '2',
        nome: 'Tênis Esportivo',
        sku: 'TEN001',
        custo: 80.00,
        preco: 249.90,
        estoque: 30,
        categoria: 'Calçados',
        marketplace: 'Mercado Livre',
      },
      {
        id: '3',
        nome: 'Mochila Executiva',
        sku: 'MOC001',
        custo: 45.00,
        preco: 159.90,
        estoque: 20,
        categoria: 'Acessórios',
        marketplace: 'Amazon',
      },
    ];

    localStorage.setItem('markethub_produtos', JSON.stringify(produtosExemplo));

    // Pedidos de exemplo
    const pedidosExemplo = [
      {
        id: 'PED001',
        cliente: 'João Silva',
        data: new Date().toISOString(),
        status: 'pago',
        total: 89.90,
        marketplace: 'Mercado Livre',
        items: [{ produtoId: '1', quantidade: 1, preco: 89.90 }],
      },
      {
        id: 'PED002',
        cliente: 'Maria Santos',
        data: new Date(Date.now() - 86400000).toISOString(),
        status: 'enviado',
        total: 249.90,
        marketplace: 'Mercado Livre',
        items: [{ produtoId: '2', quantidade: 1, preco: 249.90 }],
      },
    ];

    localStorage.setItem('markethub_pedidos', JSON.stringify(pedidosExemplo));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Ícone animado */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                {progresso === 100 && (
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Título */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Criando Seu Ambiente de Teste
              </h2>
              <p className="text-gray-600">
                Aguarde enquanto preparamos tudo para você...
              </p>
            </div>

            {/* Barra de progresso */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">{Math.round(progresso)}% concluído</p>
            </div>

            {/* Features */}
            <div className="bg-blue-50 rounded-lg p-4 text-left space-y-2">
              <p className="text-sm font-semibold text-blue-900 mb-3">
                ✨ O que você vai testar:
              </p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Calculadora de taxas do Mercado Livre</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Gestão completa de produtos e pedidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Análise financeira com CMV e DRE</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Inteligência de mercado e precificação</span>
                </li>
              </ul>
            </div>

            {/* Loader */}
            {criando && (
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
