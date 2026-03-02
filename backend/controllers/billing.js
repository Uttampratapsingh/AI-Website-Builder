import {plans}  from "../Template/plans.js";


export const billing = async (req, res) => {
    console.log("Billing controller hit");
    try {
        const {planType} = req.body;
        console.log("Plan type: ", planType);
        const userId = req.user._id;
        const plan = plans[planType];
        if(!plan || plan.price==0) {
            return res.status(400).json({message: "Invalid plan type"});
        }

        const session = stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name : `GetWeb.ai ${planType} Plan`,
                        },
                        unit_amount: plan.price * 100,
                    },
                    quantity: 1,
                }
            ],
            metadata:{
                userId: userId.toString(),
                credits: plan.credits,
                plan: plan.plan,
                success_url: `${process.env.FRONTEND_URL}/`,
                cancel_url: `${process.env.FRONTEND_URL}/pricing`
    
            }
        })

        return res.status(200).json({sessionUrl: session.url});

    } catch (error) {
        console.error("Error in billing controller: ", error);
        return res.status(500).json({message: "Internal server error in billing controller"});        
    }
}