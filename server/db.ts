import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  products, 
  InsertProduct,
  orders,
  InsertOrder,
  orderItems,
  InsertOrderItem,
  transactions,
  InsertTransaction,
  userSettings,
  InsertUserSettings,
  asaasWebhooks,
  InsertAsaasWebhook
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USERS ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "company", "phone", "cnpj"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    
    if (user.taxRegime !== undefined) {
      values.taxRegime = user.taxRegime;
      updateSet.taxRegime = user.taxRegime;
    }
    
    if (user.subscriptionStatus !== undefined) {
      values.subscriptionStatus = user.subscriptionStatus;
      updateSet.subscriptionStatus = user.subscriptionStatus;
    }
    
    if (user.subscriptionPlan !== undefined) {
      values.subscriptionPlan = user.subscriptionPlan;
      updateSet.subscriptionPlan = user.subscriptionPlan;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserSubscription(userId: number, data: {
  subscriptionStatus?: typeof users.$inferSelect.subscriptionStatus;
  subscriptionPlan?: typeof users.$inferSelect.subscriptionPlan;
  trialEndsAt?: Date | null;
  subscriptionEndsAt?: Date | null;
  asaasCustomerId?: string | null;
  asaasSubscriptionId?: string | null;
}) {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set(data).where(eq(users.id, userId));
}

// ==================== PRODUCTS ====================

export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values(product);
  return result;
}

export async function getProductsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(products).where(eq(products.userId, userId)).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(
    and(eq(products.id, id), eq(products.userId, userId))
  ).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateProduct(id: number, userId: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(products).set(data).where(
    and(eq(products.id, id), eq(products.userId, userId))
  );
}

export async function deleteProduct(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(products).where(
    and(eq(products.id, id), eq(products.userId, userId))
  );
}

export async function updateProductStock(id: number, userId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(products).set({
    stock: sql`${products.stock} + ${quantity}`
  }).where(
    and(eq(products.id, id), eq(products.userId, userId))
  );
}

// ==================== ORDERS ====================

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(
    and(eq(orders.id, id), eq(orders.userId, userId))
  ).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrder(id: number, userId: number, data: Partial<InsertOrder>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(orders).set(data).where(
    and(eq(orders.id, id), eq(orders.userId, userId))
  );
}

export async function deleteOrder(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(orders).where(
    and(eq(orders.id, id), eq(orders.userId, userId))
  );
}

// ==================== ORDER ITEMS ====================

export async function createOrderItem(item: InsertOrderItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orderItems).values(item);
  return result;
}

export async function getOrderItemsByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ==================== TRANSACTIONS ====================

export async function createTransaction(transaction: InsertTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(transactions).values(transaction);
  return result;
}

export async function getTransactionsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(transactions).where(eq(transactions.userId, userId)).orderBy(desc(transactions.createdAt));
}

export async function getTransactionById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(transactions).where(
    and(eq(transactions.id, id), eq(transactions.userId, userId))
  ).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateTransaction(id: number, userId: number, data: Partial<InsertTransaction>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(transactions).set(data).where(
    and(eq(transactions.id, id), eq(transactions.userId, userId))
  );
}

export async function deleteTransaction(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(transactions).where(
    and(eq(transactions.id, id), eq(transactions.userId, userId))
  );
}

// ==================== USER SETTINGS ====================

export async function getUserSettings(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userSettings).where(eq(userSettings.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUserSettings(userId: number, data: Partial<InsertUserSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserSettings(userId);

  if (existing) {
    await db.update(userSettings).set(data).where(eq(userSettings.userId, userId));
  } else {
    await db.insert(userSettings).values({ userId, ...data });
  }
}

// ==================== ASAAS WEBHOOKS ====================

export async function createAsaasWebhook(webhook: InsertAsaasWebhook) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(asaasWebhooks).values(webhook);
  return result;
}

export async function getUnprocessedWebhooks() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(asaasWebhooks).where(eq(asaasWebhooks.processed, false)).orderBy(asaasWebhooks.createdAt);
}

export async function markWebhookAsProcessed(id: number, error?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(asaasWebhooks).set({
    processed: true,
    processedAt: new Date(),
    error: error || null
  }).where(eq(asaasWebhooks.id, id));
}
