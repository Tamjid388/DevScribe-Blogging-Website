import { connectToDB } from '@/lib/dbconnect';
import { NextResponse } from 'next/server';


// all posts
export async function GET() {

    const collection = await connectToDB("allPosts");
    const result = await collection.find().toArray()
    return NextResponse.json({ result });

}



// create post
export async function POST(request: any) {

    try {

        const data = await request.json()
        const collection = await connectToDB("allPosts");
        const result = await collection.insertOne(data)

        return NextResponse.json({
            message: "Post created",
            insertedId: result.insertedId
        })

    } catch (error) {
        return NextResponse.json(error)

    }


}
