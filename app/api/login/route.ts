import mongoose from "mongoose";
import { NextResponse,NextRequest } from "next/server";
import User from "@/model/user";
import { connectDB } from "@/app/Lib/mongodb";
import { generateToken } from "@/app/Lib/JWT/genarateToken";


export async function PUT(req: NextRequest){
    await connectDB();
}