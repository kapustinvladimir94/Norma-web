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
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400/60 hover:text-white"
    >
      Вийти
    </button>
  );
}
