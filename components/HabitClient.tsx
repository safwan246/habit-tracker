
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HabitCard from "@/components/HabitCard";
import HabitModal from "./HabitModel";
import { IHabit } from "@/model/habit";
import { CheckInStatus } from "@/model/checkIn";


interface HabitClientProps {
  userId: string;
  initialHabits: any[];
}

export default function HabitClient({ userId, initialHabits }: HabitClientProps) {
  
  const [habits, setHabits] = useState<any[]>(initialHabits || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingHabit, setEditingHabit] = useState<any | null>(null);


  const handleCheckIn = async (habitId: string, status: CheckInStatus) => {
    console.log("Sending Check-in:", habitId, status);

    try {
      const res = await fetch("/api/checkIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId,
          status,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);
        if (!res.ok) {
           console.error("SERVER ERROR:", data);
           throw new Error(data.message || "Failed to update status");
        }
        console.log("Check-in success:", data);
      } catch (jsonError) {
        console.error("CRITICAL SERVER ERROR (HTML):", text);
        throw new Error("Server crashed. Check console.");
      }
      
    } catch (error: any) {
      console.error("Error checking in:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

 
  const handleDeleteHabit = async (id: string) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;

    try {
      const res = await fetch(`/api/habit/${id}`, { method: "DELETE" });
      
      if (!res.ok) throw new Error("Failed to delete");

  
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete habit");
    }
  };

 
  const handleEditHabit = (id: string) => {
    const habitToEdit = habits.find((h) => h._id === id);
    if (habitToEdit) {
      setEditingHabit(habitToEdit);
    }
  };

 
  const submitEdit = async (formData: Partial<IHabit>) => {
    if (!editingHabit) return;

    try {
      const res = await fetch(`/api/habit/${editingHabit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update");

    
      setHabits((prev) => 
        prev.map((h) => (h._id === editingHabit._id ? { ...h, ...formData } : h))
      );
      
      setEditingHabit(null); 
    } catch (err) {
      console.error(err);
      alert("Could not update habit");
    }
  };


  const handleHabitCreated = (habit: IHabit) => {
    setHabits((prev) => [...prev, habit]);
  };

 
  const filteredHabits = selectedCategory === "All" 
    ? habits 
    : habits.filter((h) => h.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex min-h-screen bg-stone-50">
      
     
    

     
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10">
        
        <Navbar userId={userId} onHabitCreated={handleHabitCreated} />

        <div className="pb-20">
           
            <div className="w-full mx-auto px-4 md:px-10 pt-8">
                <div className="relative h-55 md:h-72 w-full bg-orange-50 shadow-gray-500">
                  
                    <div className="absolute inset-0 "></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                       
                        <h1 className="text-3xl md:text-5xl font-extrabold text-black font-sans drop-shadow-sm">
                            Welcome to Habit Tracker!
                        </h1>
                    </div>
                </div>
            </div>

          
            <div className="p-8">
              
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    {filteredHabits.map((habit: any) => (
                        <HabitCard 
                            key={habit._id} 
                            habit={habit}
                            onCheckIn={handleCheckIn} 
                            onDelete={handleDeleteHabit}
                            onEdit={handleEditHabit}
                            todayStatus={habit.todayStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
      </main>

    
      <HabitModal 
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        onSubmit={submitEdit}
        initialData={editingHabit}
      />
    </div>
  );
}