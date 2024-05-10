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
    }),
  }),
});
export const { useGetUserQuery } = userApi;
