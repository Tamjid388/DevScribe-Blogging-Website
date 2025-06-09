"use client"

import axios from "axios";
import { useRouter } from "next/navigation"
import { useState } from "react"

type LoginData = {
  email: string;
  password: any;
};

export const useLogin=()=>{
    const [loading,setLoading]=useState(false)
    const router=useRouter()

     const loginUser = async ({ email, password }: LoginData) => {
    setLoading(true);


    try {
      const response = await axios.post("/Api/signinuser", {
        email,
        password,
      });

      if (response.status === 200) {
         const { username } = response.data;
         console.log(username)
         console.log("Login Success");
        router.push("/"); // Redirect on successful login
      }
    } catch (err: any) {
     console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return {
    loginUser,  loading,
  }
}