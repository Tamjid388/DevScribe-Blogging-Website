import { connectToDB } from "@/lib/dbconnect";

import { NextRequest, NextResponse } from "next/server";

// Add Comment By Id

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const body = await req.json();

  const commentsCollection = await connectToDB("comments");
  const comment = {
    ...body,
    createdAt: new Date(),
  };
  const result = await commentsCollection.insertOne(comment);

  return NextResponse.json({ comments: comment });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    const commentsCollection = await connectToDB("comments");
    const result = await commentsCollection.find({ postId }).toArray();

    if (!result) {
      return NextResponse.json({ messege: "Comments Not found" });
    }
    return NextResponse.json({ comments: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// Get The Commments:GET

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ postId: string }> }
// ) {
//   try {
//     const { postId } = await params;

//     const commentCollection = await connectToDB("comments");
//     const comments = await commentCollection
//       .find({
//         postId: postId, // Direct string comparison
//       })
//       .toArray();
//     return NextResponse.json({
//       message: "Comments fetched successfully",
//       success: true,
//       data: comments,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       massage: "Failed to fetch comment",
//     });
//   }
// }
