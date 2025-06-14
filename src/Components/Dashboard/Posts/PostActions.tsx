import { useDeletePostByIdMutation } from '@/services/apiSlice';
import { Trash,SquarePen } from 'lucide-react'
import React from 'react'
import Swal from 'sweetalert2';
type PostActionsProps = {
  id: string;
};
export const PostActions = ({id}: PostActionsProps) => {
const [deletePost]=useDeletePostByIdMutation()

const handleDelete = async (id: string) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (confirmation.isConfirmed) { 
    try {
      await deletePost(id).unwrap();
      await Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success"
      });
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete post",
        icon: "error"
      });
      console.error('Delete failed:', error);
    }
  }
};
  return (
    <div className='space-x-2'>
        <button
        onClick={()=>handleDelete(id)}
        className="btn btn-sm text-red-500 bg-red-50 tooltip"  data-tip="Delete">
           <Trash />
           </button>
        <button className="btn btn-sm text-blue-600 bg-blue-50 tooltip"
         data-tip="Edit Post"> <SquarePen /></button>
    </div>
  )
}
