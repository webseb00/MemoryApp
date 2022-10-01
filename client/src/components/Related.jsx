import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Related = ({ tags, postID }) => {

  const [posts, setPosts] = useState([])

  const fetchRelatedPosts = async () => {
    try {
      const tagsArr = tags[0].split(' ')
      const { data } = await axios.post(`/api/post/tags`, { tags: tagsArr })
      
      setPosts(data.filter(post => post._id !== postID))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRelatedPosts()
  }, [])

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg border 
    border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-[1rem]">
      <h4>Related memories:</h4>
      <div className="flex overflow-x-auto my-2">
        {posts.map((post, idx) => (
          <article key={idx} className="flex flex-col p-3 rounded-md shadow-md border border-slate-400">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-[150px] h-[150px] object-cover rounded-md" 
            />
            <h4 className="my-3 font-semibold text-slate-800">
              {post.title}
            </h4>
            <Link 
              to={`/${postID}`}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read More
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Related