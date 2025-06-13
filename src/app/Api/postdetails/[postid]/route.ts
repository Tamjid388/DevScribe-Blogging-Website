import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{ params: { postid: string } }){
    const {postid}=await params
    console.log(postid)

    try {
        const allPostsCollection=await connectToDB('allPosts')
       const post=await allPostsCollection.findOne({_id:new ObjectId(postid)})

       if(!post){
        return NextResponse.json({
            message:"Post not found"
        })
       }
     return NextResponse.json(post)


    } catch (error) {
          console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


   

}