import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../services/ApiServices'; 
import { RootState } from './store';
import { updateProfileType} from './types';
import {AxiosError} from 'axios'
import { UserInfoType } from './types';
import { PURGE } from 'redux-persist';


export interface UserState {
  user: UserInfoType  | null;
  users: UserInfoType [];
  loading: boolean;
  error: string | null;
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  updateStatus: 'idle',
};

export const fetchUsers = createAsyncThunk<UserInfoType[], void, { state: RootState }>(
  "userInfo/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.user?.token;

    if (!token) {
      return rejectWithValue("Token not found");
    }

    const apiService = new ApiService(token);

    return apiService
      .get("/auth/all-users")
      .then((data) => data.users)
      .catch((error: AxiosError) =>
        rejectWithValue(error.response?.data || "Failed to fetch users")
      );
  }
);


export const updateUserProfile = createAsyncThunk<
UserInfoType ,
  { profileData: updateProfileType },
  { state: RootState }
>(
  "userInfo/updateProfile",
  ({ profileData }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.user?.token;

    if (!token) {
      return Promise.reject(rejectWithValue("Token not found"));
    }

    const apiService = new ApiService(token);

    return apiService
      .put("/auth/update-profile", profileData)
      .then((data) => {
        if (!data.updatedUser) {
          return rejectWithValue("No user data returned from API");
        }
        return data.updatedUser;
      })
      .catch((error: AxiosError) => {
        return rejectWithValue(
          error.response?.data || "Profile update failed"
        );
      });
  }
);


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
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.updateStatus = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload as string;
      })
      .addCase(PURGE, () => initialState)
  },
  selectors: {
    selectUser: (s) => s.user,
    selectUsers: (s) => s.users,
    selectLoading: (s) => s.loading,
    selectError: (s) => s.error,
    selectUpdateStatus: (s) => s.updateStatus,
  },
  
});

export const { selectUser, selectUsers, selectLoading, selectError, selectUpdateStatus } = usersSlice.selectors;

export default usersSlice.reducer;

