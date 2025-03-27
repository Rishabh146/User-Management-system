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

export interface UserState {
  users: User[]; 
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void>('userInfo/fetchUsers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/all-users`); 
  return response.data.users; 
});

const usersSlice = createSlice({
  name: 'userInfo',
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
  selectors: {
    selectUsers: (state: UserState): User[] => state.users,
    selectLoading: (state: UserState): boolean => state.loading,
    selectError: (state: UserState): string | null => state.error,
  }
});

export const { selectUsers, selectLoading, selectError } = usersSlice.selectors;
export default usersSlice.reducer;

