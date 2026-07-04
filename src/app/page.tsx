import Image from "next/image";
import Link from "next/link";
import { CalendarClock, FileBarChart, ScanSearch, Target } from "lucide-react";
import { Reveal } from "@/components/reveal";

const problems = [
  {
    number: "01",
    title: "Сотні законопроєктів щотижня",
    text: "Ручний моніторинг розпорошує увагу команди й легко пропускає важливі зміни у профільних актах.",
  },
  {
    number: "02",
    title: "Юрист коштує дорого",
    text: "Повний аналіз кожного документа відбирає години, які бізнес не хоче витрачати на первинний відбір.",
  },
  {
    number: "03",
    title: "Пропущена норма = ризик",
    text: "Нові вимоги, дедлайни та штрафні механіки часто з'являються тихо, але впливають швидко.",
  },
];

const steps = [
  {
    number: "01",
    title: "Опишіть бізнес",
    text: "ШІ створює профіль моніторингу за коротким описом компанії, продуктів і регуляторного поля.",
  },
  {
    number: "02",
    title: "Система сканує джерела",
    text: "Щодня відстежуються ВР, КМУ та профільні міністерства, а нерелевантне відсіюється ще до дайджесту.",
  },
  {
    number: "03",
    title: "О 9:00 ви вже в курсі",
    text: "Отримуєте короткий випуск по своїй темі з тим, що справді варто знати сьогодні.",
  },
];

