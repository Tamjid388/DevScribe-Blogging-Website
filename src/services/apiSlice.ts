// src/services/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./baseapi";

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

export const apiSlice = baseApi.injectEndpoints({
  // reducerPath: "api",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.NEXT_PUBLIC_URL!,
  // }),
  // tagTypes: ["AllPosts", "User"],

  endpoints: (builder) => ({
    // User Regestration Endpoint
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "createuser",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "signinuser",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // User Logout
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    // Get CurrentUser

    getCurrentUser: builder.query({
      query: () => "/currentuser",
      providesTags: ["User"],
    }),

    // Get All  Post endpoint
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => "createpost",
      providesTags: ["AllPosts"],
    }),

    //  Get A PostDetail By Id
    getPostDetails: builder.query({
      query: (id) => `postdetails/${id}`,
    }),

    // For deleting a post
    deletePostById: builder.mutation({
      query: (id) => ({
        url: `postdetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPosts"],
    }),

    // Text Summarizer

    aiTextSummarizer: builder.mutation({
      query: (body) => ({
        url: "aitextsummarizer",
        method: "POST",
        body,
      }),
    }),


    //  Update Profile

    updateProfile: builder.mutation({
      query: (profilePayload) => ({
        url: "editprofile",
        method: "POST",
        body: profilePayload,
      }),
      invalidatesTags: ["User"],
    }),

    //  Add Endpoints From Here
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostByIdMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetCurrentUserQuery,
  useLoginUserMutation,
  useGetPostDetailsQuery,
  useAiTextSummarizerMutation,
 
  useUpdateProfileMutation,
} = apiSlice;
