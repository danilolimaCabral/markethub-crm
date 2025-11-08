import { Router, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import * as db from './db';
import { users } from '../drizzle/schema';

const router = Router();

/**
 * Webhook Asaas - Processa eventos de pagamento
 * Documentação: https://docs.asaas.com/reference/webhooks
 */
router.post('/asaas/webhook', async (req: Request, res: Response) => {
  try {
    const event = req.body.event;
    const payment = req.body.payment;

    console.log('[Asaas Webhook] Recebido:', event, payment?.id);

    // Salvar webhook no banco
    await db.createAsaasWebhook({
      event,
      paymentId: payment?.id,
      subscriptionId: payment?.subscription,
      payload: JSON.stringify(req.body),
      processed: false,
    });

    // Processar evento
    await processWebhook(event, payment);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Asaas Webhook] Erro:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function processWebhook(event: string, payment: any) {
  try {
    // Buscar usuário pela assinatura
    const customerId = payment?.customer;
    if (!customerId) {
      console.warn('[Asaas Webhook] Customer ID não encontrado');
      return;
    }

    // Buscar usuário no banco
    const db_instance = await db.getDb();
    if (!db_instance) {
      console.error('[Asaas Webhook] Banco de dados não disponível');
      return;
    }

    const usersList = await db_instance
      .select()
      .from(users)
      .where(eq(users.asaasCustomerId, customerId))
      .limit(1);

    if (usersList.length === 0) {
      console.warn('[Asaas Webhook] Usuário não encontrado para customer:', customerId);
      return;
    }

    const user = usersList[0];

    // Processar evento
    switch (event) {
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_CONFIRMED':
        // Pagamento confirmado - ativar assinatura
        console.log(`[Asaas Webhook] Ativando assinatura para usuário ${user.id}`);
        await db.updateUserSubscription(user.id, {
          subscriptionStatus: 'active',
          subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 dias
        });
        break;

      case 'PAYMENT_OVERDUE':
        // Pagamento atrasado - suspender após 7 dias
        const daysOverdue = Math.floor(
          (Date.now() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysOverdue >= 7) {
          console.log(`[Asaas Webhook] Suspendendo assinatura para usuário ${user.id}`);
          await db.updateUserSubscription(user.id, {
            subscriptionStatus: 'suspended',
          });
        }
        break;

      case 'PAYMENT_REFUNDED':
        // Pagamento reembolsado - cancelar imediatamente
        console.log(`[Asaas Webhook] Cancelando assinatura para usuário ${user.id}`);
        await db.updateUserSubscription(user.id, {
          subscriptionStatus: 'cancelled',
        });
        break;

      case 'SUBSCRIPTION_DELETED':
      case 'SUBSCRIPTION_CANCELLED':
        // Assinatura cancelada
        console.log(`[Asaas Webhook] Cancelando assinatura para usuário ${user.id}`);
        await db.updateUserSubscription(user.id, {
          subscriptionStatus: 'cancelled',
        });
        break;

      default:
        console.log(`[Asaas Webhook] Evento não processado: ${event}`);
    }
  } catch (error) {
    console.error('[Asaas Webhook] Erro ao processar:', error);
    throw error;
  }
}



export default router;
