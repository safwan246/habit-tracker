import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/Lib/mongodb";
import HabitModel from "@/model/habit"; 
import CheckInModel from "@/model/checkIn";
import HabitClient from "@/components/HabitClient"; 

interface JwtPayload {
  user_id: string;
}

export default async function HabitPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let userId: string;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    userId = decoded.user_id;
  } catch (err) {
    console.error("INVALID TOKEN IN PAGE:", err);
    redirect("/login");
  }


  await connectDB();


  const rawHabits = await HabitModel.find({ userId: userId }).lean();
  const habits = JSON.parse(JSON.stringify(rawHabits));


  const todayStr = new Date().toISOString().slice(0, 10);
  
  const rawCheckIns = await CheckInModel.find({
    userId: userId,
    date: todayStr,
  }).lean();
  
  const todayCheckIns = JSON.parse(JSON.stringify(rawCheckIns));

  
  const serializedHabits = habits.map((habit: any) => {
   
    const checkIn = todayCheckIns.find(
      (c: any) => String(c.habitId) === String(habit._id) 
    );

    return {
      ...habit,
      
      todayStatus: checkIn ? checkIn.status : null,
    };
  });

  return (
    <div>
      
      <HabitClient userId={userId} initialHabits={serializedHabits} />
    </div>
  );
}
