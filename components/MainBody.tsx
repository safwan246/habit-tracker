"use client";

import React, { useEffect, useState } from "react";
import HabitCard from "../components/HabitCard";
import { IHabit } from "@/model/habit";
import { CheckInStatus } from "@/model/checkIn";

type HabitWithId = IHabit & { _id?: string };

export default function MainBody() {
  const [habits, setHabits] = useState<HabitWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const [checkInModalHabit, setCheckInModalHabit] =
    useState<HabitWithId | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<CheckInStatus | null>(null);
  const [statusByHabitId, setStatusByHabitId] = useState<
    Record<string, CheckInStatus>
  >({});

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habit", {
          method: "GET",
        });

        if (!res.ok) {
          console.error("Failed to fetch habits");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setHabits((data.habits as HabitWithId[]) || []);
      } catch (err) {
        console.error("Error fetching habits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleOpenCheckIn = (id: string) => {
    const habit = habits.find((h) => (h as any)._id === id) || null;
    if (!habit) return;
    setCheckInModalHabit(habit);
    setSelectedStatus(null);
  };

  const handleCheckInSubmit = async () => {
    if (!checkInModalHabit || !selectedStatus) return;

    const habitId = (checkInModalHabit as any)._id as string;

    try {
      const res = await fetch("/api/checkIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId,
          status: selectedStatus,
        }),
      });

      if (!res.ok) {
        console.error("Failed to create check-in");
        return;
      }

      setStatusByHabitId((prev) => ({
        ...prev,
        [habitId]: selectedStatus,
      }));

      setCheckInModalHabit(null);
      setSelectedStatus(null);
    } catch (err) {
      console.error("Error creating check-in:", err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      
      <div className="p-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">
          My Habits
        </h1>

        {loading && (
          <p className="text-sm text-gray-500">Loading habits...</p>
        )}

        {!loading && habits.length === 0 && (
          <p className="text-sm text-gray-500">
            No habits yet. Create one using the “New Habit” button.
          </p>
        )}

        <div className="flex flex-wrap gap-6 mt-6">
          {!loading &&
            habits.map((habit) => {
              const id = (habit as any)._id as string | undefined;
              const status = id ? statusByHabitId[id] : undefined;

              return (
                <HabitCard
                  key={String(id ?? habit.title)}
                  habit={habit}
                  onCheckIn={handleOpenCheckIn}
                  todayStatus={status ?? null}
                />
              );
            })}
        </div>
      </div>

      {/* Check-in Modal */}
      {checkInModalHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Daily Check-In
              </h2>
              <button
                onClick={() => {
                  setCheckInModalHabit(null);
                  setSelectedStatus(null);
                }}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <p className="font-semibold mb-1">{checkInModalHabit.title}</p>
            <p className="text-sm text-neutral-600 mb-4">
              How did you do with this habit today?
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {(["SUCCESS", "FAILED", "SKIP"] as CheckInStatus[]).map(
                (status) => {
                  const isActive = selectedStatus === status;
                  const base =
                    "flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-4 cursor-pointer text-sm";
                  const active =
                    "border-orange-400 bg-orange-50 text-orange-700 font-semibold";
                  const inactive =
                    "border-neutral-200 text-neutral-700 hover:border-orange-200";
                  const label =
                    status === "SUCCESS"
                      ? "Success"
                      : status === "FAILED"
                      ? "Failed"
                      : "Skip";
                  const icon =
                    status === "SUCCESS"
                      ? "✓"
                      : status === "FAILED"
                      ? "✕"
                      : "⏭";

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`${base} ${
                        isActive ? active : inactive
                      }`}
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{label}</span>
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              disabled={!selectedStatus}
              onClick={handleCheckInSubmit}
              className="w-full rounded-full bg-[#EE7F5E] disabled:bg-neutral-300 disabled:text-neutral-600 text-white font-semibold py-3"
            >
              Complete Check-In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
