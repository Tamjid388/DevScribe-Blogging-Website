import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { commentId } = params;

  const commentsCollection = await connectToDB("comments");

  try {
    const result = await commentsCollection.deleteOne({
      _id: new ObjectId(commentId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}