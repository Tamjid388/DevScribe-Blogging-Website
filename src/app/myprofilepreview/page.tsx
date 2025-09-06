"use client"
import { useGetCurrentUserQuery } from "@/services/apiSlice";
import TerminalLoader from "../postdetails/[slug]/TerminalLoader";


export default function MyProfilePreview() {
     const { data ,isLoading:userLoading} = useGetCurrentUserQuery(undefined);
 if(userLoading){
    return <TerminalLoader/>
 }
    
    console.log(data?.user);
    const {username}=data?.user 
    console.log(username);
  return (
    <div className="h-screen">
        <div className="bg-primary h-32">
...
        </div>
    </div>
  )
}
