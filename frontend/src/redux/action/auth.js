import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, signupApi } from "../../api/authApi";
import { getUserApi } from '../../api/userApi';
// import { logoutStarted,logoutSuccess } from '../slices/auth';
// import { useDispatch } from 'react-redux';

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (userData, thunkAPI) => {
        try {
            const response = await signupApi(userData);
            localStorage.setItem("profile", JSON.stringify({...response?.data}));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await loginApi(userData);
            localStorage.setItem("profile", JSON.stringify({...response?.data}));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
      try {
        localStorage.clear();
        return {};
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    })



    // export const updateUser = createAsyncThunk(
    // 'auth/updateUser',
    // async ({id}, thunkAPI) => {
    //     try {
    //         const response = await getUserApi(id);
    //         localStorage.setItem("profile", JSON.stringify({...response?.data}));
    //         return response.data;
    //     } catch (error) {
    //         return thunkAPI.rejectWithValue(error.response.data);
    //     }
    // });