import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { commentId, userId } = await req.json();
    
    if (!commentId || !userId) {
      return NextResponse.json(
        { message: "Missing parameters", success: false },
        { status: 400 }
      );
    }

    const commentCollection = await connectToDB("comments");
    
    // Check if user already liked
    const comment = await commentCollection.findOne({ 
      _id: new ObjectId(commentId),
      likes: userId 
    });

    let updateResult;
    
    if (comment) {
      // Unlike - remove userId from array
      updateResult = await commentCollection.updateOne(
        { _id: new ObjectId(commentId) },
        { $pull: { likes: userId } }
      );
    } else {
      // Like - add userId to array
      updateResult = await commentCollection.updateOne(
        { _id: new ObjectId(commentId) },
        { $addToSet: { likes: userId } } 
      );
    }

    return NextResponse.json({
      message: comment ? "Unliked comment" : "Liked comment",
      success: true,
      liked: !comment
    });

  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({
      message: "Failed to toggle like",
      success: false
    }, { status: 500 });
  }
}