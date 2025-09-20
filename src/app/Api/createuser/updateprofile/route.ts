
import { connectToDB } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { userId, updateData } = await req.json();

    // Validate required fields
    if (!userId || !updateData) {
      return NextResponse.json(
        { message: "userId and updateData are required", success: false },
        { status: 400 }
      );
    }

    const usersCollection = await connectToDB("users"); 
    
    // Update user document
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) }, 
      { $set: updateData } 
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
// after a successful update
    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      updatedFields: Object.keys(updateData)
    });

  } catch (error) {
    
    return NextResponse.json(
      { message: "Failed to update user", success: false },
      { status: 500 }
    );
  }
}