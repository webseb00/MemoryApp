import { useEffect } from 'react'
import { PostItem, CreatePost, SearchPanel } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../features/posts/postsSlice'
import { FaRegDizzy } from 'react-icons/fa'
import { Loader } from '../components'
import { Pagination } from 'flowbite-react'

const Home = () => {

  const dispatch = useDispatch()
  const { auth: { user }, posts: { isLoading, posts, page } } = useSelector(state => state)

  const handlePageChange = e => {
    if(e > page.totalPages) return;
    if(e === page.current) return;
    
    dispatch(getAllPosts({ page: e, limit: 3 }))
  }

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
    dispatch(getAllPosts({ page: 1, limit: 3 }))
  }, [])

  return (
    <div className="container px-2 sm:px-4 py-2.5 mx-auto mb-[2rem]">
      <div className="flex flex-col">
        <div className="col-span-12">
          <h2 className="text-center my-[2rem] text-2xl">
            Share your best memories <br /><span className="text-blue-600 font-semibold">around the world!</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {renderContent()}
        </div>
        {user && <CreatePost />}
        <SearchPanel />
      </div>
      <div className="mt-[3rem] flex justify-center items-center">
        <Pagination
          currentPage={page.current}
          totalPages={page.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Home