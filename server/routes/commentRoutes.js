const express = require('express')
const router = express.Router()
const { getCommentsByPost, addComment } = require('../controllers/commentController')

router.get('/:id', getCommentsByPost)
router.post('/', addComment)

module.exports = router;