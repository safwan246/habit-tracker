
"use client";

import { useState, useEffect } from "react";
import { IHabit } from "../model/habit";
import { CheckInStatus } from "@/model/checkIn"; 

type HabitWithId = IHabit & { _id?: string };

interface HabitCardProps {
  habit: HabitWithId;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCheckIn?: (id: string, status: CheckInStatus) => void;
  todayStatus?: CheckInStatus | null;
}

const HabitCard = ({
  habit,
  onEdit,
  onDelete,
  onCheckIn,
  todayStatus,
}: HabitCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<CheckInStatus | null>(todayStatus || null);

  useEffect(() => {
    setOptimisticStatus(todayStatus || null);
  }, [todayStatus]);

  if (!habit) return null;
  const id = (habit as any)._id as string | undefined;

  const handleStatusSelect = (status: CheckInStatus) => {
    if (!id) {
      console.error("Missing Habit ID");
      return;
    }
    if (!onCheckIn) {
      console.error("Missing onCheckIn function from parent");
      return;
    }

    setOptimisticStatus(status);
    setShowOptions(false);
    onCheckIn(id, status);
  };

  const renderStatusPill = (statusToRender: CheckInStatus) => {
    const base = "px-4 py-2  text-sm font-semibold shadow-sm ";

    if (statusToRender === "SUCCESS")
      return <span className={`${base} bg-emerald-500 text-white`}>Success</span>;
    if (statusToRender === "FAILED")
      return <span className={`${base} bg-red-500 text-white`}>Failed</span>;
    
    return null; 
  };

  return (
    <div className="w-full max-w-[340px] bg-white  p-6 shadow-sm border border-gray-50 flex flex-col gap-4">
      
    
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 ">
          <span className="text-sm font-md text-green-400">{habit.category}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button disabled={!id} onClick={() => id && onEdit?.(id)} className="text-blue-600 hover:underline disabled:opacity-40 hover:cursor-pointer">Edit</button>
          <button disabled={!id} onClick={() => id && onDelete?.(id)} className="text-red-500 hover:underline disabled:opacity-40 hover:cursor-pointer">Delete</button>
        </div>
      </div>

      
      <div>
        <h3 className="text-lg font-bold text-gray-900">{habit.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{habit.description}</p>
      </div>

    
      <div className="flex items-center justify-between mt-auto h-[48px]">
        <span className="text-sm text-gray-500 font-medium">{habit.frequency}</span>

        {optimisticStatus ? (
          renderStatusPill(optimisticStatus)
        ) : (
          <>
            {!showOptions && (
              <button
                disabled={!id}
                onClick={() => setShowOptions(true)}
                className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 hover:cursor-pointer"
              >
                Check In
              </button>
            )}

            {showOptions && (
              <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
                <button
                  onClick={() => handleStatusSelect("SUCCESS")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 "
                >
                  Success
                </button>
                <button
                  onClick={() => handleStatusSelect("FAILED")}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 "
                >
                  Failed
                </button>
                
               
                
                <button
                  onClick={() => setShowOptions(false)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HabitCard;