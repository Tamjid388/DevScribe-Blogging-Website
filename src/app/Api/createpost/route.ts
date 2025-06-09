// app/api/createpost/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    name: "tamjid ahmed",
    age: 32
  };

  return NextResponse.json({ data });
}

export async function POST(request:any){

    const data=await request.json()

    return NextResponse.json({data})
}