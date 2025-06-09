import { connectToDB } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const userCollection = await connectToDB("Users");

    // Find user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 } // Unauthorized
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    // token creation:jwt 

      const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email

        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET!,
            {expiresIn:"8h"}
        )
    


    // If login successful
   const response= NextResponse.json(
      { message: "Login successful",
         username: user.username },
      { status: 200 }
    );

    response.cookies.set("token",token,{
        httpOnly:true,
       
    })

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
