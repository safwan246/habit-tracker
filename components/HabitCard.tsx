 
import { IHabit } from "../model/habit";

interface HabitCardProps {
  habit: IHabit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  if (!habit) return null;

  return (
    <div className="w-full max-w-[340px] bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
        <span className="text-xs font-semibold tracking-wide">
          {habit.category}
        </span>
      </div>

      <div className="mt-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">{habit.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {habit.description || "No description"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm text-gray-500 font-medium">
          {habit.frequency}
        </span>
        <button className="bg-[#EE7F5E] hover:bg-[#d97253] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
          Check In
        </button>
      </div>
    </div>
  );
};

export default HabitCard;

