"use client"
import { useRegisterUserMutation } from "@/services/apiSlice";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import Swal from "sweetalert2";


export default function Register() {
    const [registerUser, { isLoading }]=useRegisterUserMutation()

const [formData,SetFormData]=useState(
  {  username: '',
    email: '',
    password: '', }
)
 const router = useRouter();

    const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();

    try {
        const response=await registerUser(formData).unwrap();
        console.log(response);
    if (response && response.message === "User created successfully") {
  router.push('/');
        Swal.fire({
    icon: 'success',
    title: 'Registration Successful!',
    text: response.message,
 
  })


} else {
  Swal.fire({
    icon: 'error',
    title: 'Registration Failed',
    text: response.message || 'Something went wrong',
  });
}

        
    } catch (error) {
        
    }


    };

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
SetFormData({
    ...formData,
    [e.target.name]:e.target.value

})
    }

  return (
    <div>
         <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-white">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                className="input input-bordered w-full"

                   value={formData.username}
        onChange={handleChange}
                
              />
            </div>

            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"

                   value={formData.email}
        onChange={handleChange}
                
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                 name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                  value={formData.password}
        onChange={ handleChange}
                
              />
            </div>

            <button type="submit"  className="btn btn-primary w-full">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Allready have an account?{" "}
            <a href="/auth/register" className="text-primary font-semibold underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>


    </div>
  )
}
