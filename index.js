const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userController = require('./controllers/UserController')
const partsController = require('./controllers/PartsController')
const reviewsController = require('./controllers/ReviewController')
const ordersController = require('./controllers/OrderController')
const paymentController = require('./controllers/PaymentController')
const VerifyJWT = require('./middleware/VerifyJWT')
const VerifyAdmin = require('./middleware/VerifyAdmin')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Manufacturer Website Server is Running')
})
app.put('/user/:email', userController.update_user)
app.get('/user', VerifyJWT, VerifyAdmin, userController.get_users)
app.get('/admin/:email', VerifyJWT, userController.check_admin)

app.put('/user/admin/:email', VerifyJWT, VerifyAdmin, userController.make_admin)

app.get('/part', partsController.get_parts)
app.get('/part/search', partsController.get_part_by_name)
app.get('/part/:id', partsController.get_part_by_id)

app.post('/review', VerifyJWT, reviewsController.add_review)
app.get('/review', reviewsController.get_reviews)
app.get('/review/:email', VerifyJWT, reviewsController.get_reviews_by_email)

app.post('/order', VerifyJWT, ordersController.add_new_order)
app.get('/order/:email', VerifyJWT, ordersController.get_order_by_email)
app.get('/orders/:id', VerifyJWT, ordersController.get_order_by_id)
app.patch('/order/:id', VerifyJWT, ordersController.update_order_by_id)
app.delete('/order/:id', VerifyJWT, ordersController.delete_order_by_id)

app.post(
  '/create-payment-intent',
  VerifyJWT,
  paymentController.create_payment_intent
)

app.listen(port, () => {
  console.log('Server is Ruuning on port, ', port)
})
