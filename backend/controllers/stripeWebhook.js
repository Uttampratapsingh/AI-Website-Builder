import stripe from "../config/stripe.js";
import User from "../models/user.js";

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Stripe event received:", event);
        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }


    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const credits = parseInt(session.metadata.credits);
        const plan = session.metadata.plan;

        await User.findByIdAndUpdate(userId, {
            $inc: {credits},
            plan,
        });
    }

    return res.status(200).json({received: true});
}