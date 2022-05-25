const { connect } = require('../client.js')
const client = require('../client.js')

const partsCollection = client.db('abacus-parts').collection('parts')

exports.get_parts = async (req, res) => {
  try {
    await client.connect()
    const query = {}
    const result = await partsCollection.find(query).toArray()

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await connect.close()
  }
}
