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
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
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
          className="h-12 w-full rounded-[10px] border border-[color:var(--line)] bg-[var(--bg)] px-4 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-soft)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(74,124,89,0.18)]"
        />
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      </div>
      <button type="submit" disabled={!canSubmit} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        Увійти до Norma
      </button>
      <p className="body-text text-sm">
        Ми просто збережемо email у браузері, щоб показати захищений кабінет без зайвого шуму.
      </p>
    </form>
  );
}
