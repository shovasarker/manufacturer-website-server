const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

exports.create_payment_intent = async (req, res) => {
  const service = req.body
  const price = service.price
  const amount = price * 100
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  })

  res.send({ clientSecret: paymentIntent.client_secret })
}
