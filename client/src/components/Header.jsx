import { Link } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { HiOutlineCog } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'flowbite-react'
import { userSignOut } from '../features/auth/authSlice'

const Header = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  return (
    <nav className="bg-slate-50 shadow-sm border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MemoryApp
            </span>
        </Link>
        
        {!user 
          ? 
          (
            <div className="flex md:order-2">
              <Link to="/login">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center">
                  <BsPersonCircle className="mr-2 text-xl" />
                  Sign In
                </button>
              </Link>
            </div>
          )
          :
          (
            <Dropdown 
              className="p-0"
              label={
                <>
                  <div className="w-[30px] h-[30px] bg-white text-blue-600 font-semibold text-lg rounded-full mr-4">
                    <span className="block mt-[2px]">
                      {user.firstName.split('')[0].toUpperCase()}{user.lastName.split('')[1].toUpperCase()}
                    </span>
                  </div>
                  <span>User panel</span>
                </>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block text-sm font-medium truncate">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiOutlineCog}>
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item 
                icon={IoLogOutOutline}
                onClick={() => dispatch(userSignOut())}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          )
        }
      </div>
    </nav>
  )
}

export default Header