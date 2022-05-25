const client = require('../client.js')
const partsCollection = client.db('abacus-parts').collection('parts')

exports.get_parts = async (req, res) => {
  const query = {}
  const result = await partsCollection.find(query).toArray()

  res.send(result)
}
