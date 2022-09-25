import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { searchPosts } from '../features/posts/postsSlice'
import { useDispatch } from 'react-redux'

const SearchPanel = () => {

  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [searchMethod, setSearchMethod] = useState('title')
  const [term, setTerm] = useState('')
  const [error, setError] = useState({ isSet: false, msg: '' })

  const handleActive = () => setActive(prev => !prev)

  const handleMethodChange = e => setSearchMethod(e.target.value)
  const handleTermChange = e => setTerm(e.target.value)

  const handleSubmit = e => {
    e.preventDefault();

    setError({ isSet: false, msg: '' })

    if(!term) {
      setError({ isSet: true, msg: 'Please enter field with correct value!' })
      return
    }

    const obj = {
      searchingMethod: searchMethod,
      searchingTerm: term
    }

    dispatch(searchPosts(obj))
  }

  return (
    <form className={`block p-6 w-full max-w-[380px] bg-white border border-gray-200 shadow-md
    dark:bg-gray-800 fixed top-[10%] right-0 ${!active ? 'translate-x-[100%]' : 'translate-x-[0%]'}
      rounded-l-lg transition duration-300`}>
      <div className="absolute top-[40px] left-[-40px] bg-blue-700 text-white 
        w-[40px] h-[40px] rounded-l-md shadow-md flex items-center justify-center cursor-pointer
        hover:opacity-70 duration-300"
        onClick={handleActive}
      >
        <BsSearch className="text-2xl" />
      </div>
      <div>
        {error.isSet && <p className="text-red-700 text-center mb-3">{error.msg}</p>}
        <select 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
          value={searchMethod}
          onChange={handleMethodChange}
        >
          <option value="title">Search by Title</option>
          <option value="tags">Search by Tags</option>
        </select>
        <input 
          type="text" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" 
          placeholder="Searching terms" 
          onChange={handleTermChange}
          value={term}
          name="term"
          required
        />
      </div>
      <button 
        type="submit" 
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800`}
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  )
}

export default SearchPanel