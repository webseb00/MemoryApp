import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import postsService from './postsService'

const initialState = {
  posts: [],
  post: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getAllPosts = createAsyncThunk('posts/getAll', async (_, { rejectWithValue }) => {
  try {
    return await postsService.getAllPosts()
  } catch(err) {
    return rejectWithValue(err.message)
  }
})

export const getPost = createAsyncThunk('posts/getPost', async (postID, { rejectWithValue }) => {
  try {
    return await postsService.getPost(postID)
  } catch(err) {  
    return rejectWithValue(err.message)
  }
})

export const addPost = createAsyncThunk('posts/addPost', async (post, { rejectWithValue }) => {
  try {
    return await postsService.addPost(post)
  } catch(err) {
    return rejectWithValue(err.response.data.message || err.response.statusText || err.message)
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload
      })
      .addCase(getPost.pending, state => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload
      })
      .addCase(addPost.pending, state => {
        state.isLoading = true
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload
      })
  }
})

export default postsSlice.reducer