import { useState } from 'react'
import { BsHandThumbsUpFill, BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { voteUpPost } from '../features/posts/postsSlice'
import PropTypes from 'prop-types'

const PostItem = ({ _id, title, description, thumbnail, tags, votes }) => {

  const [votesNum, setVotesNum] = useState(votes.length || 0)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const cutDescription = () => {
    const splitDesc = description.split(' ')
    return `${splitDesc.slice(0, 20).join(' ')}...`
  }

  const handleVoteUp = () => {
    if(user?._id) {
      const findVote = votes.find(el => el === user._id);

      if(!findVote) {
        const obj = {
          userID: user._id,
          id: _id
        }

        setVotesNum(prev => prev+1)
        dispatch(voteUpPost(obj))
      }
    }    
  }

  return (
    <div className="max-w-[340px] col-span-8 md:col-span-6 xl:col-span-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full max-w-[340px] h-[200px] object-cover" src={thumbnail} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {cutDescription()}
        </p>
        <Link 
          to={`post/${_id}`}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more <BsArrowRightShort className="ml-2 text-2xl text-white" />
        </Link>
        <div className="mt-4 flex flex-col">
          <button 
            type="button"
            onClick={handleVoteUp}
            className="mb-2 text-blue-500 flex items-center border-none outline-none"
          >
            <BsHandThumbsUpFill className="text-2xl mr-2" /> 
            <span className="text-xl">{votesNum}</span>
          </button>
          <p className="text-gray-400">
            {tags[0].split(' ').map((tag, idx) => (
              <span className="mr-2" key={idx}>#{tag}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  tags: PropTypes.array,
  meta: PropTypes.object
}

export default PostItem