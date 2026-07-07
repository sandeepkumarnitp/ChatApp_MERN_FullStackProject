import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk.js";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      if (state.messages) state.messages = [...state.messages, action.payload];
      else state.messages = [action.payload];
    },
  },
  extraReducers: (builder) => {
    // Asynchronous function

    //********************** send message **********************
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = [
        ...state.messages,
        action.payload?.responseData?.newMessage,
      ];
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //********************** get message **********************
    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = action?.payload?.responseData?.conversation[0]?.message;
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setNewMessage } = messageSlice.actions; // it exports sync function

export default messageSlice.reducer;
