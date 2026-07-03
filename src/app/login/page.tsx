import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.9fr]">
          <section className="max-w-2xl">
            <Link href="/" className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-300">
              Norma
            </Link>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Увійдіть, щоб налаштувати моніторинг під ваш бізнес
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Один email, і ви зможете побачити свій кабінет, теми, дайджести та розклад без
              зайвої бюрократії.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Без кредитної картки",
                "14 днів безкоштовно",
                "Telegram та email",
                "Щоденні оновлення о 9:00",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-950/30 sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Вхід через email</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Почати з Norma</h2>
            <div className="mt-6">
              <AuthForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
