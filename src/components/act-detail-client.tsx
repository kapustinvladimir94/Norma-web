"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError, apiFetchJson, clearStoredJwt, getStoredJwt } from "@/lib/api";
import { Reveal } from "@/components/reveal";

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

type DocumentPayload = {
  id: number;
  number: string | null;
  title: string | null;
  current_stage: string | null;
  authors: unknown;
  committee: string | null;
  source_url: string | null;
  updated_at: string | null;
  card: CardSummary | null;
};

type WatchlistItem = {
  document_id: number;
};

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

export function ActDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doc, setDoc] = useState<DocumentPayload | null>(null);
  const [watched, setWatched] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const existing = getStoredJwt();
    if (!existing) {
      router.replace("/login");
      return;
    }
    setToken(existing);

    void (async () => {
      try {
        const [document, watchlist] = await Promise.all([
          apiFetchJson<DocumentPayload>(`/api/documents/${id}`, {}, existing),
          apiFetchJson<WatchlistItem[]>("/api/watchlist", {}, existing),
        ]);
        setDoc(document);
        setWatched(watchlist.some((item) => item.document_id === Number(id)));
      } catch (error_) {
        if (error_ instanceof ApiError && error_.status === 401) {
          clearStoredJwt();
          router.replace("/login");
          return;
        }
        setError(error_ instanceof ApiError ? error_.message : "Не вдалося завантажити картку акта.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const heading = useMemo(() => {
    if (!doc) return "Картка акта";
    return doc.number ? `№${doc.number} — ${doc.title ?? "Акт"}` : doc.title ?? "Картка акта";
  }, [doc]);

  const toggleWatch = async () => {
    if (!token || !doc) return;
    setBusy(true);
    try {
      if (watched) {
        await apiFetchJson<{ status: string }>(`/api/watchlist/${doc.id}`, { method: "DELETE" }, token);
        setWatched(false);
      } else {
        await apiFetchJson<{ status: string }>("/api/watchlist", {
          method: "POST",
          body: JSON.stringify({ document_id: doc.id }),
        }, token);
        setWatched(true);
      }
    } catch (error_) {
      if (error_ instanceof ApiError && error_.status === 401) {
        clearStoredJwt();
        router.replace("/login");
        return;
      }
      setError(error_ instanceof ApiError ? error_.message : "Не вдалося оновити watchlist.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="container-site py-8">
          <div className="h-64 animate-pulse rounded-[16px] border border-[color:var(--line)] bg-white" />
        </div>
      </main>
    );
  }

  if (error && !doc) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="container-site py-8">
          <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">КАРТКА АКТА</p>
            <h1 className="h-display h2 mt-3">Не вдалося відкрити документ</h1>
            <p className="body-text mt-4">{error}</p>
            <Link href="/dashboard" className="btn-primary mt-8">
              Назад до кабінету
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-site py-8">
        <Reveal>
          <div className="rounded-[16px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-6 border-b border-[color:var(--line)] pb-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="eyebrow">КАРТКА АКТА</p>
                <h1 className="h-display h2 mt-3">{heading}</h1>
                <p className="body-text mt-3 text-sm">Оновлено: {formatDate(doc?.updated_at)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={toggleWatch} disabled={busy} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {watched ? "У списку ✓" : "Стежити"}
                </button>
                <Link href="/dashboard" className="btn-secondary">
                  Назад
                </Link>
              </div>
            </div>

            {error ? <div className="mt-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              <section className="space-y-6">
                <div>
                  <p className="eyebrow">Суть</p>
                  <p className="body-text mt-3">{doc?.card?.summary || "Немає картки від аналітика."}</p>
                </div>

                <div>
                  <p className="eyebrow">Кого зачіпає</p>
                  <p className="body-text mt-3">{doc?.card?.affected_detail || "Немає даних."}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-5">
                    <p className="eyebrow">Ризики</p>
                    <ul className="mt-4 space-y-3">
                      {(doc?.card?.risks || []).length ? (
                        doc?.card?.risks?.map((item) => (
                          <li key={item} className="body-text text-sm">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="body-text text-sm">Немає даних.</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-5">
                    <p className="eyebrow">Можливості</p>
                    <ul className="mt-4 space-y-3">
                      {(doc?.card?.opportunities || []).length ? (
                        doc?.card?.opportunities?.map((item) => (
                          <li key={item} className="body-text text-sm">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="body-text text-sm">Немає даних.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-5">
                  <p className="eyebrow">Стадія</p>
                  <p className="h-display h3 mt-3">{doc?.current_stage || "Невідома"}</p>
                  <p className="body-text mt-3 text-sm">{doc?.card?.stage_note || "Немає пояснення стадії."}</p>
                </div>

                <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-5">
                  <p className="eyebrow">Дедлайн</p>
                  <p className="body-text mt-3 text-sm">{doc?.card?.deadlines || "Немає дедлайну."}</p>
                </div>

                {doc?.card?.effective_date ? (
                  <div className="rounded-[10px] border border-[color:var(--accent)] bg-white p-5">
                    <p className="eyebrow">Набуває чинності</p>
                    <p className="h-display h3 mt-3">{formatDate(doc.card.effective_date)}</p>
                    <p className="body-text mt-3 text-sm">{doc.card.effective_date_note || "Немає примітки."}</p>
                  </div>
                ) : null}

                <div className="rounded-[10px] border border-[color:var(--line)] bg-[var(--bg-soft)] p-5">
                  <p className="eyebrow">Посилання</p>
                  {doc?.source_url ? (
                    <a href={doc.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-[var(--accent)] underline decoration-[color:var(--line)] underline-offset-4">
                      Переглянути на сайті ВР
                    </a>
                  ) : (
                    <p className="body-text mt-3 text-sm">Немає посилання.</p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
