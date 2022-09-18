import axios from 'axios'

const API_URL = 'api/user'

const userSignIn = async (data) => {
  const response = await axios.post(`/${API_URL}/login`, data)
 
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const userSignOut = async (data) => {
  const response = await axios.get(`/${API_URL}/logout`)
  localStorage.removeItem('user')
  
  return response.data
}

const authService = {
  userSignIn,
  userSignOut
}

export default authService