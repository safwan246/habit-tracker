"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

     
      const userId = data.id;

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        router.push(`/habit`);
      }, 1000);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg border border-orange-200">
        <h1 className="mb-6 text-2xl font-bold text-orange-500">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400 text-black"
              type="email"
              required
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

      
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400 text-black"
              type="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-600 mt-1">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md cursor-pointer hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
