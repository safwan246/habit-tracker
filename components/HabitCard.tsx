
// import { IHabit } from "../model/habit";
// import { CheckInStatus } from "@/model/checkIn";

// type HabitWithId = IHabit & { _id?: string };

// interface HabitCardProps {
//   habit: HabitWithId;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
//   onCheckIn?: (id: string) => void;
//   todayStatus?: CheckInStatus | null;
// }

// const HabitCard = ({
//   habit,
//   onEdit,
//   onDelete,
//   onCheckIn,
//   todayStatus,
// }: HabitCardProps) => {
//   if (!habit) return null;

//   const id = (habit as any)._id as string | undefined;

//   const renderStatusPill = () => {
//     if (!todayStatus) return null;

//     const base =
//       "px-4 py-2 rounded-xl text-sm font-semibold shadow-sm";
//     if (todayStatus === "SUCCESS")
//       return (
//         <span className={`${base} bg-emerald-500 text-white`}>
//           Success
//         </span>
//       );
//     if (todayStatus === "FAILED")
//       return (
//         <span className={`${base} bg-red-500 text-white`}>
//           Failed
//         </span>
//       );
//     return (
//       <span className={`${base} bg-gray-300 text-gray-800`}>
//         Skipped
//       </span>
//     );
//   };

//   return (
//     <div className="w-full max-w-[340px] bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
//       {/* Top row: category + edit/delete */}
//       <div className="flex items-center justify-between">
//         <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
//           <span className="text-xs font-semibold tracking-wide">
//             {habit.category}
//           </span>
//         </div>

//         <div className="flex items-center gap-2 text-xs">
//           <button
//             disabled={!id}
//             onClick={() => id && onEdit?.(id)}
//             className="text-blue-600 hover:underline disabled:opacity-40"
//           >
//             Edit
//           </button>
//           <button
//             disabled={!id}
//             onClick={() => id && onDelete?.(id)}
//             className="text-red-500 hover:underline disabled:opacity-40"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       <div className="mt-4 mb-6">
//         <h3 className="text-lg font-bold text-gray-900">{habit.title}</h3>
//         <p className="text-sm text-gray-500 mt-1">
//           {habit.description || "No description"}
//         </p>
//       </div>

//       <div className="flex items-center justify-between mt-auto">
//         <span className="text-sm text-gray-500 font-medium">
//           {habit.frequency}
//         </span>

//         {/* Button OR status pill */}
//         {todayStatus ? (
//           renderStatusPill()
//         ) : (
//           <button
//             disabled={!id}
//             onClick={() => id && onCheckIn?.(id)}
//             className="bg-[#EE7F5E] hover:bg-[#d97253] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-40"
//           >
//             Check In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HabitCard;

// components/HabitCard.tsx
import { IHabit } from "../model/habit";
import { CheckInStatus } from "@/model/checkIn";

type HabitWithId = IHabit & { _id?: string };

interface HabitCardProps {
  habit: HabitWithId;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCheckIn?: (id: string) => void;
  todayStatus?: CheckInStatus | null;
}

const HabitCard = ({
  habit,
  onEdit,
  onDelete,
  onCheckIn,
  todayStatus,
}: HabitCardProps) => {
  if (!habit) return null;

  const id = (habit as any)._id as string | undefined;

  const renderStatusPill = () => {
    if (!todayStatus) return null;

    const base =
      "px-4 py-2 rounded-xl text-sm font-semibold shadow-sm";
    if (todayStatus === "SUCCESS")
      return (
        <span className={`${base} bg-emerald-500 text-white`}>
          Success
        </span>
      );
    if (todayStatus === "FAILED")
      return (
        <span className={`${base} bg-red-500 text-white`}>
          Failed
        </span>
      );
    return (
      <span className={`${base} bg-gray-300 text-gray-800`}>
        Skipped
      </span>
    );
  };

  return (
    <div className="w-full max-w-[340px] bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
      {/* Top row: category + edit/delete */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
          <span className="text-xs font-semibold tracking-wide">
            {habit.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            disabled={!id}
            onClick={() => id && onEdit?.(id)}
            className="text-blue-600 hover:underline disabled:opacity-40"
          >
            Edit
          </button>
          <button
            disabled={!id}
            onClick={() => id && onDelete?.(id)}
            className="text-red-500 hover:underline disabled:opacity-40"
          >
            Delete
          </button>
        </div>
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

        {/* If already checked-in today → show status pill, else show button */}
        {todayStatus ? (
          renderStatusPill()
        ) : (
          <button
            disabled={!id}
            onClick={() => id && onCheckIn?.(id)}   
            className="bg-[#EE7F5E] hover:bg-[#d97253] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-40"
          >
            Check In
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitCard;

