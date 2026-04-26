"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HabitCard, { HabitStatus } from "@/components/HabitCard";
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
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDates = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const day = today.getDay(); // 0 is Sunday, 1 is Monday
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) + (weekOffset * 7); 
    
    const monday = new Date(today);
    monday.setDate(diff);
    
    return Array.from({length: 7}).map((_, i) => {
        const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        const localDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        
        const realToday = new Date();
        realToday.setHours(0,0,0,0);

        return {
            date: d,
            dateStr: localDateStr,
            isToday: d.getTime() === realToday.getTime()
        };
    });
  }, [weekOffset]);

  const [weeklyStatuses, setWeeklyStatuses] = useState<Record<string, Record<string, HabitStatus>>>({});

  useEffect(() => {
     const initialStates: Record<string, Record<string, HabitStatus>> = {};
     initialHabits.forEach(h => {
       if (h._id && h.weekStatuses) {
           const map: Record<string, HabitStatus> = {};
           for (const [dateStr, status] of Object.entries(h.weekStatuses)) {
               map[dateStr] = status === 'SUCCESS' ? 'done' : 'fail';
           }
           initialStates[h._id] = map;
       }
     });
     setWeeklyStatuses(initialStates);
  }, [initialHabits]);

  const handleCycleStatus = async (habitId: string, dayIndex: number, dateStr: string) => {
    
    const habStatuses = weeklyStatuses[habitId] || {};
    const current = habStatuses[dateStr] || null;
    
    let nextStatus: HabitStatus = null;
    if (current === null) nextStatus = 'done';
    else if (current === 'done') nextStatus = 'fail';
    else nextStatus = null;

    setWeeklyStatuses(prev => ({
        ...prev,
        [habitId]: {
            ...(prev[habitId] || {}),
            [dateStr]: nextStatus
        }
    }));

    try {
        if (nextStatus !== null) {
            const dbStatus = nextStatus === 'done' ? 'SUCCESS' : 'FAILED';
            await fetch("/api/checkIn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  habitId,
                  status: dbStatus,
                  date: dateStr,
                }),
            });
        } else {
            await fetch("/api/checkIn", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  habitId,
                  date: dateStr,
                }),
            });
        }
    } catch (err) {
        console.error("Error saving status", err);
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
    if (habitToEdit) setEditingHabit(habitToEdit);
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

  // Calculate Stats
  let totalCompleted = 0;
  let totalMissed = 0;

  Object.values(weeklyStatuses).forEach(habData => {
     Object.values(habData).forEach(status => {
         if (status === 'done') totalCompleted++;
         if (status === 'fail') totalMissed++;
     });
  });

  const totalActions = totalCompleted + totalMissed;
  const successRate = totalActions === 0 ? 0 : Math.round((totalCompleted / totalActions) * 100);

  return (
    <div className="flex min-h-screen bg-[#FFFDF9] font-sans">
      <style jsx global>{`
        @keyframes animePop {
          0% { transform: scale(0.9) translateY(0); }
          50% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1) translateY(0); }
        }
        .anime-pop { animation: animePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .neo-3d {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
          transition: all 0.1s active;
        }
        .neo-3d:active {
          box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
          transform: translate(4px, 4px);
        }
      `}</style>
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 w-full overflow-x-hidden bg-stone-100 md:bg-[#FFFDF9]">
        <Navbar userId={userId} onHabitCreated={handleHabitCreated} />

        <div className="pb-32">
            {/* Desktop Header - Hidden on Mobile */}
            <div className="hidden md:block w-full mx-auto px-10 pt-8">
                <div className="relative h-48 w-full bg-[#FFD600] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden mb-10">
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/5 to-transparent">
                        <div className="flex flex-row items-end justify-between gap-4">
                            <h1 className="text-5xl font-black text-black uppercase tracking-tighter italic">
                                Habit Mission
                            </h1>
                            <div className="flex items-center gap-2 bg-white border-2 border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <button onClick={() => setWeekOffset(w => w - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-yellow-400 border-2 border-black transition-colors text-black text-xl font-black cursor-pointer">‹</button>
                                <button onClick={() => setWeekOffset(0)} className="px-4 py-1 text-xs font-black uppercase tracking-widest text-black hover:text-orange-600 transition-all w-28 text-center cursor-pointer">
                                    {weekOffset === 0 ? "Present" : weekOffset < 0 ? `Wk ${weekOffset}` : `Wk +${weekOffset}`}
                                </button>
                                <button onClick={() => setWeekOffset(w => w + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-yellow-400 border-2 border-black transition-colors text-black text-xl font-black cursor-pointer">›</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header - Visible only on Mobile */}
            <div className="md:hidden w-full bg-[#FFD600] p-6 pt-8 shadow-sm">
                <h1 className="text-2xl font-black italic uppercase tracking-tight text-black mb-1">Habit Mission</h1>
                <p className="text-xs font-bold text-black/60 mb-6">Track your weekly goals</p>
                
                <div className="flex items-center justify-between bg-white/20 p-1 rounded-lg">
                    <button onClick={() => setWeekOffset(w => w - 1)} className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md font-black">‹</button>
                    <div className="text-xs font-black uppercase tracking-wider text-black italic">
                        {weekDates[0].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekDates[6].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <button onClick={() => setWeekOffset(w => w + 1)} className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md font-black">›</button>
                </div>
            </div>

            {/* Mobile Habits List */}
            <div className="md:hidden px-4 pt-6 space-y-4">
                {filteredHabits.map((habit) => {
                    const todayData = weekDates.find(d => d.isToday);
                    const todayStatus = todayData ? weeklyStatuses[habit._id]?.[todayData.dateStr] : null;

                    return (
                        <div key={habit._id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
                            {/* Mobile Status Badge */}
                            <div className="absolute top-4 right-4">
                                {todayStatus === 'done' ? (
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">Done</span>
                                ) : (
                                    <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full">Pending</span>
                                )}
                            </div>

                            <div className="pr-16">
                                <h3 className="text-base font-black text-black italic leading-tight uppercase mb-1">{habit.title}</h3>
                                <p className="text-[10px] font-bold text-gray-400 line-clamp-1 italic">{habit.description || habit.category}</p>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg -mx-2">
                                {weekDates.map((day, idx) => {
                                    const status = weeklyStatuses[habit._id]?.[day.dateStr] || null;
                                    const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
                                    
                                    let bubbleClass = "w-8 h-8 flex items-center justify-center border-2 border-black font-black text-xs transition-all ";
                                    if (status === 'done') {
                                        bubbleClass += "bg-emerald-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                                    } else if (status === 'fail') {
                                        bubbleClass += "bg-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                                    } else {
                                        bubbleClass += "bg-white text-transparent border-gray-200";
                                    }
                                    if (day.isToday) bubbleClass += " scale-110 ring-2 ring-blue-400 ring-offset-2";

                                    return (
                                        <div key={day.dateStr} className="flex flex-col items-center gap-1.5">
                                            <span className={`text-[8px] font-black ${day.isToday ? 'text-blue-500' : 'text-gray-400'}`}>{dayNames[idx]}</span>
                                            <button 
                                                disabled={!day.isToday}
                                                onClick={() => handleCycleStatus(habit._id, idx, day.dateStr)}
                                                className={bubbleClass}
                                            >
                                                {status === 'done' ? '✓' : status === 'fail' ? 'X' : ''}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                                <button onClick={() => handleEditHabit(habit._id)} className="px-4 py-1.5 border-2 border-black bg-white font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Edit</button>
                                <button onClick={() => handleDeleteHabit(habit._id)} className="px-4 py-1.5 border-2 border-black bg-red-400 text-white font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block w-full mx-auto px-10">
                <div className="bg-white border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-[#fafafa] border-b-2 border-black">
                                    <th className="p-6 font-black uppercase tracking-widest text-black w-[30%] text-sm">The Objective</th>
                                    {weekDates.map((day, idx) => (
                                        <th key={day.dateStr} className={`p-3 text-center transition-colors w-[8%] ${day.isToday ? 'bg-blue-50' : ''} border-l-2 border-black/10`}>
                                            <div className={`text-[10px] font-black uppercase tracking-wider mb-1 ${day.isToday ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][idx]}
                                            </div>
                                            <div className={`text-lg font-black ${day.isToday ? 'text-blue-600' : 'text-black'}`}>
                                                {day.date.getDate()}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-4 font-black uppercase tracking-widest text-black text-right w-[14%] border-l-2 border-black/10 text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHabits.map((habit: any) => (
                                    <HabitCard 
                                        key={habit._id} 
                                        habit={habit}
                                        onCycleStatus={handleCycleStatus}
                                        onDelete={handleDeleteHabit}
                                        onEdit={handleEditHabit}
                                        weekStatuses={weeklyStatuses[habit._id] || {}}
                                        weekDates={weekDates}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Bar at the bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 flex justify-between items-center gap-1 z-50 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-auto md:border-2 md:p-4 md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:rounded-2xl md:bg-white md:transform md:-rotate-1 md:hover:rotate-0 transition-transform">
             <div className="flex-1 text-center border-r border-black/10 md:border-none md:flex-none md:px-8">
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Clear</p>
                 <p className="text-xl md:text-3xl font-black text-emerald-500 italic tracking-tighter">{totalCompleted}</p>
             </div>
             <div className="flex-1 text-center border-r border-black/10 md:border-none md:flex-none md:px-8">
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Lost</p>
                 <p className="text-xl md:text-3xl font-black text-red-500 italic tracking-tighter">{totalMissed}</p>
             </div>
             <div className="flex-1 text-center md:flex-none md:px-8">
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Rating</p>
                 <p className="text-xl md:text-3xl font-black text-blue-500 italic tracking-tighter">{successRate}%</p>
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