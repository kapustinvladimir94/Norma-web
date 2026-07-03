import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

const stats = [
  { label: "Теми моніторингу", value: "1" },
  { label: "Дайджест сьогодні", value: "09:00" },
  { label: "Тижневий дайджест", value: "П'ятниця 12:00" },
  { label: "Канал", value: "Telegram + Email" },
];

const topics = [
  "Регулювання ІТ-бізнесу",
  "Дія.City та цифрові послуги",
];

const recent = [
  {
    title: "Про хмарні послуги та центри обробки даних",
    note: "Взяти на контроль",
    stage: "Опрацьовується в комітеті",
  },
  {
    title: "Криміналізація шахрайства з використанням ІКС та ШІ",
    note: "Обговорити з юристами",
    stage: "Опрацьовується в комітеті",
  },
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("norma_auth_email")?.value;

  if (!email) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Norma</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Особистий кабінет</h1>
            <p className="mt-2 text-sm text-slate-400">Вхід виконано як {email}</p>
          </div>
          <LogoutButton />
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Мої теми</p>
            <div className="mt-5 space-y-3">
              {topics.map((topic) => (
                <div key={topic} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="font-medium text-white">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Останні події</p>
            <div className="mt-5 space-y-4">
              {recent.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.stage}</p>
                  <p className="mt-1 text-sm text-indigo-300">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
