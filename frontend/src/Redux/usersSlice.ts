import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../services/ApiServices'; 
import { RootState } from './store';
import { updateProfileType } from '../models/types';
import { AxiosError } from 'axios';
import { UserInfoType } from '../models/types';
import { PURGE } from 'redux-persist';

export interface UserState {
  user: UserInfoType | undefined;
  users: UserInfoType[];
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: undefined,
  users: [],
  loading: false,
  error: undefined,
};

export const fetchUsers = createAsyncThunk<UserInfoType[], void, { state: RootState }>(
  "userInfo/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth?.user?.token;

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
  UserInfoType,
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
        if (typeof action.payload === 'string') {
          state.error = undefined;
        }
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.error = undefined;
        }
      })
      .addCase(PURGE, () => initialState);
  },
  selectors: {
    selectUser: (s) => s.user,
    selectUsers: (s) => s.users,
    selectLoading: (s) => s.loading,
    selectError: (s) => s.error,
  },
});

export const { selectUser, selectUsers, selectLoading, selectError } = usersSlice.selectors;

export default usersSlice.reducer;
