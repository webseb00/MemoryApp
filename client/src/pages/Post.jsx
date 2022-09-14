import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/posts/postsSlice'
import { FaSpinner } from 'react-icons/fa'

const Post = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { post, isLoading, isError, message } = useSelector(state => state.posts)


  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  if(isLoading) {
    return (
      <h2 className="text-center text-xl mt-[8rem]">
        Loading...
        <FaSpinner className="text-center text-4xl mx-auto mt-3 animate-spin" />
      </h2>
    )
  }

  if(isError) {
    return (
      <h2 className="text-center text-xl mt-[8rem]">
        {message}
      </h2>
    )
  }

  return (
    <div className="container px-2 sm:px-4 py-2.5 mx-auto mt-6">
      <div className="p-6 w-full mx-auto bg-white rounded-lg border 
      border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex">
          <div className="flex-1">
            <h2 className="text-2xl text-slate-800">{post.title}</h2>
            <p className="text-gray-400">
              {post.tags[0].split(' ').map((tag, idx) => (
                <span className="mr-2" key={idx}>#{tag}</span>
              ))}
            </p>
            <p className="my-4">{post.description}</p>
            <h5 className="font-semibold text-lg">
              Created by: <Link to="user/someID" className="text-blue-700">User Name</Link>
            </h5>
            <div className="py-3 border-t border-b my-4">
              Comments section - coming soon!
            </div>
          </div>  
          <div className="flex-1 text-right">
            <img src={post.thumbnail} alt={post.title} className="rounded-md shadow-md max-w-[500px] inline-block" />
          </div>
        </div>
        <div>
          Similar memories - coming soon!
        </div>
      </div>
    </div>
  )
}

export default Post