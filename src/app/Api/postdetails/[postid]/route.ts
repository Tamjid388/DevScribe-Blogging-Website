import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


// GET a postdetails by ID
export async function GET(req:NextRequest,{params}:{params:Promise<{postid:string}>}){
    const {postid}= await params
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
// Delete A Post By id
export async function DELETE(req:NextRequest,{params}:{params:Promise<{postid:string}>}){
    const {postid}=await params
    console.log(postid)

    try {
        const allPostsCollection=await connectToDB('allPosts')
       const result=await allPostsCollection.deleteOne({
        _id:new ObjectId(postid)
       })

if(result.deletedCount=== 0){
    return NextResponse.json(
        {message:"Post Not Existed"},
        {status:404}
    )

}else{
    return  NextResponse.json(
        {message:"Post deleted Successfully"},
        {status:200}
    )
}


    } catch (error) {
          console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


   

}