"use client";

import { useState } from "react";

export default function SignupPage() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");  
  const [success,setSuccess]=useState("");

    const handleSubmit = async (e:any)=>{
    e.preventDefault();

  const form = new FormData();
  form.append("name",name);
  form.append("email",email);
  form.append("password",password); 

  const response = await fetch("/api/signup",{
    method:"POST",
    body:form,})

    const data = await response.json();

       if (!response.ok) {
      setError(data.error || "Registration failed");
      return;
    }

    setSuccess("Account created! Redirecting...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-orange-500 ">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Name
            </label>
            <input
              className="w-full rounded-lg border text-black border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400 "
              type="text"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Email
            </label>
            <input
              className="w-full rounded-lg border text-black border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              className="w-full rounded-lg border text-black border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
              type="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md cursor-pointer hover:opacity-90"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

