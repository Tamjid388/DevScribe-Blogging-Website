
"use client"

import TerminalLoader from "@/app/postdetails/[slug]/TerminalLoader";
import { useGetPostDetailsQuery } from "@/services/apiSlice";
import MDEditor from "@uiw/react-md-editor";
type Post = {
  _id: string;
  title: string;
  author: string;
  email?: string;
  content: string;
  tags: string[];
  createdAt: string;
  thumbnail?: string;
};

interface PostDetailsProps {
  post: Post;
}

const PostDetails = ({post}:PostDetailsProps) => {

 
 
  return (
    <div>
      <div className="card ">
        <figure className="h-[350px] rounded-xl">
          <img className="h-full w-full object-cover"
           src={post?.thumbnail} alt={post?.title} />
        </figure>
        <div className="card-body p-0 pt-8">
          <h2 className="card-title text-3xl font-bold mb-4">{post?.title}</h2>
          <p className="text-xl text-gray-700 text-justify">
            
            {/* {post?.content} */}
            </p>

             <MDEditor.Markdown
             className="bg-white"
             source={post?.content} style={{ whiteSpace: 'pre-wrap',backgroundColor: "transparent",color:"black" }} />
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Author:</strong>
             {post?.author}
          </p>

          <p className="text-sm text-gray-600">
            <strong className=" font-medium text-gray-800">Tags:</strong> {post?.tags?.join(", ")}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Created At:</strong> {post?.createdAt}
          </p>
          <div className="card-actions justify-end">

          </div>
        </div>
      </div>
    </div>
  )
}


export default PostDetails