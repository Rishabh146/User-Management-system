import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { User } from '../models/types';
import { updateUserProfile } from './usersSlice';

export interface AuthState {
  user?: User;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload;
    },
  },
  selectors:{
    selectUser: (s) => s.user,
  },
  extraReducers(builder) {
    builder
      .addCase(PURGE, () => initialState)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      });
  },
});
export const { setUser } = authSlice.actions;
export const {selectUser}=authSlice.selectors
export default authSlice.reducer;
