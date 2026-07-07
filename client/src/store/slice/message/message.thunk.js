import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utility/axiosInstance.js";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message,
      });
      return response?.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);

export const getMessageThunk = createAsyncThunk(
  "message/get-message",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/message/get-message/${receiverId}`,
      );
      return response?.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  },
);
