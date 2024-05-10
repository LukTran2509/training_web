import { configureStore } from "@reduxjs/toolkit";
import PostReducer from './slice/postSlice';
import { userApi } from "../api";

export const store = configureStore ({
    reducer: {
        post: PostReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
});

