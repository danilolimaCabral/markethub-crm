import { useState, useEffect } from 'react';
import { Clock, Zap, CreditCard, X } from 'lucide-react';
import { Button } from './ui/button';
import { useLocation } from 'wouter';
import { Card } from './ui/card';

export default function BannerTesteTemporario() {
  const [, setLocation] = useLocation();
  const [mostrar, setMostrar] = useState(false);
  const [tempoRestante, setTempoRestante] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  useEffect(() => {
    // Verificar se é conta temporária
    const userStr = localStorage.getItem('markethub_user');
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      if (user.temporary && user.expiresAt) {
        setMostrar(true);
        setExpiresAt(new Date(user.expiresAt));
      }
    } catch (error) {
      console.error('Erro ao verificar conta temporária:', error);
    }
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const agora = new Date();
      const diff = expiresAt.getTime() - agora.getTime();

      if (diff <= 0) {
        setTempoRestante('Expirado');
        // Redirecionar para landing e limpar dados
        setTimeout(() => {
          localStorage.clear();
          setLocation('/');
        }, 3000);
        return;
      }

      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);

      setTempoRestante(`${horas}h ${minutos}m ${segundos}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, setLocation]);

  if (!mostrar) return null;

  return (
    <Card className="fixed top-4 right-4 z-50 max-w-md shadow-2xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 animate-in slide-in-from-top">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Ícone */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Teste Gratuito
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setMostrar(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-700">
              Você está usando uma conta de teste temporária
            </p>

            {/* Tempo restante */}
            <div className="bg-white rounded-lg p-3 border border-yellow-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">
                  Tempo restante:
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {tempoRestante}
                </span>
              </div>
            </div>

            {/* Botão de conversão */}
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={() => setLocation('/cadastro')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Converter em Conta Real
            </Button>

            <p className="text-xs text-gray-500 text-center">
              14 dias grátis + acesso completo permanente
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
