"use server"
import { connectToDB } from '@/lib/dbconnect'
import { ObjectId } from 'mongodb';


export default async function EditPost(id:string,data:any) {
 
    const posts=await connectToDB('allPosts');


    const result=await posts.updateOne(
        {
            _id:new ObjectId(id)
        },
        {
            $set:data
        }
    )

    return result;


}
