"use client"

import EditProfileForm from "@/Components/Profile/EditProfileForm"
import { UpdateProfilePicture } from "@/Components/Profile/UpdateProfilePicture"

export default function Profile() {
  return (
    <div className="h-dvh container mx-auto grid grid-cols-4 space-x-4 ">
      <div className="col-span-1 flex flex-col bg-white max-h-fit px-4 py-8 mt-6">
       <h2 className="text-xl font-semibold mb-3">Profile Picture</h2>
          <UpdateProfilePicture/>
      </div>
      <div className="col-span-3 bg-white px-8 py-8 mt-6">
        <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>
         <EditProfileForm/>
      </div>
      
       
    </div>
  )
}
