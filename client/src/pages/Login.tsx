import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { initiateLogin } from '@/lib/auth';
import { LogIn, Shield } from 'lucide-react';

export default function Login() {
  const handleLogin = () => {
    initiateLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Lexos Hub - CRM</CardTitle>
          <CardDescription>
            Faça login com sua conta Lexos Hub para acessar o painel de gerenciamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Entrar com Lexos Hub
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Ao fazer login, você será redirecionado para</p>
            <p className="font-medium">accounts.lexos.com.br</p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Este sistema usa autenticação OAuth2 segura com PKCE.
              Suas credenciais nunca são compartilhadas com este aplicativo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
