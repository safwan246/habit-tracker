// components/HabitClient.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import cute from "../public/cute.jpg";
import Navbar from "@/components/Navbar";
import HabitCard from "@/components/HabitCard";
import { IHabit } from "@/model/habit";

interface HabitClientProps {
  userId: string;
}

export default function HabitClient({ userId }: HabitClientProps) {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [loading, setLoading] = useState(true);

  // initial fetch
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habit", { method: "GET" });

        if (!res.ok) {
          console.error("Failed to fetch habits");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setHabits(data.habits || []);
      } catch (err) {
        console.error("Error fetching habits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleHabitCreated = (habit: IHabit) => {
    setHabits((prev) => [...prev, habit]); // 👈 this adds the new card
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Navbar with callback */}
      <Navbar userId={userId} onHabitCreated={handleHabitCreated} />

      {/* Hero section */}
      <div className="w-full mx-auto px-4 md:px-10 pt-8">
        <div className="relative h-72 md:h-75 w-full rounded-3xl shadow-xl shadow-stone-200 overflow-hidden">
          <Image
            src={cute}
            alt="Nature header"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="text-orange-300 font-semibold tracking-widest text-sm uppercase mb-2">
              Daily Goals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-sans drop-shadow-lg">
              Welcome to Habit Tracker!
            </h1>
          </div>
        </div>
      </div>

      {/* Habit cards */}
      <div className="p-8 flex flex-wrap gap-6">
        {loading && (
          <p className="text-sm text-gray-500">Loading habits...</p>
        )}

        {!loading && habits.length === 0 && (
          <p className="text-sm text-gray-500">
            No habits yet. Create one using the “New Habit” button.
          </p>
        )}

        {!loading &&
          habits.map((habit, index) => (
            <HabitCard key={index} habit={habit} />
          ))}
      </div>
    </div>
  );
}
