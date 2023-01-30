import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserApi ,getAllUserApi ,followUserApi , unfollowUserApi} from "../../api/userApi";


export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({id,data}, thunkAPI) => {
        try {
            const response = await updateUserApi(id,data);
            localStorage.setItem("profile", JSON.stringify({...response?.data}));
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);





export const getAllUser = createAsyncThunk(
    '/',
    async (thunkAPI) => {
        try {
            const response = await getAllUserApi();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const followUser = createAsyncThunk(
    'follow/user',
    async ({id,user}, thunkAPI) => {
        try {
            const response = await followUserApi(id,user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const unfollowUser = createAsyncThunk(
    'unfollow/user',
    async ({id,user}, thunkAPI) => {
        try {
            const response = await unfollowUserApi(id,user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })

