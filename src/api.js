import { api } from "./api/baseApi";
import axios from "axios";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (page) => {
        return axios.get(`https://reqres.in/api/users?page=${page}`)
          .then((response) => response.data);
      },
    }),
    createUser: builder.mutation({
      query: (body) => {
        return axios.post("https://reqres.in/api/users", body)
          .then((response) => response.data);
      }
    })
  }),
});

export const { useGetUserQuery, useCreateUserMutation } = userApi;
