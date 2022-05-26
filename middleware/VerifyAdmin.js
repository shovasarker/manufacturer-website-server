const client = require('../client')

module.exports = async (req, res, next) => {
  try {
    await client.connect()
    const userCollection = client.db('abacus-parts').collection('users')
    const requestor = req.decoded.email
    const query = { email: requestor }
    const requestorAccount = await userCollection.findOne(query)

    if (requestorAccount.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden Request' })
    }

    next()
  } catch (error) {
  } finally {
    await client.close()
  }
}
