import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
  users: User[]; 
  loading: boolean;
  error: string | null;
}
const initialState: PostState = {
  users: [],
  loading: false,
  error: null,
};
export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await axios.get('http://localhost:8080/api/v1/auth/all-users'); 
  return response.data.users; 
});

const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});
export const usersSelectors = {
  selectUsers: (state: { posts: PostState }) => state.posts.users,
  selectLoading: (state: { posts: PostState }) => state.posts.loading,
  selectError: (state: { posts: PostState }) => state.posts.error,
};

export default usersSlice.reducer;

