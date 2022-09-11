import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {

  const [error, setError] = useState({ isSet: false, msg: '' })

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  })
  const { firstName, lastName, email, password, password2 } = form

  const [terms, setTerms] = useState(false) 

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(error.isSet) setError({ isSet: false, msg: '' })

    if(!firstName || !lastName || !email || !password || !password2) {
      setError({ isSet: true, msg: 'Input fields can not be empty.' })
      return
    }

    if(password !== password2) {
      setError({ isSet: true, msg: 'Passwords must be the same.' })
      return
    }

    if(!terms) {
      setError({ isSet: true, msg: 'Please agree with terms and conditions.' })
      return
    }
    
  }

  // return (
  //   <div className="max-w-[540px] mx-auto my-[3rem]">
      
  //   </div>
  // )

  return (
    <form className="max-w-[540px] mx-auto my-[3rem]">
      <h4 className="text-center uppercase font-semibold my-3">Registration form</h4>
      <div className="mb-6">
        <label 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
          First name
        </label>
        <input 
          type="text" 
          name="firstName"
          value={firstName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="John" 
          required 
        />
      </div>
      <div className="mb-6">
        <label 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
          Last name
        </label>
        <input 
          type="text" 
          name="lastName"
          value={lastName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Doe" 
          required 
        />
      </div>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="*******" 
          required 
        />
      </div> 
      <div className="mb-6">
        <label 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
          Confirm password
        </label>
        <input 
          type="password" 
          name="password2"
          value={password2}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="*******" 
          required 
        />
      </div> 
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input 
          type="checkbox" 
          onChange={(e) => setTerms(!terms)}
          value={terms} 
          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
          required 
        />
        </div>
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button 
          type="submit" 
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign Up
        </button>
        {error.isSet && (
          <div className="my-4">
            <p className="text-center text-red-600 text-lg">{error.msg}</p>
          </div>
        )}
        <p className="my-4 text-gray-500">
          Already have an account? 
          <Link to="/login" className="text-blue-600 underline ml-2">Sign In</Link>
        </p>
      </div>
    </form>
  )
}

export default Register