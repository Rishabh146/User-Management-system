import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the interface for a user with new fields
interface User {
  _id: any;
  status: any;
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

interface PostState {
  users: User[];  // Make sure to use `users` instead of `posts`
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PostState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk to fetch users from the backend
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:8080/api/v1/auth/all-users'); // Your API endpoint
  return response.data.users; // Return the `users` array from the response
});

// Post slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // The fetched users
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postSlice.reducer;

