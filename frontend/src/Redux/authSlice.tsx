import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  token:string
}

export interface AuthState {
  user: User | null; 
}

const initialState: AuthState = {
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState(state) {
      // state.token = null;
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
    selectUser: (s) => s.user,
  }
});

export const {setUser,clearState, updateProfile } = authSlice.actions;
export const {selectUser} = authSlice.selectors;
export default authSlice.reducer;




