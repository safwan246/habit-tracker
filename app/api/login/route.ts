import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import User from "@/model/user";
import { connectDB } from "@/app/Lib/mongodb";
import { generateToken } from "@/app/Lib/JWT/genarateToken";



export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please provide all the fields" },
                { status: 400 });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "invalid password or email" },
                { status: 404 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "invalid password or email" },
                { status: 404 });
        }
        const token = generateToken(user._id.toString());
        const response = NextResponse.json({ message: "login successful", id: user._id },
            { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });
        response.cookies.set("user_id", user._id.toString(), {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });
        return response;

   } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
}

}