const features = [
  {
    icon: ScanSearch,
    title: "ШІ-класифікація",
    text: "Знаходить релевантні акти навіть тоді, коли у назві немає ваших ключових слів.",
  },
  {
    icon: CalendarClock,
    title: "Щоденний дайджест",
    text: "Telegram, email або веб-кабінет — вибираєте канал під звичний робочий ритм.",
  },
  {
    icon: Target,
    title: "Рекомендована дія",
    text: "Кожен акт має зрозумілу підказку: без дій, взяти на контроль або готувати позицію.",
  },
  {
    icon: FileBarChart,
    title: "Тижневе зведення",
    text: "Щоп'ятниці о 12:00 бачите рух по темі, нові ризики та акти на горизонті.",
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    items: ["1 тема моніторингу", "Тижневий дайджест", "Telegram-бот"],
    cta: "Обрати Free",
    variant: "outline",
  },
  {
    name: "Pro",
    price: "49",
    items: ["До 5 тем", "Щоденний + тижневий дайджест", "Telegram + Email + Кабінет", "Миттєві алерти"],
    cta: "Почати Pro",
    variant: "solid",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "199",
    items: ["Необмежені теми", "Команда до 10 осіб", "API доступ", "Пріоритетна підтримка"],
    cta: "Зв'язатися",
    variant: "outline",
  },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[28px] leading-tight text-[var(--ink)] md:text-[36px]">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-[17px] leading-6 text-[var(--ink-soft)]">{text}</p>
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="Norma"
        width={compact ? 112 : 144}
        height={compact ? 112 : 144}
        className={compact ? "h-7 w-auto object-contain grayscale opacity-80" : "h-9 w-auto object-contain"}
        priority
      />
      <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--ink)]">Norma</span>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4 border-b border-[color:var(--line)] pb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">Останній дайджест</p>
          <p className="mt-2 font-display text-[22px] leading-tight text-[var(--ink)]">На сьогодні</p>
        </div>
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          Опрацьовується в комітеті
        </span>
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)]">№ 15344</p>
          <p className="mt-1 font-display text-[22px] leading-tight text-[var(--ink)]">
            Хмарні послуги та центри обробки даних
          </p>
        </div>
        <p className="text-[17px] leading-6 text-[var(--ink-soft)]">
          Передає регуляторні функції до Мінцифри, уточнює вимоги до реєстрів і змінює підхід до договорів.
        </p>
        <div className="grid gap-3 rounded-[12px] bg-[var(--bg-soft)] p-4">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[var(--ink-soft)]">Стадія</span>
            <span className="font-medium text-[var(--ink)]">Опрацьовується в комітеті</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[var(--ink-soft)]">Дія</span>
            <span className="font-medium text-[var(--accent)]">Взяти на контроль</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(250,249,246,0.88)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm text-[var(--ink-soft)] transition hover:text-[var(--accent)]" href="#how-it-works">
              Як це працює
            </a>
            <a className="text-sm text-[var(--ink-soft)] transition hover:text-[var(--accent)]" href="#pricing">
              Тарифи
            </a>
          </nav>
          <Link
            href="/login"
            className="rounded-[6px] border border-[color:var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Увійти
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,640px)_minmax(320px,440px)] lg:items-start lg:gap-16 lg:py-24">
            <div className="max-w-[640px]">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                МОНІТОРИНГ ЗАКОНОДАВСТВА
              </p>
              <h1 className="mt-4 max-w-[12ch] font-display text-[36px] leading-[1.1] text-[var(--ink)] md:text-[56px]">
                Законодавство змінюється щодня. Ви дізнаєтесь першим.
              </h1>
              <p className="mt-6 max-w-[36rem] text-[17px] leading-6 text-[var(--ink-soft)] md:text-[18px] md:leading-7">
                Щодня о 9:00 отримуйте дайджест законопроєктів, які стосуються саме вашої сфери.
                ШІ відсіює нерелевантне, щоб ви бачили тільки важливе.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/login"
                  className="rounded-[6px] bg-[var(--ink)] px-6 py-3 text-base font-medium text-[var(--bg)] transition hover:bg-[var(--accent)]"
                >
                  Спробувати безкоштовно
                </Link>
                <Link href="#how-it-works" className="text-base text-[var(--ink)] transition hover:text-[var(--accent)]">
                  Як це працює ↓
                </Link>
              </div>
              <p className="mt-4 text-sm text-[var(--ink-soft)]">14 днів безкоштовно · Без кредитної картки</p>
            </div>

            <HeroPreview />
          </section>
        </Reveal>
      </div>

      <section className="border-y border-[color:var(--line)] bg-[var(--bg)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Проблема"
              title="Шуму багато. Ризик з'являється вчасно лише тоді, коли ви його вже бачите."
              text="Поточний ритм законодавчих змін надто щільний для ручного відстеження. Norma звужує потік до релевантних актів і залишає тільки те, що варте уваги бізнесу."
            />
          </Reveal>

          <div className="mt-10 grid gap-0 md:grid-cols-3 md:border-t md:border-[color:var(--line)]">
            {problems.map((item, index) => (
              <Reveal key={item.number} delay={index * 80} className={index > 0 ? "md:border-l md:border-[color:var(--line)] md:pl-8 md:pr-4" : "md:pr-8"}>
                <article className="py-6">
                  <p className="font-display text-[24px] text-[var(--accent)]">{item.number}</p>
                  <h3 className="mt-4 font-display text-[22px] leading-tight text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-[17px] leading-6 text-[var(--ink-soft)]">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[var(--bg-soft)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Як це працює"
              title="Три кроки — і у вас готовий моніторинг без зайвої бюрократії."
              text="Від опису бізнесу до щоденного дайджесту — весь процес зібраний у короткий і зрозумілий ланцюжок."
            />
          </Reveal>

          <div className="relative mt-12 grid gap-8 lg:grid-cols-3 lg:gap-12 lg:before:absolute lg:before:left-8 lg:before:right-8 lg:before:top-6 lg:before:h-px lg:before:bg-[color:var(--line)]">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 90} className="relative">
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)] bg-[var(--bg-soft)] font-display text-[18px] text-[var(--accent)]">
                    {step.number}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-[22px] text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-3 max-w-sm text-[17px] leading-6 text-[var(--ink-soft)]">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Фічі"
              title="П’ять відчуттів преміального консалтингу, але без зайвого тиску."
              text="ШІ бере на себе первинний відбір, а ви отримуєте короткі й зрозумілі сигнали для дій."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 70}>
                  <article className="group h-full rounded-[10px] border border-[color:var(--line)] bg-white p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,22,26,0.08)]">
                    <Icon size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                    <h3 className="mt-6 font-display text-[22px] text-[var(--ink)]">{feature.title}</h3>
                    <p className="mt-3 text-[17px] leading-6 text-[var(--ink-soft)]">{feature.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[var(--bg)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Тарифи"
              title="Прозора вартість, зрозумілий вибір і жодної зайвої складності."
              text="Почніть із безкоштовного рівня, а коли моніторинг стане частиною робочого ритму — переходьте на Pro."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const isPro = plan.highlighted;
              return (
                <Reveal key={plan.name} delay={index * 80}>
                  <article
                    className={`flex h-full flex-col rounded-[10px] border bg-white p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,22,26,0.08)] ${
                      isPro ? "border-[1.5px] border-[var(--accent)]" : "border-[color:var(--line)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-[24px] text-[var(--ink)]">{plan.name}</p>
                        {isPro ? (
                          <span className="mt-3 inline-flex rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                            Рекомендуємо
                          </span>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <div className="font-display text-[40px] leading-none text-[var(--ink)]">{plan.price}</div>
                        <div className="mt-1 text-sm text-[var(--ink-soft)]">$/міс</div>
                      </div>
                    </div>

                    <ul className="mt-7 space-y-3 text-[17px] leading-6 text-[var(--ink-soft)]">
                      {plan.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        href="/login"
                        className={`inline-flex h-12 items-center justify-center rounded-[6px] px-5 text-sm font-medium transition ${
                          plan.variant === "solid"
                            ? "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)]"
                            : "border border-[var(--ink)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[16px] bg-[var(--ink)] px-6 py-12 text-[var(--bg)] sm:px-10 lg:px-12 lg:py-14">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[rgba(250,249,246,0.74)]">
                Преміальний старт
              </p>
              <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <h2 className="font-display text-[32px] leading-tight md:text-[44px]">
                    Почніть моніторинг сьогодні
                  </h2>
                  <p className="mt-4 max-w-2xl text-[17px] leading-6 text-[rgba(250,249,246,0.8)]">
                    Оберіть тему, налаштуйте канали і вже завтра отримайте перший випуск у зрозумілому,
                    короткому форматі.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[var(--accent)] px-6 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]"
                >
                  Спробувати 14 днів безкоштовно
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[color:var(--line)] bg-[var(--bg)] py-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Logo compact />
            <span className="text-sm text-[var(--ink-soft)]">Norma © 2026</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--ink-soft)]">
            <a href="https://t.me/norma_law_bot" target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent)]">
              @norma_law_bot
            </a>
            <a href="#" className="transition hover:text-[var(--accent)]">
              Політика конфіденційності
            </a>
            <a href="#" className="transition hover:text-[var(--accent)]">
              Умови використання
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
