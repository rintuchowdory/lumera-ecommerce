export type CartLine = { price: number; qty: number };

export function calculateSubtotal(lines: CartLine[]): number {
  return Number(lines.reduce((sum, line) => sum + line.price * line.qty, 0).toFixed(2));
}

export function calculateShipping(subtotal: number): number {
  return subtotal === 0 || subtotal >= 60 ? 0 : 4.9;
}

export function calculateTotal(lines: CartLine[]): number {
  const subtotal = calculateSubtotal(lines);
  return Number((subtotal + calculateShipping(subtotal)).toFixed(2));
}

export function demoNotificationRecipients(ownerEmail: string, customerEmail: string) {
  return { owner: ownerEmail, customer: customerEmail, mode: 'demo' as const };
}
