// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ message: "Logged out" });

//   res.cookies.set("token", "", {
//     httpOnly: true,
//     expires: new Date(0),
//     path: "/",
//   });

//   return res;
// }

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // clear token
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  // clear user_id too (optional but cleaner)
  res.cookies.set("user_id", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return res;
}
