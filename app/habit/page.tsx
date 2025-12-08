
// import MainBody from '@/components/MainBody';
// import Navbar from '../../components/Navbar';



// export default function Habit() {
//   return (
//     <div>
//       <Navbar/>
      
//       <MainBody/>

      
    
//     </div>
//   );
// }


// app/habit/page.tsx
import Navbar from "@/components/Navbar";
import MainBody from "@/components/MainBody";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

// what your token contains
interface JwtPayload {
  user_id: string;
}

export default async function Habit() {
  // 1) read cookies on server
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;

  // 2) no token → go to login
  if (!token) {
    redirect("/login");
  }

  // 3) verify token
  let userId: string;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    userId = decoded.user_id;
  } catch (err) {
    console.error("INVALID TOKEN IN PAGE:", err);
    // invalid/expired token → force login
    redirect("/login");
  }

  // 4) now userId is safe, you can pass to components
  return (
    <div>
     <Navbar userId={userId} />

      <MainBody/>
    </div>
  );
}
