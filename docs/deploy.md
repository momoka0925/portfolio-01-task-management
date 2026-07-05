# デプロイ手順（最短ルート）

構成: フロントエンド → **Vercel** / バックエンド → **Render**

> 注意: 現在のバックエンドはSQLite（ファイルDB）です。Renderの無料枠はファイルが永続しないため、
> 再起動・再デプロイで**データはリセット**されます。デモ用途としては動作します。
> PostgreSQL への移行は後続プロジェクト（Project 03/05）の学習テーマとして実施します。

---

## 1. バックエンドを Render にデプロイ

### 方法A: Blueprint（推奨・`render.yaml` を使用）

1. https://render.com にGitHubでサインイン
2. **New + → Blueprint** を選択
3. `portfolio-01-task-management` リポジトリを選ぶ
4. リポジトリ直下の `render.yaml` が読み込まれ、`portfolio-01-task-management-api`（Docker / free）が構築される
5. `CORS_ORIGINS` は後で設定するため、まずは空のまま or 仮値でデプロイ
6. 発行された公開URL（例: `https://portfolio-01-task-management-api.onrender.com`）を控える
7. `<URL>/health` が `{"status":"ok"}` を返せば成功（無料枠は初回アクセスが30〜50秒かかる）

### 方法B: 手動（Blueprintを使わない場合）

1. **New + → Web Service** → リポジトリ選択
2. **Root Directory** = `backend`
3. **Runtime** = Docker（`backend/Dockerfile` が自動検出される）
4. **Instance Type** = Free
5. **Health Check Path** = `/health`
6. デプロイ → 公開URLを控える

---

## 2. フロントエンドを Vercel にデプロイ

1. https://vercel.com にGitHubでサインイン
2. **Add New → Project** で `portfolio-01-task-management` をインポート
3. **Root Directory** を `frontend` に設定
4. **Environment Variables** に追加
   - `NEXT_PUBLIC_API_BASE_URL` = Renderの公開URL（例: `https://portfolio-01-task-management-api.onrender.com`）
   - ※ `NEXT_PUBLIC_` 変数はビルド時に埋め込まれる。設定後にデプロイすること
5. **Deploy** を実行
6. 発行されたURL（例: `https://portfolio-01.vercel.app`）を控える

---

## 3. CORS を本番URLに合わせる

1. Render の Environment で `CORS_ORIGINS` を Vercelの本番URLに更新
   - 例: `CORS_ORIGINS=https://portfolio-01.vercel.app`（末尾スラッシュなし）
2. Render が再デプロイされたら、Vercelの画面からタスク追加が通ることを確認

---

## 4. 仕上げ

- README の「デモURL」に Vercel のURLを記載
- リポジトリの About（homepage）に Vercel URL を設定
- 動作確認（追加・完了・編集・削除）

---

## トラブルシュート

| 症状 | 原因 / 対処 |
|---|---|
| 画面は出るがタスクが読み込めない | `NEXT_PUBLIC_API_BASE_URL` が誤り、またはCORS未許可。Renderの`CORS_ORIGINS`にVercel URLを追加して再デプロイ |
| CORSエラー（ブラウザConsole） | `CORS_ORIGINS` にVercelの**正確な**URL（末尾スラッシュなし）を設定 |
| 初回アクセスが遅い / 502 | 無料枠のコールドスタート。30〜50秒待って再読み込み |
| Renderでビルド失敗 | Root Directory が `backend`、Runtime が Docker になっているか確認 |
| データが消える | SQLite + 無料枠の仕様。永続化はPostgreSQL移行で対応 |
| 環境変数変更が反映されない | 変更後に Manual Deploy（再デプロイ）が必要 |
