const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/authMiddleware')
const { getAllPosts, getSearchPosts, getPost, addPost, updatePost, deletePost, voteUpPost } = require('../controllers/postController')

router.get('/:page', getAllPosts)
router.post('/', auth, addPost)
router.get('/:id', getPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.put('/vote/:id', auth, voteUpPost)
router.post('/:method', getSearchPosts)

module.exports = router;