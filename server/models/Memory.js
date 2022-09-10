const mongoose = require('mongoose')

const memoryModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add title value!']
  },
  description: {
    type: String,
    required: [true, 'Please add description!']
  },
  thumbnail: {
    type: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  meta: {
    votes: [{ type: Number, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }},
  {
    virtuals: {
      getVotesNumber: {
        get() {
          return this.meta.votes.reduce((a, b) => a + b, 0);
        }
      }
    }
  },
  { timestamps: true }  
)

const Memory = mongoose.model('Memory', memoryModel)

module.exports = Memory