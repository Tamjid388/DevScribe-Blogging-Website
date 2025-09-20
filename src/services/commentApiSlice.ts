import { CommentPayload } from "@/types/commentTypes";
import { baseApi } from "./baseapi";
import { LikesPayloadType } from "@/Components/PostDetails/Sidebar";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (payload: CommentPayload) => ({
        url: `comments/${payload.postId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, payload) => [
        { type: "comments", id: payload.postId },
      ],
    }),

    // Get Comments by PostId
    getCommentsByPostId: builder.query({
      query: (postId) => `comments/${postId}`,
      providesTags: (result, error, postId) => [
        { type: "comments", id: postId },
      ],
    }),

    // Delete comment by commentId
    deleteComment: builder.mutation({
      query: ( {commentid} ) => ({
        url: `comment/${commentid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),




    // Give like Unlike on  a post
    isLike: builder.mutation({
      query: ( payload:LikesPayloadType ) => ({
        url: `likes`,
        method: "POST",
        body:payload
      }),
      
      invalidatesTags: (result, error, payload) => [
    { type: "postDetails", id: payload.postId },
  ],

     
    }),




    



  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
  useIsLikeMutation
} = commentApi;
