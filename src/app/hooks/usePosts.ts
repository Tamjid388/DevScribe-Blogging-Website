
"use client"
import axios from "axios";
import { useEffect, useState } from "react";

type Posts = {
  _id: string;
  title?: string;
  author?: string;
  email?: string;
  thumbnail?: string;
  content?: string;
};


export function usePost(){
    const [posts,setPosts]=useState<Posts[]>([])
     const [loading, setLoading] = useState(true);

    useEffect(
        ()=>{

         const fetchPosts=async()=>{
          try {
        setLoading(true); // Start loading
        const response = await axios.get("/Api/createpost");
        setPosts(response.data.result);
      } catch (err: any) {
       
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false); 
      }
         };

         fetchPosts()
            
        },[]
    )
    

    return {posts,loading}
}