import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId"),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  type: varchar("type", { length: 120 }).notNull(),
  description: text("description"),
  ingredients: text("ingredients"),
  imageUrl: text("imageUrl"),
  priceCents: int("priceCents").notNull(),
  popularity: int("popularity").default(0).notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  sessionKey: varchar("sessionKey", { length: 128 }).notNull().unique(),
  status: mysqlEnum("status", ["active", "converted", "abandoned"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  cartId: int("cartId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  orderId: int("orderId"),
  fullName: varchar("fullName", { length: 180 }).notNull(),
  line1: varchar("line1", { length: 240 }).notNull(),
  line2: varchar("line2", { length: 240 }),
  postalCode: varchar("postalCode", { length: 32 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  email: varchar("email", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "shipped", "cancelled"]).default("pending").notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  totalCents: int("totalCents").notNull(),
  shippingCents: int("shippingCents").default(0).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId"),
  productName: varchar("productName", { length: 180 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPriceCents: int("unitPriceCents").notNull(),
});

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 120 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  userId: int("userId"),
  rating: int("rating"),
  body: text("body"),
  isPublished: int("isPublished").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;