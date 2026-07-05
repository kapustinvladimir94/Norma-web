"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ApiError, apiFetchJson, clearStoredJwt, getStoredJwt } from "@/lib/api";
import { LogoutButton } from "@/components/logout-button";
import { Reveal } from "@/components/reveal";

type TabKey = "digests" | "feed" | "watchlist" | "topics";

type MeResponse = {
  user_tg_id: string;
  topics_count: number;
};

type DigestItem = {
  id: number;
  digest_type: string;
  period_start: string;
  period_end: string;
  content: string;
  sent_at: string;
};

type CardSummary = {
  summary?: string | null;
  affected_detail?: string | null;
  risks?: string[];
  opportunities?: string[];
  deadlines?: string | null;
  stage_note?: string | null;
  effective_date?: string | null;
  effective_date_note?: string | null;
};

type FeedItem = {
  document_id: number;
  number: string | null;
  title: string | null;
  current_stage: string | null;
  relevance: number;
  reason: string | null;
  card: CardSummary | null;
  source_url: string | null;
  updated_at: string | null;
};

type WatchlistItem = {
  document_id: number;
  number: string | null;
  title: string | null;
  current_stage: string | null;
};

type TopicItem = {
  id: number;
  user_tg_id: string;
  name: string;
  keywords: string[];
  marker_norms: string[];
  prompt_description: string;
  created_at: string;
};

type DashboardData = {
  me: MeResponse;
  digests: DigestItem[];
  feed: FeedItem[];
  watchlist: WatchlistItem[];
  topics: TopicItem[];
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "digests", label: "Дайджести" },
  { key: "feed", label: "Стрічка" },
  { key: "watchlist", label: "Watchlist" },
  { key: "topics", label: "Теми" },
];

function titleCaseDigestType(digestType: string): string {
  if (digestType === "weekly") return "Тижневий";
  if (digestType === "monthly") return "Місячний";
  return "Щоденний";
}

