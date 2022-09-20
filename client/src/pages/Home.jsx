import { useEffect } from 'react'
import { PostItem, CreatePost } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts, reset } from '../features/posts/postsSlice'
import { FaRegDizzy } from 'react-icons/fa'
import { Loader } from '../components'

const Home = () => {

  const dispatch = useDispatch()
  const { auth: { user }, posts: { isLoading, posts } } = useSelector(state => state)

  const renderContent = () => {
    if(isLoading) {
      return (
        <div className="col-span-12">
          <Loader />
        </div>
      )
    }

    if(!posts.length) {
      return (
        <div className="col-span-12">
          <h2 className="text-center text-xl mt-[8rem]">
            No Memories found...
            <FaRegDizzy className="text-center text-4xl mx-auto mt-3" />
          </h2>
        </div>
      )
    }

    return posts.map(post => (
      <PostItem key={post._id} { ...post } />
    ))
  }

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  
  return (
    <div className="container px-2 sm:px-4 py-2.5 mx-auto mb-[2rem]">
      <div className="grid gap-2 grid-cols-12">
        <div className="col-span-12">
          <h2 className="text-center my-[2rem] text-2xl">
            Share your best memories <br /><span className="text-blue-600 font-semibold">around the world!</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 col-span-12 lg:col-span-12 gap-2 justify-items-stretch">
          {renderContent()}
        </div>
        {user && <CreatePost />}
      </div>
    </div>
  )
}

export default Home