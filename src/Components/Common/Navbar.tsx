"use client"
import { FaRegBell } from "react-icons/fa"
import { Avatar } from "./Avatar"
import Link from "next/link"
import useCurrentUser from "@/app/hooks/useCurrentUser"
import { useGetCurrentUserQuery } from "@/services/apiSlice"
import { button } from "framer-motion/client"


export const Navbar = () => {

const { data } = useGetCurrentUserQuery(undefined);
const currentUser = data?.user; // Properly typed as User | undefined
if(currentUser){
  console.log("User is in Logged in state")
}else{
  console.log("User is logout")
}
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu
         space-y-1 text-base font-normal
          dropdown-content bg-base-100
           rounded-box z-1 mt-3 w-52 p-4 shadow">

              <Link href={'/'}>
                <li className="hover:underline">Home</li>
              </Link>
              <Link href={'/auth/register'}>
                <li className="hover:underline">Register</li>
              </Link>
              <Link href={'/auth/login'}>
                <li className="hover:underline">Login</li>
              </Link>

            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn bg-black text-white font-bold text-xl"
          >DevScribe</a>
        </div>
        <div className="navbar-end">



          <div className="flex items-center md:space-x-2">
             <p className="text-2xl">
              <FaRegBell />
            </p>
            <Link href={'/createnewpost'}>
              <button className="btn  btn-outline btn-primary hidden md:block">

                Create a Post</button>
            </Link>

           
{
  currentUser ?   <Avatar />
  :
  <Link href={"/auth/login"}>
  <button className="btn btn-primary">Sign In</button>
  </Link>
}
          
          </div>





        </div>
      </div>
    </div>
  )
}
