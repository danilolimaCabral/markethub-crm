import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle2, XCircle, Loader2, Info } from 'lucide-react';
import { toast } from 'sonner';
import CRMLayout from '@/components/CRMLayout';

export default function ConfiguracaoML() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [testando, setTestando] = useState(false);
  const [conexaoValida, setConexaoValida] = useState<boolean | null>(null);
  const [dadosUsuario, setDadosUsuario] = useState<any>(null);

  const handleTestarConexao = async () => {
    if (!accessToken) {
      toast.error('Digite o Access Token');
      return;
    }

    setTestando(true);
    setConexaoValida(null);

    try {
      // Testar token fazendo requisição para API do ML
      const response = await fetch('https://api.mercadolibre.com/users/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setDadosUsuario(userData);
        setConexaoValida(true);
        toast.success(`Conexão válida! Bem-vindo, ${userData.nickname}`);
      } else {
        setConexaoValida(false);
        toast.error('Token inválido ou expirado');
      }
    } catch (error) {
      setConexaoValida(false);
      toast.error('Erro ao testar conexão');
    } finally {
      setTestando(false);
    }
  };

  const handleSalvar = () => {
    if (!conexaoValida) {
      toast.error('Teste a conexão antes de salvar');
      return;
    }

    // Salvar tokens no localStorage (em produção, salvar no banco)
    const config = {
      accessToken,
      refreshToken,
      userId: dadosUsuario?.id,
      nickname: dadosUsuario?.nickname,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('markethub_ml_config', JSON.stringify(config));
    toast.success('Configuração salva com sucesso!');
  };

  return (
    <CRMLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integração com Mercado Livre</h1>
          <p className="text-muted-foreground mt-2">
            Configure sua API do Mercado Livre para sincronizar produtos e pedidos automaticamente
          </p>
        </div>

        {/* Tutorial */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Como obter seus tokens de API:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Acesse o <a href="https://developers.mercadolibre.com.br/apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portal de Desenvolvedores do ML</a></li>
                <li>Crie um novo aplicativo ou use um existente</li>
                <li>Copie o <strong>Access Token</strong> e <strong>Refresh Token</strong></li>
                <li>Cole os tokens abaixo e teste a conexão</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>

        {/* Formulário de Configuração */}
        <Card>
          <CardHeader>
            <CardTitle>Tokens de Autenticação</CardTitle>
            <CardDescription>
              Cole seus tokens do Mercado Livre para conectar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="accessToken">Access Token *</Label>
              <Input
                id="accessToken"
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="APP_USR-1234567890..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Token de acesso para fazer requisições à API
              </p>
            </div>

            <div>
              <Label htmlFor="refreshToken">Refresh Token (opcional)</Label>
              <Input
                id="refreshToken"
                type="password"
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                placeholder="TG-..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Token para renovar o access token automaticamente
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleTestarConexao}
                disabled={testando || !accessToken}
                variant="outline"
              >
                {testando && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Testar Conexão
              </Button>

              <Button
                onClick={handleSalvar}
                disabled={!conexaoValida}
              >
                Salvar Configuração
              </Button>
            </div>

            {/* Status da Conexão */}
            {conexaoValida === true && dadosUsuario && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      Conexão estabelecida com sucesso!
                    </p>
                    <div className="text-sm space-y-1">
                      <p><strong>Usuário:</strong> @{dadosUsuario.nickname}</p>
                      <p><strong>ID:</strong> {dadosUsuario.id}</p>
                      <p><strong>País:</strong> {dadosUsuario.country_id}</p>
                      <Badge variant="outline" className="mt-2">
                        {dadosUsuario.seller_reputation?.level_id || 'Vendedor'}
                      </Badge>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {conexaoValida === false && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-semibold">Falha na conexão</p>
                  <p className="text-sm mt-1">
                    Verifique se o token está correto e não expirou. Tokens do ML expiram após 6 horas.
                  </p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Documentação */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos Disponíveis</CardTitle>
            <CardDescription>
              O que você pode fazer com a integração do Mercado Livre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Sincronização Automática de Produtos</p>
                  <p className="text-sm text-muted-foreground">
                    Importa automaticamente seus produtos do ML com preços, estoque e fotos
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Gestão de Pedidos em Tempo Real</p>
                  <p className="text-sm text-muted-foreground">
                    Recebe notificações de novos pedidos e atualiza status automaticamente
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Cálculo Automático de Taxas</p>
                  <p className="text-sm text-muted-foreground">
                    Calcula comissão do ML, impostos e lucro líquido de cada venda
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Atualização de Estoque Sincronizada</p>
                  <p className="text-sm text-muted-foreground">
                    Quando vende no ML, o estoque é atualizado automaticamente no CRM
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Links Úteis */}
        <Card>
          <CardHeader>
            <CardTitle>Links Úteis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="https://developers.mercadolibre.com.br/pt_br/autenticacao-e-autorizacao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Documentação de Autenticação
            </a>
            <a
              href="https://developers.mercadolibre.com.br/pt_br/api-docs-pt-br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Documentação da API
            </a>
            <a
              href="https://developers.mercadolibre.com.br/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Gerenciar Aplicativos
            </a>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  );
}
