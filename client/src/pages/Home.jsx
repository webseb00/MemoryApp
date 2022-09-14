import React, { useEffect } from 'react'
import { PostItem, CreatePost } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../features/posts/postsSlice'
import { FaSpinner, FaRegDizzy } from 'react-icons/fa'

const Home = () => {

  const dispatch = useDispatch()
  const { auth: { user }, posts: { isLoading, isError, message, posts } } = useSelector(state => state)

  const renderContent = () => {
    if(isLoading) {
      return (
        <div className="col-span-12">
          <h2 className="text-center text-xl mt-[8rem]">
            Loading...
            <FaSpinner className="text-center text-4xl mx-auto mt-3 animate-spin" />
          </h2>
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
    <div className="container px-2 sm:px-4 py-2.5 mx-auto mt-6">
      <div className="grid gap-2 grid-cols-12">
        <div className="grid grid-cols-12 col-span-12 lg:col-span-9 gap-2 justify-items-stretch">
          {renderContent()}
        </div>
        <div className="col-span-12 lg:col-span-3">
          {!user 
            ? 
            <div
              className="block p-4 max-w-[340px] bg-white rounded-lg border border-gray-200 shadow-md 
              hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="text-center leading-5">Please Sign In to create your own memories and like other's memories.</p>
            </div>
            :
            <>
              <CreatePost />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home