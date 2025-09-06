"use client"

import EditPost from "@/actions/EditPost";
import ImageUploader from "@/Components/ImageUploader/ImageUploader";
import Loading from "@/Components/Loading/Loading";
import { useGetPostDetailsQuery } from "@/services/apiSlice";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react"
import Swal from "sweetalert2";
   type Type = string | undefined;
export default function Page() {
  const params=useParams()
  const id =params.id as string
  console.log(id);
  // const {id}=use(params)
  const {data:post}=useGetPostDetailsQuery(id)
  const [title,setTitle]=useState<string>()
  const [value, setValue] = useState<Type>("");
  const [alltags,setTags]=useState("");
  const [imageUrl, setImageUrl] = useState("");

 
useEffect(() => {
  if (!post) return;

  const { title, content, thumbnail,tags } = post;

  if (title) setTitle(title);
  if (content) setValue(content);
  if (thumbnail) setImageUrl(thumbnail);
  if (tags) setTags(tags.join(", "));
}, [post]);

   const handleTitleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setTitle(e.target.value)
   }

 const handletags=(e:React.ChangeEvent<HTMLInputElement>)=>{
setTags(e.target.value)
 }       

    const handleChange=(val?: string)=>{
            setValue(val)
    }

   // HandleForm
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const data={
           title,
          thumbnail:imageUrl,
          content:value,
          tags: alltags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      }   



   const result = await EditPost(id, data);
  if (result.modifiedCount > 0){
          Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your blog has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
  } 



  };

     if(!post) return <Loading/>
  return (
    <div className="h-[100vh]">
       <h1 className='text-3xl my-6 font-bold '>Edit Post</h1>
<form onSubmit={handleSubmit}>
      {/* title */}
     <div>
       <label className="text-xl font-bold">Blog Title</label>
      <input type="text"
       className="input my-4 w-full"
       value={title || ""}
       onChange={handleTitleChange} />
     </div>
       {/* Image uploader + show existing */}
      <div className="flex my-4 gap-4">
        <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
        {imageUrl ? (
          <img
            className="border border-gray-200"
            src={imageUrl}
            alt="Current Thumbnail"
            width={200}
          />
        ):(
          <Image
          alt="defualt image"
          width={200}
           height={500}
          className=" border-2  "
          src={'/defualt.jpg'}
          />
        )}
      </div>
      {/* Tags */}
      <div>
        <label className="text-xl font-bold">Tags</label>
        <input type="text"
        className="input my-4 w-full"
        placeholder=""
        value={alltags || ""
        }
        onChange={handletags}
        />
      </div>
      {/* description */}
      <div data-color-mode="light" className="">
        <MDEditor value={value} onChange={handleChange} />

        
      </div>
      <button className="btn my-4 btn-primary" type="submit">
        Update Blog
      </button>
</form>
    </div>
  )
}
