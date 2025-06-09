"use client";
import { usePost } from "@/app/hooks/usePosts"


export const AllPosts = () => {
    const {posts}=usePost()
    console.log(posts);
  return (
   <div className="grid md:grid-cols-3 gap-4 p-4 ">
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post:any) => (
          <article key={post._id} className="card bg-base-100 shadow-sm ">
            <figure className="h-[250px]">
              <img className="h-full w-full object-cover" src={post.thumbnail} alt={post.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">By {post.author}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  )
}
