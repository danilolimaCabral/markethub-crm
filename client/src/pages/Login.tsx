import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { Brain, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    // Simular delay de autenticação
    setTimeout(() => {
      // Validar credenciais (admin/admin123)
      if (username === 'admin' && password === 'admin123') {
        // Salvar usuário no localStorage
        localStorage.setItem('ia_bruno_user', JSON.stringify({
          username: 'admin',
          name: 'Administrador',
          role: 'admin'
        }));
        
        toast.success('Login realizado com sucesso!');
        setLocation('/');
      } else {
        toast.error('Usuário ou senha incorretos');
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/50 overflow-hidden p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-75"></div>
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            IA BRUNO CRM
          </h1>
          <p className="text-center text-slate-400 text-sm mb-8">
            Entre com suas credenciais
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-slate-300 text-sm font-medium">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="seu_usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-800 focus:border-purple-500 transition-all h-12 rounded-xl"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-800 focus:border-purple-500 transition-all h-12 rounded-xl"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Não tem uma conta?{' '}
              <button
                onClick={() => toast.info('Funcionalidade de cadastro em breve')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          {/* Demo Credentials Box */}
          <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
            <p className="text-slate-400 text-xs mb-2">Credenciais de demonstração:</p>
            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">Usuário:</span> admin
            </p>
            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">Senha:</span> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
