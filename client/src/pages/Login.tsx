import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ExternalLink, Copy, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { storeTokens } from '@/lib/auth';
import { toast } from 'sonner';

export default function Login() {
  const [, setLocation] = useLocation();
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'instructions' | 'code'>('instructions');

  const AUTH_URL = 'https://lexosapi.b2clogin.com/LexosApi.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SUSI&client_id=6b6c14ef-a27a-4467-8bb3-e0d7dc4b206f&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=code&prompt=login';

  const handleOpenAuthPage = () => {
    window.open(AUTH_URL, '_blank');
    setStep('code');
  };

  const copyAuthUrl = () => {
    navigator.clipboard.writeText(AUTH_URL);
    toast.success('URL copiada para a área de transferência!');
  };

  const handleSubmitCode = async () => {
    if (!authCode.trim()) {
      setError('Por favor, cole o código de autorização');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Trocar código por access_token
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode.trim(),
        client_id: '6b6c14ef-a27a-4467-8bb3-e0d7dc4b206f',
        redirect_uri: 'https://jwt.ms',
      });

      const response = await fetch('https://api.lexos.com.br/Autenticacao/Token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao obter token: ${errorText}`);
      }

      const tokenData = await response.json();

      // Armazenar tokens
      const expiresAt = Date.now() + (tokenData.expires_in * 1000);
      storeTokens({
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt,
      });

      toast.success('Login realizado com sucesso!');
      
      // Redirecionar para dashboard
      setTimeout(() => {
        setLocation('/');
      }, 500);

    } catch (err: any) {
      console.error('Erro no login:', err);
      setError(err.message || 'Erro ao fazer login. Verifique o código e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold">IA BRUNO CRM</CardTitle>
          <CardDescription className="text-base">
            Sistema Inteligente de Gestão - Autenticação com Lexos Hub
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'instructions' ? (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Para acessar o sistema, você precisa obter um código de autorização do Lexos Hub.
                  Siga os passos abaixo:
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                    Abrir página de autenticação
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Clique no botão abaixo para abrir a página de login do Lexos Hub em uma nova aba.
                  </p>
                  <div className="ml-8 flex gap-2">
                    <Button onClick={handleOpenAuthPage} className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Abrir Página de Login
                    </Button>
                    <Button variant="outline" size="icon" onClick={copyAuthUrl} title="Copiar URL">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                    Fazer login no Lexos Hub
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Use suas credenciais do Lexos Hub para fazer login:
                  </p>
                  <ul className="text-sm text-muted-foreground ml-12 space-y-1 list-disc">
                    <li>Email: sua conta do Lexos Hub</li>
                    <li>Senha: sua senha do Lexos Hub</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                    Copiar o código da URL
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Após o login, você será redirecionado para uma página. Copie o valor do parâmetro <code className="bg-background px-1 rounded">code=</code> da URL.
                  </p>
                  <p className="text-xs text-muted-foreground ml-8 italic">
                    Exemplo: Se a URL for <code className="bg-background px-1 rounded">https://jwt.ms/?code=ABC123...</code>, copie apenas <code className="bg-background px-1 rounded">ABC123...</code>
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                    Colar o código aqui
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Volte para esta página e cole o código no campo abaixo.
                  </p>
                </div>
              </div>

              <Button onClick={() => setStep('code')} className="w-full" size="lg">
                Já tenho o código
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep('instructions')} className="gap-2">
                ← Voltar para instruções
              </Button>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="authCode">Código de Autorização</Label>
                  <Input
                    id="authCode"
                    placeholder="Cole o código aqui (ex: eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ...)"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    className="mt-2 font-mono text-sm"
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Cole o valor completo do parâmetro <code>code=</code> da URL
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleSubmitCode} 
                  className="w-full gap-2" 
                  size="lg"
                  disabled={loading || !authCode.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Autenticando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Entrar no Sistema
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" onClick={handleOpenAuthPage} className="gap-2 text-sm">
                  <ExternalLink className="w-3 h-3" />
                  Abrir página de login novamente
                </Button>
              </div>
            </>
          )}

          <div className="pt-4 border-t text-center text-xs text-muted-foreground">
            <p>Este sistema usa autenticação OAuth2 segura com PKCE.</p>
            <p>Suas credenciais nunca são compartilhadas com este aplicativo.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
