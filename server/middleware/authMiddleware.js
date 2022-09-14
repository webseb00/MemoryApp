const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const auth = asyncHandler(async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || '')

  if(cookies.token) {
    try {
      const decoded = jwt.decode(cookies.token, process.env.JWT_TOKEN)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch(err) {
      throw new Error(err)
    }
  }

  if(!cookies.token) {
    res.status(401)
    throw new Error('Authorization denied! No token provided!')
  }
})

module.exports = {
  auth
}