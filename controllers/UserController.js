const client = require('../client.js')
const jwt = require('jsonwebtoken')
const getCollection = async () => {
  await client.connect()
  const userCollection = client.db('abacus-parts').collection('users')
  return userCollection
}

exports.update_user = async (req, res) => {
  try {
    const collection = await getCollection()
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

    const result = await collection.updateOne(filter, updatedDoc, options)

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    })

    res.send({ result, accessToken: accessToken })
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
