import { api } from "./api/baseApi";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (page) => {
        return {
          url: '/users',
          method: 'GET',
          param: {page: page}
        }}
    }),

    createUser: builder.mutation({
      query: (body) => {
        console.log("Posting data ", body);
        return {
          url: '/users',
          method: 'POST',
          body
        }},
    }),

    // updateUser: builder.mutation({
    //   query: ({id, ...body}) => {
    //     return {
    //       url: `/users/${id}`,
    //       method: 'PUT',
    //       body
    //     }
    //   }
    // }),

    deleteUser: builder.mutation({
      query: ({id}) => {
        return {
          url: `/users/${id}`,
          method: 'DELETE'
        }
      }
    }),

    editUser: builder.mutation({
      query: ({id, ...body}) => {
        console.log("Edit User", {id, ...body});
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body
        }
      }
    })
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useEditUserMutation } = userApi;
