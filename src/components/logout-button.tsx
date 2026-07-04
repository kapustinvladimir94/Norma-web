"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "norma_auth_email=; Path=/; Max-Age=0; SameSite=Lax";
    router.push("/login");
    router.refresh();
  };

  return (
    <button type="button" onClick={handleLogout} className="btn-secondary px-4 py-2 text-sm">
      Вийти
    </button>
  );
}
