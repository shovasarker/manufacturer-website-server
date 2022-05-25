const express = require('express')
const cors = require('cors')
require('dotenv').config()
const client = require('./client')
const userController = require('./controllers/UserController')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Manufacturer Website Server is Running')
})

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fiys1.mongodb.net/?retryWrites=true&w=majority`
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// })

const run = async () => {
  try {
    await client.connect()
    app.put('/user/:email', userController.update_user)
  } finally {
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log('Server is Ruuning on port, ', port)
})
