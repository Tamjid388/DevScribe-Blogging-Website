
import { CommentPayload } from "@/types/commentTypes";
import { baseApi } from "./baseapi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
   
   
   
    addComment: builder.mutation({
      query: ( payload: CommentPayload ) => ({
        url: `comments/${payload.postId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, payload) => [
        { type: "comments", id:payload.postId }
      ]
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
      query: ({ commentId }) => ({
        url: `comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "comments", id: postId },
      ],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
} = commentApi;
