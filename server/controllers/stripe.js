const prisma = require("../config/prisma")
const stripe = require("stripe")('sk_test_51QKAHBBtYe1fvsQVtUftKaIWMiVTtAetWgd4lafKPrc1pQzCTJvPUTafyJTfSHWhUFMbzZ6cEcw5kpEID03YIpA400WLGrdEQy');

exports.payment = async (req, res) => {
    try {
        //code
        // Check user
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: req.user.orderedById
            }
        })
        const amountTHB = cart.cartTotal*100

        const paymentIntent = await stripe.paymentIntents.create({
            //amount: calculateOrderAmount(items),
            amount: amountTHB,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!" })
    }
}