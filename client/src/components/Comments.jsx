import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Comments = ({ postID, userID }) => {

  const [form, setForm] = useState({
    comment: ''
  })

  const handleSubmit = e => {
    e.preventDefault();


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
              value={form.comment}
              onChange={(e) => setForm({ comment: e.target.value })}
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
        comments list
      </ul>
    </div>
  )
}

Comments.propTypes = {
  userID: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired
}

export default Comments