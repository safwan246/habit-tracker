"use client";

import { useRouter } from "next/navigation";


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
