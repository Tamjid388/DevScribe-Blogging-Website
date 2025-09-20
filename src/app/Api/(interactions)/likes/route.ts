import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, userId, username, isLiked } = body;


    if (!postId || !userId) {
      return NextResponse.json({
        message: "Id not fountd",
        success: false,
      });
    }

    const allPosts = await connectToDB("allPosts");

    if (isLiked) {
      const update = await allPosts.updateOne(
        { _id: new ObjectId(postId) },
        { $addToSet: { likes: { username, userId, date: new Date() } } }
      );
    } else {
      const update = await allPosts.updateOne(
        { _id: new ObjectId(postId) },
        {
          $pull: {
            likes: {
              userId,
            },
          } as any,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error:any) {
    return NextResponse.json({
      success: false,
      error: error?.message || error
    });
  }
}

// Number of likes

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId } = body;

    if(!postId){
      return NextResponse.json({
     success: false,
     massege:"Valid Post id required"
    });
    }

    const allPosts = await connectToDB("allPosts");
    const totalLikes = await allPosts.findOne(
      { _id: new ObjectId(postId) },

      { projection: { likes: 1 } }
    );

   


    return NextResponse.json({
      success: true,totalLikes
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}

