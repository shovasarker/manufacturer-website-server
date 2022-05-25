const client = require('../client.js')

exports.get_parts = async (req, res) => {
  try {
    await client.connect()
    const partsCollection = client.db('abacus-parts').collection('parts')
    const query = {}
    const result = await partsCollection.find(query).toArray()

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
