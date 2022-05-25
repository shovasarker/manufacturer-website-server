const client = require('../client.js')
const { ObjectId } = require('mongodb')

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

exports.get_part_by_name = async (req, res) => {
  try {
    const collection = await getCollection()
    const { name } = req.query
    const query = {}
    const result = await collection.find(query).toArray()

    const parts = result.filter((part) =>
      part?.name.toLowerCase().includes(name)
    )

    res.send(parts)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
exports.get_part_by_id = async (req, res) => {
  try {
    const collection = await getCollection()
    const { id } = req.params
    const filter = { _id: ObjectId(id) }
    const result = await collection.findOne(filter)

    res.send(result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
