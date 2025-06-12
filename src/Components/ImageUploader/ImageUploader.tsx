
"use client"

import axios from "axios";
import { useState } from "react";


 const ImageUploader = () => {
    const [result, setResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
    const handleAutoUpload = async (e: React.ChangeEvent<HTMLInputElement>) =>{
 console.log("Event triggered"); 
        const file=e.target.files?.[0]

        if (!file) return;

    setIsUploading(true);
    console.log(file);

try {
    const formdata=new FormData()
    formdata.append('file',file)

    const response=await axios.post('/Api/imageupload',formdata,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })


    // Get back the url of image from cloudinary
    const imageUrl=response.data.optimizeUrl 
    console.log(imageUrl);
} catch (error) {
    console.log("Error facing in uploading image")
    
}finally{
    setIsUploading(false)
}

    }

  return (
    <div>
        <h1 className="font-semibold text-gray-500 mb-2">Upload An Image</h1>
<input type="file"
accept="image/*"
onChange={handleAutoUpload}
disabled={isUploading}

className="file-input file-input-primary" />

   {isUploading && <p className="mt-2 text-sm">Uploading...</p>}


    </div>
  )
}
export default ImageUploader