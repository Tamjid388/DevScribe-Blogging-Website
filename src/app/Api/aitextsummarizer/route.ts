import { GoogleGenAI } from "@google/genai";



import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

try {
const {content}=await req.json()

 if (!content) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
     apiKey: process.env.AI_BLOG_SUMMARIZER_KEY
     });


    const prompt =  `Summarize the following blog content:\n\n${content}`;;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // You can use "gemini-1.5-flash", "gemini-2.0-pro", etc.
      contents: prompt,
    });

 


 return NextResponse.json({
    summary:response.text
 })
 
    
} catch (error) {
 return NextResponse.json({ error: "AI summarization failed" }, { status: 500 });   
}




}

