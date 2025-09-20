"use client";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/services/apiSlice";
import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2";

export const UpdateProfilePicture = () => {
  const [isUploading, setIsUploading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );
  const [error, setError] = useState("");
  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();
  const { data: user, isLoading: userLoading } =
    useGetCurrentUserQuery(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // 🟡 Guard clause: make sure user info is loaded
    if (userLoading || !user?.user?.email) {
      Swal.fire("User info not loaded yet. Please try again in a moment.");
      return;
    }
    setError(" ");
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    setIsUploading(true);

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }
    setSelectedImage(file);
    try {
      const formdata = new FormData();
      formdata.append("file", file);
      const response = await axios.post("/api/imageupload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Get back the url of image from cloudinary
      const imageUrl = response.data.avatarUrl;

      setPreviewUrl(imageUrl);

      // Update profile picture URL in backend using RTK Query mutation
      await updateProfile({
        profileImage: imageUrl,
        email: user?.user?.email,
      }).unwrap();
      Swal.fire("Profile picture updated successfully!");
    } catch (error) {
    } finally {
      setIsUploading(false);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <figure className="h-[100px] ">
        <img
          className="h-full w-full object-contain"
          src={previewUrl}
          alt="avatar"
        />
      </figure>
      <div className="">
        <fieldset className="fieldset">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <button className="btn btn-primary" onClick={triggerFileInput}>
            {isUploading ? "Uploading In Process..." : " Upload An Image"}
          </button>
          <label className="label">Max size 5 MB</label>
          {error && (
            <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
          )}
        </fieldset>
      </div>
    </div>
  );
};
