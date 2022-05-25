const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  if (!authHeader)
    return res.status(401).send({ message: 'Unauthorized Access' })

  const accessToken = authHeader.split(' ')[1]

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(403).send({ message: 'Forbidden Access' })

    req.decoded = decoded
    next()
  })
}
