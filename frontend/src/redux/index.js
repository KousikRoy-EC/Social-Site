import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import postReducer from "./slices/post";

  const reducer = {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
  }
  
  const reduxStore = configureStore({
    reducer: reducer,
    devTools: true,
  })

  export default reduxStore;