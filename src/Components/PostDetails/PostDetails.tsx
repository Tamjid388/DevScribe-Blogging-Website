'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Loading2 from "../Loading/Loading2";
import TerminalLoader from "@/app/postdetails/[slug]/TerminalLoader";
type Post = {
  _id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  createdAt: string;  // ISO date string
  thumbnail: string;
};


 const PostDetails = ({ slug }: { slug: string }) => {
    const [post, setPost] = useState<Post | null>(null);
 

      useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/Api/postdetails/${slug}`);
      setPost(response.data);
    };

    fetchPost();
  }, [slug]);
     console.log(post);

     if (!post) return <TerminalLoader/>
  return (
 <div>
      <div className="card bg-base-100  shadow-sm">
        <figure className="h-[350px] ">
          <img className="h-full w-full object-cover" src={post.thumbnail} alt={post.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Tags:</strong> {post?.tags?.join(", ")}</p>
          <p><small>Created At: {new Date(post?.createdAt).toLocaleDateString()}</small></p>
          <div className="card-actions justify-end">
           
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostDetails