"use client"

import { Bookmark,HeartPlus,MessageCircle } from "lucide-react"
import Link from "next/link"

export const Sidebar = () => {
  return (
    <div>
        <ul className="menu  rounded-box space-y-4  w-full text-gray-700">
  <li>
  <Link href={'/'} className=" btn btn-outline flex justify-start items-center space-x-2" >
    <HeartPlus /><span className="text-lg">Like</span>
    </Link>
  </li>
   <li>
      <a href="#comments" className="btn btn-outline flex justify-start items-center space-x-2">
        <MessageCircle />
        <span className="text-lg">Comment</span>
      </a>
    </li>
    <li>
      <Link href="/" className="btn btn-outline flex justify-start items-center space-x-2">
        <Bookmark />
        <span className="text-lg">Wishlist</span>
      </Link>
    </li>
</ul>
    </div>
  )
}
