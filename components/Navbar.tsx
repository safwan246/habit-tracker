"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdAdd, IoMdLogOut } from "react-icons/io"; 
import { IHabit } from "@/model/habit";
import HabitModal from "./HabitModel"; 
import LogoutBtn from "./logout";

interface NavbarProps {
  userId: string;
  onHabitCreated?: (habit: IHabit) => void;
}

export default function Navbar({ userId, onHabitCreated }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

 
  const handleCreateSubmit = async (data: Partial<IHabit>) => {
 
    const body = { ...data, userId };

    try {
      const res = await fetch("/api/habit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create habit");

      const responseData = await res.json();
      
    
      if (onHabitCreated) {
        onHabitCreated(responseData.habit);
      }

      setIsModalOpen(false); 
    } catch (err) {
      console.error(err);
      alert("Error creating habit");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-black md:bg-white border-b-2 border-black flex justify-between items-center px-4 md:px-12 py-3 md:py-4 shadow-sm">
        
        <div className="flex items-center gap-2">
           <span className="font-black text-lg md:text-2xl text-white md:text-black italic tracking-tighter uppercase whitespace-nowrap">
            Habit <span className="text-orange-500">Hunter</span>
           </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop Only Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <LogoutBtn/>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-[#FF5C00] text-white px-7 py-2.5 border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-[#FF8A00] transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <div className="flex items-center gap-2">
                <IoMdAdd size={16} className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>New Habit</span>
              </div>
            </button>
          </div>

          {/* Mobile Only Hamburger/Add Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white hover:text-orange-500 transition-colors"
            >
              <IoMdAdd size={28} />
            </button>
            <div className="flex flex-col gap-1 w-6 cursor-pointer">
              <div className="h-0.5 w-full bg-white"></div>
              <div className="h-0.5 w-full bg-white"></div>
              <div className="h-0.5 w-full bg-white"></div>
            </div>
          </div>
        </div>
      </nav>

      
      <HabitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        initialData={null} 
      />
    </>
  );
}