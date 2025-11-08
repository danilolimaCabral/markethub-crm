import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== PRODUCTS ====================
  products: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getProductsByUserId(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getProductById(input.id, ctx.user.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        sku: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        costPrice: z.number(), // em centavos
        salePrice: z.number(), // em centavos
        stock: z.number().default(0),
        minStock: z.number().default(0),
        weight: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        length: z.number().optional(),
        mlId: z.string().optional(),
        amazonId: z.string().optional(),
        shopeeId: z.string().optional(),
        active: z.boolean().default(true),
        images: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createProduct({
          ...input,
          userId: ctx.user.id,
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        sku: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        costPrice: z.number().optional(),
        salePrice: z.number().optional(),
        stock: z.number().optional(),
        minStock: z.number().optional(),
        weight: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        length: z.number().optional(),
        mlId: z.string().optional(),
        amazonId: z.string().optional(),
        shopeeId: z.string().optional(),
        active: z.boolean().optional(),
        images: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateProduct(id, ctx.user.id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteProduct(input.id, ctx.user.id);
        return { success: true };
      }),

    updateStock: protectedProcedure
      .input(z.object({
        id: z.number(),
        quantity: z.number(), // pode ser negativo para reduzir estoque
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateProductStock(input.id, ctx.user.id, input.quantity);
        return { success: true };
      }),
  }),

  // ==================== ORDERS ====================
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getOrdersByUserId(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const order = await db.getOrderById(input.id, ctx.user.id);
        if (!order) return null;

        const items = await db.getOrderItemsByOrderId(input.id);
        return { ...order, items };
      }),

    create: protectedProcedure
      .input(z.object({
        externalId: z.string().optional(),
        marketplace: z.enum(["mercado_livre", "amazon", "shopee", "manual"]),
        customerName: z.string(),
        customerEmail: z.string().optional(),
        customerPhone: z.string().optional(),
        customerDocument: z.string().optional(),
        shippingAddress: z.string().optional(),
        shippingCity: z.string().optional(),
        shippingState: z.string().optional(),
        shippingZipCode: z.string().optional(),
        totalAmount: z.number(),
        shippingCost: z.number().default(0),
        discountAmount: z.number().default(0),
        marketplaceFee: z.number().default(0),
        paymentFee: z.number().default(0),
        icmsAmount: z.number().default(0),
        taxAmount: z.number().default(0),
        netProfit: z.number().optional(),
        status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]).default("pending"),
        trackingCode: z.string().optional(),
        notes: z.string().optional(),
        items: z.array(z.object({
          productId: z.number().optional(),
          productName: z.string(),
          productSku: z.string().optional(),
          quantity: z.number(),
          unitPrice: z.number(),
          totalPrice: z.number(),
          unitCost: z.number().optional(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const { items, ...orderData } = input;

        // Criar pedido
        const orderResult = await db.createOrder({
          ...orderData,
          userId: ctx.user.id,
        });

        // @ts-ignore - insertId exists in mysql2
        const orderId = Number(orderResult.insertId);

        // Criar itens do pedido
        for (const item of items) {
          await db.createOrderItem({
            orderId,
            ...item,
          });

          // Atualizar estoque se tiver productId
          if (item.productId) {
            await db.updateProductStock(item.productId, ctx.user.id, -item.quantity);
          }
        }

        return { success: true, orderId };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]).optional(),
        trackingCode: z.string().optional(),
        shippedAt: z.date().optional(),
        deliveredAt: z.date().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateOrder(id, ctx.user.id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteOrder(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  // ==================== TRANSACTIONS ====================
  transactions: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getTransactionsByUserId(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getTransactionById(input.id, ctx.user.id);
      }),

    create: protectedProcedure
      .input(z.object({
        type: z.enum(["income", "expense"]),
        category: z.string(),
        description: z.string(),
        amount: z.number(),
        orderId: z.number().optional(),
        dueDate: z.date().optional(),
        paidAt: z.date().optional(),
        status: z.enum(["pending", "paid", "overdue", "cancelled"]).default("pending"),
        paymentMethod: z.string().optional(),
        attachments: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createTransaction({
          ...input,
          userId: ctx.user.id,
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        type: z.enum(["income", "expense"]).optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        amount: z.number().optional(),
        dueDate: z.date().optional(),
        paidAt: z.date().optional(),
        status: z.enum(["pending", "paid", "overdue", "cancelled"]).optional(),
        paymentMethod: z.string().optional(),
        attachments: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateTransaction(id, ctx.user.id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteTransaction(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  // ==================== USER SETTINGS ====================
  settings: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSettings(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        mlAccessToken: z.string().optional(),
        mlRefreshToken: z.string().optional(),
        mlUserId: z.string().optional(),
        mlTokenExpiresAt: z.date().optional(),
        amazonAccessToken: z.string().optional(),
        amazonRefreshToken: z.string().optional(),
        amazonSellerId: z.string().optional(),
        shopeeAccessToken: z.string().optional(),
        shopeeRefreshToken: z.string().optional(),
        shopeeShopId: z.string().optional(),
        icmsRate: z.number().optional(),
        state: z.string().optional(),
        emailNotifications: z.boolean().optional(),
        lowStockAlert: z.boolean().optional(),
        lowStockThreshold: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertUserSettings(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // ==================== USER PROFILE ====================
  user: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserById(ctx.user.id);
    }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        company: z.string().optional(),
        phone: z.string().optional(),
        cnpj: z.string().optional(),
        taxRegime: z.enum(["simples", "lucro_presumido", "lucro_real"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertUser({
          openId: ctx.user.openId,
          ...input,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
