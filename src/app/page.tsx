import Link from "next/link";

const problems = [
  {
    title: "Сотні законопроєктів щотижня",
    text: "Неможливо відстежити все вручну без пропусків і зайвого шуму.",
  },
  {
    title: "Юрист коштує дорого",
    text: "Аналіз кожного акта забирає години, які бізнес не хоче витрачати.",
  },
  {
    title: "Пропущена норма = ризик",
    text: "Нові вимоги, штрафи та зміни умов часто з'являються раптово.",
  },
];

const steps = [
  "Опишіть ваш бізнес — ШІ створить профіль моніторингу.",
  "Система щодня сканує ВР, КМУ та міністерства.",
  "О 9:00 отримуєте дайджест тільки по вашій темі.",
];

const features = [
  {
    icon: "🤖",
    title: "ШІ-класифікація",
    text: "Знаходить релевантні акти навіть без ваших слів у назві.",
  },
  {
    icon: "⚡",
    title: "Щоденний дайджест",
    text: "Telegram, email або веб-кабінет — на ваш вибір.",
  },
  {
    icon: "🎯",
    title: "Рекомендована дія",
    text: "Не просто інформація, а підказка, що робити з актом.",
  },
  {
    icon: "📊",
    title: "Тижневе зведення",
    text: "Огляд за тиждень щоп'ятниці о 12:00.",
  },
];

const plans = [
  {
    name: "Free",
    price: "Безкоштовно",
    items: ["1 тема моніторингу", "Тижневий дайджест", "Telegram-бот"],
  },
  {
    name: "Pro",
    price: "49$/міс",
    highlighted: true,
    items: ["До 5 тем", "Щоденний + тижневий дайджест", "Telegram + Email + Кабінет", "Миттєві алерти"],
  },
  {
    name: "Enterprise",
    price: "Від 199$/міс",
    items: ["Необмежені теми", "Команда до 10 осіб", "API доступ", "Пріоритетна підтримка"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-12">
        <header className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-300">Norma</p>
            <p className="mt-1 text-sm text-slate-400">Моніторинг законодавства для бізнесу</p>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-indigo-400/60 hover:text-white"
          >
            Увійти
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-200">
              Бізнес-дайджест законопроєктів України
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-white bg-clip-text text-transparent">
                Norma
              </span>{" "}
              — моніторинг законодавства для вашого бізнесу
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Щодня о 9:00 отримуйте дайджест законопроєктів, які стосуються саме вашої сфери. ШІ
              відсіює нерелевантне — ви бачите тільки важливе.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-[#6366f1] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >
                Спробувати безкоштовно →
              </Link>
              <p className="text-sm text-slate-400">Вже 14 днів безкоштовно • Без кредитної картки</p>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-950/30">
            <p className="text-sm font-medium text-slate-300">Що ви побачите о 9:00</p>
            <div className="mt-6 space-y-4">
              {[
                ["2-5 актів", "Лише релевантні документи по вашій темі"],
                ["Стадія та суть", "Коротко: що змінилось і кого це зачіпає"],
                ["Дія", "Що варто зробити: стежити, готувати позицію чи консультуватися"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-base font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Проблема</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Чому бізнес втрачає зміни</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-14">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Як це працює</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-medium text-indigo-300">Крок {index + 1}</p>
                <p className="mt-4 text-lg leading-8 text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-14">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Фічі</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-2xl">{feature.icon}</p>
                <p className="mt-4 text-lg font-semibold text-white">{feature.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-14">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Тарифи</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-indigo-300 bg-indigo-500/10 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-300/40"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xl font-semibold text-white">{plan.name}</p>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-indigo-300/60 bg-indigo-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                      Популярний
                    </span>
                  ) : (
                    <p className="text-sm font-medium text-slate-400">{plan.price}</p>
                  )}
                </div>
                {plan.highlighted ? <p className="mt-3 text-sm font-medium text-indigo-200">{plan.price}</p> : null}
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="rounded-3xl border border-indigo-400/30 bg-indigo-500/10 px-6 py-10 sm:px-10">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">CTA</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Почніть моніторинг сьогодні</h2>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-[#6366f1] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >
                Спробувати 14 днів безкоштовно
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Norma © 2026</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="transition hover:text-slate-300">
              Політика конфіденційності
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Умови використання
            </a>
            <a
              href="https://t.me/norma_law_bot"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-300 transition hover:text-indigo-200"
            >
              @norma_law_bot
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
