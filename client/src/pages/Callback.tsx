import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { storeTokens } from '@/lib/auth';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Callback() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    async function processCallback() {
      try {
        setStatus('processing');
        
        // Extrair código da URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (errorParam) {
          throw new Error(errorDescription || `Erro de autenticação: ${errorParam}`);
        }

        if (!code) {
          throw new Error('Código de autorização não encontrado na URL');
        }

        console.log('Código de autorização recebido, trocando por access_token...');

        // Trocar código por access_token
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: '6b6c14ef-a27a-4467-8bb3-e0d7dc4b206f',
          redirect_uri: window.location.origin + '/callback',
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
          console.error('Erro ao obter token:', errorText);
          throw new Error(`Falha ao obter token de acesso: ${response.status}`);
        }

        const tokenData = await response.json();
        console.log('Token obtido com sucesso!');

        // Armazenar tokens
        const expiresAt = Date.now() + (tokenData.expires_in * 1000);
        storeTokens({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt,
        });

        setStatus('success');

        // Redirecionar para dashboard após 1 segundo
        setTimeout(() => {
          setLocation('/');
        }, 1000);

      } catch (err) {
        console.error('Erro no callback OAuth:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao autenticar');
        setStatus('error');
      }
    }

    processCallback();
  }, [setLocation]);

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-2xl border-destructive">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl text-destructive">Erro na Autenticação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">{error}</p>
            <Button
              onClick={() => setLocation('/login')}
              className="w-full"
              variant="destructive"
            >
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl text-green-600 dark:text-green-400">Login Realizado!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Redirecionando para o dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
          <CardTitle className="text-2xl">Autenticando...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-muted-foreground space-y-2">
            <p>Processando login com Lexos Hub</p>
            <p className="text-sm">Aguarde enquanto validamos suas credenciais</p>
          </div>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
