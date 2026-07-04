import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

const stats = [
  { label: "Теми моніторингу", value: "1" },
  { label: "Дайджест сьогодні", value: "09:00" },
  { label: "Тижневий дайджест", value: "П'ятниця 12:00" },
  { label: "Канал", value: "Telegram + Email" },
];

const topics = ["Регулювання ІТ-бізнесу", "Дія.City та цифрові послуги"];

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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-site py-8">
        <header className="flex flex-col gap-6 border-b border-[color:var(--line)] pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="num-display text-xs uppercase tracking-[0.2em] text-[var(--accent)]">NORMA</p>
            <h1 className="h-display h2 mt-2">Особистий кабінет</h1>
            <p className="body-text mt-2 text-sm">Вхід виконано як {email}</p>
          </div>
          <LogoutButton />
        </header>

        <section className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[10px] border border-[color:var(--line)] bg-white p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm text-[var(--ink-soft)]">{stat.label}</p>
              <p className="num-display mt-2 text-2xl text-[var(--ink)]">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">Мої теми</p>
            <div className="mt-5 space-y-3">
              {topics.map((topic) => (
                <div key={topic} className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] px-4 py-3">
                  <p className="font-medium text-[var(--ink)]">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">Останні події</p>
            <div className="mt-5 space-y-4">
              {recent.map((item) => (
                <div key={item.title} className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-4">
                  <p className="h-display h3">{item.title}</p>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.stage}</p>
                  <p className="mt-1 text-sm text-[var(--accent)]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
