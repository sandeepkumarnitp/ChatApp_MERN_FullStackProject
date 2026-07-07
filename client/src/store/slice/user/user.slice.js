import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUserProfileThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk.js";

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsersProfile: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
  screenLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // synchronous function
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Asynchronous function

    //********************** login user**********************
    builder.addCase(loginUserThunk.pending, (state, action) => {
      // console.log("pending");
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      // console.log("rejected");
      // console.log(action.payload?.responseData?.user);
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      // console.log("rejected");
      state.buttonLoading = false;
    });

    //************* register user******************
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload?.responseData?.user;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //************* logout user******************
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsersProfile = null;
      localStorage.clear();
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //************* get profile user******************
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action?.payload?.responseData?.profile;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    //************* get other user profile ******************
    builder.addCase(getOtherUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUserProfileThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.isAuthenticated = true;
      state.otherUsersProfile = action?.payload?.responseData?.otherUsers;
    });
    builder.addCase(getOtherUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});
// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions; // it exports sync function

export default userSlice.reducer;
