import { describe, expect, it } from 'vitest';
import { calculateShipping, calculateSubtotal, calculateTotal, demoNotificationRecipients } from '../shared/store';

describe('Luméra commerce helpers', () => {
  it('calculates EUR line totals', () => {
    expect(calculateSubtotal([{ price: 42, qty: 1 }, { price: 38, qty: 2 }])).toBe(118);
  });

  it('applies the EUR 60 complimentary shipping threshold', () => {
    expect(calculateShipping(59.99)).toBe(4.9);
    expect(calculateShipping(60)).toBe(0);
  });

  it('calculates stable totals', () => {
    expect(calculateTotal([{ price: 26, qty: 1 }])).toBe(30.9);
  });

  it('keeps order notification delivery in demo mode', () => {
    expect(demoNotificationRecipients('RintuChowdory@yahoo.com', 'customer@example.com').mode).toBe('demo');
  });
});
