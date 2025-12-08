
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import cute from "../public/cute.jpg";
// import HabitCard from "../components/HabitCard";
// import { IHabit } from "@/model/habit";

// type HabitWithId = IHabit & { _id?: string };

// export default function MainBody() {
//   const [habits, setHabits] = useState<HabitWithId[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHabits = async () => {
//       try {
//         const res = await fetch("/api/habit", {
//           method: "GET",
//         });

//         if (!res.ok) {
//           console.error("Failed to fetch habits");
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         setHabits((data.habits as HabitWithId[]) || []);
//       } catch (err) {
//         console.error("Error fetching habits:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHabits();
//   }, []);

//   // DELETE handler
//   const handleDeleteHabit = async (id: string) => {
//     const confirmDelete = window.confirm("Delete this habit?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/habit/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         console.error("Failed to delete habit");
//         return;
//       }

//       setHabits((prev) => prev.filter((h) => (h as any)._id !== id));
//     } catch (err) {
//       console.error("Error deleting habit:", err);
//     }
//   };

//   // EDIT handler (simple version using prompt)
//   const handleEditHabit = async (id: string) => {
//     const current = habits.find((h) => (h as any)._id === id);
//     if (!current) return;

//     const newTitle = window.prompt("Edit title", current.title);
//     if (newTitle == null || newTitle.trim() === "") return;

//     const newDescription = window.prompt(
//       "Edit description",
//       current.description || ""
//     );

//     try {
//       const res = await fetch(`/api/habit/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newTitle,
//           description: newDescription,
//           // you can also send category/frequency/trigger if you want to edit them
//         }),
//       });

//       if (!res.ok) {
//         console.error("Failed to update habit");
//         return;
//       }

//       const data = await res.json();
//       const updated = data.habit as HabitWithId;

//       setHabits((prev) =>
//         prev.map((h) => ((h as any)._id === id ? updated : h))
//       );
//     } catch (err) {
//       console.error("Error updating habit:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-stone-50 pb-20">
//       {/* Hero section */}
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

//       {/* Habit cards */}
//       <div className="p-8 flex flex-wrap gap-6">
//         {loading && (
//           <p className="text-sm text-gray-500">Loading habits...</p>
//         )}

//         {!loading && habits.length === 0 && (
//           <p className="text-sm text-gray-500">
//             No habits yet. Create one using the “New Habit” button.
//           </p>
//         )}

//         {!loading &&
//           habits.map((habit) => (
//             <HabitCard
//               key={String((habit as any)._id ?? habit.title)}
//               habit={habit}
//               onEdit={handleEditHabit}
//               onDelete={handleDeleteHabit}
//             />
//           ))}
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
import { CheckInStatus } from "@/model/checkIn";

type HabitWithId = IHabit & { _id?: string };

export default function MainBody() {
  const [habits, setHabits] = useState<HabitWithId[]>([]);
  const [loading, setLoading] = useState(true);

  // check-in state
  const [checkInModalHabit, setCheckInModalHabit] =
    useState<HabitWithId | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<CheckInStatus | null>(null);
  const [statusByHabitId, setStatusByHabitId] = useState<
    Record<string, CheckInStatus>
  >({});

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
        setHabits((data.habits as HabitWithId[]) || []);
      } catch (err) {
        console.error("Error fetching habits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // DELETE handler
  const handleDeleteHabit = async (id: string) => {
    const confirmDelete = window.confirm("Delete this habit?");
    
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/habit/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete habit");
        return;
      }

      setHabits((prev) => prev.filter((h) => (h as any)._id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  // EDIT handler (your simple prompt version)
  const handleEditHabit = async (id: string) => {
    const current = habits.find((h) => (h as any)._id === id);
    if (!current) return;

    const newTitle = window.prompt("Edit title", current.title);
    if (newTitle == null || newTitle.trim() === "") return;

    const newDescription = window.prompt(
      "Edit description",
      current.description || ""
    );

    try {
      const res = await fetch(`/api/habit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update habit");
        return;
      }

      const data = await res.json();
      const updated = data.habit as HabitWithId;

      setHabits((prev) =>
        prev.map((h) => ((h as any)._id === id ? updated : h))
      );
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  // OPEN CHECK-IN MODAL
  const handleOpenCheckIn = (id: string) => {
    const habit = habits.find((h) => (h as any)._id === id) || null;
    if (!habit) return;
    setCheckInModalHabit(habit);
    setSelectedStatus(null);
  };

  // SUBMIT CHECK-IN
  const handleCheckInSubmit = async () => {
    if (!checkInModalHabit || !selectedStatus) return;

    const habitId = (checkInModalHabit as any)._id as string;

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId,
          status: selectedStatus,
          // you can also send note/date if needed
        }),
      });

      if (!res.ok) {
        console.error("Failed to create check-in");
        return;
      }

      // update local status map so the button changes
      setStatusByHabitId((prev) => ({
        ...prev,
        [habitId]: selectedStatus,
      }));

      setCheckInModalHabit(null);
      setSelectedStatus(null);
    } catch (err) {
      console.error("Error creating check-in:", err);
    }
  };

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
          habits.map((habit) => {
            const id = (habit as any)._id as string | undefined;
            const status = id ? statusByHabitId[id] : undefined;
            return (
              <HabitCard
                key={String(id ?? habit.title)}
                habit={habit}
                onEdit={handleEditHabit}
                onDelete={handleDeleteHabit}
                onCheckIn={handleOpenCheckIn}
                todayStatus={status ?? null}
              />
            );
          })}
      </div>

      {/* CHECK-IN MODAL */}
      {checkInModalHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Daily Check-In
              </h2>
              <button
                onClick={() => {
                  setCheckInModalHabit(null);
                  setSelectedStatus(null);
                }}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <p className="font-semibold mb-1">
              {checkInModalHabit.title}
            </p>
            <p className="text-sm text-neutral-600 mb-4">
              How did you do with this habit today?
            </p>

            {/* Options */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {(["SUCCESS", "FAILED", "SKIP"] as CheckInStatus[]).map(
                (status) => {
                  const isActive = selectedStatus === status;
                  const base =
                    "flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-4 cursor-pointer text-sm";
                  const active =
                    "border-orange-400 bg-orange-50 text-orange-700 font-semibold";
                  const inactive =
                    "border-neutral-200 text-neutral-700 hover:border-orange-200";
                  const label =
                    status === "SUCCESS"
                      ? "Success"
                      : status === "FAILED"
                      ? "Failed"
                      : "Skip";
                  const icon =
                    status === "SUCCESS"
                      ? "✓"
                      : status === "FAILED"
                      ? "✕"
                      : "⏭";

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`${base} ${
                        isActive ? active : inactive
                      }`}
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{label}</span>
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              disabled={!selectedStatus}
              onClick={handleCheckInSubmit}
              className="w-full rounded-full bg-[#EE7F5E] disabled:bg-neutral-300 disabled:text-neutral-600 text-white font-semibold py-3"
            >
              Complete Check-In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
