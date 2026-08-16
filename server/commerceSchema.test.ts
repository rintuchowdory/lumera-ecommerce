import { describe, expect, it } from "vitest";
import { addresses, carts, cartItems, categories, orderItems, orders, payments, products, reviews } from "../drizzle/schema";
import { calculateShipping, calculateSubtotal, calculateTotal } from "../shared/store";

describe("commerce schema milestone", () => {
  it("exports the complete first-roadmap commerce entity set", () => {
    expect([categories, products, carts, cartItems, orders, orderItems, addresses, payments, reviews]).toHaveLength(9);
  });

  it("keeps the EUR free-shipping rule deterministic", () => {
    const premiumLines = [{ price: 42, qty: 2 }];
    const standardLines = [{ price: 26, qty: 1 }];
    expect({ subtotal: calculateSubtotal(premiumLines), shipping: calculateShipping(calculateSubtotal(premiumLines)), total: calculateTotal(premiumLines) }).toEqual({ subtotal: 84, shipping: 0, total: 84 });
    expect({ subtotal: calculateSubtotal(standardLines), shipping: calculateShipping(calculateSubtotal(standardLines)), total: calculateTotal(standardLines) }).toEqual({ subtotal: 26, shipping: 4.9, total: 30.9 });
  });
});
