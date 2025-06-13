// src/services/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/', // change this to your backend URL
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    getUsers: builder.query({
      query: () => 'users',
    }),
    // Add more endpoints here...
  }),
});

export const { useGetPostsQuery, useGetUsersQuery } = apiSlice;
