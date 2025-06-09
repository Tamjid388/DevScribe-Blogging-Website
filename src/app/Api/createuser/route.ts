import { connectToDB } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";




export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const { email, username, password } = body
        console.log(body);

        const userCollection = await connectToDB("Users")
        const userExist: string | any =await userCollection.findOne({ email })

        if (userExist) {
            return NextResponse.json({
                error: "User Already Exists"
            })
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // Insert user into DB
        const newUser = {
            email,
            username,
            password: hashedPassword,
            createdAt: new Date(),
        };
        const result = await userCollection.insertOne(newUser)

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );


    } catch (error) {
        console.error("Error creating user:", error);
         return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );

    }

}