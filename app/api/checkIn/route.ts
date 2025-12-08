// app/api/checkin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/Lib/mongodb";
import CheckIn, { CheckInStatus } from "@/model/checkIn";
import { verifyToken } from "@/app/Lib/JWT/verifyToken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { habitId, status, note, date } = await req.json();

    if (!habitId || !status) {
      return NextResponse.json(
        { message: "habitId and status are required" },
        { status: 400 }
      );
    }

    const today = date ?? new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const checkIn = await CheckIn.findOneAndUpdate(
      {
        userId: decoded.user_id,
        habitId,
        date: today,
      },
      {
        userId: decoded.user_id,
        habitId,
        status: status as CheckInStatus,
        note,
        date: today,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ checkIn }, { status: 200 });
  } catch (error) {
    console.error("POST /api/checkin error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
