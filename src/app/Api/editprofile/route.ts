import { connectToDB } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest){

  


try {
    const body=await request.json()

    if(!body.email){
      return NextResponse.json({
        massege:"Email Not Found"
      })
    }
    const useCollection=await connectToDB('Users')
    const filter = { email: body.email }; 
    const update = { $set: body };
    const result = await useCollection.updateOne(filter, update);

    return NextResponse.json({ success: true, result },{ status: 200 })  
} catch (error) {
    
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
}


}