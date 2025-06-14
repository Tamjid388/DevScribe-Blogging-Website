"use client"
import { Bookmark,HeartPlus,MessageCircle } from "lucide-react"
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { usePost } from "@/app/hooks/usePosts"
import { Trash } from "lucide-react";
import { PostActions } from "@/Components/Dashboard/Posts/PostActions";
import Postskilton from "@/Components/ui/loader/Postskilton";
import { div } from "framer-motion/client";
import { useGetPostsQuery } from "@/services/apiSlice";
import { AllPosts } from "@/Components/AllPosts/AllPosts";

export default function Posts(){
  const {currentUser}=useCurrentUser()

    const {posts,loading}=usePost()
    console.log(posts);
   const { data: Allposts, isLoading } = useGetPostsQuery();
 
    console.log(Allposts);
// const MyPostOnly = posts.filter(post => post?.email === currentUser?.email);

const MyPostOnly = Allposts?.result?.filter(
  (post) => post?.email === currentUser?.email
);


if(loading){
  return <div className="flex items-center justify-center">
    <Postskilton/>
  </div>
}

const  postlength:any=MyPostOnly?.length
const randomNum=Math.floor(Math.random()* postlength)+1
console.log(randomNum);
    return(
       <div>
      <h2 className="text-xl font-bold mb-4 m-2">My Posts</h2>
      {MyPostOnly?.length === 0 ? (
        <p className="text-gray-500">You haven’t posted anything yet.</p>
      ) : (
        <ul className="space-y-2">
          {MyPostOnly?.map(post => (
            <div key={post._id} className="p-4 m-2 bg-gray-100 rounded-md flex items-center justify-around gap-x-8" >
             <div className=" w-3/5">
               <h3 className="text-lg font-bold text-blue-600 hover:underline">{post.title}</h3>
              <p className="font-semibold opacity-60">Published :
               <span className="text-sm opacity-80"> {post?.createdAt}</span></p>
             </div>

             <div  className="flex opacity-60 space-x-3">
           <li className="flex">
             <HeartPlus /> <span>{randomNum+4}</span>
            </li> 
            <li className="flex"> <MessageCircle /> <span>{randomNum}</span></li>
            <li className="flex"> <Bookmark /><span>{randomNum+1}</span></li>  
             </div>

              <div>
                
                 <PostActions id={post._id}/>
              </div>

              
            </div>
          ))}
        </ul>
      )}
    </div>
    )

}