import { connectToDB } from "@/lib/dbconnect";

import { NextRequest, NextResponse } from "next/server";

// ADD comment:Post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate required fields
    if (!body.postId || !body.username || !body.content) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    const { parentCommentId } = body;
    const comment = {
      ...body,
      parentCommentId: parentCommentId ? parentCommentId : null,
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const commentCollection = await connectToDB("comments");
    const result = await commentCollection.insertOne(comment);

    return NextResponse.json({
      massege: "Comment created succesfully",
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error:any) {
    return NextResponse.json({
      massege: "failed",
      success: false,
      error:error?.massege || error
    });
  }
}
