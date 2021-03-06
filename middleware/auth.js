const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function (req, res, next) {
  console.log('11')
  const token = req.header('x-auth-token')
  
  if (!token) {
    return res.status(401).json({ msg: "authorization denied" })
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user;
    next()
  }
  catch (e) {
    res.status(401).json({ msg: "token is not valid" })
  }
}