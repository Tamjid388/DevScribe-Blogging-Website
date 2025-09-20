import React, { useState } from "react";
import { useGetCurrentUserQuery } from "@/services/apiSlice";
import Swal from "sweetalert2";
import {
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@/services/commentApiSlice";
import LoadingSpinner from "@/Components/Loading/LoadingSpinner";
import { Comment, CommentPayload } from "@/types/commentTypes";
import { Ellipsis } from "lucide-react";
import CommentActions from "./CommentActions";

export default function CommentSection({ postId }: { postId: string }) {
  const { data } = useGetCurrentUserQuery(undefined);
  const {
    data: allComments,
    isLoading: loadingComments,
    isError,
    refetch,
  } = useGetCommentsByPostIdQuery(postId);
  const [addComment, { isLoading }] = useAddCommentMutation();

  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!data) {
      Swal.fire("Error", "You must be logged in to comment", "error");
      return;
    }
    if (!comment) {
      Swal.fire("Error", "Comment cannot be empty", "error");
      return;
    }

    const payload: CommentPayload = {
      username: data.user.username,
      content: comment,
      postId: postId,
      userId: data.user.id,
      updatedAt: null,
    };


    try {
      await addComment(payload).unwrap();
      Swal.fire("Comment Added");
      setComment("");
    } catch (err: any) {
      Swal.fire("Failed to add comment");
   
    }
  };
  return (
    <div id="comments">
      <div className="my-4">
        <h1 className="text-3xl font-semibold ">Leave a reply:</h1>
        <p className=" font-semibold opacity-70 ">
          Your email address will not be published.
        </p>
      </div>
      <div className="flex space-x-2">
 

        <div className=" w-full flex flex-col gap-3">
          <textarea
            placeholder="Add to the discussion"
            className="textarea  w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="button"
            disabled={!data}
            onClick={handleSubmit}
            className="btn btn-outline self-start"
          >
            {isLoading ? <LoadingSpinner /> : "Submit"}
          </button>
        </div>
      </div>
      {/*Show   All Comments */}
      <div className="mt-4 space-y-2">
        {loadingComments && <LoadingSpinner />}
        {isError && <p>Failed to load comments.</p>}
        {!loadingComments &&
          allComments &&
          allComments.comments.length === 0 && (
            <p>No comments yet. Be the first to comment!</p>
          )}
        {!loadingComments &&
          allComments &&
          allComments.comments.length > 0 &&
          allComments.comments.map((comment: Comment) => (
            <div
              key={comment._id}
              className="shadow-xs shadow-gray-300
             hover:shadow-md  transition-shadow duration-300 py-2 flex justify-between"
            >
              <div>
                <p className="font-semibold">{comment.username}</p>{" "}
                {/* username available? */}
                <p>{comment.content}</p>
                <small className="text-gray-500">
                  {comment.updatedAt
                    ? new Date(comment.updatedAt).toLocaleString()
                    : new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
              {/* Actions */}
              <div className="mx-2">
                 {data?.user.id === comment.userId && (
      <CommentActions commentid={comment._id} postId={comment.postId} />
    )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
