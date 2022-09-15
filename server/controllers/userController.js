const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const cookie = require('cookie')

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if(!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please fill properly all fields!')
  }

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('User with this email already exists!')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials!')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400)
    throw new Error('Please fill all fields!')
  }

  const user = await User.findOne({ email })

  if(!user) {
    res.status(400)
    throw new Error('User not found!')
  }

  const comparePassword = await bcrypt.compare(password, user.password)
  
  if(comparePassword) {
    const token = createToken(user._id)

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      maxAge: 60*60,
      sameSite: false,
      path: '/'
    }))

    const { _id, firstName, lastName, email } = user

    res.status(200).json({ _id, firstName, lastName, email })
  } else {
    res.status(404)
    throw new Error('Invalid password!')
  }
})

const getUser = asyncHandler(async (req, res) => {
  const userID = req.params.id
  
  const user = await User.findById(userID).select('-password')

  if(!user) {
    res.status(404)
    throw new Error(`User with ID: ${userID} not found!`)
  }

  res.status(200).json(user);
})

const logoutUser = (req, res) => {
  res.status(200).clearCookie('token', {
    path: '/'
  }).json('User logout!')
}

const createToken = id => jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: 60 * 60 });

module.exports = {
  registerUser,
  loginUser,
  getUser,
  logoutUser
}