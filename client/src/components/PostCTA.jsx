import React from 'react'
import { FaRegEdit, FaTimes } from 'react-icons/fa'

const PostCTA = ({ setActive, deletePost }) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="border-none"
        onClick={() => setActive(true)}
      >
        <FaRegEdit className="text-slate-900 text-2xl" />
      </button>
      <button
        type="button"
        className="border-none ml-2 inline-block"
        onClick={() => deletePost()}
      >
        <FaTimes className="text-red-700 text-2xl" />
      </button>
    </div>
  )
}

export default PostCTA