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
     const [currentUser,setCurrentUser]=useState<User | undefined |null>()


     useEffect(()=>{
    const fetchCurrentuser=async()=>{
      try {
         const response=await axios.get("/Api/currentuser",
          {
          withCredentials:true
          }
        )
            console.log(response.data.user);
      
          setCurrentUser(response.data.user)
        
      } catch (error:any) {
          if (error.response?.status === 401) {
          // Expected: user not logged in or token expired
          console.warn("No active session. Proceeding as guest.");
          setCurrentUser(null); 
        } else {
          console.error("Error fetching user:", error);
        }
      }
    
    }

    fetchCurrentuser()

     },[])

return {currentUser}
  
}
export default useCurrentUser;