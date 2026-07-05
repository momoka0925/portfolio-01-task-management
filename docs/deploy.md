# デプロイ手順（最短ルート）

構成: フロントエンド → **Vercel** / バックエンド → **Railway**

> 注意: 現在のバックエンドはSQLite（ファイルDB）です。Railwayの無料コンテナは再デプロイでファイルが消えるため、
> デモ用途としては動きますが**データは永続しません**。永続化が必要になったら PostgreSQL へ切り替えます（Project 03で対応予定）。

---

## 1. バックエンドを Railway にデプロイ

1. https://railway.app にGitHubでログイン
2. **New Project → Deploy from GitHub repo** で `portfolio-01-task-management` を選択
3. **Root Directory** を `backend` に設定（Settings → Root Directory）
   - `backend/Dockerfile` が使われる。`$PORT` は自動で渡される
4. **Variables** に環境変数を追加
   - `CORS_ORIGINS` = （後でVercelのURLを入れる。まず仮で `https://example.vercel.app`）
5. デプロイ完了後、発行された公開URL（例: `https://xxxx.up.railway.app`）を控える
6. `https://xxxx.up.railway.app/health` が `{"status":"ok"}` を返せば成功

---

## 2. フロントエンドを Vercel にデプロイ

1. https://vercel.com にGitHubでログイン
2. **Add New → Project** で `portfolio-01-task-management` をインポート
3. **Root Directory** を `frontend` に設定
4. **Environment Variables** に追加
   - `NEXT_PUBLIC_API_BASE_URL` = Railwayの公開URL（例: `https://xxxx.up.railway.app`）
5. **Deploy** を実行
6. 発行されたURL（例: `https://portfolio-01.vercel.app`）を控える

---

## 3. CORS を本番URLに合わせる

1. Railway の `CORS_ORIGINS` を、Vercelの本番URLに更新
   - 例: `CORS_ORIGINS=https://portfolio-01.vercel.app`
2. Railway が再デプロイされたら、Vercelの画面からタスク追加が通ることを確認

---

## 4. 仕上げ

- README の「デモURL」に Vercel のURLを記載
- 動作確認（追加・完了・編集・削除）
- スクリーンショットを撮ってREADMEへ

---

## トラブルシュート

| 症状 | 原因 / 対処 |
|---|---|
| 画面は出るがタスクが読み込めない | `NEXT_PUBLIC_API_BASE_URL` が誤り、またはCORS未許可。Railwayの`CORS_ORIGINS`にVercel URLを追加 |
| CORSエラー（ブラウザConsole） | `CORS_ORIGINS` にVercelの**正確な**URL（末尾スラッシュなし）を設定 |
| Railwayでビルド失敗 | Root Directory が `backend` になっているか確認 |
| データが消える | SQLiteの仕様。永続化はPostgreSQL移行で対応 |
