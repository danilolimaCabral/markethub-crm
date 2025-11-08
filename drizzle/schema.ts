import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Campos adicionais para MarketHub CRM
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  cnpj: varchar("cnpj", { length: 18 }),
  taxRegime: mysqlEnum("taxRegime", ["simples", "lucro_presumido", "lucro_real"]).default("simples"),
  
  // Assinatura
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["trial", "active", "suspended", "cancelled"]).default("trial"),
  subscriptionPlan: mysqlEnum("subscriptionPlan", ["starter", "professional", "business", "enterprise"]).default("starter"),
  trialEndsAt: timestamp("trialEndsAt"),
  subscriptionEndsAt: timestamp("subscriptionEndsAt"),
  
  // Asaas
  asaasCustomerId: varchar("asaasCustomerId", { length: 64 }),
  asaasSubscriptionId: varchar("asaasSubscriptionId", { length: 64 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Produtos
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  
  // Preços e custos (em centavos para evitar problemas de precisão)
  costPrice: int("costPrice").notNull(), // Custo em centavos
  salePrice: int("salePrice").notNull(), // Preço de venda em centavos
  
  // Estoque
  stock: int("stock").default(0).notNull(),
  minStock: int("minStock").default(0),
  
  // Dimensões para cálculo de frete
  weight: int("weight"), // gramas
  width: int("width"), // cm
  height: int("height"), // cm
  length: int("length"), // cm
  
  // Marketplaces
  mlId: varchar("mlId", { length: 100 }), // ID no Mercado Livre
  amazonId: varchar("amazonId", { length: 100 }),
  shopeeId: varchar("shopeeId", { length: 100 }),
  
  // Status
  active: boolean("active").default(true).notNull(),
  
  // Imagens (URLs separadas por vírgula)
  images: text("images"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Pedidos
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // Identificação
  externalId: varchar("externalId", { length: 100 }), // ID do marketplace
  marketplace: mysqlEnum("marketplace", ["mercado_livre", "amazon", "shopee", "manual"]).notNull(),
  
  // Cliente
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 20 }),
  customerDocument: varchar("customerDocument", { length: 18 }),
  
  // Endereço de entrega
  shippingAddress: text("shippingAddress"),
  shippingCity: varchar("shippingCity", { length: 100 }),
  shippingState: varchar("shippingState", { length: 2 }),
  shippingZipCode: varchar("shippingZipCode", { length: 10 }),
  
  // Valores (em centavos)
  totalAmount: int("totalAmount").notNull(),
  shippingCost: int("shippingCost").default(0),
  discountAmount: int("discountAmount").default(0),
  
  // Taxas e impostos (em centavos)
  marketplaceFee: int("marketplaceFee").default(0),
  paymentFee: int("paymentFee").default(0),
  icmsAmount: int("icmsAmount").default(0),
  taxAmount: int("taxAmount").default(0),
  
  // Lucro líquido calculado (em centavos)
  netProfit: int("netProfit"),
  
  // Status
  status: mysqlEnum("status", [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded"
  ]).default("pending").notNull(),
  
  // Rastreamento
  trackingCode: varchar("trackingCode", { length: 100 }),
  shippedAt: timestamp("shippedAt"),
  deliveredAt: timestamp("deliveredAt"),
  
  // Notas
  notes: text("notes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// Itens do pedido
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId"),
  
  productName: varchar("productName", { length: 255 }).notNull(),
  productSku: varchar("productSku", { length: 100 }),
  
  quantity: int("quantity").notNull(),
  unitPrice: int("unitPrice").notNull(), // em centavos
  totalPrice: int("totalPrice").notNull(), // em centavos
  
  // Custo do produto no momento da venda (em centavos)
  unitCost: int("unitCost"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

// Transações financeiras
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  type: mysqlEnum("type", ["income", "expense"]).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  
  description: text("description").notNull(),
  amount: int("amount").notNull(), // em centavos
  
  // Relacionamento com pedido (opcional)
  orderId: int("orderId"),
  
  // Data de vencimento/pagamento
  dueDate: timestamp("dueDate"),
  paidAt: timestamp("paidAt"),
  
  status: mysqlEnum("status", ["pending", "paid", "overdue", "cancelled"]).default("pending").notNull(),
  
  // Método de pagamento
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  
  // Anexos (URLs separadas por vírgula)
  attachments: text("attachments"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

// Webhooks do Asaas
export const asaasWebhooks = mysqlTable("asaasWebhooks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  
  event: varchar("event", { length: 100 }).notNull(),
  paymentId: varchar("paymentId", { length: 64 }),
  subscriptionId: varchar("subscriptionId", { length: 64 }),
  
  payload: text("payload").notNull(), // JSON do webhook
  
  processed: boolean("processed").default(false).notNull(),
  processedAt: timestamp("processedAt"),
  
  error: text("error"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AsaasWebhook = typeof asaasWebhooks.$inferSelect;
export type InsertAsaasWebhook = typeof asaasWebhooks.$inferInsert;

// Configurações do usuário
export const userSettings = mysqlTable("userSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  // Integração Mercado Livre
  mlAccessToken: text("mlAccessToken"),
  mlRefreshToken: text("mlRefreshToken"),
  mlUserId: varchar("mlUserId", { length: 64 }),
  mlTokenExpiresAt: timestamp("mlTokenExpiresAt"),
  
  // Integração Amazon
  amazonAccessToken: text("amazonAccessToken"),
  amazonRefreshToken: text("amazonRefreshToken"),
  amazonSellerId: varchar("amazonSellerId", { length: 64 }),
  
  // Integração Shopee
  shopeeAccessToken: text("shopeeAccessToken"),
  shopeeRefreshToken: text("shopeeRefreshToken"),
  shopeeShopId: varchar("shopeeShopId", { length: 64 }),
  
  // Configurações de impostos
  icmsRate: int("icmsRate").default(18), // Percentual * 100 (ex: 18% = 1800)
  state: varchar("state", { length: 2 }).default("SP"),
  
  // Notificações
  emailNotifications: boolean("emailNotifications").default(true),
  lowStockAlert: boolean("lowStockAlert").default(true),
  lowStockThreshold: int("lowStockThreshold").default(10),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = typeof userSettings.$inferInsert;
