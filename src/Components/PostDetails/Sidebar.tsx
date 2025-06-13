"use client"

import { Bookmark,HeartPlus,MessageCircle } from "lucide-react"
import Link from "next/link"

export const Sidebar = () => {
  return (
    <div>
        <ul className="menu  rounded-box space-y-4">
  <li>
  <Link href={'/'} className="tooltip tooltip-right" data-tip="React">
    <HeartPlus />
    </Link>
  </li>
  <li>
  <Link href={'/'} className="tooltip tooltip-right" data-tip="Comment">
  <MessageCircle />
    </Link>
  </li>
  <li>
    <Link href={'/'} className="tooltip tooltip-right" data-tip="Add to Wishlist">
    <Bookmark />
    </Link>
  </li>
</ul>
    </div>
  )
}
