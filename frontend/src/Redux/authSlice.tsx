import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  token:string
}

export interface AuthState {
  user: User | undefined; 
}

const initialState: AuthState = {
  user: undefined, 
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState(state) {
      state.user = undefined; 
    },
    setUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload; 
    },
    updateProfile(state, action: PayloadAction<User>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => initialState);
  },
  selectors: {
    selectUser: (s) => s.user
  }
});

export const {setUser,clearState, updateProfile } = authSlice.actions;
export const {selectUser} = authSlice.selectors;
export default authSlice.reducer;




