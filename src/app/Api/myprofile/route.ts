import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    

   const {userId}=await req.json()
   
    if (!userId) {
      return NextResponse.json({
        success: false, 
        message: "User ID not found",
      });
    }

    const usersCollection = await connectToDB("Users");

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
}