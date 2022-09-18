import axios from 'axios'

const API_URL = 'api/post'

const getAllPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data
}

const getPost = async (id) => {
  const response = await axios.get(`/${API_URL}/${id}`)
  return response.data
}

const addPost = async (post) => {
  const response = await axios.post(API_URL, post)
  return response.data
}

const updatePost = async (post) => {
  const response = await axios.put(`/${API_URL}/${post._id}`, post)
  return response.data
}

const postsService = {
  getAllPosts,
  getPost,
  addPost,
  updatePost
}

export default postsService