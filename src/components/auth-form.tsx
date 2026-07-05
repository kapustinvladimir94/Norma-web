"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetchJson, clearStoredJwt, getStoredJwt, setStoredJwt } from "@/lib/api";

type AuthCodeResponse = {
  access_token: string;
  token_type: string;
};

function normalizeCode(value: string): string {
  return value.replace(/\D/g, "").slice(0, 6);
}

export function AuthForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    const existing = getStoredJwt();
    if (!existing) {
      return;
    }

    const bootstrap = async () => {
      try {
        await apiFetchJson("/api/me", {}, existing);
        router.replace("/dashboard");
      } catch {
        clearStoredJwt();
      }
    };

    void bootstrap();
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = normalizeCode(code);
    if (cleaned.length !== 6) {
      setError("Код має містити 6 цифр.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const response = await apiFetchJson<AuthCodeResponse>("/api/auth/code", {
        method: "POST",
        body: JSON.stringify({ code: cleaned }),
      });
      setStoredJwt(response.access_token);
      router.replace("/dashboard");
    } catch (error_) {
      const message = error_ instanceof ApiError ? error_.message : "Не вдалося увійти.";
      setError(message);
      clearStoredJwt();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
          6-значний код
        </label>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={code}
          onChange={(event) => {
            setCode(normalizeCode(event.target.value));
            if (error) {
              setError("");
            }
          }}
          placeholder="123456"
          className="h-12 w-full rounded-[10px] border border-[color:var(--line)] bg-[var(--bg)] px-4 tracking-[0.4em] text-[var(--ink)] outline-none transition placeholder:tracking-normal placeholder:text-[var(--ink-soft)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(74,124,89,0.18)]"
        />
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      </div>
      <button type="submit" disabled={!canSubmit || busy} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? "Вхід..." : "Увійти"}
      </button>
      <p className="body-text text-sm">
        Ваш код з Telegram активний 10 хвилин. Якщо він прострочений, натисніть <span className="font-medium text-[var(--ink)]">/login</span> ще раз у боті @norma_law_bot.
      </p>
    </form>
  );
}
