"use client"

import { useRouter } from "next/navigation";

export default function LogoutBtn() {
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

  return (
    <div className="flex flex-col justify-center items-center">
      <button 
        onClick={handleLogout} 
        className="px-4 py-2 border-2 border-black font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
      >
        Logout
      </button>
    </div>
  );
}
