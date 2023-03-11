import { createSlice } from "@reduxjs/toolkit";
import { uploadPostThunk ,getTimelinePostThunk } from "../action/post";

const initialState = {
    isLoading: false,
    error: null,
    postData:[],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  },
  extraReducers: {
    [uploadPostThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postData = [...state.postData,...action.payload];
      
    },
    [uploadPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getTimelinePostThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTimelinePostThunk.fulfilled]: (state, action) => {

      state.isLoading = false;
      state.postData = action.payload;
    },
    [getTimelinePostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {  } = postSlice.actions;

export default postSlice.reducer;