function formatDate(dateValue: string | null | undefined): string {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatDateTime(dateValue: string | null | undefined): string {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function digestPreview(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("---"));
  return lines.slice(0, 2).join(" ");
}

function relevanceDotClass(relevance: number): string {
  if (relevance >= 5) return "bg-[var(--accent)]";
  if (relevance === 4) return "border border-[var(--accent)] bg-transparent";
  return "bg-[var(--ink-soft)]";
}

function relevanceLabel(relevance: number): string {
  if (relevance >= 5) return "5";
  if (relevance === 4) return "4";
  return "3";
}

function stageClass(stage: string | null | undefined): string {
  if (!stage) return "bg-[var(--bg-soft)] text-[var(--ink-soft)]";
  return "bg-[var(--bg-soft)] text-[var(--ink)]";
}

function LoadingCard() {
  return <div className="h-32 animate-pulse rounded-[10px] border border-[color:var(--line)] bg-white/60" />;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-display h2 mt-3">{title}</h2>
      {text ? <p className="body-text mt-4 max-w-xl">{text}</p> : null}
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-dashboard">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export function DashboardClient() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("digests");
  const [expandedDigestId, setExpandedDigestId] = useState<number | null>(null);
  const [busyTopicId, setBusyTopicId] = useState<number | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [topicDescription, setTopicDescription] = useState("");
  const [topicError, setTopicError] = useState("");
  const [topicBusy, setTopicBusy] = useState(false);
  const [createdTopic, setCreatedTopic] = useState<TopicItem | null>(null);

  const loadData = async (authToken: string) => {
    const [me, digests, feed, watchlist, topics] = await Promise.all([
      apiFetchJson<MeResponse>("/api/me", {}, authToken),
      apiFetchJson<DigestItem[]>("/api/digests?limit=20", {}, authToken),
      apiFetchJson<FeedItem[]>("/api/feed?days=7", {}, authToken),
      apiFetchJson<WatchlistItem[]>("/api/watchlist", {}, authToken),
      apiFetchJson<TopicItem[]>("/api/topics", {}, authToken),
    ]);
    setData({ me, digests, feed, watchlist, topics });
  };

  useEffect(() => {
    const existing = getStoredJwt();
    if (!existing) {
      router.replace("/login");
      return;
    }
    setToken(existing);
    void (async () => {
      try {
        await loadData(existing);
      } catch (error_) {
        clearStoredJwt();
        router.replace("/login");
        if (error_ instanceof ApiError) {
          setError(error_.message);
        } else {
          setError("Не вдалося завантажити кабінет.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const summary = useMemo(() => {
    return {
      digests: data?.digests.length ?? 0,
      feed: data?.feed.length ?? 0,
      watchlist: data?.watchlist.length ?? 0,
      topics: data?.topics.length ?? 0,
    };
  }, [data]);

  const reload = async () => {
    if (!token) return;
    try {
      await loadData(token);
      setError("");
    } catch (error_) {
      if (error_ instanceof ApiError && error_.status === 401) {
        clearStoredJwt();
        router.replace("/login");
        return;
      }
      setError(error_ instanceof ApiError ? error_.message : "Не вдалося оновити дані.");
    }
  };

  const handleAddTopic = async () => {
    if (!token || !topicDescription.trim()) {
      setTopicError("Опишіть бізнес у кількох реченнях.");
      return;
    }
    setTopicBusy(true);
    setTopicError("");
    try {
      const created = await apiFetchJson<TopicItem>(
        "/api/topics",
        {
          method: "POST",
          body: JSON.stringify({ description: topicDescription.trim() }),
        },
        token,
      );
      setCreatedTopic(created);
      setTopicDescription("");
      await reload();
    } catch (error_) {
      if (error_ instanceof ApiError && error_.status === 401) {
        clearStoredJwt();
        router.replace("/login");
        return;
      }
      setTopicError(error_ instanceof ApiError ? error_.message : "Не вдалося створити тему.");
    } finally {
      setTopicBusy(false);
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    if (!token) return;
    if (typeof window !== "undefined" && !window.confirm("Видалити цю тему?")) {
      return;
    }
    setBusyTopicId(topicId);
    try {
      await apiFetchJson<{ status: string }>(`/api/topics/${topicId}`, { method: "DELETE" }, token);
      await reload();
      if (createdTopic?.id === topicId) {
        setCreatedTopic(null);
      }
    } catch (error_) {
      if (error_ instanceof ApiError && error_.status === 401) {
        clearStoredJwt();
        router.replace("/login");
        return;
      }
      setError(error_ instanceof ApiError ? error_.message : "Не вдалося видалити тему.");
    } finally {
      setBusyTopicId(null);
    }
  };

  const handleWatchlistRemove = async (documentId: number) => {
    if (!token) return;
    try {
      await apiFetchJson<{ status: string }>(`/api/watchlist/${documentId}`, { method: "DELETE" }, token);
      await reload();
    } catch (error_) {
      if (error_ instanceof ApiError && error_.status === 401) {
        clearStoredJwt();
        router.replace("/login");
        return;
      }
      setError(error_ instanceof ApiError ? error_.message : "Не вдалося прибрати зі списку.");
    }
  };

  const tabsMarkup = (
    <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveTab(tab.key)}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            activeTab === tab.key
              ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
              : "border-[color:var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="container-site py-6 lg:py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="hidden rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)] lg:block">
              <LoadingCard />
            </aside>
            <div className="space-y-4">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="container-site flex min-h-screen items-center py-16">
          <div className="max-w-xl rounded-[16px] border border-[color:var(--line)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">ПОМИЛКА</p>
            <h1 className="h-display h2 mt-3">Не вдалося відкрити кабінет</h1>
            <p className="body-text mt-4">{error}</p>
            <button type="button" onClick={() => router.replace("/login")} className="btn-primary mt-8">
              Повернутися до входу
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentTab = tabs.find((item) => item.key === activeTab)?.label ?? "Дайджести";

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-site py-6 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="sticky top-6 hidden h-fit rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)] lg:block">
            <div className="border-b border-[color:var(--line)] pb-5">
              <p className="num-display text-xs uppercase tracking-[0.2em] text-[var(--accent)]">NORMA</p>
              <h1 className="h-display h2 mt-3">Кабінет</h1>
              <p className="body-text mt-2 text-sm">user_tg_id: {data?.me.user_tg_id}</p>
            </div>

            <nav className="mt-6 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex w-full items-center justify-between rounded-[10px] border px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.key
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                      : "border-[color:var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--accent)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-xs text-current/70">{summary[tab.key] ?? ""}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 rounded-[10px] bg-[var(--bg-soft)] p-4">
              <p className="text-sm text-[var(--ink-soft)]">Тем</p>
              <p className="num-display mt-1 text-2xl text-[var(--ink)]">{summary.topics}</p>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">Вхід прив'язаний до коду з Telegram і працює через JWT.</p>
            </div>

            <div className="mt-6">
              <LogoutButton />
            </div>
          </aside>

          <section className="space-y-6">
            <div className="lg:hidden">
              <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-5 shadow-[var(--shadow-soft)]">
                <p className="num-display text-xs uppercase tracking-[0.2em] text-[var(--accent)]">NORMA</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h1 className="h-display h2">Кабінет</h1>
                    <p className="body-text mt-1 text-sm">user_tg_id: {data?.me.user_tg_id}</p>
                  </div>
                  <LogoutButton />
                </div>
              </div>
              <div className="mt-4">{tabsMarkup}</div>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-end justify-between gap-6 rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <div>
                  <p className="eyebrow">ПРОСТІР NORMA</p>
                  <h2 className="h-display h2 mt-3">{currentTab}</h2>
                  <p className="body-text mt-3 max-w-2xl">
                    Дайджести, стрічка, watchlist і теми зібрані в одному кабінеті з живим JWT-входом через API.
                  </p>
                </div>
                <div className="flex gap-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        activeTab === tab.key
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                          : "border-[color:var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : null}

            {activeTab === "digests" ? (
              <div className="space-y-6">
                <SectionTitle
                  eyebrow="ДАЙДЖЕСТИ"
                  title="Останні випуски"
                  text="Кожен випуск можна розгорнути і прочитати в тій же типографіці, що й на лендінгу."
                />
                {data?.digests.length ? (
                  <div className="space-y-4">
                    {data.digests.map((digest) => {
                      const expanded = expandedDigestId === digest.id;
                      return (
                        <Reveal key={digest.id}>
                          <article className="rounded-[10px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
                            <button
                              type="button"
                              onClick={() => setExpandedDigestId(expanded ? null : digest.id)}
                              className="flex w-full items-start justify-between gap-4 text-left"
                            >
                              <div>
                                <p className="text-sm text-[var(--ink-soft)]">{formatDate(digest.sent_at)}</p>
                                <h3 className="h-display h3 mt-2">{digestPreview(digest.content)}</h3>
                              </div>
                              <span className="rounded-full bg-[var(--bg-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                                {titleCaseDigestType(digest.digest_type)}
                              </span>
                            </button>
                            {expanded ? (
                              <div className="mt-5 border-t border-[color:var(--line)] pt-5">
                                <MarkdownContent content={digest.content} />
                              </div>
                            ) : null}
                          </article>
                        </Reveal>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
                    <p className="h-display h3">Дайджестів поки немає</p>
                    <p className="body-text mt-3">Перший прийде о 9:00.</p>
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === "feed" ? (
              <div className="space-y-6">
                <SectionTitle
                  eyebrow="СТРІЧКА"
                  title="Акти, які стосуються вашої теми"
                  text="Клік відкриває повну картку акта з ризиками, можливостями та посиланням на ВР."
                />
                {data?.feed.length ? (
                  <div className="space-y-4">
                    {data.feed.map((item) => (
                      <Reveal key={item.document_id}>
                        <Link
                          href={`/dashboard/act/${item.document_id}`}
                          className="block rounded-[10px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
                        >
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className={`h-2.5 w-2.5 rounded-full ${relevanceDotClass(item.relevance)}`} />
                                <span className="num-display text-sm uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                                  №{item.number || item.document_id}
                                </span>
                                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${stageClass(item.current_stage)}`}>
                                  {item.current_stage || "Стадія невідома"}
                                </span>
                                <span className="rounded-full bg-[var(--bg-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                                  {relevanceLabel(item.relevance)}/5
                                </span>
                              </div>
                              <h3 className="h-display h3 mt-4">{item.title}</h3>
                              <p className="body-text mt-3 max-h-12 overflow-hidden max-w-3xl">{item.reason}</p>
                            </div>
                            <div className="text-sm text-[var(--ink-soft)]">
                              <p>Оновлено</p>
                              <p className="mt-1">{formatDateTime(item.updated_at)}</p>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
                    <p className="h-display h3">Стрічка поки порожня</p>
                    <p className="body-text mt-3">Коли з'являться релевантні акти, вони тут одразу з'являться.</p>
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === "watchlist" ? (
              <div className="space-y-6">
                <SectionTitle
                  eyebrow="WATCHLIST"
                  title="Акти, за якими ви стежите"
                  text="Окрема точка уваги для документів, які треба тримати під рукою незалежно від relevance."
                />
                {data?.watchlist.length ? (
                  <div className="space-y-4">
                    {data.watchlist.map((item) => (
                      <Reveal key={item.document_id}>
                        <article className="rounded-[10px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="num-display text-sm uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                                №{item.number || item.document_id}
                              </p>
                              <h3 className="h-display h3 mt-2">{item.title}</h3>
                              <p className="body-text mt-2 text-sm">{item.current_stage || "Стадія невідома"}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void handleWatchlistRemove(item.document_id)}
                              className="btn-secondary"
                            >
                              Прибрати
                            </button>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
                    <p className="h-display h3">Watchlist порожній</p>
                    <p className="body-text mt-3">Додайте акт зі стрічки або з картки документа.</p>
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === "topics" ? (
              <div className="space-y-6">
                <SectionTitle
                  eyebrow="ТЕМИ"
                  title="Ваші персональні теми"
                  text="Опишіть бізнес — Norma згенерує ключові слова і збереже тему через API."
                />

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
                    <label htmlFor="topic-description" className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
                      Опишіть бізнес
                    </label>
                    <textarea
                      id="topic-description"
                      rows={6}
                      value={topicDescription}
                      onChange={(event) => {
                        setTopicDescription(event.target.value);
                        if (topicError) setTopicError("");
                      }}
                      placeholder="Наприклад: ІТ-компанія, SaaS-продукт, експортуємо послуги, працюємо з Дія.City..."
                      className="w-full rounded-[10px] border border-[color:var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-soft)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(74,124,89,0.18)]"
                    />
                    {topicError ? <p className="mt-2 text-sm text-red-700">{topicError}</p> : null}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="button" onClick={handleAddTopic} disabled={topicBusy} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                        {topicBusy ? "Створюємо..." : "Додати тему"}
                      </button>
                      <button type="button" onClick={() => setTopicDescription("")} className="btn-secondary">
                        Очистити
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {createdTopic ? (
                      <article className="rounded-[10px] border border-[var(--accent)] bg-white p-6 shadow-[var(--shadow-soft)]">
                        <p className="eyebrow">ЗГЕНЕРОВАНО</p>
                        <h3 className="h-display h3 mt-3">{createdTopic.name}</h3>
                        <p className="body-text mt-4 text-sm">
                          {createdTopic.keywords.slice(0, 10).join(", ")}
                          {createdTopic.keywords.length > 10 ? ` … і ще ${createdTopic.keywords.length - 10}` : ""}
                        </p>
                        <p className="body-text mt-3 text-sm">{createdTopic.prompt_description}</p>
                      </article>
                    ) : null}

                    <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-4 text-sm text-[var(--ink-soft)]">
                      Тут з'явиться нова тема після збереження. Видалення доступне з підтвердженням.
                    </div>
                  </div>
                </div>

                {data?.topics.length ? (
                  <div className="space-y-4">
                    {data.topics.map((topic) => (
                      <Reveal key={topic.id}>
                        <article className="rounded-[10px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0">
                              <h3 className="h-display h3">{topic.name}</h3>
                              <p className="body-text mt-3 text-sm">
                                {topic.keywords.slice(0, 8).join(", ")}
                                {topic.keywords.length > 8 ? ` … і ще ${topic.keywords.length - 8}` : ""}
                              </p>
                              <p className="body-text mt-3 text-sm">{topic.prompt_description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void handleDeleteTopic(topic.id)}
                              disabled={busyTopicId === topic.id}
                              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {busyTopicId === topic.id ? "Видаляємо..." : "Видалити"}
                            </button>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
                    <p className="h-display h3">Теми ще не створено</p>
                    <p className="body-text mt-3">Додайте першу тему в правому блоці.</p>
                  </div>
                )}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
