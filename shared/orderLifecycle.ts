export type DemoOrderStatus = 'confirmed' | 'shipped';
export type DemoOrder = {
  orderId: string;
  customerEmail: string;
  customerName?: string;
  totalEur: number;
  status: DemoOrderStatus;
  createdAt: number;
  shippedAt?: number;
};

export type DemoOrderNotification = {
  id: string;
  orderId: string;
  event: 'order.confirmed' | 'order.received' | 'order.shipped';
  recipient: string;
  subject: string;
  status: 'demo-queued';
  createdAt: number;
};

const OWNER_EMAIL = 'RintuChowdory@yahoo.com';

export function createDemoOrder(input: Omit<DemoOrder, 'status' | 'createdAt'>, now = Date.now()): DemoOrder {
  return { ...input, status: 'confirmed', createdAt: now };
}

export function notificationsForOrderCreated(order: DemoOrder, now = order.createdAt): DemoOrderNotification[] {
  return [
    { id: `${order.orderId}:customer-confirmation`, orderId: order.orderId, event: 'order.confirmed', recipient: order.customerEmail, subject: `Your Luméra order ${order.orderId} is confirmed`, status: 'demo-queued', createdAt: now },
    { id: `${order.orderId}:owner-alert`, orderId: order.orderId, event: 'order.received', recipient: OWNER_EMAIL, subject: `New Luméra order ${order.orderId}`, status: 'demo-queued', createdAt: now },
  ];
}

export function markDemoOrderShipped(order: DemoOrder, now = Date.now()): { order: DemoOrder; notification: DemoOrderNotification | null } {
  if (order.status === 'shipped') return { order, notification: null };
  const nextOrder = { ...order, status: 'shipped' as const, shippedAt: now };
  return {
    order: nextOrder,
    notification: { id: `${order.orderId}:shipment`, orderId: order.orderId, event: 'order.shipped', recipient: order.customerEmail, subject: `Your Luméra order ${order.orderId} is on its way`, status: 'demo-queued', createdAt: now },
  };
}
