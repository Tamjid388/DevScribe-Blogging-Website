"use client"
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { apiSlice, useGetCurrentUserQuery, useLogoutUserMutation } from '@/services/apiSlice'
import Link from 'next/link'
import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

export const Avatar = () => {
  // const { currentUser } = useCurrentUser()

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const router = useRouter();
   const dispatch = useDispatch();
const {data: currentUser ,refetch}=useGetCurrentUserQuery(undefined)
console.log(currentUser)
console.log(currentUser?.user?.username);

 const handleLogout = async () => {
  try {
      // 1. Perform logout
      await logoutUser().unwrap();
      
   dispatch(apiSlice.util.resetApiState());
      
      // 4. Redirect
      router.push('/auth/login');
      Swal.fire("Logged out successfully");
      
    }  catch (error) {
       Swal.fire("Logout failed");
      console.log('Logout failed:', error);
    }
  };
  return (
    <div className="bg-base-300  p-1 shadow-sm border border-gray-300 rounded-full">

      <div className="flex-none">

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className=" rounded-full">
              <img className=''
                src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?ga=GA1.1.1512812655.1735219157&semt=ais_hybrid&w=740"
                alt="avatarimg" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className=" menu  dropdown-content bg-base-100
             rounded-box z-1 mt-3 w-52 p-2 shadow text-sm ">
            <li>
              <p>
                {currentUser?  currentUser?.user?.username:" "}
              </p>
            </li>
            <hr className="border border-gray-300 mx-4" />

            <li>
 <Link href="/Dashboard/Posts">
                Dashboard
              </Link>

            </li>

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

            <hr className="border border-gray-300 mx-4" />

            <li onClick={handleLogout} className='text-red-500'>
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
