import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Moon, Sun, RefreshCw, CheckCircle2, AlertCircle, Clock, Copy, Check, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [showRefreshToken, setShowRefreshToken] = useState(false);

  const accessTokenFull = "eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ...";
  const refreshTokenFull = "def50200abc123xyz789...";

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copiado!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/10">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Status da integração</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Status da Integração</CardTitle>
                  <CardDescription>Informações sobre sua conexão com o Lexos Hub</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Renovar Token
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold">Conectado</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Token Expira em</p>
                    <p className="font-semibold">45 minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Última Sincronização</p>
                    <p className="font-semibold">Há 2 minutos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Token</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-muted-foreground">Access Token:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm break-all">
                      {showAccessToken ? accessTokenFull : "eyJraWQi...***"}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setShowAccessToken(!showAccessToken)}
                      >
                        {showAccessToken ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyToClipboard(accessTokenFull, "Access Token")}
                      >
                        {copiedField === "Access Token" ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gerado em:</span>
                  <span>04/11/2025 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expira em:</span>
                  <span>04/11/2025 15:00</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-muted-foreground">Refresh Token:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm break-all">
                      {showRefreshToken ? refreshTokenFull : "def502...***"}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setShowRefreshToken(!showRefreshToken)}
                      >
                        {showRefreshToken ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyToClipboard(refreshTokenFull, "Refresh Token")}
                      >
                        {copiedField === "Refresh Token" ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/test")}>
                  Testar Conexão
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/setup")}>
                  Reconfigurar Credenciais
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/docs")}>
                  Ver Documentação
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
