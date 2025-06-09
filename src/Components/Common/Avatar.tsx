import Link from 'next/link'
import React from 'react'

export const Avatar = () => {
  return (
    <div className="bg-base-300  p-1 shadow-sm border border-gray-300 rounded-full">

  <div className="flex-none">
   
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button"
       className="btn btn-ghost btn-circle avatar">
        <div className=" rounded-full">
        <img className=''
  src="https://api.dicebear.com/9.x/croodles/svg?seed=Christian"
  alt="avatar" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className=" menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
         
          <Link href="">
            Profile
          </Link>
          
        </li>
        <li>
     
          <Link href="/myposts">
            My Posts
          </Link>
         
         </li>
        <li>
            <Link href="">
              Logout
          </Link>
         </li>
      </ul>
    </div>
  </div>
</div>
  )
}
