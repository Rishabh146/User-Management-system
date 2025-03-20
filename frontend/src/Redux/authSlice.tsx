// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

interface AuthState {
  token: string | null;
  user: User | null; 
}

const initialState: AuthState = {
  token: null,
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      console.log('Token set:', action.payload);
    },
    clearToken(state) {
      state.token = null;
      state.user = null; // Clear user info as well on logout
      console.log('Token and user cleared');
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      console.log('User set:', action.payload);
    },
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;


