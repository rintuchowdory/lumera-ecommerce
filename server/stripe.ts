import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-07-29.dahlia' })
  : null;

export type CheckoutLine = { name: string; description: string; unitAmountEur: number; quantity: number };

export async function createHostedCheckoutSession(input: {
  origin: string;
  customerEmail: string;
  userId: number;
  customerName?: string | null;
  lines: CheckoutLine[];
}) {
  if (!stripe) return { mode: 'demo' as const, url: null };
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: input.customerEmail,
    client_reference_id: String(input.userId),
    allow_promotion_codes: true,
    line_items: input.lines.map(line => ({
      quantity: line.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(line.unitAmountEur * 100),
        product_data: { name: line.name, description: line.description },
      },
    })),
    metadata: {
      user_id: String(input.userId),
      customer_email: input.customerEmail,
      customer_name: input.customerName ?? '',
      notification_mode: 'demo',
      owner_alert_email: 'RintuChowdory@yahoo.com',
    },
    success_url: `${input.origin}/checkout?success=1`,
    cancel_url: `${input.origin}/checkout?cancelled=1`,
  });
  return { mode: 'stripe' as const, url: session.url };
}
