const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_SK);
const routes = express.Router({})
routes.post("/api/create-checkout-session", async (req, res) => {
        const products = req.body;
        console.log(req.body);
        const lineItems = products.map(product => ({
                price_data: {
                        currency: process.env.currency,
                        product_data: {
                               name:product.Name,
                               description:`${product.Name} has placed an order of frequency ${product.Frequency} with ${product.Bathrooms} bathrooms has Email id ${product.Email}`,
                        },
                        unit_amount: product.price * 100,
                },
                quantity: "1"
        }));
        // console.log(lineItems);
        const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: process.env.success_url,
                cancel_url: process.env.cancel_url,
        });

        res.json({ id: session.id })

})
module.exports = routes;
