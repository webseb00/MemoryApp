import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const userSignIn = createAsyncThunk('user/signIn', async (data, { rejectWithValue }) => {
  try {
    return await authService.userSignIn(data)
  } catch(err) {
    return rejectWithValue(err.response.data.message || err.response.statusText || err.message)
  }
})

export const userSignOut = createAsyncThunk('user/signOut', async (data, { rejectWithValue }) => {
  try {
    return await authService.userSignOut(data)
  } catch(err) {
    console.log(err)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.pending, state => {
        state.isLoading = true
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userSignOut.pending, state => {
        state.isLoading = true
      })
      .addCase(userSignOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null
      })
      .addCase(userSignOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer