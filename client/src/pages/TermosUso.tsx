import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function TermosUso() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Termos de Uso</CardTitle>
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o MarketHub CRM ("Serviço"), você concorda em cumprir e estar vinculado
              aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes
              termos, não deverá usar nosso Serviço.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O MarketHub CRM é uma plataforma de gestão para vendedores de marketplace que oferece:
            </p>
            <ul>
              <li>Calculadora de taxas e impostos para marketplaces</li>
              <li>Gestão de produtos, pedidos e estoque</li>
              <li>Análise financeira e relatórios</li>
              <li>Inteligência de mercado</li>
              <li>Integração com marketplaces (Mercado Livre, Amazon, Shopee)</li>
            </ul>

            <h2>3. Cadastro e Conta</h2>
            <p>
              Para usar o Serviço, você deve:
            </p>
            <ul>
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Fornecer informações precisas e completas durante o cadastro</li>
              <li>Manter a segurança de sua senha e conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
            </ul>

            <h2>4. Planos e Pagamentos</h2>
            <p>
              O Serviço oferece diferentes planos de assinatura com recursos variados. Você concorda que:
            </p>
            <ul>
              <li>Os pagamentos são processados mensalmente via cartão de crédito</li>
              <li>As cobranças são automáticas até o cancelamento da assinatura</li>
              <li>Oferecemos 48 horas de trial gratuito para novos usuários</li>
              <li>Não há reembolso proporcional em caso de cancelamento</li>
              <li>Os preços podem ser alterados mediante aviso prévio de 30 dias</li>
            </ul>

            <h2>5. Trial Gratuito</h2>
            <p>
              O período de trial gratuito de 48 horas permite que você teste o Serviço sem compromisso.
              Após o término do trial, sua assinatura será cobrada automaticamente, a menos que você
              cancele antes do fim do período.
            </p>

            <h2>6. Cancelamento e Reembolso</h2>
            <p>
              Você pode cancelar sua assinatura a qualquer momento através do painel de controle.
              O cancelamento entrará em vigor no final do período de cobrança atual. Não oferecemos
              reembolsos para períodos parcialmente utilizados.
            </p>

            <h2>7. Uso Aceitável</h2>
            <p>
              Você concorda em NÃO:
            </p>
            <ul>
              <li>Usar o Serviço para qualquer finalidade ilegal</li>
              <li>Tentar obter acesso não autorizado ao sistema</li>
              <li>Interferir ou interromper o Serviço</li>
              <li>Copiar, modificar ou distribuir o software</li>
              <li>Usar o Serviço para enviar spam ou conteúdo malicioso</li>
              <li>Revender ou redistribuir o Serviço sem autorização</li>
            </ul>

            <h2>8. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, recursos e funcionalidades do Serviço são de propriedade exclusiva
              do MarketHub CRM e são protegidos por leis de direitos autorais, marcas registradas
              e outras leis de propriedade intelectual.
            </p>

            <h2>9. Dados e Privacidade</h2>
            <p>
              Seus dados são tratados de acordo com nossa Política de Privacidade. Nós:
            </p>
            <ul>
              <li>Coletamos apenas dados necessários para o funcionamento do Serviço</li>
              <li>Não vendemos ou compartilhamos seus dados com terceiros</li>
              <li>Usamos criptografia para proteger informações sensíveis</li>
              <li>Você pode exportar ou excluir seus dados a qualquer momento</li>
            </ul>

            <h2>10. Limitação de Responsabilidade</h2>
            <p>
              O Serviço é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por:
            </p>
            <ul>
              <li>Perdas financeiras decorrentes do uso do Serviço</li>
              <li>Interrupções ou falhas no Serviço</li>
              <li>Erros nos cálculos de taxas (use apenas como referência)</li>
              <li>Problemas com integrações de terceiros (Mercado Livre, etc.)</li>
              <li>Perda de dados devido a falhas técnicas</li>
            </ul>

            <h2>11. Disponibilidade do Serviço</h2>
            <p>
              Embora nos esforcemos para manter o Serviço disponível 24/7, não garantimos que o
              Serviço estará sempre disponível, ininterrupto ou livre de erros. Podemos realizar
              manutenções programadas mediante aviso prévio.
            </p>

            <h2>12. Modificações dos Termos</h2>
            <p>
              Reservamos o direito de modificar estes termos a qualquer momento. As alterações
              entrarão em vigor imediatamente após a publicação. O uso continuado do Serviço após
              as alterações constitui aceitação dos novos termos.
            </p>

            <h2>13. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, se você
              violar estes termos. Após o encerramento, você perderá o acesso ao Serviço e seus dados.
            </p>

            <h2>14. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer
              disputa será resolvida nos tribunais competentes do Brasil.
            </p>

            <h2>15. Contato</h2>
            <p>
              Para questões sobre estes termos, entre em contato:
            </p>
            <ul>
              <li>Email: suporte@markethubcrm.com.br</li>
              <li>WhatsApp: (11) 99999-9999</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold">
                Ao usar o MarketHub CRM, você confirma que leu, compreendeu e concordou com estes Termos de Uso.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
