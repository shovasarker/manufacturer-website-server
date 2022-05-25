const client = require('../client.js')
const { ObjectId } = require('mongodb')

const getCollection = async () => {
  await client.connect()
  const bookingCollection = client.db('abacus-parts').collection('bookings')
  return bookingCollection
}

exports.add_booking = async (req, res) => {
  try {
    const collection = await getCollection()
    const newBooking = req.body
    const result = await collection.insertOne(newBooking)

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
