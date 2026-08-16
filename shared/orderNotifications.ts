export type DemoOrder = {
  orderId: string;
  customerEmail: string;
  customerName?: string;
  totalEur: number;
};

export type DemoNotification = {
  id: string;
  orderId: string;
  event: 'order.confirmed' | 'order.received' | 'order.shipped';
  recipient: string;
  subject: string;
  status: 'demo-queued';
  createdAt: number;
};

const OWNER_EMAIL = 'RintuChowdory@yahoo.com';

export function createDemoOrderNotifications(order: DemoOrder, now = Date.now()): DemoNotification[] {
  const customerName = order.customerName?.trim() || 'there';
  return [
    {
      id: `${order.orderId}:customer-confirmation`,
      orderId: order.orderId,
      event: 'order.confirmed',
      recipient: order.customerEmail,
      subject: `Your Luméra order ${order.orderId} is confirmed`,
      status: 'demo-queued',
      createdAt: now,
    },
    {
      id: `${order.orderId}:owner-alert`,
      orderId: order.orderId,
      event: 'order.received',
      recipient: OWNER_EMAIL,
      subject: `New Luméra order ${order.orderId} from ${customerName}`,
      status: 'demo-queued',
      createdAt: now,
    },
    {
      id: `${order.orderId}:shipment`,
      orderId: order.orderId,
      event: 'order.shipped',
      recipient: order.customerEmail,
      subject: `Your Luméra order ${order.orderId} is on its way`,
      status: 'demo-queued',
      createdAt: now,
    },
  ];
}

export function getDemoNotificationSummary(notifications: DemoNotification[]) {
  return {
    total: notifications.length,
    recipients: Array.from(new Set(notifications.map(notification => notification.recipient))),
    allDemoQueued: notifications.every(notification => notification.status === 'demo-queued'),
  };
}
