import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { statusUpdateType } from "../models/types";

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
      action: PayloadAction<statusUpdateType>
    ) => {
      state.statuses[action.payload.userId] = action.payload.status;
    },
    setInitialOnlineUsers: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((userId) => {
        state.statuses[userId] = "online";
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
  selectors: {
    selectUserStatus: (state) => state.statuses,
  },
});

export const { updateUserStatus, setInitialOnlineUsers} = userStatusSlice.actions;
export const { selectUserStatus } = userStatusSlice.selectors;
export default userStatusSlice.reducer;
