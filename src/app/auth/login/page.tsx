"use client"
import { useLogin } from "@/app/hooks/useAuth";
import { useLoginUserMutation } from "@/services/apiSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
 const Login = () => {
      // const { loginUser,loading } = useLogin();
       const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const router = useRouter();

  const handleSubmit =async (e: React.FormEvent) => {
    console.log("Submit button hit");
    e.preventDefault();
    console.log({ email, password });
    // loginUser({ email, password })

    try {
       const response = await loginUser({ email, password }).unwrap();
        router.push("/"); 
    } catch (error) {
     Swal.fire({
        icon: "error",
        title: "Login Failed",
       
      });
    }
   
  };
  return (
    <div>
         <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-white">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"

                   value={email}
        onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                  value={password}
        onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>

            <button type="submit"  className="btn btn-primary w-full">
               {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-primary font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>


    </div>
  )
}
export default Login;