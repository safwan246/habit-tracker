import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/Lib/mongodb";
import Habit from "@/model/habit";
import { verifyToken } from "@/app/Lib/JWT/verifyToken";


export async function DELETE(req: NextRequest,props: { params: Promise<{ id: string }>}) {
  try {
    await connectDB();
    const decoded = verifyToken(req);
    if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    
    const params = await props.params;

    const deletedHabit = await Habit.findOneAndDelete({
      _id: params.id,
      userId: decoded.user_id,
    });

    if (!deletedHabit) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest,props: { params: Promise<{ id: string }> }){
  try {
    await connectDB();
    const decoded = verifyToken(req);
    if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { title, description } = await req.json();
    
    const params = await props.params;

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: params.id, userId: decoded.user_id },
      { title, description },
      { new: true }
    );

    if (!updatedHabit) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ habit: updatedHabit }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
