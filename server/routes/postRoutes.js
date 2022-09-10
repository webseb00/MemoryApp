const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/authMiddleware')
const { getAllPosts, getPost, addPost, updatePost, deletePost } = require('../controllers/postController')

router.get('/', getAllPosts)
router.get('/:id', getPost)
router.post('/', auth, addPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router;