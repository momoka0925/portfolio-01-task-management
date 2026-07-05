// APIのベースURL。環境変数で上書き可能（本番デプロイ時に差し替える）
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
