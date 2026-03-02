import stripe from "../config/stripe.js";
import User from "../models/user.js";

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Stripe event received:", event.type);
    } catch (error) {
        console.error("Error verifying webhook signature:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const credits = parseInt(session.metadata.credits);
            const plan = session.metadata.plan;

            console.log(`Updating user ${userId}: +${credits} credits, plan: ${plan}`);

            await User.findByIdAndUpdate(userId, {
                $inc: { credits },
                plan,
            });

            console.log(`User ${userId} updated successfully`);
        }
    } catch (error) {
        console.error("Error processing webhook event:", error);
        return res.status(500).json({ error: "Webhook processing failed" });
    }

    return res.status(200).json({ received: true });
}