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

    const admin = await collection.findOne({ email: user?.email })
    const isAdmin = admin?.role === 'admin'
    const accessToken = jwt.sign(
      { ...user, isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res.send({ result, accessToken: accessToken })
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

exports.get_users = async (req, res) => {
  try {
    const collection = await getCollection()
    const users = await collection.find({}).toArray()

    res.send(users)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

exports.check_admin = async (req, res) => {
  try {
    const collection = await getCollection()
    const { email } = req.params
    const user = await collection.findOne({ email })
    const isAdmin = user.role === 'admin'

    res.send({ admin: isAdmin })
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

module.verify_admin = async (req, res, next) => {
  try {
    const collection = await getCollection()
    const requestor = req.decoded.email
    const query = { email: requestor }
    const requestorAccount = await collection.findOne(query)

    if (requestorAccount.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden Request' })
    }

    next()
  } catch (error) {
  } finally {
    await client.close()
  }
}
