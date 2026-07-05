# Task Management API

FastAPIで構築したタスク管理API。Portfolio Master Planの Project 01。

## 概要

タスクの作成・一覧取得・更新・削除ができるシンプルなREST APIです。Service / Repository層を分離した実務レベルのレイヤー構成で実装しています。

## 使用技術

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- Pydantic v2
- SQLite（開発） / PostgreSQL（本番想定）
- pytest / httpx
- Ruff
- Docker / Docker Compose
- GitHub Actions

## 機能一覧

- タスクの作成
- タスク一覧の取得
- タスク詳細の取得
- タスクの更新
- タスクの削除

## システム構成

```text
Client
  │ HTTP
FastAPI (app/api)
  │
Service層 (app/services)
  │
Repository層 (app/repositories)
  │
SQLAlchemy / SQLite
```

## セットアップ

### ローカル環境

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -r requirements.txt
cp ../.env.example .env
uvicorn app.main:app --reload
```

http://127.0.0.1:8000/docs でSwagger UIから動作確認できます。

### Docker

```bash
docker compose up --build
```

### テスト

```bash
cd backend
pytest -v
```

## API一覧

| Method | Path | 説明 |
|---|---|---|
| GET | /tasks | タスク一覧取得 |
| GET | /tasks/{id} | タスク詳細取得 |
| POST | /tasks | タスク作成 |
| PUT | /tasks/{id} | タスク更新 |
| DELETE | /tasks/{id} | タスク削除 |
| GET | /health | ヘルスチェック |

レスポンスは以下の形式に統一しています。

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

## ディレクトリ構成

```text
portfolio-01-task-management/
  backend/
    app/
      api/          # ルーティング
      core/         # 設定
      models/       # SQLAlchemyモデル
      schemas/      # Pydanticスキーマ
      services/     # ビジネスロジック
      repositories/ # DBアクセス
      db/           # DB接続
      main.py
    tests/
  docs/
    requirements.md  # 要件定義・設計書
  .github/workflows/ci.yml
  docker-compose.yml
```

詳細な設計は [docs/requirements.md](docs/requirements.md) を参照。

## スクリーンショット

TODO: Swagger UIのスクリーンショットを追加する。

## デモURL

TODO: デプロイ後に追加する。

## 今後の改善点

- フロントエンド（Next.js）の実装
- ログイン機能（JWT認証）
- 優先度・カテゴリ・検索機能
- Alembicによるマイグレーション管理
- PostgreSQL対応
