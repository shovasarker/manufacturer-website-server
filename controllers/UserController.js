const client = require('../client.js')
const jwt = require('jsonwebtoken')

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

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  })

  res.send({ result, accessToken: accessToken })
}
