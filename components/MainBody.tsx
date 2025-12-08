// import React from "react";
// import Image from "next/image";
// import cute from "../public/cute.jpg";
// import HabitCard from "../components/HabitCard";


// export default function MainBody() {
 

//   return (
//     <div className="min-h-screen bg-stone-50 pb-20">
//       <div className="w-full mx-auto px-4 md:px-10 pt-8">
//         <div className="relative h-72 md:h-75 w-full rounded-3xl shadow-xl shadow-stone-200 overflow-hidden">
//           <Image
//             src={cute}
//             alt="Nature header"
//             fill
//             className="object-cover"
//             priority
//           />

//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

//           <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
//             <span className="text-orange-300 font-semibold tracking-widest text-sm uppercase mb-2">
//               Daily Goals
//             </span>
//             <h1 className="text-4xl md:text-6xl font-bold text-white font-sans drop-shadow-lg">
//               Welcome to Habit Tracker!
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="p-8">
//         <HabitCard/>
//       </div>
//     </div>
//   );
// }
// components/MainBody.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import cute from "../public/cute.jpg";
import HabitCard from "../components/HabitCard";
import { IHabit } from "@/model/habit";

export default function MainBody() {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habit", {
          method: "GET",
        });

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

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
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
          habits.map((habit) => (
            <HabitCard key={String(habit.id)} habit={habit} />
          ))}
      </div>
    </div>
  );
}

