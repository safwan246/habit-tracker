import { connectDB } from "@/app/Lib/mongodb";
import { NextResponse } from "next/server";

export  async function GET(req:Request){
   await connectDB()
    return NextResponse.json({message:"database connecte"})
}