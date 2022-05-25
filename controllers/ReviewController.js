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
