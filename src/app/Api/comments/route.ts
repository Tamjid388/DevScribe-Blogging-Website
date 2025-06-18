import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// ADD comment:Post
export async function POST(req: NextRequest) {
    try {

        const body = await req.json()
        // Validate required fields
        if (!body.postId || !body.username || !body.content) {
            return NextResponse.json(
                { message: "Missing required fields", success: false },
                { status: 400 }
            );
        }
        const { postId, parentCommentId, username, content, likes } = body
        const comment = {
            ...body,
            parentCommentId: parentCommentId ? parentCommentId : null,
            likes:[],
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const commentCollection = await connectToDB("comments")
        const result = commentCollection.insertOne(comment)

        return NextResponse.json({
            massege: "Comment created succesfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({
            massege: "failed",
            success: false
        })
    }
}


