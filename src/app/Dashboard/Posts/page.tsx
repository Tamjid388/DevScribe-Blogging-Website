"use client"

import useCurrentUser from "@/app/hooks/useCurrentUser";
import { usePost } from "@/app/hooks/usePosts"
import { Trash } from "lucide-react";

export default function Posts(){
  const {currentUser}=useCurrentUser()

    const {posts}=usePost()
    console.log(posts);
const MyPostOnly = posts.filter(post => post?.email === currentUser?.email);

console.log(MyPostOnly);
    return(
       <div>
      <h2 className="text-xl font-bold mb-4 m-2">My Posts</h2>
      {MyPostOnly.length === 0 ? (
        <p className="text-gray-500">You haven’t posted anything yet.</p>
      ) : (
        <ul className="space-y-2">
          {MyPostOnly.map(post => (
            <div key={post._id} className="p-4 m-2 bg-gray-100 rounded-md flex items-center gap-x-8" >
              <h3 className="text-lg font-bold text-blue-600">{post.title}</h3>

              <div>
                 <Trash />
              </div>

              {/* <p className="text-sm text-gray-700">{post.content}</p> */}
            </div>
          ))}
        </ul>
      )}
    </div>
    )

}