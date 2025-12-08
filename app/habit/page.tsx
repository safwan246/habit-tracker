import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import HabitClient from "@/components/HabitClient";

interface JwtPayload {
  user_id: string;
}

export default async function Habit() {
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
  return (
    <div>
     <HabitClient userId={userId} />

      {/* <MainBody/> */}
    </div>
  );
}
