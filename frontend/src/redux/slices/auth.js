import { createSlice } from "@reduxjs/toolkit";
import { loginThunk,logoutThunk,signupThunk } from "../action/auth";
import { updateUser ,followUser,unfollowUser} from "../action/user";

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
    },
    setUserFromLocalStorage: (state, action) => {
      state.userData = JSON.parse(localStorage.getItem("profile")) || null;
    },
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
      state.isLoading = true;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = null;
      state.error = null;
    },
    [logoutThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.userData = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [followUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      const data = window.localStorage.getItem('profile')
      const newData = JSON.parse(data);
      newData.user.followings=action.payload.followings;
      localStorage.setItem('profile',JSON.stringify({...newData}))
      state.isLoading = false;
      state.userData = {user:newData.user}
    },
    [followUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    [unfollowUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      const data = window.localStorage.getItem('profile')
      const newData = JSON.parse(data);
      newData.user.followings=action.payload.followings;
      localStorage.setItem('profile',JSON.stringify({...newData}))
      state.userData = {user:newData.user};
    },
    [unfollowUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { logoutStarted,logoutSuccess , setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
