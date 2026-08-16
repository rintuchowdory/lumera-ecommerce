export type CartItem = { id: string; qty: number; [key: string]: unknown };

export function addCartItem<T extends CartItem>(items: T[], item: Omit<T, "qty">): T[] {
  const existing = items.find((entry) => entry.id === item.id);
  return existing
    ? items.map((entry) => entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry)
    : [...items, { ...item, qty: 1 } as T];
}

export function updateCartQuantity<T extends CartItem>(items: T[], id: string, delta: number): T[] {
  return items.map((entry) => entry.id === id ? { ...entry, qty: Math.max(1, entry.qty + delta) } : entry);
}

export function removeCartItem<T extends CartItem>(items: T[], id: string): T[] {
  return items.filter((entry) => entry.id !== id);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.qty, 0);
}
