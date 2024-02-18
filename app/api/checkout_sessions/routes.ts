// import { Stripe, loadStripe } from '@stripe/stripe-js';
import { NextRequest } from 'next/server';
// Partial of ./pages/api/checkout_sessions/index.ts
// ...

export async function GET(request: NextRequest) {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // })
  // const data = await res.json()
  // Create Checkout Sessions from body params.
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Custom amount donation',
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
        quantity: 1,
      },
    ],

    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
  // ...

  return Response.json(data);
}
