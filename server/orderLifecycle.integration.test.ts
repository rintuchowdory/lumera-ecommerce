import { describe, expect, it } from 'vitest';
import { createDemoOrder, markDemoOrderShipped, notificationsForOrderCreated } from '../shared/orderLifecycle';

type DemoStorage = { order: string; notifications: string };

function persist(order: unknown, notifications: unknown): DemoStorage {
  return { order: JSON.stringify(order), notifications: JSON.stringify(notifications) };
}

function restore(storage: DemoStorage) {
  return { order: JSON.parse(storage.order), notifications: JSON.parse(storage.notifications) };
}

describe('demo order lifecycle across screens', () => {
  it('persists checkout creation, admin shipping, and customer timeline after reload', () => {
    const created = createDemoOrder({ orderId: 'LM-INTEGRATION', customerEmail: 'customer@example.com', totalEur: 84 }, 100);
    let storage = persist(created, notificationsForOrderCreated(created, 100));

    const checkoutAfterCreate = restore(storage);
    expect(checkoutAfterCreate.order.status).toBe('confirmed');
    expect(checkoutAfterCreate.notifications.map((event: { event: string }) => event.event)).toEqual(['order.confirmed', 'order.received']);

    const shipped = markDemoOrderShipped(checkoutAfterCreate.order, 200);
    storage = persist(shipped.order, [...checkoutAfterCreate.notifications, shipped.notification]);

    const customerAfterReload = restore(storage);
    expect(customerAfterReload.order.status).toBe('shipped');
    expect(customerAfterReload.notifications.map((event: { event: string }) => event.event)).toEqual(['order.confirmed', 'order.received', 'order.shipped']);
    expect(customerAfterReload.notifications[2].recipient).toBe('customer@example.com');
  });
});
