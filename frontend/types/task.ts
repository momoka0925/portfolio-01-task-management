export interface Task {
  id: number;
  title: string;
  description: string | null;
  is_done: boolean;
  created_at: string;
  updated_at: string;
}

// バックエンドと更新スキーマ(TaskUpdate)を揃える。PUTは全項目を送る必要がある
export interface TaskInput {
  title: string;
  description: string | null;
  is_done: boolean;
}

// バックエンドの共通レスポンス形式に対応
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
