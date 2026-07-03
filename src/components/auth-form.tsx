"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const canSubmit = useMemo(() => isValidEmail(email), [email]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = email.trim().toLowerCase();
    if (!isValidEmail(cleaned)) {
      setError("Введіть коректну email-адресу.");
      return;
    }
    document.cookie = `norma_auth_email=${encodeURIComponent(cleaned)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          placeholder="you@company.com"
          className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        />
        {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-indigo-500 px-5 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        Увійти до Norma
      </button>
      <p className="text-sm leading-6 text-slate-400">
        Ми просто збережемо email у браузері, щоб показати захищений кабінет без зайвого шуму.
      </p>
    </form>
  );
}
