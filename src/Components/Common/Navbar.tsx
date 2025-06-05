import { FaRegBell } from "react-icons/fa"
import { Avatar } from "./Avatar"


export const Navbar = () => {
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn bg-black text-white font-bold text-xl"
    >DevScribe</a>
  </div>
  <div className="navbar-end">



    <div className="flex items-center md:space-x-2">
        <button className="btn  btn-outline btn-primary hidden md:block">Create a Post</button>
        <p className="text-2xl">
            <FaRegBell />
        </p>
        <Avatar/>
    </div>
   

       
   
   
  </div>
</div>
    </div>
  )
}
