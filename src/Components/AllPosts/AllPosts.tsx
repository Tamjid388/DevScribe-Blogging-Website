"use client";
import { usePost } from "@/app/hooks/usePosts";
import Loading from "../Loading/Loading";
import Link from "next/link";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import TerminalLoader from "@/app/postdetails/[slug]/TerminalLoader";

export const AllPosts = () => {
  const { posts, loading } = usePost();
  const { currentUser } = useCurrentUser();

  if (loading) {
    return <TerminalLoader />;
  }
 
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post: any) => (
          <article key={post._id} className="card bg-base-200 shadow-sm ">
            <figure className="h-[250px]">
              <img
                className="h-full w-full object-cover"
                src={
                  post.thumbnail
                    ? post.thumbnail
                    : "https://res.cloudinary.com/dto6ulc5n/image/upload/nestjs_stx2ht.jpg"
                }
                alt={post.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post?.content?.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">By {post.author}</p>
              <div className="card-actions justify-start">
                <Link href={`/postdetails/${post._id}`}>
                  <button className="btn text-white bg-black">Read More</button>
                </Link>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
};
