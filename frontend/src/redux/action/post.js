import { createAsyncThunk } from "@reduxjs/toolkit";
import {uploadImageApi } from "../../api/uploadImgApi";
import { createPostApi ,timelinePostApi } from "../../api/postApi";

export const uploadImageThunk = createAsyncThunk(
    '/',
    async (postImg, thunkAPI) => {
        try {
            const response = await uploadImageApi(postImg);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const uploadPostThunk = createAsyncThunk(
    '/',
    async (postData, thunkAPI) => {
        try {
            const response = await createPostApi(postData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }   
);


export const getTimelinePostThunk = createAsyncThunk(
    '/',
    async (userId, thunkAPI) => {
        try {
            const {data} = await timelinePostApi(userId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


