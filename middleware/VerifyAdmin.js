module.exports = async (req, res, next) => {
  const isAdmin = req.decoded.isAdmin

  if (!isAdmin) {
    return res.status(403).send({ message: 'Forbidden Request' })
  }

  next()
}
