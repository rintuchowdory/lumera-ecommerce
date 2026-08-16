import { describe, expect, it } from 'vitest';
import { createDemoOrderNotifications, getDemoNotificationSummary } from '../shared/orderNotifications';

describe('demo order lifecycle notifications', () => {
  it('queues confirmation, owner alert, and shipment events', () => {
    const events = createDemoOrderNotifications({
      orderId: 'LM-2026-0001',
      customerEmail: 'customer@example.com',
      customerName: 'Rintu',
      totalEur: 84,
    }, 123);

    expect(events).toHaveLength(3);
    expect(events.map(event => event.event)).toEqual([
      'order.confirmed',
      'order.received',
      'order.shipped',
    ]);
    expect(events.map(event => event.recipient)).toEqual([
      'customer@example.com',
      'RintuChowdory@yahoo.com',
      'customer@example.com',
    ]);
    expect(events.every(event => event.status === 'demo-queued')).toBe(true);
    expect(events.every(event => event.createdAt === 123)).toBe(true);
  });

  it('summarizes demo delivery without using an email provider', () => {
    const summary = getDemoNotificationSummary(createDemoOrderNotifications({
      orderId: 'LM-2026-0002',
      customerEmail: 'customer@example.com',
      totalEur: 42,
    }));

    expect(summary).toEqual({
      total: 3,
      recipients: ['customer@example.com', 'RintuChowdory@yahoo.com'],
      allDemoQueued: true,
    });
  });
});
