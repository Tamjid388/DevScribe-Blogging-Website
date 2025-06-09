
"use client"
import axios from "axios";
import { useEffect, useState } from "react";


export function usePost(){
    const [posts,setPosts]=useState([])

    useEffect(
        ()=>{
         const fetchPosts=async()=>{
            const response=await axios.get("/Api/createpost")
            setPosts(response.data.result)
         };

         fetchPosts()
            
        },[]
    )
    

    return {posts}
}