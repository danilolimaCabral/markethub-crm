import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  calculateMLFees, 
  calculateRequiredPrice,
  ML_CATEGORIES,
  type ListingType,
  type PaymentMethod,
  type MLFeesCalculation 
} from '@/data/mercado-livre-fees';
import { TrendingUp, TrendingDown, Calculator, DollarSign } from 'lucide-react';

export default function MLFeesCalculator() {
  const [salePrice, setSalePrice] = useState<string>('89.90');
  const [costPrice, setCostPrice] = useState<string>('45.90');
  const [categoryId, setCategoryId] = useState<string>('MLB1000');
  const [listingType, setListingType] = useState<ListingType>('classico');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [installments, setInstallments] = useState<string>('1');
  const [weightGrams, setWeightGrams] = useState<string>('350');
  const [isMercadoLider, setIsMercadoLider] = useState<boolean>(false);
  const [offerFreeShipping, setOfferFreeShipping] = useState<boolean>(true);
  const [desiredMargin, setDesiredMargin] = useState<string>('40');
  
  const [result, setResult] = useState<MLFeesCalculation | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);

  const handleCalculate = () => {
    const fees = calculateMLFees({
      salePrice: parseFloat(salePrice),
      categoryId,
      listingType,
      paymentMethod,
      installments: parseInt(installments),
      weightGrams: parseFloat(weightGrams),
      isMercadoLider,
      offerFreeShipping,
    });
    
    setResult(fees);
  };

  const handleCalculateSuggestedPrice = () => {
    const price = calculateRequiredPrice({
      costPrice: parseFloat(costPrice),
      desiredMarginPercentage: parseFloat(desiredMargin),
      categoryId,
      listingType,
      paymentMethod,
      installments: parseInt(installments),
      weightGrams: parseFloat(weightGrams),
      isMercadoLider,
      offerFreeShipping,
    });
    
    setSuggestedPrice(price);
    setSalePrice(price.toFixed(2));
    
    // Recalcula as taxas com o novo preço
    setTimeout(() => handleCalculate(), 100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const grossProfit = result ? result.netRevenue - parseFloat(costPrice) : 0;
  const grossMargin = result && result.netRevenue > 0 ? (grossProfit / result.netRevenue) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Taxas Mercado Livre
          </CardTitle>
          <CardDescription>
            Calcule todas as taxas e comissões do Mercado Livre automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dados do Produto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salePrice">Preço de Venda</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="89.90"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costPrice">Preço de Custo</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="45.90"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ML_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} ({cat.classicoFee * 100}% / {cat.premiumFee * 100}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="listingType">Tipo de Anúncio</Label>
              <Select value={listingType} onValueChange={(v) => setListingType(v as ListingType)}>
                <SelectTrigger id="listingType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classico">Clássico (10-14%)</SelectItem>
                  <SelectItem value="premium">Premium (15-19%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">Pix (0,99%)</SelectItem>
                  <SelectItem value="boleto">Boleto (3,49%)</SelectItem>
                  <SelectItem value="credit_card">Cartão à vista (4,99%)</SelectItem>
                  <SelectItem value="credit_card_installments">Cartão parcelado (4,99% + 3%/parcela)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'credit_card_installments' && (
              <div className="space-y-2">
                <Label htmlFor="installments">Parcelas</Label>
                <Input
                  id="installments"
                  type="number"
                  min="1"
                  max="12"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="weightGrams">Peso (gramas)</Label>
              <Input
                id="weightGrams"
                type="number"
                value={weightGrams}
                onChange={(e) => setWeightGrams(e.target.value)}
                placeholder="350"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reputation">Reputação</Label>
              <Select 
                value={isMercadoLider ? 'mercadolider' : 'regular'} 
                onValueChange={(v) => setIsMercadoLider(v === 'mercadolider')}
              >
                <SelectTrigger id="reputation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular (sem desconto)</SelectItem>
                  <SelectItem value="mercadolider">MercadoLíder (30% desconto frete)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping">Frete</Label>
              <Select 
                value={offerFreeShipping ? 'free' : 'paid'} 
                onValueChange={(v) => setOfferFreeShipping(v === 'free')}
              >
                <SelectTrigger id="shipping">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Comprador paga</SelectItem>
                  <SelectItem value="free">Frete grátis (vendedor paga)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleCalculate} className="flex-1">
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Taxas
            </Button>
          </div>

          {/* Resultado do Cálculo */}
          {result && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Resultado do Cálculo</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Preço de Venda</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.salePrice)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Comissão ML</p>
                  <p className="text-xl font-semibold text-red-600">
                    -{formatCurrency(result.categoryFee)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Custo Fixo</p>
                  <p className="text-xl font-semibold text-red-600">
                    -{formatCurrency(result.fixedCost)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Taxa Pagamento</p>
                  <p className="text-xl font-semibold text-red-600">
                    -{formatCurrency(result.paymentFee)}
                  </p>
                </div>
                
                {result.shippingCost > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Frete</p>
                    <p className="text-xl font-semibold text-red-600">
                      -{formatCurrency(result.shippingCost)}
                    </p>
                  </div>
                )}
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total de Taxas</p>
                  <p className="text-xl font-bold text-red-600">
                    -{formatCurrency(result.totalFees)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Receita Líquida</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.netRevenue)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Margem Líquida</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {formatPercentage(result.netMarginPercentage)}
                    </p>
                    {result.netMarginPercentage >= 30 ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Análise de Lucratividade */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Lucro Bruto</p>
                  <p className="text-xl font-semibold">{formatCurrency(grossProfit)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Margem Bruta</p>
                  <p className="text-xl font-semibold">{formatPercentage(grossMargin)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-xl font-semibold">
                    {formatPercentage((grossProfit / parseFloat(costPrice)) * 100)}
                  </p>
                </div>
              </div>

              {/* Alertas */}
              {result.netMarginPercentage < 20 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    ⚠️ Margem líquida muito baixa ({formatPercentage(result.netMarginPercentage)}). 
                    Considere aumentar o preço ou reduzir custos.
                  </AlertDescription>
                </Alert>
              )}

              {result.netMarginPercentage >= 40 && (
                <Alert>
                  <AlertDescription>
                    ✅ Excelente margem líquida ({formatPercentage(result.netMarginPercentage)})! 
                    Produto altamente lucrativo.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simulador de Preço */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Simulador de Preço Ideal
          </CardTitle>
          <CardDescription>
            Descubra qual preço você precisa vender para atingir a margem desejada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="desiredMargin">Margem Desejada (%)</Label>
              <Input
                id="desiredMargin"
                type="number"
                step="1"
                value={desiredMargin}
                onChange={(e) => setDesiredMargin(e.target.value)}
                placeholder="40"
              />
            </div>
          </div>

          <Button onClick={handleCalculateSuggestedPrice} className="w-full">
            Calcular Preço Ideal
          </Button>

          {suggestedPrice && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Preço Sugerido</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(suggestedPrice)}
                  </p>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Margem: {desiredMargin}%
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
