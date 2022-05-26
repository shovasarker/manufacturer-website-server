const client = require('../client.js')
const { ObjectId } = require('mongodb')

const getCollection = async () => {
  await client.connect()
  const orderCollection = client.db('abacus-parts').collection('orders')
  return orderCollection
}

const getPaymentCollection = async () => {
  const paymentCollection = client.db('abacus-parts').collection('payments')
  return paymentCollection
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

exports.get_all_orders = async (req, res) => {
  try {
    const collection = await getCollection()
    const query = {}
    const result = await collection.find(query).toArray()

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

exports.get_order_by_id = async (req, res) => {
  try {
    const collection = await getCollection()
    const { id } = req.params
    const query = { _id: ObjectId(id) }
    const result = await collection.findOne(query)

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

exports.update_order_by_id = async (req, res) => {
  try {
    const collection = await getCollection()
    const paymentColletion = await getPaymentCollection()
    const { id } = req.params
    const payment = req.body
    const filter = { _id: ObjectId(id) }
    const updatedDoc = {
      $set: {
        paid: true,
        status: 'Pending',
        transactionId: payment.transactionId,
      },
    }
    const updatedBooking = await collection.updateOne(filter, updatedDoc)

    const result = await paymentColletion.insertOne(payment)

    res.send(updatedBooking)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

exports.delete_order_by_id = async (req, res) => {
  try {
    const collection = await getCollection()
    const { id } = req.params

    const filter = { _id: ObjectId(id) }
    const result = await collection.deleteOne(filter)

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
