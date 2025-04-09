import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { User } from '../models/types';
import { RootState } from './store';
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
export const selectUser = (state: RootState) => state.auth.user;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
