import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calculator, FileText, Download, DollarSign, Percent, TrendingUp, Printer } from "lucide-react";
import { baixarPropostaHTML, imprimirProposta } from "@/lib/gerador-proposta";

export default function Importacao() {
  // Estados para os campos do formulário
  const [valorMercadoria, setValorMercadoria] = useState<number>(15000);
  const [taxaDolar, setTaxaDolar] = useState<number>(5.37440);
  const [valorCIF, setValorCIF] = useState<number>(16096.40);
  const [margemLucro, setMargemLucro] = useState<number>(30); // % de margem
  const [comissaoBusca, setComissaoBusca] = useState<number>(1500); // Valor fixo de comissão

  // Tributos (baseados no documento)
  const [impostoImportacao, setImpostoImportacao] = useState<number>(6920.68);
  const [ipi, setIpi] = useState<number>(4671.46);
  const [pis, setPis] = useState<number>(1816.68);
  const [cofins, setCofins] = useState<number>(8348.07);
  const [taxaSiscomex, setTaxaSiscomex] = useState<number>(154.23);

  // Despesas Operacionais
  const [icms, setIcms] = useState<number>(2908.18);
  const [marinhaMercante, setMarinhaMercante] = useState<number>(525.34);
  const [honorariosComissaria, setHonorariosComissaria] = useState<number>(1518.00);
  const [sdaDespachante, setSdaDespachante] = useState<number>(1033.88);
  const [armazenagemItajai, setArmazenagemItajai] = useState<number>(5500.00);
  const [freteRodoviario, setFreteRodoviario] = useState<number>(9000.00);
  const [expedienteItajai, setExpedienteItajai] = useState<number>(300.00);

  // Cálculos automáticos
  const cifReais = valorCIF * taxaDolar;
  const totalTributos = impostoImportacao + ipi + pis + cofins + taxaSiscomex;
  const totalDespesas = icms + marinhaMercante + honorariosComissaria + sdaDespachante + 
                        armazenagemItajai + freteRodoviario + expedienteItajai;
  const custoTotal = cifReais + totalTributos + totalDespesas;
  const valorComMargem = custoTotal * (1 + margemLucro / 100);
  const valorFinalCliente = valorComMargem + comissaoBusca;

  const handleGerarProposta = () => {
    const dadosProposta = {
      valorMercadoria,
      taxaDolar,
      valorCIF,
      impostoImportacao,
      ipi,
      pis,
      cofins,
      taxaSiscomex,
      icms,
      marinhaMercante,
      honorariosComissaria,
      sdaDespachante,
      armazenagemItajai,
      freteRodoviario,
      expedienteItajai,
      margemLucro,
      comissaoBusca,
      cifReais,
      totalTributos,
      totalDespesas,
      custoTotal,
      valorComMargem,
      valorFinalCliente
    };
    
    imprimirProposta(dadosProposta);
  };

  const handleBaixarProposta = () => {
    const dadosProposta = {
      valorMercadoria,
      taxaDolar,
      valorCIF,
      impostoImportacao,
      ipi,
      pis,
      cofins,
      taxaSiscomex,
      icms,
      marinhaMercante,
      honorariosComissaria,
      sdaDespachante,
      armazenagemItajai,
      freteRodoviario,
      expedienteItajai,
      margemLucro,
      comissaoBusca,
      cifReais,
      totalTributos,
      totalDespesas,
      custoTotal,
      valorComMargem,
      valorFinalCliente
    };
    
    baixarPropostaHTML(dadosProposta);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Importação e Comex</h1>
        <p className="text-muted-foreground">Calculadora de custos e gerador de propostas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1: Dados Básicos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Dados Básicos
            </CardTitle>
            <CardDescription>Informações da mercadoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Valor Mercadoria (MLE US$)</Label>
              <Input
                type="number"
                value={valorMercadoria}
                onChange={(e) => setValorMercadoria(Number(e.target.value))}
                placeholder="15.000,00"
              />
            </div>

            <div>
              <Label>Taxa do Dólar (R$)</Label>
              <Input
                type="number"
                step="0.00001"
                value={taxaDolar}
                onChange={(e) => setTaxaDolar(Number(e.target.value))}
                placeholder="5,37440"
              />
            </div>

            <div>
              <Label>CIF US$ (Custo + Seguro + Frete)</Label>
              <Input
                type="number"
                value={valorCIF}
                onChange={(e) => setValorCIF(Number(e.target.value))}
                placeholder="16.096,40"
              />
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-1">CIF em Reais</p>
              <p className="text-2xl font-bold text-blue-600">
                R$ {cifReais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coluna 2: Tributos e Despesas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Tributos e Despesas
            </CardTitle>
            <CardDescription>Custos de importação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-semibold text-sm">Tributos</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Imposto Importação:</span>
                <Input
                  type="number"
                  value={impostoImportacao}
                  onChange={(e) => setImpostoImportacao(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">IPI:</span>
                <Input
                  type="number"
                  value={ipi}
                  onChange={(e) => setIpi(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">PIS:</span>
                <Input
                  type="number"
                  value={pis}
                  onChange={(e) => setPis(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">COFINS:</span>
                <Input
                  type="number"
                  value={cofins}
                  onChange={(e) => setCofins(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">SISCOMEX:</span>
                <Input
                  type="number"
                  value={taxaSiscomex}
                  onChange={(e) => setTaxaSiscomex(Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Total Tributos:</span>
                <span className="text-red-600">R$ {totalTributos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <p className="font-semibold text-sm">Despesas Operacionais</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">ICMS:</span>
                <Input
                  type="number"
                  value={icms}
                  onChange={(e) => setIcms(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">Marinha Mercante:</span>
                <Input
                  type="number"
                  value={marinhaMercante}
                  onChange={(e) => setMarinhaMercante(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">Honorários:</span>
                <Input
                  type="number"
                  value={honorariosComissaria}
                  onChange={(e) => setHonorariosComissaria(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">SDA Despachante:</span>
                <Input
                  type="number"
                  value={sdaDespachante}
                  onChange={(e) => setSdaDespachante(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">Armazenagem:</span>
                <Input
                  type="number"
                  value={armazenagemItajai}
                  onChange={(e) => setArmazenagemItajai(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">Frete Rodoviário:</span>
                <Input
                  type="number"
                  value={freteRodoviario}
                  onChange={(e) => setFreteRodoviario(Number(e.target.value))}
                  className="h-8 text-xs"
                />
                
                <span className="text-muted-foreground">Expediente:</span>
                <Input
                  type="number"
                  value={expedienteItajai}
                  onChange={(e) => setExpedienteItajai(Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Total Despesas:</span>
                <span className="text-orange-600">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coluna 3: Margem e Valor Final */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Precificação
            </CardTitle>
            <CardDescription>Margem e valor final</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Margem de Lucro (%)
              </Label>
              <Input
                type="number"
                value={margemLucro}
                onChange={(e) => setMargemLucro(Number(e.target.value))}
                placeholder="30"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Percentual de lucro sobre o custo total
              </p>
            </div>

            <div>
              <Label>Comissão por Buscar Produto (R$)</Label>
              <Input
                type="number"
                value={comissaoBusca}
                onChange={(e) => setComissaoBusca(Number(e.target.value))}
                placeholder="1.500,00"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Valor fixo cobrado pelo serviço
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Custo Total:</span>
                <span className="font-semibold">
                  R$ {custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valor com Margem ({margemLucro}%):</span>
                <span className="font-semibold text-blue-600">
                  R$ {valorComMargem.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Comissão:</span>
                <span className="font-semibold text-purple-600">
                  R$ {comissaoBusca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground mb-2">Valor Final para Cliente</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {valorFinalCliente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <Button
              onClick={handleGerarProposta}
              className="w-full mt-4"
              size="lg"
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimir Proposta Comercial
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleBaixarProposta}
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar Proposta (HTML)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Operação</CardTitle>
          <CardDescription>Breakdown completo dos custos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">CIF (R$)</p>
              <p className="text-lg font-bold text-blue-600">
                {((cifReais / valorFinalCliente) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                R$ {cifReais.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Tributos</p>
              <p className="text-lg font-bold text-red-600">
                {((totalTributos / valorFinalCliente) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                R$ {totalTributos.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Despesas</p>
              <p className="text-lg font-bold text-orange-600">
                {((totalDespesas / valorFinalCliente) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                R$ {totalDespesas.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Margem + Comissão</p>
              <p className="text-lg font-bold text-purple-600">
                {(((valorFinalCliente - custoTotal) / valorFinalCliente) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">
                R$ {(valorFinalCliente - custoTotal).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Valor Final</p>
              <p className="text-lg font-bold text-green-600">100%</p>
              <p className="text-xs text-muted-foreground">
                R$ {valorFinalCliente.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
