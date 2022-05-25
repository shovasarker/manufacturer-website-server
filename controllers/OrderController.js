const client = require('../client.js')
const { ObjectId } = require('mongodb')

const getCollection = async () => {
  await client.connect()
  const orderCollection = client.db('abacus-parts').collection('orders')
  return orderCollection
}

exports.add_new_order = async (req, res) => {
  try {
    const collection = await getCollection()
    const order = req.body
    const newOrder = {
      ...order,
      paid: false,
      status: 'Unpaid',
    }
    const result = await collection.insertOne(newOrder)

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
