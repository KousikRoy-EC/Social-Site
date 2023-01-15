import axios from "axios";

const postApi = axios.create({ baseURL: "http://localhost:5000/post" });



export const createPostApi = (data) => postApi.post("/", data);
export const getPostApi = (id) => postApi.get(`/${id}`);
export const updatePostApi = (id, data) => postApi.put(`/${id}`, data);
export const deletePostApi = (id) => postApi.delete(`/${id}`);
export const timelinePostApi = (id) => postApi.get(`/${id}/feedpost`);
export const likePostApi = (id,data) => postApi.put(`/${id}/like`, data);
