import axios from "axios";

const userApi = axios.create({ baseURL: "http://localhost:5000/user" });

export const getUserApi = (id) => userApi.get(`/${id}`);
export const updateUserApi = (id, data) => userApi.put(`/${id}`, data);
export const deleteUserApi = (id) => userApi.delete(`/${id}`);
export const followUserApi = (id,data)=> userApi.put(`/${id}/follow`, data)
export const unfollowUserApi = (id, data)=> userApi.put(`/${id}/unfollow`, data)
export const getAllUserApi = (id) => userApi.get(`/${id}`);