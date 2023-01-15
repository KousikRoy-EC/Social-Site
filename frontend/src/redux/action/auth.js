import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, signupApi } from "../../api/authApi";
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
    '/',
    async (_,thunkAPI) => {
        try {
         localStorage.clear();
        } catch (error) {
           console.log(error);
        }
    }
);