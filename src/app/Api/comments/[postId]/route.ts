import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
// Get The Commments:GET

export async function GET(
    req:NextRequest ,
    {params}:{params:Promise<{postId:string}>})
    {
    try {
          const {postId}=await params
            const commentCollection = await connectToDB("comments");
         const comments = await commentCollection.find({ 
      postId: postId // Direct string comparison
    }).toArray();
         return NextResponse.json({
      message: "Comments fetched successfully",
      success: true,
      data: comments,
    });
    } catch (error) {
        return NextResponse.json({
            massage:"Failed to fetch comment"
        })
    }
}