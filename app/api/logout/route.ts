import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });


  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });


  res.cookies.set("user_id", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return res;
}
