"use client";

import useCurrentUser from "@/app/hooks/useCurrentUser";
import TerminalLoader from "@/app/postdetails/[slug]/TerminalLoader";
import { useGetCurrentUserQuery, useUpdateProfileMutation } from "@/services/apiSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // basic styling
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  email: string;
  bio: string;
  tags: string;
  location: string;
  skills: string;
  profession: string;
  birthdate: string;
  gender: string;
  languagePreference: string;
  facebook: string;
  github: string;
  linkedin: string;
};

export default function EditProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
 const { data: user ,isLoading:userLoading} = useGetCurrentUserQuery(undefined);


 const [updateProfile, { isLoading, isError, error, isSuccess }] =useUpdateProfileMutation()
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    const formattedData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      skills: data.skills.split(",").map((skill) => skill.trim()),
    };
   
    
try {
  const response = await updateProfile(formattedData).unwrap();
  console.log("Update success:", response);
  Swal.fire("Profile updated successfully!");
} catch (err) {
  console.error("Update failed:", err);
  Swal.fire("Failed to update profile.");
}

    
  };

  if(userLoading){
    return <TerminalLoader/>
  }

  return (
    <div className="p-4  rounded shadow min-h-[400px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <TabList className="mb-4 bg-gray-300">
            <Tab>Personal Info</Tab>
            <Tab>Professional</Tab>
            <Tab>Social Links</Tab>
            <Tab>Preferences</Tab>
          </TabList>

          {/* Personal Info Tab */}
          <TabPanel classID="">
            <div className="space-y-4 grid grid-cols-2 gap-4 ">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your name"
                  defaultValue={user?.user?.username}
                 
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="email"
                  defaultValue={user?.user?.email}
                  readOnly
                
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Birthdate */}
              <div>
                <label className="block mb-1 font-medium">Birthdate</label>
                <input
                  type="date"
                  className="w-full border px-3 py-2 rounded"
                  {...register("birthdate")}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <div className="flex gap-4">
                  <label>
                    <input type="radio" value="male" {...register("gender")} /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="female"
                      {...register("gender")}
                    />{" "}
                    Female
                  </label>
                  <label>
                    <input type="radio" value="other" {...register("gender")} /> Other
                  </label>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Professional Tab */}
          <TabPanel>
            <div className="space-y-4 grid grid-cols-2 gap-4">
              {/* Profession */}
              <div>
                <label className="block mb-1 font-medium">Profession</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  {...register("profession")}
                  placeholder="e.g. Frontend Developer"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block mb-1 font-medium">Skills</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  {...register("skills")}
                  placeholder="e.g. JavaScript,React,Tailwind"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium">Location</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  {...register("location")}
                  placeholder="City, Country"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block mb-1 font-medium">Tags</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  {...register("tags")}
                  placeholder="e.g. writer,frontend,react"
                />
              </div>
            </div>
          </TabPanel>

          {/* Social Links Tab */}
          <TabPanel>
            <div className="space-y-4 grid grid-cols-2 gap-4">
              {/* Facebook */}
              <div>
                <label className="block mb-1 font-medium">Facebook</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="url"
                  {...register("facebook")}
                  placeholder="https://facebook.com/your-profile"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block mb-1 font-medium">GitHub</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="url"
                  {...register("github")}
                  placeholder="https://github.com/your-username"
                />
              </div>

              {/* LinkedIn */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium">LinkedIn</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="url"
                  {...register("linkedin")}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>
            </div>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel>
            <div className="space-y-4 grid grid-cols-2 gap-4">
              {/* Language Preference */}
              <div>
                <label className="block mb-1 font-medium">Language Preference</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  {...register("languagePreference")}
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="bengali">Bengali</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              {/* Bio */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Bio</label>
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  {...register("bio", {
                    maxLength: { value: 300, message: "Bio must be under 300 characters" },
                  })}
                  placeholder="Write a short bio..."
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio.message}</p>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="btn-primary btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
