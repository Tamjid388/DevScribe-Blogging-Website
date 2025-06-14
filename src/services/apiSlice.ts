// src/services/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'inspector';


// Define your types here
type Post = {
  _id: string;
  title: string;
  author: string;
  email: string;
  content: string;
  tags: string[];
  createdAt: string;
  thumbnail?: string;
};

type GetPostsResponse = {
  result: Post[];
};
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/Api/', // change this to your backend URL
  }),
  tagTypes: ["AllPosts",'User'],
  endpoints: (builder) => ({
    

    // User Regestration Endpoint
    registerUser:builder.mutation({
    query:(userData)=>(
      {
        url:'createuser',
        method:"POST",
        body:userData
      }
    )
    }),
    
    // User Logout
    logoutUser: builder.mutation<any,void>({
      query: () => ({
        url: 'logout',
        method: 'GET',
      }),
      invalidatesTags: ['User'] // Invalidates user-related cached data
    }),


    // Get All  Post endpoint
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => 'createpost',
      providesTags: ["AllPosts"]
    }),

    // For deleting a post
    deletePostById: builder.mutation({
      query: (id) => ({
        url: `postdetails/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["AllPosts"]
    })


    // Add more endpoints here...
  }),
});

export const { useGetPostsQuery, useDeletePostByIdMutation ,useRegisterUserMutation,
  useLogoutUserMutation
} = apiSlice;
