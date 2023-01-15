import axios from 'axios';

const authApi = axios.create({baseURL: 'http://localhost:5000/auth'});


export const loginApi = (data) => authApi.post('/login', data);
export const signupApi = (data) => authApi.post('/signup', data);