import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';


// Configuration
cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloudname,
    api_key: process.env.Cloudinary_Api_Key,
    api_secret: process.env.Cloudinary_Api_Secret
});


export async function POST(req: NextRequest) {
    const formdata = await req.formData()
    const file = formdata.get("file") as File;

    console.log("Received file:", file?.name);
console.log("File type:", file?.type);
console.log("File size:", file?.size);

    if (!file) {
        return NextResponse.json(
            { error: "No file Uploaded" }
            , { status: 400 }
        )
    };

    const buffer = Buffer.from(await file.arrayBuffer());

    try {

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);

                }

            ).end(buffer);
        });

        // Generate optimized URL
        const optimizeUrl = cloudinary.url((result as any).public_id, {
            fetch_format: 'auto',
            quality: 'auto',
        });

        // Generate auto-crop URL
        const autoCropUrl = cloudinary.url((result as any).public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        return NextResponse.json({
            success: true,
            original: (result as any).secure_url,
            optimizeUrl,
            autoCropUrl,
        });


    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }

}