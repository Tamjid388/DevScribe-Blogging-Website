"use client"

import useCurrentUser from "@/app/hooks/useCurrentUser";
import ImageUploader from "@/Components/ImageUploader/ImageUploader";
import MDEditor from "@uiw/react-md-editor"
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";


const Maincontent = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  type Type = string | undefined;
  const [value, setValue] = useState<Type>("");

const {currentUser}=useCurrentUser()
console.log(currentUser);




  const handleChange = (val: string | undefined) => {
    console.log("Changed:", val);
    setValue(val);
  };

  const handlePostTitle = (e: any) => {
    const title = e.target.value
    setTitle(title);
  }



  // Callback function to update parent state

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
    console.log("Image URL received in parent:", url);
  }


  const handlePublish = () => {
    const blogDatas = {
      title: title,
      description: value,
      thumbnail: imageUrl,
      author:currentUser?.username,
      email:currentUser?.email
    }


    axios.post("Api/createpost", blogDatas)
      .then(res => {
        console.log("Post created:", res.data);
        Swal.fire({
    title: "Blog Posted!",
        text: "Your blog has been successfully published.",
        icon: "success",
        confirmButtonText: "OK"
});
      })
      .catch(err => {
        console.error("Error creating post:", err);
        Swal.fire({
        title: "Failed!",
        text: "There was an error posting your blog.",
        icon: "error",
        confirmButtonText: "Retry"
});
      });
  }
  return (
    <div className="space-y-6">


      {/* Title */}
      <div>

        <input type="text"
          placeholder="Write Your Post Title Here ..." className="
       input input-ghost w-full
       placeholder:text-3xl placeholder:font-bold p-0
       "
          name="title"
          onChange={handlePostTitle}
        />

      </div>

      {/* image input*/}

      <div className="flex gap-4">
        <ImageUploader onUploadSuccess={handleImageUpload} />
        {imageUrl && <img className="border border-gray-200" src={imageUrl} alt="Uploaded" width={200} />}

      </div>

      {/* Markdown Editor height={200} */}
      <div data-color-mode="light" className="">
        <MDEditor value={value} onChange={handleChange} />
      </div>

      <button
        onClick={handlePublish}
        className="btn btn-primary">Publish </button>

    </div>
  )
}
export default Maincontent