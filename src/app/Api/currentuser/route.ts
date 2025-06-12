import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


export async function GET(){
    try {
        const token= (await cookies()).get("token")?.value;

        if(!token){
            return NextResponse.json({user:null},{status:401})
        }

        const decoded=jwt.verify(token, 
            process.env.JWT_SECRET!)
          

             return NextResponse.json({ user: decoded }, { status: 200 });
    } catch (error) {
         return NextResponse.json(
      { user: null, error: "Invalid or expired token" },
      { status: 401 }
    );
    }
}