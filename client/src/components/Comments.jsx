import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CommentItem } from './index'

const Comments = ({ postID, userID }) => {

  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const { data } = await axios.get(`/api/comment/${postID}`)
    setComments([ ...data ])
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(!text) {
      return
    }

    const obj = {
      text,
      postID,
      userID
    }

    await axios.post('/api/comment', obj)
    setText('')
    fetchComments()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea 
              id="comment" 
              rows="4" 
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
              placeholder="Write a comment..." 
              required
              name="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
            <button 
              type="submit" 
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center 
              text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 
              dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Add comment
            </button>
          </div>
        </div>
      </form>
      <ul>
        {comments ? 
        comments.map(item => (
          <CommentItem key={item._id} {...item} />
        )) : 'No comments found...'}
      </ul>
    </div>
  )
}

Comments.propTypes = {
  userID: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired
}

export default Comments