"use client"

import MDEditor from "@uiw/react-md-editor"
import { useState } from "react";


 const Maincontent = () => {
  type Type = string | undefined;
   const [value, setValue] =useState<Type>("");

 const handleChange = (val: string | undefined) => {
  console.log("Changed:", val);
  setValue(val);
};

  return (
    <div className="space-y-6">
     {/* image skilton */}
     <div>
      <button className="label font-bold block mb-2" >Add An Image</button>
     <input type="url" placeholder="Enter Your Image URL"
      className="input input-primary" />
     </div>

     {/* Markdown Editor height={200} */}
     <div  data-color-mode="light" className="">
      <MDEditor  value={value}  onChange={handleChange} />
     </div>

    </div>
  )
}
 export default Maincontent