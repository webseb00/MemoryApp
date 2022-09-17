const Comment = require('../models/Comment')
const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')

const addComment = asyncHandler(async (req, res) => {
  const { text, userID, postID } = req.body

  if(!text) {
    res.status(400)
    throw new Error('Field can not be empty!')
  }

  const comment = await Comment.create({
    text,
    user: userID,
    post: postID
  })

  const post = await Post.findById(postID)
  post.comments.push(comment._id)
  await post.save()

  if(comment) {
    res.status(200).json(comment)
  } else {
    res.status(400)
    throw new Error('Invalid credentials!')
  }
})

const getCommentsByPost = asyncHandler(async(req, res) => {
  const postID = req.params.id
 
  const comments = await Comment.find({ post: postID })
    .populate('user')

  if(comments) {
    res.status(200).json(comments)
  }
})

module.exports = {
  getCommentsByPost,
  addComment
}