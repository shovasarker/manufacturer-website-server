const express = require('express')
const cors = require('cors')
require('dotenv').config()
const client = require(__dirname + '/client')
const userController = require(__dirname + '/controllers/UserController')
const partsController = require(__dirname + '/controllers/PartsController')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Manufacturer Website Server is Running')
})

const run = async () => {
  try {
    // await client.connect()
    app.put('/user/:email', userController.update_user)

    app.get('/part', (req, res) => {
      console.log(userController, partsController, client)
    })
  } finally {
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log('Server is Ruuning on port, ', port)
})
