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

exports.get_order_by_email = async (req, res) => {
  try {
    const collection = await getCollection()
    const { email } = req.params
    const decodedEmail = req.decoded.email
    if (email !== decodedEmail)
      return res.status(403).send({ message: 'Forbidden Access' })

    const query = { email: email }
    const result = await collection.find(query).toArray()

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
