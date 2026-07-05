"use client";

import { useRouter } from "next/navigation";
import { clearStoredJwt } from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearStoredJwt();
    router.push("/login");
  };

  return (
    <button type="button" onClick={handleLogout} className="btn-secondary px-4 py-2 text-sm">
      Вийти
    </button>
  );
}
