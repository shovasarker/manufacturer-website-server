const express = require('express')
const cors = require('cors')
require('dotenv').config()
const client = require('./client')
const userController = require('./controllers/UserController')
const partsController = require('./controllers/PartsController')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Manufacturer Website Server is Running')
})

const run = async () => {
  try {
    await client.connect()
    app.put('/user/:email', userController.update_user)

    app.get('/part', partsController.get_parts)
  } finally {
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log('Server is Ruuning on port, ', port)
})
