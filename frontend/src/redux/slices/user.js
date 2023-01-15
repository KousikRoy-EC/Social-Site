import { createSlice } from "@reduxjs/toolkit";
import { updateUser  } from "../action/user";

const initialState = {
  allUser: [],
  isLoading: false,
  error: null,
};

const updateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allUser = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    

  },
});

export const {} = updateSlice.actions;

export default updateSlice.reducer;
