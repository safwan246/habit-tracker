// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { IoMdAdd, IoMdLogOut } from "react-icons/io";
// import { HabitCategory, HabitFrequency, IHabit } from "@/model/habit";

// const categories: { value: HabitCategory; label: string }[] = [
//   { value: "health", label: "Health" },
//   { value: "productivity", label: "Productivity" },
//   { value: "finance", label: "Finance" },
//   { value: "social", label: "Social" },
// ];

// const frequencies: { value: HabitFrequency; label: string }[] = [
//   { value: "daily", label: "Daily" },
//   { value: "weekly", label: "Weekly" },
//   { value: "monthly", label: "Monthly" },
// ];

// interface NavbarProps {
//   userId: string; // ✅ only this now
// }

// export default function Navbar({ userId }: NavbarProps) {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   // CREATE HABIT
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;

//     const body = {
//       userId,
//       title: (form.elements.namedItem("title") as HTMLInputElement).value,
//       description: (form.elements.namedItem("description") as HTMLTextAreaElement)
//         ?.value,
//       category: (form.elements.namedItem("category") as HTMLSelectElement).value,
//       frequency: (form.elements.namedItem("frequency") as HTMLSelectElement).value,
//       trigger: (form.elements.namedItem("trigger") as HTMLInputElement)?.value,
//     };

//     try {
//       const res = await fetch("/api/habit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) {
//         throw new Error("Failed");
//       }

//       const data = await res.json();
//       const newHabit: IHabit = data.habit;

//       // we are not using onHabitCreated anymore
//       console.log("Habit created:", newHabit);

//       form.reset();
//       setOpen(false);
//       alert("Habit created!");
//     } catch (err) {
//       console.log(err);
//       alert("Error creating habit");
//     }
//   };

//   // LOGOUT
//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/logout", {
//         method: "POST",
//       });

//       if (!res.ok) {
//         throw new Error("Logout failed");
//       }

//       router.push("/login"); // change if your login route is different
//       router.refresh();      // optional
//     } catch (err) {
//       console.error(err);
//       alert("Error logging out");
//     }
//   };

//   return (
//     <>
//       <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 flex justify-between items-center px-6 py-4 md:px-12">
//         {/* Logo / title */}
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">H</span>
//           </div>
//           <h1 className="text-gray-800 font-extrabold text-xl tracking-tight">
//             Habit Tracker
//           </h1>
//         </div>

//         {/* Right side buttons */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-gray-500 font-medium hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full transition-all duration-200"
//           >
//             <IoMdLogOut size={20} />
//             <span className="hidden sm:inline">Logout</span>
//           </button>

//           <button
//             onClick={() => setOpen(true)}
//             className="group bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 flex items-center gap-2"
//           >
//             <IoMdAdd size={20} />
//             <span>New Habit</span>
//           </button>
//         </div>
//       </nav>

//       {/* Modal */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-neutral-900">
//                 Create New Habit
//               </h2>
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="text-sm text-neutral-500 hover:text-neutral-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {/* Title */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-neutral-800">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="title"
//                   required
//                   className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   placeholder="Ex: Morning walk"
//                 />
//               </div>

//               {/* Description */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-neutral-800">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={3}
//                   className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
//                   placeholder="Short description (optional)"
//                 />
//               </div>

//               {/* Category & Frequency */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-neutral-800">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="category"
//                     required
//                     defaultValue=""
//                     className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
//                   >
//                     <option value="" disabled>
//                       Select category
//                     </option>
//                     {categories.map((c) => (
//                       <option key={c.value} value={c.value}>
//                         {c.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-neutral-800">
//                     Frequency <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="frequency"
//                     required
//                     defaultValue=""
//                     className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
//                   >
//                     <option value="" disabled>
//                       Select frequency
//                     </option>
//                     {frequencies.map((f) => (
//                       <option key={f.value} value={f.value}>
//                         {f.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Trigger */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-neutral-800">
//                   Trigger (optional)
//                 </label>
//                 <input
//                   name="trigger"
//                   className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                   placeholder="Ex: After brushing teeth"
//                 />
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setOpen(false)}
//                   className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:bg-neutral-100"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-5 py-2 rounded-full text-sm font-medium bg-orange-500 text-white shadow-md hover:bg-orange-600"
//                 >
//                   Create Habit
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdAdd, IoMdLogOut } from "react-icons/io";
import { HabitCategory, HabitFrequency, IHabit } from "@/model/habit";

const categories: { value: HabitCategory; label: string }[] = [
  { value: "health", label: "Health" },
  { value: "productivity", label: "Productivity" },
  { value: "finance", label: "Finance" },
  { value: "social", label: "Social" },
];

const frequencies: { value: HabitFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

interface NavbarProps {
  userId: string;
  onHabitCreated?: (habit: IHabit) => void; // 👈 add this
}

export default function Navbar({ userId, onHabitCreated }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const body = {
      userId,
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement)
        ?.value,
      category: (form.elements.namedItem("category") as HTMLSelectElement).value,
      frequency: (form.elements.namedItem("frequency") as HTMLSelectElement).value,
      trigger: (form.elements.namedItem("trigger") as HTMLInputElement)?.value,
    };

    try {
      const res = await fetch("/api/habit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      const newHabit: IHabit = data.habit;

      // 🔥 tell parent about new habit
      if (onHabitCreated) {
        onHabitCreated(newHabit);
      }

      form.reset();
      setOpen(false);
      alert("Habit created!");
    } catch (err) {
      console.log(err);
      alert("Error creating habit");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 flex justify-between items-center px-6 py-4 md:px-12">
        {/* Logo / title */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-gray-800 font-extrabold text-xl tracking-tight">
            Habit Tracker
          </h1>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 font-medium hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full transition-all duration-200"
          >
            <IoMdLogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={() => setOpen(true)}
            className="group bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 flex items-center gap-2"
          >
            <IoMdAdd size={20} />
            <span>New Habit</span>
          </button>
        </div>
      </nav>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Create New Habit
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-800">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  required
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Ex: Morning walk"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-800">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                  placeholder="Short description (optional)"
                />
              </div>

              {/* Category & Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-800">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-800">
                    Frequency <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="frequency"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                  >
                    <option value="" disabled>
                      Select frequency
                    </option>
                    {frequencies.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trigger */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-800">
                  Trigger (optional)
                </label>
                <input
                  name="trigger"
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="Ex: After brushing teeth"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-sm font-medium bg-orange-500 text-white shadow-md hover:bg-orange-600"
                >
                  Create Habit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

