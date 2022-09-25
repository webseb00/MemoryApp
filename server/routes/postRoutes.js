const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/authMiddleware')
const { getAllPosts, getSearchPosts, getPost, addPost, updatePost, deletePost, voteUpPost } = require('../controllers/postController')

router.get('/', getAllPosts)
router.get('/:method/:term', getSearchPosts)
router.get('/:id', getPost)
router.post('/', auth, addPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.put('/vote/:id', auth, voteUpPost)

module.exports = router;