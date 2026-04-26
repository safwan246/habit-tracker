"use client";

import React, { useEffect } from "react";
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

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IHabit>) => void;
  initialData?: IHabit | null; 
}

export default function HabitModal({ isOpen, onClose, onSubmit, initialData }: HabitModalProps) {
  
 
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      category: (form.elements.namedItem("category") as HTMLSelectElement).value as HabitCategory,
      frequency: (form.elements.namedItem("frequency") as HTMLSelectElement).value as HabitFrequency,
      
    };

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex md:items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md my-auto">
        <div className="bg-[#FFFDF9] border-2 md:border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h5 className="text-xl md:text-2xl font-black text-black uppercase italic tracking-tighter underline underline-offset-4 decoration-2 md:decoration-4 decoration-[#FFD600]">
              {initialData ? "Modify Asset" : "New Objective"}
            </h5>
            <button
              onClick={onClose}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 md:border-4 border-black bg-white text-black font-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 italic">
                Identity / Title
              </label>
              <input
                name="title"
                required
                defaultValue={initialData?.title || ""}
                className="w-full border-2 md:border-4 border-black bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm font-black text-black focus:outline-none focus:bg-yellow-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                placeholder="E.g. Morning Sprints"
              />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 italic">
                Briefing / Details
              </label>
              <textarea
                name="description"
                rows={2}
                defaultValue={initialData?.description || ""}
                className="w-full border-2 md:border-4 border-black bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm font-black text-black focus:outline-none focus:bg-yellow-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                placeholder="What is the mission?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 italic">
                  Department
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    defaultValue={initialData?.category || ""}
                    className="w-full appearance-none border-2 md:border-4 border-black bg-white px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-black text-black focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <option value="" disabled>Select</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                    <svg className="h-4 w-4 fill-current stroke-2" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 italic">
                  Pulse / Frequency
                </label>
                <div className="relative">
                  <select
                    name="frequency"
                    required
                    defaultValue={initialData?.frequency || ""}
                    className="w-full appearance-none border-2 md:border-4 border-black bg-white px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-black text-black focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <option value="" disabled>Select</option>
                    {frequencies.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                    <svg className="h-4 w-4 fill-current stroke-2" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-6 pt-4 md:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-6 py-2.5 md:py-3 border-2 md:border-4 border-black bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-gray-100 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                Abort
              </button>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-2.5 md:py-3 border-2 md:border-4 border-black bg-[#FF5C00] text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#FF8A00] transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                {initialData ? "Synchronize" : "Deploy"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}