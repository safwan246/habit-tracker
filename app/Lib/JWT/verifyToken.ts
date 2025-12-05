import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function verifyToken(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader || !cookieHeader.includes("token=")) {
    return null; // no token
  }

  const token = cookieHeader
    .split("token=")[1]
    .split(";")[0]
    .trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
    };

    return decoded; // { user_id }
  } catch {
    return null; 
  }
}
