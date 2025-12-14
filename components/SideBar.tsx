
"use client";

import React, { useState } from "react";

interface SidebarProps {
  habits: any[];
}

export default function Sidebar({ habits }: SidebarProps) {

  const [hoveredHabit, setHoveredHabit] = useState<any | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number } | null>(null);

  
  const handleMouseEnter = (habit: any, e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredHabit(habit);
    setHoverPosition({
      top: rect.top, 
      left: rect.right + 10 
    });
  };

  const handleMouseLeave = () => {
    setHoveredHabit(null);
    setHoverPosition(null);
  };

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-stone-200 p-6 z-30">
       
        <div className="mb-10 flex items-center gap-2">
          
          <span className="text-xl font-bold text-stone-800">HabitTracker</span>
        </div>

       
        <div className="flex-1 overflow-y-auto min-h-0">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 pl-3">
            Your Habits
          </p>
          
          {habits.length === 0 ? (
            <p className="text-xs text-stone-400 pl-4 italic">No habits created yet.</p>
          ) : (
            <ul className="flex flex-col gap-1 pb-4">
              {habits.map((habit) => (
                <li 
                  key={habit._id}
                  onMouseEnter={(e) => handleMouseEnter(habit, e)} 
                  onMouseLeave={handleMouseLeave}
                  className="px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      habit.todayStatus === 'SUCCESS' ? 'bg-emerald-400' : 
                      habit.todayStatus === 'FAILED' ? 'bg-red-400' : 'bg-stone-300'
                  }`}></span>
                  <span className="truncate font-medium">{habit.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      
     
      </aside>

   
      {hoveredHabit && hoverPosition && (
        <div 
          className="fixed z-50 w-[280px] p-5 bg-white rounded-2xl shadow-xl border border-stone-100 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{ 
            top: hoverPosition.top, 
            left: hoverPosition.left 
          }}
        >
       
          <div className="flex items-center gap-2 mb-3">
             
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                  {hoveredHabit.category}
              </span>
              <span className="text-xs text-stone-400 font-medium ml-auto">
                  {hoveredHabit.frequency}
              </span>
          </div>
          
       
          <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2">
              {hoveredHabit.title}
          </h4>

       
          <p className="text-sm text-stone-500 line-clamp-3 mb-4">
              {hoveredHabit.description || "No description provided."}
          </p>

   
           <div className="pt-3 border-t border-stone-50 flex items-center justify-between">
              <span className="text-xs font-medium text-stone-400">Today's Status:</span>
              {hoveredHabit.todayStatus === 'SUCCESS' && <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-md">Completed</span>}
              {hoveredHabit.todayStatus === 'FAILED' && <span className="text-xs font-bold text-red-600 px-2 py-0.5 bg-red-50 rounded-md">Failed</span>}
              {!hoveredHabit.todayStatus && <span className="text-xs font-bold text-stone-500 px-2 py-0.5 bg-stone-100 rounded-md">Pending</span>}
           </div>
        </div>
      )}
    </>
  );
}