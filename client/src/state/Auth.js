import { createSlice } from "@reduxjs/toolkit";
import { getUserDataFromToken } from "../utils/userValidation";

const userSlice = createSlice({
  name: "userContext",
  initialState: {
    data: getUserDataFromToken(),
    error: null,
  },
  reducers: {
    getUserDataOnSuccess(state) {
      state.data = getUserDataFromToken();
      state.error = null;
    },
    getUserDataOnFailiure(state, action) {
      state.error = action.payload;
    },
    logOut(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { getUserDataOnFailiure, getUserDataOnSuccess, logOut } =
  userSlice.actions;
export default userSlice.reducer;
