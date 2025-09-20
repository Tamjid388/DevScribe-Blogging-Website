"use client";

import { useGetCurrentUserQuery } from "@/services/apiSlice";
import { useIsLikeMutation } from "@/services/commentApiSlice";
import { Bookmark, HeartPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export type LikesPayloadType = {
  userId: string;
  postId: string;
  username: string;
  isLiked: boolean;
};
export const Sidebar = ({ postId }: { postId: string }) => {
  const [isLiked, setLike] = useState(false);

  const { data: currentUser, isLoading: loadingUser } =
    useGetCurrentUserQuery(undefined);
  const [IsLikeMutation] = useIsLikeMutation();

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please login to like this post");
      return;
    }


    try {
        // toggling like
    const newLikedState = !isLiked;
    setLike(newLikedState);
    // like payload
    const likesPayload: LikesPayloadType = {
      userId: currentUser.user.id,
      postId,
      username: currentUser.user.username,
      isLiked: newLikedState,
    };

    IsLikeMutation(likesPayload).unwrap();


    
    } catch (error) {
       toast.error("Something went wrong. Please try again!");
      
    }
  
  };

  if (loadingUser) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <ul className="menu  rounded-box space-y-4  w-full text-gray-700">
        <li>
          <button
            onClick={handleLike}
            className=" btn btn-outline flex justify-start items-center space-x-2"
          >
            {isLiked ? <HeartPlus color="#f50000" /> : <HeartPlus  />}

            <span className="text-lg">Like </span>
          </button>
        </li>
        <li>
          <a
            href="#comments"
            className="btn btn-outline flex justify-start items-center space-x-2"
          >
            <MessageCircle />
            <span className="text-lg">Comment</span>
          </a>
        </li>
        <li>
          <Link
            href="/"
            className="btn btn-outline flex justify-start items-center space-x-2"
          >
            <Bookmark />
            <span className="text-lg">Wishlist</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
