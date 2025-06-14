import PostDetails from "@/Components/PostDetails/PostDetails";
import { Sidebar } from "@/Components/PostDetails/Sidebar";
import { SummarizeText } from "@/Components/PostDetails/SummarizeText";
import axios from "axios";
import { useEffect } from "react";



type PageProps = {
  params: Promise<{ slug: string }>;
};

const Postdetails=async({params}:PageProps)=>{
    const {slug}=await params
    console.log(slug);


return(
    <div className="grid grid-cols-12 relative">
        
       <div className=" flex justify-end col-span-1 ">
        <div className="fixed    ">
      <Sidebar />
    </div>
       </div>
       <div className=" col-span-8">
         <PostDetails slug={slug}/>
       </div>
       <div className="col-span-3 ">
        <SummarizeText/>
       </div>
    </div>
)
}
export default Postdetails;