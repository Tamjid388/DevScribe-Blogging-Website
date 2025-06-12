"use client"
import axios from "axios"
import { useEffect, useState } from "react"


type User = {
  id: string;
  username: string;
  email: string;
  iat: number; 
  exp: number;
};


 const useCurrentUser =() => {
     const [currentUser,setCurrentUser]=useState<User | undefined>()


     useEffect(()=>{
    const fetchCurrentuser=async()=>{
     
        const response=await axios.get("/Api/currentuser")
        console.log(response.data.user);
        setCurrentUser(response.data.user)
        

    }

    fetchCurrentuser()

     },[])

return {currentUser}
  
}
export default useCurrentUser;