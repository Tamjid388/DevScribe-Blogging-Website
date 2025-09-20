import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/dbconnect"; // আপনার DB connect function
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded?.id; 

    if (!userId) {
      return NextResponse.json(
        { user: null, error: "Invalid token payload" },
        { status: 400 }
      );
    }

    // DB connect
    const users = await connectToDB("Users");

    // Find user by id
    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } 
    );

    if (!user) {
      return NextResponse.json(
        { user: null, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { user: null, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
