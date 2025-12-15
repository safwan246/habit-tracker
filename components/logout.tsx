"use client"

import { useRouter } from "next/navigation";

export default function LogoutBtn(){
    const router = useRouter();
    
const handleLogout = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

  
    router.push("/login");  
    router.refresh();        
  } catch (err) {
    console.error(err);
    alert("Error logging out");
  }
};

    return(
        <div className="flex flex-col justify-center items-center text-gray-500 font-medium hover:bg-orange-50 px-4 py-2 ">
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}
