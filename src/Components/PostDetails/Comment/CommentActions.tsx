import { Ellipsis } from 'lucide-react'
import React from 'react'

export default function CommentActions({commentid}:{ commentid: string }) {
  return (
    <div className="dropdown dropdown-end">
     
      <button tabIndex={0} className="hover:bg-gray-200 p-1 rounded-full"> <Ellipsis /></button>
     <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
       <li><a>edit {commentid}</a></li>
       <li><a>remove</a></li>
     </ul>
   </div>
  )
}
