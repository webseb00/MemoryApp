import React from 'react'
import image from '../assets/image-1.jpg'
import { BsHandThumbsUpFill, BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const PostItem = () => {

  const handleVoteUp = () => {

  }

  return (
    <div className="max-w-[340px] col-span-8 md:col-span-6 xl:col-span-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <Link 
          to="/post/12345"
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
            <span className="text-xl">53</span>
          </button>
          <p className="text-gray-400">
            #tags #tags #testtag
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostItem