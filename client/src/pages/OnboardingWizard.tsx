import { useState, createElement } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Building2, 
  ShoppingBag, 
  Package, 
  Bell, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const ETAPAS = [
  {
    id: 1,
    titulo: 'Dados Fiscais',
    descricao: 'Configure suas informações fiscais e tributárias',
    icon: Building2,
  },
  {
    id: 2,
    titulo: 'Conectar Mercado Livre',
    descricao: 'Integre sua conta do Mercado Livre',
    icon: ShoppingBag,
  },
  {
    id: 3,
    titulo: 'Importar Produtos',
    descricao: 'Importe seus produtos automaticamente',
    icon: Package,
  },
  {
    id: 4,
    titulo: 'Configurar Alertas',
    descricao: 'Defina notificações e alertas',
    icon: Bell,
  },
  {
    id: 5,
    titulo: 'Tour pelo Sistema',
    descricao: 'Conheça todas as funcionalidades',
    icon: Sparkles,
  },
];

export default function OnboardingWizard() {
  const [, setLocation] = useLocation();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form data
  const [dadosFiscais, setDadosFiscais] = useState({
    cnpj: '',
    razaoSocial: '',
    estado: 'SP',
    regimeTributario: 'simples' as const,
  });

  const [configuracoes, setConfiguracoes] = useState({
    alertaEstoqueBaixo: true,
    limiteEstoque: 10,
    notificacaoEmail: true,
    notificacaoPedido: true,
  });

  // Mutations
  const updateProfileMutation = trpc.user.updateProfile.useMutation();
  const updateSettingsMutation = trpc.settings.update.useMutation();

  const progresso = (etapaAtual / ETAPAS.length) * 100;

  const handleProximaEtapa = async () => {
    setLoading(true);

    try {
      // Salvar dados da etapa atual
      if (etapaAtual === 1) {
        // Salvar dados fiscais
        await updateProfileMutation.mutateAsync({
          company: dadosFiscais.razaoSocial,
          cnpj: dadosFiscais.cnpj,
          taxRegime: dadosFiscais.regimeTributario,
        });

        await updateSettingsMutation.mutateAsync({
          state: dadosFiscais.estado,
        });

        toast.success('Dados fiscais salvos com sucesso!');
      }

      if (etapaAtual === 2) {
        // Redirecionar para OAuth do Mercado Livre
        toast.info('Redirecionando para o Mercado Livre...');
        // window.location.href = '/api/ml/auth';
        // Por enquanto, apenas avançar
      }

      if (etapaAtual === 3) {
        // Importar produtos (simulado)
        toast.success('Produtos importados com sucesso!');
      }

      if (etapaAtual === 4) {
        // Salvar configurações
        await updateSettingsMutation.mutateAsync({
          lowStockAlert: configuracoes.alertaEstoqueBaixo,
          lowStockThreshold: configuracoes.limiteEstoque,
          emailNotifications: configuracoes.notificacaoEmail,
        });

        toast.success('Configurações salvas!');
      }

      if (etapaAtual === 5) {
        // Finalizar onboarding
        toast.success('Onboarding concluído! Bem-vindo ao MarketHub CRM! 🎉');
        setLocation('/');
        return;
      }

      setEtapaAtual(etapaAtual + 1);
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handlePularEtapa = () => {
    if (etapaAtual < 5) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      setLocation('/');
    }
  };

  const renderEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={dadosFiscais.cnpj}
                onChange={(e) => setDadosFiscais({ ...dadosFiscais, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div>
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={dadosFiscais.razaoSocial}
                onChange={(e) => setDadosFiscais({ ...dadosFiscais, razaoSocial: e.target.value })}
                placeholder="Minha Empresa LTDA"
              />
            </div>

            <div>
              <Label htmlFor="estado">Estado *</Label>
              <select
                id="estado"
                className="w-full p-2 border rounded"
                value={dadosFiscais.estado}
                onChange={(e) => setDadosFiscais({ ...dadosFiscais, estado: e.target.value })}
              >
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="BA">Bahia</option>
                <option value="PE">Pernambuco</option>
                <option value="CE">Ceará</option>
                <option value="GO">Goiás</option>
              </select>
            </div>

            <div>
              <Label htmlFor="regimeTributario">Regime Tributário *</Label>
              <select
                id="regimeTributario"
                className="w-full p-2 border rounded"
                value={dadosFiscais.regimeTributario}
                onChange={(e) => setDadosFiscais({ ...dadosFiscais, regimeTributario: e.target.value as any })}
              >
                <option value="simples">Simples Nacional</option>
                <option value="lucro_presumido">Lucro Presumido</option>
                <option value="lucro_real">Lucro Real</option>
              </select>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Dica da IA:</strong> O Simples Nacional é o regime mais comum para pequenas empresas.
                Ele simplifica o pagamento de impostos e geralmente resulta em menor carga tributária.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Conectar Mercado Livre</h3>
              <p className="text-muted-foreground mb-6">
                Conecte sua conta do Mercado Livre para importar produtos e pedidos automaticamente
              </p>

              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Sincronização automática de produtos</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Importação de pedidos em tempo real</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Cálculo automático de taxas</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Importante:</strong> Você será redirecionado para o Mercado Livre para autorizar o acesso.
                Não se preocupe, seus dados estão seguros e você pode revogar o acesso a qualquer momento.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Package className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Importar Produtos</h3>
              <p className="text-muted-foreground mb-6">
                Vamos importar seus produtos do Mercado Livre automaticamente
              </p>

              <div className="max-w-md mx-auto">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">248</div>
                  <p className="text-sm text-muted-foreground">produtos encontrados</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eletrônicos</span>
                    <span className="font-semibold">87 produtos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Moda</span>
                    <span className="font-semibold">64 produtos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Casa e Jardim</span>
                    <span className="font-semibold">52 produtos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Outros</span>
                    <span className="font-semibold">45 produtos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Dica da IA:</strong> Após importar, você poderá editar custos, margens e configurar
                alertas de estoque para cada produto individualmente.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={configuracoes.alertaEstoqueBaixo}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, alertaEstoqueBaixo: e.target.checked })}
                />
                Alertas de Estoque Baixo
              </Label>
              <p className="text-sm text-muted-foreground ml-6">
                Receba notificações quando o estoque estiver abaixo do limite
              </p>
            </div>

            {configuracoes.alertaEstoqueBaixo && (
              <div className="ml-6">
                <Label htmlFor="limiteEstoque">Limite de Estoque</Label>
                <Input
                  id="limiteEstoque"
                  type="number"
                  value={configuracoes.limiteEstoque}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, limiteEstoque: parseInt(e.target.value) })}
                />
              </div>
            )}

            <div>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={configuracoes.notificacaoEmail}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, notificacaoEmail: e.target.checked })}
                />
                Notificações por Email
              </Label>
              <p className="text-sm text-muted-foreground ml-6">
                Receba resumos diários e alertas importantes por email
              </p>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={configuracoes.notificacaoPedido}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, notificacaoPedido: e.target.checked })}
                />
                Notificações de Novos Pedidos
              </Label>
              <p className="text-sm text-muted-foreground ml-6">
                Seja notificado imediatamente quando receber um novo pedido
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ <strong>Recomendação da IA:</strong> Ative todas as notificações para não perder nenhuma venda
                e manter seu estoque sempre atualizado.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Tudo Pronto! 🎉</h3>
              <p className="text-muted-foreground mb-6">
                Seu MarketHub CRM está configurado e pronto para usar
              </p>

              <div className="max-w-md mx-auto space-y-3">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-left">
                  <h4 className="font-semibold mb-2">📊 Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualize métricas em tempo real: vendas, lucro, estoque e muito mais
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-left">
                  <h4 className="font-semibold mb-2">🧮 Calculadora de Taxas</h4>
                  <p className="text-sm text-muted-foreground">
                    Calcule automaticamente todas as taxas do Mercado Livre antes de anunciar
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg text-left">
                  <h4 className="font-semibold mb-2">💰 Análise Financeira</h4>
                  <p className="text-sm text-muted-foreground">
                    CMV, DRE, fluxo de caixa e relatórios completos para tomar decisões inteligentes
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-lg text-left">
                  <h4 className="font-semibold mb-2">🤖 Assistente IA</h4>
                  <p className="text-sm text-muted-foreground">
                    Tire dúvidas e receba ajuda a qualquer momento através do chat
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Próximos passos:</strong> Explore o sistema, cadastre seus custos reais nos produtos
                e comece a tomar decisões baseadas em dados!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao MarketHub CRM! 🚀</h1>
          <p className="text-muted-foreground">
            Vamos configurar seu sistema em apenas 5 minutos
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Etapa {etapaAtual} de {ETAPAS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progresso)}% concluído
            </span>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>

        {/* Steps */}
        <div className="flex justify-between mb-8">
          {ETAPAS.map((etapa) => {
            const Icon = etapa.icon;
            const concluida = etapa.id < etapaAtual;
            const atual = etapa.id === etapaAtual;

            return (
              <div key={etapa.id} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    concluida
                      ? 'bg-green-500 text-white'
                      : atual
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {concluida ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className="text-xs text-center max-w-[80px] hidden md:block">
                  {etapa.titulo}
                </span>
              </div>
            );
          })}
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {createElement(ETAPAS[etapaAtual - 1].icon, { className: 'w-6 h-6' })}
              {ETAPAS[etapaAtual - 1].titulo}
            </CardTitle>
            <CardDescription>{ETAPAS[etapaAtual - 1].descricao}</CardDescription>
          </CardHeader>
          <CardContent>{renderEtapa()}</CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleVoltarEtapa}
            disabled={etapaAtual === 1 || loading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={handlePularEtapa} disabled={loading}>
              Pular
            </Button>
            <Button onClick={handleProximaEtapa} disabled={loading}>
              {loading ? 'Salvando...' : etapaAtual === 5 ? 'Finalizar' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
