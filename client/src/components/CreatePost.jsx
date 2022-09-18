import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../features/posts/postsSlice'
import axios from 'axios'

const CreatePost = () => {

  const imgRef = useRef(null)
  const dispatch = useDispatch()
  const { posts: { isError, message, isLoading }, auth: { user } } = useSelector(state => state);
  
  const [error, setError] = useState({ isSet: false, msg: '' })
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    thumbnail: ''
  })

  const { title, description, tags, thumbnail } = form

  useEffect(() => {
    if(isError) {
      setError({ isSet: true, msg: message })
    }
  }, [isError])

  const handleClear = () => {
    setForm({ 
      title: '',
      description: '',
      tags: '',
      thumbnail: ''
    })
  }

  const handleUploadImage = async () => {
    const image = imgRef.current.files[0]

    if(!image) {
      setError({ isSet: true, msg: 'Please add thumbnail!' })
    }

    const data = new FormData()

    data.append('file', image)
    data.append('upload_preset', 'memoryApp')
    data.append('cloud_name', 'dlgcq1hg1')
    
    try {
      const { data: { url } } = await axios.post("https://api.cloudinary.com/v1_1/dlgcq1hg1/image/upload", data)
      setForm({ ...form, thumbnail: url })
    } catch(err) {  
      console.log(err)
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setError({ isSet: false, msg: '' })

    if(!title || !description || !tags || !thumbnail) {
      setError({ isSet: true, msg: 'Please fill form with proper values!' })
      return
    }

    dispatch(addPost({ ...form, user: user._id }))
    handleClear()
  }

  return (
    <form className="block p-6 max-w-[340px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {error.isSet && (
        <div className="my-2">
          <p className="text-center text-red-600 text-lg">{error.msg}</p>
        </div>
      )}
      <div className="mb-3">
        <input 
          type="text" 
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          value={title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-3">
        <textarea 
          rows="4" 
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Memory description..."
          name="description"
          value={description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <input 
          type="text" 
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          value={tags}
          name="tags"
          onChange={handleChange}
          placeholder="Tags"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload file</label>
        <input 
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
          aria-describedby="file_input_help" 
          id="file_input" 
          type="file"
          ref={imgRef}
          accept=".jpg, .jpeg, .png"
          name="thumbnail" 
          onChange={handleUploadImage}
          required
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG</p>
      </div>
      <div className="flex flex-col">
        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button 
          type="button" 
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  )
}

export default CreatePost