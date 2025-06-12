"use client"

import ImageUploader from "@/Components/ImageUploader/ImageUploader";
import MDEditor from "@uiw/react-md-editor"
import axios from "axios";
import { useState } from "react";


 const Maincontent = () => {
  const [title, setTitle] = useState("");
  type Type = string | undefined;
   const [value, setValue] =useState<Type>("");

 const handleChange = (val: string | undefined) => {
  console.log("Changed:", val);
  setValue(val);
};

const handlePostTitle=(e:any)=>{
const  title=e.target.value
console.log(title);
}

const handlePublish=()=>{
  axios.post("Api/createpost",{ content: value })
    .then(res => {
      console.log("Post created:", res.data);
    })
    .catch(err => {
      console.error("Error creating post:", err);
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

     <div>
      <ImageUploader/>
   
     </div>

     {/* Markdown Editor height={200} */}
     <div  data-color-mode="light" className="">
      <MDEditor  value={value}  onChange={handleChange} />
     </div>

       <button 
       onClick={handlePublish}
       className="btn btn-primary">Publish </button>

    </div>
  )
}
 export default Maincontent