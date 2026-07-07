import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utility/axiosInstance.js";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login successful");
      return response.data;
    } catch (error) {
      const errorOutput = error.response.data.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullName,
        username,
        password,
        gender,
      });
      toast.success("Account created successfully!!");
      return response.data;
    } catch (error) {
      const errorOutput = error.response.data.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successfully!!");
      return response.data;
    } catch (error) {
      const errorOutput = error.response.data.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);

export const getUserProfileThunk = createAsyncThunk(
  "user/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response.data;
    } catch (error) {
      const errorOutput = error.response.data.message;
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);

export const getOtherUserProfileThunk = createAsyncThunk(
  "user/get-other-user-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      return response.data;
    } catch (error) {
      const errorOutput = error.response.data.message;
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);
