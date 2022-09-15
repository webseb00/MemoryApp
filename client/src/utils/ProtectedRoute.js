import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate('/')

  const cookies = new Cookies()
  const token = cookies.get('token')

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [])

  if(token) return children
}

export default ProtectedRoute