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
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 flex justify-between items-center px-6 py-4 md:px-12">
        
        
        <div className="flex items-center gap-2">
           <span className="md:hidden font-extrabold text-xl text-gray-800">Habit Tracker</span>
        </div>

       
        <div className="flex items-center gap-4">
          <LogoutBtn/>
         

          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 flex items-center gap-2"
          >
            <IoMdAdd size={20} />
            <span>New Habit</span>
          </button>
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