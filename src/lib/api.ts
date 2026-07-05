export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.getnorma.xyz").replace(/\/+$/, "");
export const JWT_STORAGE_KEY = "norma_jwt";

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export function getStoredJwt(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(JWT_STORAGE_KEY);
}

export function setStoredJwt(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(JWT_STORAGE_KEY, token);
}

export function clearStoredJwt(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(JWT_STORAGE_KEY);
}

function extractMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }
  const record = payload as Record<string, unknown>;
  const candidate = record.error ?? record.detail ?? record.message;
  return typeof candidate === "string" && candidate.trim() ? candidate : fallback;
}

export async function apiFetchJson<T>(
  path: string,
  init: RequestInit = {},
  token: string | null = null,
): Promise<T> {
  const headers = new Headers(init.headers ?? {});
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new ApiError(extractMessage(payload, `HTTP ${response.status}`), response.status, payload);
  }

  return payload as T;
}
