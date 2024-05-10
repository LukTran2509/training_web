import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (page) => {
        return {
            url: 'users',
        method: 'GET',
        params: {page: page}
      }},
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery } = userApi