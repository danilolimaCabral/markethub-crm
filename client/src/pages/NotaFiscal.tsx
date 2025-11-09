import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FileText, Download, Mail, X, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { focusNFeService } from '@/services/focusNFeService';

export default function NotaFiscal() {
  const [apiToken, setApiToken] = useState(focusNFeService.getApiToken());
  const [ambiente, setAmbiente] = useState<'producao' | 'homologacao'>(focusNFeService.getAmbiente());
  const [testando, setTestando] = useState(false);
  const [conexaoOK, setConexaoOK] = useState(false);

  // Configuração do emitente
  const [emitente, setEmitente] = useState({
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    logradouro: '',
    numero: '',
    bairro: '',
    municipio: '',
    uf: '',
    cep: '',
    telefone: '',
    inscricaoEstadual: '',
    regimeTributario: '1' // Simples Nacional
  });

  const handleSalvarToken = () => {
    if (!apiToken) {
      toast.error('Digite o token da API');
      return;
    }

    focusNFeService.setApiToken(apiToken);
    focusNFeService.setAmbiente(ambiente);
    toast.success('Token salvo com sucesso!');
  };

  const handleTestarConexao = async () => {
    if (!apiToken) {
      toast.error('Configure o token primeiro');
      return;
    }

    setTestando(true);
    try {
      const result = await focusNFeService.testConnection();
      
      if (result.success) {
        setConexaoOK(true);
        toast.success(result.message);
      } else {
        setConexaoOK(false);
        toast.error(result.message);
      }
    } catch (error) {
      setConexaoOK(false);
      toast.error(error instanceof Error ? error.message : 'Erro ao testar conexão');
    } finally {
      setTestando(false);
    }
  };

  const handleSalvarEmitente = () => {
    if (!emitente.cnpj || !emitente.razaoSocial) {
      toast.error('Preencha CNPJ e Razão Social');
      return;
    }

    localStorage.setItem('nfe_emitente', JSON.stringify(emitente));
    toast.success('Dados do emitente salvos!');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Nota Fiscal Eletrônica</h1>
            <p className="text-muted-foreground">Emissão automática de NF-e com Focus NFe</p>
          </div>
        </div>

        {/* Configuração da API */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Configuração da API Focus NFe</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="ambiente">Ambiente</Label>
              <select
                id="ambiente"
                value={ambiente}
                onChange={(e) => setAmbiente(e.target.value as 'producao' | 'homologacao')}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="homologacao">Homologação (Testes)</option>
                <option value="producao">Produção (Real)</option>
              </select>
              <p className="text-sm text-muted-foreground mt-1">
                Use homologação para testes. Mude para produção quando estiver pronto.
              </p>
            </div>

            <div>
              <Label htmlFor="apiToken">Token da API</Label>
              <Input
                id="apiToken"
                type="password"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                placeholder="Cole seu token da Focus NFe aqui"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Obtenha seu token em:{' '}
                <a
                  href="https://focusnfe.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  focusnfe.com.br
                </a>
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSalvarToken} className="flex-1">
                Salvar Token
              </Button>
              <Button
                onClick={handleTestarConexao}
                variant="outline"
                disabled={testando || !apiToken}
                className="flex-1"
              >
                {testando ? 'Testando...' : 'Testar Conexão'}
              </Button>
            </div>

            {conexaoOK && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-md">
                <CheckCircle className="w-5 h-5" />
                <span>Conexão OK! API configurada corretamente.</span>
              </div>
            )}
          </div>
        </Card>

        {/* Dados do Emitente */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Dados do Emitente</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={emitente.cnpj}
                onChange={(e) => setEmitente({ ...emitente, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div>
              <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
              <Input
                id="inscricaoEstadual"
                value={emitente.inscricaoEstadual}
                onChange={(e) => setEmitente({ ...emitente, inscricaoEstadual: e.target.value })}
                placeholder="000.000.000.000"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="razaoSocial">Razão Social *</Label>
              <Input
                id="razaoSocial"
                value={emitente.razaoSocial}
                onChange={(e) => setEmitente({ ...emitente, razaoSocial: e.target.value })}
                placeholder="Empresa LTDA"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
              <Input
                id="nomeFantasia"
                value={emitente.nomeFantasia}
                onChange={(e) => setEmitente({ ...emitente, nomeFantasia: e.target.value })}
                placeholder="Minha Loja"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="logradouro">Logradouro</Label>
              <Input
                id="logradouro"
                value={emitente.logradouro}
                onChange={(e) => setEmitente({ ...emitente, logradouro: e.target.value })}
                placeholder="Rua Exemplo"
              />
            </div>

            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                value={emitente.numero}
                onChange={(e) => setEmitente({ ...emitente, numero: e.target.value })}
                placeholder="123"
              />
            </div>

            <div>
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                value={emitente.bairro}
                onChange={(e) => setEmitente({ ...emitente, bairro: e.target.value })}
                placeholder="Centro"
              />
            </div>

            <div>
              <Label htmlFor="municipio">Município</Label>
              <Input
                id="municipio"
                value={emitente.municipio}
                onChange={(e) => setEmitente({ ...emitente, municipio: e.target.value })}
                placeholder="São Paulo"
              />
            </div>

            <div>
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                value={emitente.uf}
                onChange={(e) => setEmitente({ ...emitente, uf: e.target.value })}
                placeholder="SP"
                maxLength={2}
              />
            </div>

            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={emitente.cep}
                onChange={(e) => setEmitente({ ...emitente, cep: e.target.value })}
                placeholder="00000-000"
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={emitente.telefone}
                onChange={(e) => setEmitente({ ...emitente, telefone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="regimeTributario">Regime Tributário</Label>
              <select
                id="regimeTributario"
                value={emitente.regimeTributario}
                onChange={(e) => setEmitente({ ...emitente, regimeTributario: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="1">Simples Nacional</option>
                <option value="2">Simples Nacional - Excesso</option>
                <option value="3">Regime Normal</option>
              </select>
            </div>
          </div>

          <Button onClick={handleSalvarEmitente} className="mt-4 w-full">
            Salvar Dados do Emitente
          </Button>
        </Card>

        {/* Instruções */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Como usar:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Configure o token da API Focus NFe acima</li>
                <li>Preencha os dados do emitente (sua empresa)</li>
                <li>Vá para a página de Pedidos</li>
                <li>Clique em "Emitir NF-e" em qualquer pedido</li>
                <li>A nota será emitida automaticamente!</li>
              </ol>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-3">
                💡 <strong>Dica:</strong> Use o ambiente de homologação para testes antes de emitir notas reais.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
