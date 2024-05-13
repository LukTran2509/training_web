import { api } from "./api/baseApi";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (page) => {
        return {
          url: "users",
          method: "GET",
          params: { page: page },
        };
      },
      createUser: builder.mutation({
        query: (body) => {
          return {
            url: '',
            method: 'POST',
            body: body
          }
        }
      })
    }),
  }),
});
export const { useGetUserQuery, useCreateUserMutation } = userApi;
