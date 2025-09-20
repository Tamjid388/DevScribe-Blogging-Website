import { useDeleteCommentMutation } from '@/services/commentApiSlice'
import { Ellipsis } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify';

interface CommentActionsProps {
  commentid: string;
  postId: string;
}


export default function CommentActions({commentid, postId}:
   CommentActionsProps) {

 const [deleteComment, { isLoading }]=useDeleteCommentMutation()
  const handleDelete = async () => {
  try {
    await deleteComment({commentid:commentid}).unwrap()
    toast.success("Comment deleted successfully! ")
  } catch (error) {
     toast.error("Failed to delete comment.");
  }
  

};

  const handleClick = () => {
    toast.success(commentid);

  };
  return (
    <div className="dropdown dropdown-end">
     
      <button tabIndex={0} className="hover:bg-gray-200 p-1 rounded-full"> <Ellipsis /></button>
     <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
       <li>
        <button  onClick={handleClick} >Edit</button>
        </li>
     <li>
    <button onClick={handleDelete}>Remove</button>
  </li>
     </ul>
   </div>
  )
}
