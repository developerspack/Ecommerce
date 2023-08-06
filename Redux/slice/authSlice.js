import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: null,
  userEmail: null,
  userImageUrl: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  HF
    hydrateUser: (state, action) => {
      return action.payload;
    },
    // active user
    SET_ACTIVE_USER: (state, action) => {
      const { userName, userEmail, userImageUrl, userID } = action.payload;
      state.isLoggedIn = true;
      state.userName = userName;
      state.userEmail = userEmail;
      state.userImageUrl = userImageUrl;
      state.userID = userID;
    },
    // Logout remove active user
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.userName = null;
      state.userEmail = null;
      state.userImageUrl = null;
      state.userID = null;
    },
  },
});

export const { hydrateUser, SET_ACTIVE_USER, REMOVE_ACTIVE_USER } =
  authSlice.actions;

// specific userInfo
export const selectUserIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserName = (state) => state.auth.userName;
export const selectUserImageUrl = (state) => state.auth.userImageUrl;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
