import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPost, reset, deletePost as removePost } from '../features/posts/postsSlice'
import axios from 'axios'
import { 
  Loader, 
  Comments, 
  Related, 
  EditPost, 
  PostCTA 
} from '../components/'

const Post = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { post, isLoading, isError, message } = useSelector(state => state.posts)

  const [user, setUser] = useState('')
  const [active, setActive] = useState(false)

  const deletePost = () => {
    const confirm = window.confirm('Are you sure? Your memory will be lost...')

    if(confirm) {
      dispatch(removePost(id))
      dispatch(reset())

      navigate('/')
    }
  }

  const getUser = async () => {
    const { data: { firstName, lastName } } = await axios.get(`/api/user/${post.user}`)
    setUser(`${firstName} ${lastName}`)
  }

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  useEffect(() => {
    if(post.user) {
      getUser();
    }
  }, [post])

  if(isLoading) {
    return <Loader />
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
        <div className="flex flex-col-reverse xl:flex-row">
          <div className="flex-1">
            <h2 className="text-2xl text-slate-800">{post.title}</h2>
            <p className="text-gray-400">
              {post.tags && post.tags[0].split(' ').map((tag, idx) => (
                <span className="mr-2" key={idx}>#{tag}</span>
              ))}
            </p>
            <p className="my-4">{post.description}</p>
            <h5 className="font-semibold text-lg">
              Created by: 
              {user && (
                <Link to={`/user/${post.user}`} className="text-blue-700 ml-2">
                  {user}
                </Link>
              )}
            </h5>
            <div className="py-3 border-t border-b my-4">
              {post.user &&
                <Comments
                  postID={id}
                  userID={post.user}
                />
              }
            </div>
            <PostCTA 
              setActive={setActive} 
              deletePost={deletePost}
            />
          </div>  
          <div className="flex-1 text-center xl:text-right">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="rounded-md shadow-md w-full max-w-[500px] 
              inline-block mb-6" 
            />
          </div>
        </div>
      </div>
      {active 
        && 
        <EditPost 
          setActive={setActive} 
          active={active} 
          postID={id}
        />
      }
      <Related />
    </div>
  )
}

export default Post