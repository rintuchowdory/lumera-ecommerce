import { describe, expect, it } from 'vitest';
import { createDemoOrder, markDemoOrderShipped, notificationsForOrderCreated } from '../shared/orderLifecycle';

describe('demo order lifecycle', () => {
  it('queues only confirmation and owner alert when the order is created', () => {
    const order = createDemoOrder({ orderId: 'LM-1', customerEmail: 'customer@example.com', totalEur: 84 }, 100);
    expect(order.status).toBe('confirmed');
    expect(notificationsForOrderCreated(order).map(event => event.event)).toEqual(['order.confirmed', 'order.received']);
  });

  it('queues shipment only when an order transitions to shipped', () => {
    const order = createDemoOrder({ orderId: 'LM-2', customerEmail: 'customer@example.com', totalEur: 42 }, 100);
    const transition = markDemoOrderShipped(order, 200);
    expect(transition.order).toMatchObject({ status: 'shipped', shippedAt: 200 });
    expect(transition.notification).toMatchObject({ event: 'order.shipped', recipient: 'customer@example.com', createdAt: 200 });
  });

  it('does not duplicate shipment notifications', () => {
    const order = createDemoOrder({ orderId: 'LM-3', customerEmail: 'customer@example.com', totalEur: 42 }, 100);
    const shipped = markDemoOrderShipped(order, 200).order;
    expect(markDemoOrderShipped(shipped, 300).notification).toBeNull();
  });
});
