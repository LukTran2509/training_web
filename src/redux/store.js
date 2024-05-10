import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./slice/postSlice";
import { userApi } from "../api";
import { api } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    post: PostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
