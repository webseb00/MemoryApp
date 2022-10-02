import axios from 'axios'

const API_URL = 'api/post'

const getAllPosts = async ({ page, limit }) => {
  const response = await axios.get(`/${API_URL}/?page=${page}&limit=${limit}`);
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

const deletePost = async (postID) => {
  const response = await axios.delete(`/${API_URL}/${postID}`)
  return response.data
}

const voteUpPost = async (data) => {
  const response = await axios.put(`/${API_URL}/vote/${data.id}`, { userID: data.userID })
  return response.data
}

const searchPosts = async (data) => {
  const { searchingMethod, searchingTerm } = data
  let response;

  if(searchingMethod === 'tags') {
    response = await axios.post(`/${API_URL}/${searchingMethod}`, { tags: searchingTerm })
  } else {
    response = await axios.post(`/${API_URL}/${searchingMethod}`, { term: searchingTerm })
  }
  return response.data
}

const postsService = {
  getAllPosts,
  searchPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  voteUpPost
}

export default postsService