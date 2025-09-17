"use server"

import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

export async function UserProfile(userId:string){
   
    const userCollection=await connectToDB('Users')
    const user=await userCollection.findOne(
        {_id:new ObjectId(userId)},
         { projection: { password: 0 } } 
    )
    if(!userId) throw new Error("User Not found")
    return user;
}