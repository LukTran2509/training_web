import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://reqres.in/api",
});
const baseQueryApi = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result.data;
};
export const api = createApi({
  baseQuery: baseQueryApi,
  endpoints: (build) => ({}),
});
