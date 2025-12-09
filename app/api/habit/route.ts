
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/Lib/mongodb";
import Habit from "@/model/habit";
import { verifyToken } from "@/app/Lib/JWT/verifyToken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, category, frequency, trigger } = await req.json();

    
    if (!title || !category || !frequency) {
      return NextResponse.json(
        { message: "title, category, and frequency are required" },
        { status: 400 }
      );
    }

    const habit = await Habit.create({
      userId: decoded.user_id, 
      title,
      description,
      category,
      frequency,
      trigger,
    });

    return NextResponse.json({message: "Habit created",habit,},{ status: 201 });
  
  } catch (error) {
    console.error("POST /api/habits error:", error);
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const habits = await Habit.find({ userId: decoded.user_id }).sort({createdAt: -1,});
    return NextResponse.json({ habits },{ status: 200 });

  } catch (error) {
    console.error("GET /api/habit error:", error);
    
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
}
