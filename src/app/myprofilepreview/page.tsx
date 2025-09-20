"use client"

import { useProfileDetailsQuery } from "@/services/authSlice";
import TerminalLoader from "../postdetails/[slug]/TerminalLoader";
import Image from "next/image";
import { Facebook, Github, Linkedin, Locate, MapPin } from "lucide-react";
export interface UserDetailsType {
  _id?: string;
  email?: string;
  username?: string;
  createdAt?: string;
  birthdate?: string;
  gender?: string;
  location?: string;
  name?: string;
  profession?: string;
  skills?: string[];
  tags?: string[];
  bio?: string;
  facebook?: string;
  github?: string;
  languagePreference?: string;
  linkedin?: string;
  profileImage?:any;
  
}

 export type ProfileResponse ={
  user?:UserDetailsType
}


export default function MyProfilePreview() {
 const { data: profile, isLoading  } = 
 useProfileDetailsQuery() 
console.log(profile?.user);

  const { username, email, profession, skills,
     bio, github,  linkedin, profileImage,  location,gender,
      birthdate, createdAt,facebook,languagePreference} = profile?.user || {};

 if(isLoading){
    return <TerminalLoader/>
 }

  return (
 <div className="h-screen  p-4">
  <div className="max-w-4xl mx-auto bg-white
   rounded-2xl shadow-md flex flex-col md:flex-row items-center p-6
    space-y-4 md:space-y-0 md:space-x-6">
    
    {/* Profile Image */}
    <div className="relative h-36 w-36 md:h-48 md:w-48 flex-shrink-0">
      <Image
        src={profileImage || "/default-profile.png"}
        alt={username || "Profile Picture"}
        className="object-cover rounded-3xl"
        fill
      />
    </div>

    {/* User Info */}
    <div className="flex-1 space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold">
        {username || "Unknown User"}
      </h1>
      <p className="text-lg md:text-xl font-semibold text-primary">
        {profession || "Profession not provided"}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <MapPin size={20} /> {location || "Location not available"}
      </p>
      <p className="text-gray-700">
        {bio || "Bio is not available."}
      </p>
      {skills && skills.length > 0 && (
        <p className="text-gray-500">
          Skills: {skills.join(", ")}
        </p>
      )}
    </div>

  </div>



{/* ,,,,, */}

<div className="max-w-4xl mx-auto bg-white my-8
   rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

  {/* Basic Info */}
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
      Basic Information
    </h2>
    <div>
      <p className="text-gray-500">Birthdate</p>
      <p className="text-lg font-semibold">{birthdate || "N/A"}</p>
    </div>
    <div>
      <p className="text-gray-500 capitalize">languagePreference</p>
      <p className="text-lg font-semibold capitalize">{languagePreference || "N/A"}</p>
    </div>
    <div>
      <p className="text-gray-500 capitalize">Gender</p>
      <p className="text-lg font-semibold capitalize">{gender || "N/A"}</p>
    </div>
    <div>
      <p className="text-gray-500">Member Since</p>
      <p className="text-lg font-semibold">
        {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
      </p>
    </div>
  </div>

  {/* Contact & Social Links */}
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
      Contact & Social
    </h2>
    <div>
      <p className="text-gray-500">Email</p>
      <p className="text-lg font-semibold">{email || "Not provided"}</p>
    </div>
    <div className="flex items-center gap-4 mt-2">

{github && (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <Github size={28} className="text-blue-700 hover:opacity-80" />
        </a>
      )}
      

      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={28} className="text-blue-700 hover:opacity-80" />
        </a>
      )}
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer">
          <Facebook size={28} className="text-blue-600 hover:opacity-80" />
        </a>
      )}
    </div>
  </div>
</div>




  
</div>

  )
}
