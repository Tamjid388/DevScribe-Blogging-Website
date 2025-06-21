import React, { useState } from 'react'
import { useAddCommentMutation, useGetCurrentUserQuery } from "@/services/apiSlice";
import Swal from 'sweetalert2';

interface CommentPayload{
  username:string,
  content:string ,
  postId:string,
  


}

export default function CommentSection({postId}:{postId:string}) {
  const { data: user, isLoading } = useGetCurrentUserQuery(undefined)
const [addComment, { isError }] = useAddCommentMutation();

  const [comment, setComment] = useState<string>("");
 
  const handleSubmit =async () => {
   
   if (!user) {
      Swal.fire("Error", "You must be logged in to comment", "error");
      return;
    }

console.log(user.username);
console.log("Button Hit");
const payload:CommentPayload={
  username:user.username,
  content:comment,
  postId:postId,

}
console.log(payload);

try {
const response= await addComment(payload).unwrap();
  Swal.fire("Comment Added")
  setComment("");
  console.log(response);
} catch (error) {
  Swal.fire("Failed to add comment")
  console.log(error);
}

  }
  return (
    <div id="comments">
      <h1 className='text-3xl font-bold my-4'>Comments</h1>
      <div className="flex space-x-2">
        {/* Avatar */}
        <div className="bg-neutral text-neutral-content w-9 h-9 rounded-full flex justify-center items-center">
          <span className="text-xl text-white">TA</span>
        </div>

        <div className="bg-white w-full flex flex-col gap-3">
          <textarea placeholder="Add to the discussion"
            className="textarea textarea-primary "
             value={comment} 
            onChange={(e) => setComment(e.target.value)}
          >

          </textarea>
          <button
          type="button" disabled={!user} onClick={handleSubmit} className="btn btn-primary self-start">
            Submit
          </button>
        </div>

      </div>

    </div>
  )
}
// let name=user?.username
// const initials = name?.split(" ")
// .map(word:string => word[0])
// .join("")
// .toUpperCase();
// console.log(initials);