"use client"
import axios from 'axios';
import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'

export const UpdateProfilePicture = () => {
  const [isUploading, setIsUploading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("http://bootdey.com/img/Content/avatar/avatar1.png");
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(" ")
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.match('image.*')) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    setIsUploading(true)
    console.log(file);

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    setSelectedImage(file);
    try {
      const formdata = new FormData()
      if (selectedImage) {
        formdata.append("file", selectedImage);
      }

      const response = await axios.post('/Api/imageupload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // Get back the url of image from cloudinary
      const imageUrl = response.data.avatarUrl
      console.log(imageUrl);
      setPreviewUrl(imageUrl);
    } catch (error) {
      console.log("Error Uploading In image");
    }
    finally {
      setIsUploading(false)
    }
  }
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }
  return (
    <div>
      <figure className='h-[300px] '>
        <img className='h-full w-full object-cover'
          src={previewUrl}
          alt="avatar" />
      </figure>
      <div className=''>
        <fieldset className="fieldset">


          <input
            ref={fileInputRef}
            type="file"
            accept='image/*'
            className="hidden"
            onChange={handleImageChange}
          />

          <button className='btn btn-primary' onClick={triggerFileInput}>

            {isUploading ? "Uploading In Process..." : " Upload An Image"}
          </button>
          <label className="label">Max size 5 MB</label>
          {error && (
            <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
          )}
        </fieldset>
      </div>
    </div>
  )
}
