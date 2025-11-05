import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, LogIn } from 'lucide-react';

export default function Login() {
  const handleLogin = () => {
    // Redirecionar para página de autenticação do Lexos Hub
    const authUrl = 'https://lexosapi.b2clogin.com/LexosApi.onmicrosoft.com/oauth2/v2.0/authorize?' + new URLSearchParams({
      p: 'B2C_1_SUSI',
      client_id: '6b6c14ef-a27a-4467-8bb3-e0d7dc4b206f',
      nonce: 'defaultNonce',
      redirect_uri: window.location.origin + '/callback',
      scope: 'openid',
      response_type: 'code',
      prompt: 'login'
    }).toString();
    
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold">IA BRUNO CRM</CardTitle>
          <CardDescription className="text-base">
            Sistema Inteligente de Gestão de E-commerce
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={handleLogin}
            className="w-full h-12 text-lg gap-3"
            size="lg"
          >
            <LogIn className="w-5 h-5" />
            Entrar com Lexos Hub
          </Button>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Faça login com sua conta do Lexos Hub</p>
            <p className="text-xs">para acessar seus dados de e-commerce</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Autenticação segura via OAuth2
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Suas credenciais nunca são compartilhadas com este aplicativo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
