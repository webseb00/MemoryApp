const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
  text: {
    type: String,
    trime: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Memory'
  }},
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentModel)

module.exports = Comment