import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PURGE } from "redux-persist";

interface UserStatusState {
  statuses: Record<string, string>;
}

const initialState: UserStatusState = {
  statuses: {},
};

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    updateUserStatus: (
      state,
      action: PayloadAction<{ userId: string; status: string }>
    ) => {
      state.statuses[action.payload.userId] = action.payload.status;
    },
    setInitialOnlineUsers: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((userId) => {
        state.statuses[userId] = "online";
      });
    },
    clearUserStatus: (state, action: PayloadAction<string>) => {
      delete state.statuses[action.payload];
    },
  },
  extraReducers(builder) {
      builder
      .addCase(PURGE, () => initialState)
     
    },

});

export const { updateUserStatus, setInitialOnlineUsers, clearUserStatus } = userStatusSlice.actions;
export const selectUserStatus = (state: RootState) => state.userStatus.statuses;
export default userStatusSlice.reducer;



