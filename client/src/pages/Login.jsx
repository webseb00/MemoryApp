import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const [error, setError] = useState({ isSet: false, msg: '' })
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const { email, password } = form

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(error.isSet) setError({ isSet: false, msg: '' })

    if(!email || !password) {
      setError({ isSet: true, msg: 'Fields can not be empty!' })
      return
    }
    
  }

  return (
    <form className="max-w-[340px] mx-auto my-[3rem] rounded-md shadow-md bg-slate-50 p-8">
      <div className="mb-6">
        <label 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
          Email
        </label>
        <input 
          type="email" 
          name="email"
          value={email}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="example@mail.com" 
          required 
        />
      </div> 
      <div className="mb-6">
        <label 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
          Password
        </label>
        <input 
          type="password"
          name="password" 
          value={password}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="*******" 
          required 
        />
      </div> 
      <div className="flex flex-col justify-center items-center">
        <button 
          type="submit" 
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign In
        </button>
        <p className="my-4 text-gray-500 text-center">
          You don't have an account? <br />
          <Link to="/register" className="text-blue-600 underline ml-2">Sign Up</Link>
        </p>
      </div>
    </form>
  )
}

export default Login