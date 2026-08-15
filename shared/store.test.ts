import { describe, expect, it } from 'vitest';
import { calculateShipping, calculateSubtotal, calculateTotal, demoNotificationRecipients } from './store';

describe('Luméra cart calculations', () => {
  it('calculates a EUR subtotal from line quantities', () => {
    expect(calculateSubtotal([{ price: 42, qty: 1 }, { price: 38, qty: 2 }])).toBe(118);
  });

  it('applies complimentary shipping at sixty euros', () => {
    expect(calculateShipping(59.99)).toBe(4.9);
    expect(calculateShipping(60)).toBe(0);
    expect(calculateShipping(0)).toBe(0);
  });

  it('calculates a complete total without floating point drift', () => {
    expect(calculateTotal([{ price: 26, qty: 1 }, { price: 34, qty: 1 }])).toBe(60);
    expect(calculateTotal([{ price: 26, qty: 1 }])).toBe(30.9);
  });

  it('keeps notification delivery in explicit demo mode', () => {
    expect(demoNotificationRecipients('RintuChowdory@yahoo.com', 'customer@example.com')).toEqual({
      owner: 'RintuChowdory@yahoo.com',
      customer: 'customer@example.com',
      mode: 'demo',
    });
  });
});
