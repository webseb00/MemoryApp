import React from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {

  const { id } = useParams('/')

  return (
    <div>Post ID: {id}</div>
  )
}

export default Post