"use client";

import { IHabit } from "../model/habit";

export type HabitStatus = 'done' | 'fail' | null;

interface HabitCardProps {
  habit: IHabit & { _id?: string };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCycleStatus: (habitId: string, dayIndex: number, dateStr: string) => void;
  weekStatuses: Record<string, HabitStatus>; 
  weekDates: { date: Date; dateStr: string; isToday: boolean }[];
}

const HabitCard = ({
  habit,
  onEdit,
  onDelete,
  onCycleStatus,
  weekStatuses,
  weekDates
}: HabitCardProps) => {
  if (!habit) return null;
  const id = habit._id as string;

  const todayData = weekDates.find(d => d.isToday);
  const todayStatus = todayData ? weekStatuses[todayData.dateStr] : null;

  return (
    <tr className="group border-b-2 border-black/10 hover:bg-yellow-50/30 transition-colors">
      <td className="p-3 md:p-6 align-middle">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
            <h3 className="text-sm md:text-lg font-black text-black uppercase tracking-tight italic line-clamp-1">{habit.title}</h3>
            {todayStatus === 'done' && <span className="px-2 md:px-2.5 py-0.5 md:py-1 text-[8px] md:text-[9px] uppercase font-black rounded border-2 border-black bg-emerald-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Clear</span>}
            {todayStatus === 'fail' && <span className="px-2 md:px-2.5 py-0.5 md:py-1 text-[8px] md:text-[9px] uppercase font-black rounded border-2 border-black bg-red-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Failed</span>}
            {!todayStatus && <span className="px-2 md:px-2.5 py-0.5 md:py-1 text-[8px] md:text-[9px] uppercase font-black rounded border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Active</span>}
          </div>
          <p className="text-[10px] md:text-sm font-bold text-gray-500 italic line-clamp-1">{habit.description || habit.category}</p>
        </div>
      </td>

      {weekDates.map((day, idx) => {
        const status = weekStatuses[day.dateStr] || null;
        let btnClass = "w-7 h-7 md:w-9 md:h-9 mx-auto border-2 border-black flex items-center justify-center transition-all neo-3d font-black text-sm md:text-lg ";
        let content = null;
        
        if (day.isToday) {
            btnClass += "cursor-pointer scale-105 ";
        } else {
            btnClass += "cursor-default opacity-80 scale-90 ";
        }

        if (status === 'done') {
          btnClass += "bg-emerald-400 text-black anime-pop ";
          content = "✓";
        } else if (status === 'fail') {
          btnClass += "bg-red-400 text-black anime-pop ";
          content = "✗";
        } else {
           btnClass += "bg-white text-transparent";
           if (day.isToday) btnClass += " hover:bg-yellow-50 ";
        }

        return (
          <td key={day.dateStr} className={`p-2 md:p-4 align-middle border-l-2 border-black/5 ${day.isToday ? 'bg-blue-50/50' : ''}`}>
            <button
              disabled={!day.isToday}
              onClick={() => day.isToday && onCycleStatus(id, idx, day.dateStr)}
              className={btnClass}
            >
              {content && <span>{content}</span>}
            </button>
          </td>
        );
      })}

      <td className="p-3 md:p-6 align-middle text-right border-l-2 border-black/5">
        <div className="flex flex-col md:flex-row items-center justify-end gap-2 md:gap-3">
          <button onClick={() => id && onEdit?.(id)} className="w-full md:w-auto px-2 md:px-3 py-1 border-2 border-black bg-white font-black text-[8px] md:text-xs uppercase hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">Edit</button>
          <button onClick={() => id && onDelete?.(id)} className="w-full md:w-auto px-2 md:px-3 py-1 border-2 border-black bg-red-400 font-black text-[8px] md:text-xs uppercase hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default HabitCard;