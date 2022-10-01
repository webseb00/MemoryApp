const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')

const getAllPosts = asyncHandler(async (req, res) => {
  const { num, limit } = req.query
  const pageOptions = {
    page: Number(num),
    limit: Number(limit)
  }
  
  const posts = await Post.find({})
    .skip((pageOptions.page-1) * pageOptions.limit)
    .limit(pageOptions.limit)
  
  const count = await Post.countDocuments()
  
  res.status(200).json({
    posts,
    totalPages: Math.ceil(count/limit),
    currentPage: num
  })
})

const getSearchPosts = asyncHandler(async (req, res) => {
  const method = req.params.method
  let posts;

  if(method === 'title') {
    posts = await Post.find({ "title": { "$regex": req.body.term, "$options": "i" } }).exec()
  } else {
    let filter = { tags: req.body.tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };

    posts = await Post.find(filter).exec()
  }

  if(!posts) {
    res.status(400)
    throw new Error('No posts found...')
  }

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

  let { title, description, tags, thumbnail } = req.body

  if(!thumbnail) thumbnail = post.thumbnail

  if(!title || !description || !tags) {
    res.status(400)
    throw new Error('Please fill all required fields!')
  }

  const newPost = { title, description, tags, thumbnail }

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

const voteUpPost = asyncHandler(async (req, res) => {
  const postID = req.params.id
  const userID = req.body.userID

  const post = await Post.findById(postID)

  if(!post) {
    res.status(400)
    throw new Error(`Post with ID: ${postID} not found!`)
  }

  const updatedPost = await Post.findByIdAndUpdate(postID, { votes: userID }, { new: true })

  res.status(200).json({ msg: "Post up voted!" })
})

module.exports = {
  getAllPosts,
  getSearchPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  voteUpPost
}