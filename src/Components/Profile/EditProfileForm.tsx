import { useForm, SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formattedData = {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim()),
      skills: data.skills.split(',').map(skill => skill.trim())
    };
    console.log("Profile Data:", formattedData);
  };

  return (
    <div className="  p-4 bg-white rounded shadow ">
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email"
              }
            })}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            {...register("bio", {
              maxLength: { value: 300, message: "Bio must be under 300 characters" }
            })}
            placeholder="Write a short bio..."
          />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
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

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            className="w-full border px-3 py-2 rounded"
            {...register("location")}
            placeholder="City, Country"
          />
        </div>

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
              <input type="radio" value="female" {...register("gender")} /> Female
            </label>
            <label>
              <input type="radio" value="other" {...register("gender")} /> Other
            </label>
          </div>
        </div>

        {/* Language Preference */}
        <div>
          <label className="block mb-1 font-medium">Language Preference</label>
          <select className="w-full border px-3 py-2 rounded" {...register("languagePreference")}>
            <option value="">Select language</option>
            <option value="english">English</option>
            <option value="bengali">Bengali</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        {/* Social Links */}
        <div>
          <label className="block mb-1 font-medium">Facebook</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="url"
            {...register("facebook")}
            placeholder="https://facebook.com/your-profile"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">GitHub</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="url"
            {...register("github")}
            placeholder="https://github.com/your-username"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">LinkedIn</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="url"
            {...register("linkedin")}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
