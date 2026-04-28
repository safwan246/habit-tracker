"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Homepage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">

        {/* Brand */}
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight text-black mb-3">
          Habit <span className="text-orange-500">Hunter</span>
        </h1>

        <p className="text-gray-500 text-base md:text-lg mb-10">
          Build habits that stick. Track your progress, one day at a time.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Track Daily", "Stay Consistent", "Build Streaks"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.push("/signup")}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all cursor-pointer"
          >
            Get Started
          </button>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all text-center"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          Free to use. No credit card required.
        </p>
      </div>
    </main>
  );
}
