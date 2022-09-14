const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})

  res.status(200).json(posts)
})

const getPost = asyncHandler(async (req, res) => {
  const postID = req.params.id

  const post = await Post.findById(postID)
  
  if(!post) {
    res.status(400)
    throw new Error(`Post with ID: ${postID} not found!`)
  }

  res.status(200).json(post)
})

const addPost = asyncHandler(async (req, res) => {
  const { title, description, thumbnail, tags, user } = req.body

  if(!title || !description || !thumbnail || !tags) {
    res.status(400)
    throw new Error('Please fill all required fields!')
  }

  const post = await Post.create({
    title,
    description,
    thumbnail,
    tags,
    user
  })
  
  if(post) {
    res.status(200).json(post)
  } else {
    res.status(400)
    throw new Error('Invalid credentials!')
  }
})  

const updatePost = asyncHandler(async (req, res) => {
  const postID = req.params.id

  const post = await Post.findById(postID)

  if(!post) {
    res.status(400)
    throw new Error(`Post with ID: ${postID} not found!`)
  }

  const { title, description, thumbnail, tags } = req.body

  if(!title || !description || !thumbnail || !tags) {
    res.status(400)
    throw new Error('Please fill all required fields!')
  }

  const newPost = { title, description, thumbnail, tags }

  const updatedPost = await Post.findByIdAndUpdate(postID, newPost, { new: true })

  res.status(200).json(updatedPost)
})

const deletePost = asyncHandler(async (req, res) => {
  const postID = req.params.id

  const post = await Post.findById(postID)

  if(!post) {
    res.status(400)
    throw new Error(`Post with ID: ${postID} not found!`)
  }

  await post.remove()

  res.status(200).json('Post deleted!')
})

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
}