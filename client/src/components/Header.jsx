import { Link } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'

const Header = () => {
  return (
    <nav className="bg-slate-50 shadow-sm border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MemoryApp
            </span>
        </Link>
        <div className="flex md:order-2">
            <Link to="/login">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center">
                <BsPersonCircle className="mr-2 text-xl" />
                Sign In
              </button>
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header