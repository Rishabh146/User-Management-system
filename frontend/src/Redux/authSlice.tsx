import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

export interface AuthState {
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
  selectors: {
    selectToken: (state: AuthState): string | null => state.token,
    selectUser: (state: AuthState): User | null => state.user,
    selectUserId: (state: AuthState): number | undefined => state.user?.id,
    selectUserEmail: (state: AuthState): string | undefined => state.user?.email,
    selectAuth: (state: AuthState): { token: string | null; user: User | null } => ({ token: state.token, user: state.user }),
  }
});

export const { setToken, clearToken, setUser, updateProfile } = authSlice.actions;
export const { selectToken, selectUser, selectUserId, selectUserEmail, selectAuth } = authSlice.selectors;
export default authSlice.reducer;




