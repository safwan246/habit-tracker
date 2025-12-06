
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/Lib/mongodb";
import Habit from "@/model/habit";
import { verifyToken } from "@/app/Lib/JWT/verifyToken";


export async function PUT(req: NextRequest,{ params }: { params:Promise< { id: string }>}) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const habitId = (await params).id;

    const { title, description, category, frequency, trigger } =
      await req.json();

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (frequency !== undefined) updateData.frequency = frequency;
    if (trigger !== undefined) updateData.trigger = trigger;

    const updatedHabit = await Habit.findOneAndUpdate(
      {
        _id: habitId,
        userId: decoded.user_id,
      },
      updateData,
      { new: true }
    );

    if (!updatedHabit) {
      return NextResponse.json(
        { message: "Habit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Habit updated", habit: updatedHabit },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/habits/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest,{ params }: { params:Promise< { id: string }>}) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const habitId = (await params).id;

    const deletedHabit = await Habit.findOneAndDelete({
      _id: habitId,
      userId: decoded.user_id, 
    });

    if (!deletedHabit) {
      return NextResponse.json(
        { message: "Habit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Habit deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/habits/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
