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
    },
    clearToken(state) {
      state.token = null;
      state.user = null; 
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateProfile(state, action: PayloadAction<User>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setToken, clearToken, setUser,updateProfile } = authSlice.actions;
export default authSlice.reducer;

export const authSelectors = {
  selectToken: (state: { auth: AuthState }) => state.auth.token,
  selectUser: (state: { auth: AuthState }) => state.auth.user,
  selectUserId: (state: { auth: AuthState }) => state.auth.user?.id,
  selectUserEmail: (state: { auth: AuthState }) => state.auth.user?.email,
  selectAuth: (state: { auth: AuthState }) => ({ token: state.auth.token, user: state.auth.user })
};


