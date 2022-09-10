const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your last name']
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add your password']
  }},
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User