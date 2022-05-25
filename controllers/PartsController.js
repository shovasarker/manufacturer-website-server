const client = require('../client.js')

const getCollection = async () => {
  await client.connect()
  const partsCollection = client.db('abacus-parts').collection('parts')
  return partsCollection
}

exports.get_parts = async (req, res) => {
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
