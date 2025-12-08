import { useRouter } from "next/navigation";

// inside component:
const router = useRouter();

const handleLogout = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    // after cookies cleared on server
    router.push("/login");   // change path if your login route is different
    router.refresh();        // optional
  } catch (err) {
    console.error(err);
    alert("Error logging out");
  }
};
