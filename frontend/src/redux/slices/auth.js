import { createSlice } from "@reduxjs/toolkit";
import { loginThunk,logoutThunk,signupThunk } from "../action/auth";
import { updateUser } from "../action/user";
const initialState = {
  userData: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutStarted: (state, action) => {
      localStorage.clear();
      return {...initialState,userData:null,isLoading:false,error:null};
    },
    logoutSuccess: (state, action) => {
      console.log("logout success");
    }
  },
  extraReducers: {
    [loginThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    [loginThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [signupThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signupThunk.fulfilled]:(state,action)=>{
      state.isLoading = false;
      state.userData = action.payload;
    },
    [signupThunk.rejected]:(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    },
    [logoutThunk.pending]: (state, action) => {
      // console.log("logout started");
    },
    [logoutThunk.fulfilled]: (state, action) => {
      // state.isLoading=false;
      // state.userData=null;
      // state.error=null;
      // console.log("logout Sucess");
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const { logoutStarted,logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
