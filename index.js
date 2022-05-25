const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userController = require('./controllers/UserController')
const partsController = require('./controllers/PartsController')
const reviewsController = require('./controllers/ReviewController')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Manufacturer Website Server is Running')
})
app.put('/user/:email', userController.update_user)
app.get('/part', partsController.get_parts)
app.get('/part/search', partsController.get_part_by_name)

app.get('/review', reviewsController.get_reviews)

app.listen(port, () => {
  console.log('Server is Ruuning on port, ', port)
})
