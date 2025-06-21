"use client"
import PostDetails from "@/Components/PostDetails/PostDetails";
import { Sidebar } from "@/Components/PostDetails/Sidebar";
import { SummarizeText } from "@/Components/PostDetails/SummarizeText";
import { useGetPostDetailsQuery } from "@/services/apiSlice";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TerminalLoader from "./TerminalLoader";
import CommentSection from "@/Components/PostDetails/Comment/CommentSection";

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




const Postdetails=()=>{
     const params = useParams();
  const slug = params.slug as string;


 const { data: post, isLoading, isError } = useGetPostDetailsQuery(slug)

 if(isLoading) return <TerminalLoader/>

return(
    <div className=" grid grid-cols-1 lg:grid-cols-12 space-y-6 
    lg:space-x-4 xl:space-x-16 my-16 px-2 xl:px-6">
      
       <div className="lg:col-span-8  xl:col-span-9 border border-gray-300 p-4 md:p-12  rounded-xl bg-white">
         <PostDetails post={post as Post}/>
         <CommentSection postId={slug as string}/>
         
         
       </div>
       <div className="lg:col-span-4 xl:col-span-3 border border-gray-300 p-6 rounded-xl bg-white">
        
         <h1 className="text-xl font-semibold mb-3 px-2"> Blog Tools</h1>
         <h1 className="text-md font-semibold opacity-80 px-2 mb-2">Engage with this post</h1>

        <Sidebar/>
        <div className="divider"></div>
        <SummarizeText content={post?.content}/>
       </div>
    </div>
    
)
}
export default Postdetails;

  