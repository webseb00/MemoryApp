import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSignOut } from '../features/auth/authSlice'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate('/')

  const cookies = new Cookies()
  const token = cookies.get('token')
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(!token) {
      dispatch(userSignOut())
      navigate('/login')
    }
  }, [])

  if(token) return children
}

export default ProtectedRoute