import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSignOut } from '../features/auth/authSlice'

const ProtectedRoute = ({ children }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const cookies = new Cookies()
  const token = cookies.get('token')

  useEffect(() => {
    if(!token) {
      navigate('/login')
      dispatch(userSignOut())
    }
  }, [])

  return children;
}

export default ProtectedRoute