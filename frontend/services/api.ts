import { API_BASE_URL } from "@/lib/config";
import type { ApiResponse } from "@/types/task";

// fetch処理を一箇所に集約する。共通レスポンス形式を解釈し、失敗時は例外を投げる
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("サーバーに接続できませんでした");
  }

  const body = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !body.success) {
    throw new Error(body.message || `リクエストに失敗しました (${res.status})`);
  }
  return body.data as T;
}
