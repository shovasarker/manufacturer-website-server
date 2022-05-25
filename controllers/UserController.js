const client = require('../client.js')

const userCollection = client.db('abacus-parts').collection('users')

exports.update_user = async (req, res) => {
  const user = req.body
  const { email } = req.params
  const filter = { email: email }
  const options = {
    upsert: true,
  }

  const updatedDoc = {
    $set: {
      ...user,
      lastLoggedIn: new Date(),
    },
  }

  const result = await userCollection.updateOne(filter, updatedDoc, options)

  res.send(result)
}
