import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-site flex min-h-screen items-center py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.9fr]">
          <section className="max-w-2xl">
            <Link href="/" className="num-display text-xs uppercase tracking-[0.2em] text-[var(--ink)]">
              NORMA
            </Link>
            <h1 className="h-display h1 mt-6">Увійдіть, щоб налаштувати моніторинг під ваш бізнес</h1>
            <p className="body-text mt-5 max-w-xl md:text-[18px]">
              Один email, і ви зможете побачити свій кабінет, теми, дайджести та розклад без зайвої бюрократії.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Без кредитної картки",
                "14 днів безкоштовно",
                "Telegram та email",
                "Щоденні оновлення о 9:00",
              ].map((item) => (
                <div key={item} className="rounded-[10px] border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink-soft)]">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="eyebrow">Вхід через email</p>
            <h2 className="h-display h2 mt-3">Почати з Norma</h2>
            <div className="mt-6">
              <AuthForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
