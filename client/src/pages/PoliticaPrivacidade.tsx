import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PoliticaPrivacidade() {
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
            <CardTitle className="text-3xl">Política de Privacidade</CardTitle>
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Introdução</h2>
            <p>
              O MarketHub CRM ("nós", "nosso") está comprometido em proteger sua privacidade.
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos
              suas informações quando você usa nosso serviço.
            </p>

            <h2>2. Informações que Coletamos</h2>
            
            <h3>2.1 Informações Fornecidas por Você</h3>
            <ul>
              <li><strong>Dados de Cadastro:</strong> nome, email, telefone, CNPJ, razão social</li>
              <li><strong>Dados Fiscais:</strong> regime tributário, estado, informações de impostos</li>
              <li><strong>Dados de Pagamento:</strong> processados pelo Asaas (não armazenamos dados de cartão)</li>
              <li><strong>Dados de Produtos:</strong> informações sobre seus produtos, custos, preços</li>
              <li><strong>Dados de Pedidos:</strong> informações sobre vendas e transações</li>
            </ul>

            <h3>2.2 Informações Coletadas Automaticamente</h3>
            <ul>
              <li><strong>Dados de Uso:</strong> páginas visitadas, recursos utilizados, tempo de uso</li>
              <li><strong>Dados Técnicos:</strong> endereço IP, navegador, dispositivo, sistema operacional</li>
              <li><strong>Cookies:</strong> para manter sua sessão e melhorar a experiência</li>
            </ul>

            <h3>2.3 Informações de Integrações</h3>
            <ul>
              <li><strong>Mercado Livre:</strong> produtos, pedidos, vendas (com sua autorização)</li>
              <li><strong>Amazon/Shopee:</strong> dados similares quando integrado</li>
            </ul>

            <h2>3. Como Usamos suas Informações</h2>
            <p>
              Usamos suas informações para:
            </p>
            <ul>
              <li>Fornecer e manter o Serviço</li>
              <li>Processar pagamentos e gerenciar assinaturas</li>
              <li>Calcular taxas e impostos automaticamente</li>
              <li>Sincronizar dados com marketplaces</li>
              <li>Enviar notificações importantes (alertas de estoque, novos pedidos)</li>
              <li>Melhorar nosso Serviço e desenvolver novos recursos</li>
              <li>Fornecer suporte técnico</li>
              <li>Enviar emails marketing (você pode cancelar a qualquer momento)</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>4. Compartilhamento de Informações</h2>
            <p>
              NÃO vendemos suas informações pessoais. Compartilhamos apenas quando necessário:
            </p>

            <h3>4.1 Provedores de Serviço</h3>
            <ul>
              <li><strong>Asaas:</strong> processamento de pagamentos</li>
              <li><strong>Vercel/Railway:</strong> hospedagem da aplicação</li>
              <li><strong>Supabase:</strong> banco de dados</li>
              <li><strong>SendGrid:</strong> envio de emails</li>
            </ul>

            <h3>4.2 Integrações Autorizadas</h3>
            <ul>
              <li><strong>Mercado Livre, Amazon, Shopee:</strong> apenas com sua autorização explícita</li>
            </ul>

            <h3>4.3 Requisitos Legais</h3>
            <p>
              Podemos divulgar suas informações se exigido por lei ou em resposta a processos legais válidos.
            </p>

            <h2>5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações:
            </p>
            <ul>
              <li>Criptografia SSL/TLS para dados em trânsito</li>
              <li>Criptografia de dados sensíveis no banco de dados</li>
              <li>Autenticação segura com JWT</li>
              <li>Backups automáticos diários</li>
              <li>Acesso restrito aos dados apenas para pessoal autorizado</li>
              <li>Monitoramento de segurança 24/7</li>
            </ul>

            <h2>6. Retenção de Dados</h2>
            <p>
              Mantemos suas informações enquanto sua conta estiver ativa ou conforme necessário para
              fornecer o Serviço. Você pode solicitar a exclusão de seus dados a qualquer momento.
            </p>

            <h2>7. Seus Direitos (LGPD)</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul>
              <li><strong>Acesso:</strong> solicitar cópias de seus dados pessoais</li>
              <li><strong>Correção:</strong> solicitar correção de dados incorretos</li>
              <li><strong>Exclusão:</strong> solicitar exclusão de seus dados</li>
              <li><strong>Portabilidade:</strong> exportar seus dados em formato legível</li>
              <li><strong>Revogação:</strong> revogar consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> opor-se ao processamento de seus dados</li>
            </ul>

            <h2>8. Cookies e Tecnologias Similares</h2>
            <p>
              Usamos cookies para:
            </p>
            <ul>
              <li>Manter você conectado</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar o uso do Serviço</li>
              <li>Melhorar a experiência do usuário</li>
            </ul>
            <p>
              Você pode desativar cookies nas configurações do navegador, mas isso pode afetar
              a funcionalidade do Serviço.
            </p>

            <h2>9. Transferência Internacional de Dados</h2>
            <p>
              Seus dados são armazenados em servidores localizados no Brasil. Se houver transferência
              internacional, garantiremos proteção adequada conforme a LGPD.
            </p>

            <h2>10. Privacidade de Menores</h2>
            <p>
              Nosso Serviço não é direcionado a menores de 18 anos. Não coletamos intencionalmente
              informações de menores. Se descobrirmos que coletamos dados de um menor, excluiremos
              imediatamente.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre
              alterações significativas por email ou através do Serviço. A data da última atualização
              será sempre indicada no topo desta página.
            </p>

            <h2>12. Contato e Encarregado de Dados</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
            </p>
            <ul>
              <li><strong>Email:</strong> privacidade@markethubcrm.com.br</li>
              <li><strong>Encarregado (DPO):</strong> dpo@markethubcrm.com.br</li>
              <li><strong>WhatsApp:</strong> (11) 99999-9999</li>
            </ul>

            <h2>13. Consentimento</h2>
            <p>
              Ao usar o MarketHub CRM, você consente com a coleta e uso de informações conforme
              descrito nesta Política de Privacidade.
            </p>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                ✅ Seus dados estão seguros conosco. Respeitamos sua privacidade e cumprimos a LGPD.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
