import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {registerSchema} from "../../schemas/register.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerUser} from "../../services/api.auth.ts";
import type {RegisterFormData} from "../../types/register.data.type.ts";


export default function RegisterPage() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
    navigate("/login");
  };
  
  return (
    <div className="max-w-md mx-auto mt-32 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("username")}
          placeholder="Username"
          className="border p-2 rounded bg-white"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded bg-white"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 rounded bg-white"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Register
        </button>
      </form>
      
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}