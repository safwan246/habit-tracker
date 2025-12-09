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
      trigger: (form.elements.namedItem("trigger") as HTMLInputElement).value,
    };

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md  bg-white p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        
    
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-800">
            {initialData ? "Edit Habit" : "Create New Habit"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
     
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Title
            </label>
            <input
              name="title"
              required
              defaultValue={initialData?.title || ""}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
              placeholder="habit"
            />
          </div>

        
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              defaultValue={initialData?.description || ""}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all resize-none"
              placeholder="Details about your habit..."
            />
          </div>

       
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  required
                  defaultValue={initialData?.category || ""}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                >
                  <option value="" disabled>Select...</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
             
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Frequency
              </label>
              <div className="relative">
                <select
                  name="frequency"
                  required
                  defaultValue={initialData?.frequency || ""}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                >
                  <option value="" disabled>Select...</option>
                  {frequencies.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
             <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Trigger 
            </label>
            <input
              name="trigger"
              defaultValue={initialData?.trigger || ""}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
              placeholder="Ex: After brushing teeth"
            />
          </div>
          
         
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-orange-500 "
            >
              {initialData ? "Save Changes" : "Create Habit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}