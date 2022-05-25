const client = require('../client.js')

const getCollection = async () => {
  await client.connect()
  const reviewsCollection = client.db('abacus-parts').collection('reviews')
  return reviewsCollection
}

exports.get_reviews = async (req, res) => {
  try {
    const collection = await getCollection()
    const sort = { createdAt: -1 }
    const query = {}
    const result = await collection.find(query).sort(sort).limit(6).toArray()

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
exports.get_reviews_by_email = async (req, res) => {
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
