// app/stripe/stripeUtils.ts
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY!;
console.log(stripeSecret)
const stripe = new Stripe('sk_test_51QKrHcEFa3x5KHkeLZ3GMlVoeC3FMG7P548PRqs2HifhLnLgZfaRerZuID33N3nbDVVROJLNnftyHhvybVXFS2eR00gwHrXO26', {
  apiVersion: '2024-10-28.acacia',
});

/**
 * Creates a Stripe Checkout Session
 * @param {number} price - The price in cents (e.g., 5000 for $50.00)
 * @param {string} origin - The origin URL for success and cancel URLs
 * @returns {Promise<Stripe.Checkout.Session>} The created Checkout Session
 */
export const createCheckoutSession = async (price: number, origin: string) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Sample Product" },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    return session;
  } catch (error) {
    throw new Error(`Checkout session creation failed: ${error}`);
  }
}

/**
 * Verifies a Stripe Checkout Session by ID
 * @param {string} sessionId - The Checkout Session ID to verify
 * @returns {Promise<Stripe.Checkout.Session>} The retrieved Checkout Session
 */
export const verifySession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    throw new Error(`Session verification failed: ${error}`);
  }
}
