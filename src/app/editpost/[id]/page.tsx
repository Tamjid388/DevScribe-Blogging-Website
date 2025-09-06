"use client"

import ImageUploader from "@/Components/ImageUploader/ImageUploader";
import Loading from "@/Components/Loading/Loading";
import { useGetPostDetailsQuery } from "@/services/apiSlice";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { use, useEffect, useState } from "react"
   type Type = string | undefined;
export default function page({
    params,
}:{
    params: Promise<{ id: string }>
}) {
  
  const {id}=use(params)
  const {data:post,isLoading}=useGetPostDetailsQuery(id)
  const [title,setTitle]=useState<string>()
  const [value, setValue] = useState<Type>("");
  const [imageUrl, setImageUrl] = useState("");
  console.log(post);
 
useEffect(() => {
        if (post?.title) {
            setTitle(post.title)
        }
    }, [post])

    useEffect(() => {
        if (post?.content) {
            setValue(post.content)
        }
    }, [post])
    useEffect(() => {
        if (post?.thumbnail
) {
            setImageUrl(post.thumbnail)
        }
    }, [post])

   const handleTitleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setTitle(e.target.value)
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
  content:value
}   
console.log(data);

  };

     if(!post) return <Loading/>
  return (
    <div className="h-full">
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
        placeholder="" />
      </div>
      {/* description */}
      <div data-color-mode="light" className="">
        <MDEditor value={value} onChange={handleChange} />

        
      </div>
      <button className="btn" type="submit">
        Update Blog
      </button>
</form>
    </div>
  )
}
