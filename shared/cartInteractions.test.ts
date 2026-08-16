import { describe, expect, it } from "vitest";
import { addCartItem, cartCount, removeCartItem, updateCartQuantity } from "./cartInteractions";

type Item = { id: string; name: string; qty: number };

const serum: Omit<Item, "qty"> = { id: "01", name: "Clarity Serum" };

describe("cart interaction helpers", () => {
  it("adds a new item and increments the live cart count", () => {
    const next = addCartItem<Item>([], serum);
    expect(next).toEqual([{ ...serum, qty: 1 }]);
    expect(cartCount(next)).toBe(1);
  });

  it("increments an existing item instead of duplicating it", () => {
    const next = addCartItem<Item>([{ ...serum, qty: 1 }], serum);
    expect(next).toEqual([{ ...serum, qty: 2 }]);
    expect(cartCount(next)).toBe(2);
  });

  it("updates quantity without allowing zero and removes an item", () => {
    const initial = [{ ...serum, qty: 1 }];
    expect(updateCartQuantity(initial, serum.id, -1)).toEqual(initial);
    expect(updateCartQuantity(initial, serum.id, 2)[0]?.qty).toBe(3);
    expect(removeCartItem(initial, serum.id)).toEqual([]);
  });
});
