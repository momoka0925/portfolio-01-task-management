# Project 01: Task Management API — 設計書

## 1. 目的

FastAPIによるCRUD実装を学ぶ。Git / FastAPI / SQLite / REST APIの一連の流れを理解する最初のポートフォリオ。

## 2. MVP（今回作る範囲）

- タスク追加
- タスク一覧取得
- タスク更新
- タスク削除

発展機能（ログイン・優先度・カテゴリ・検索）はMVP完成後に検討する。

## 3. 画面一覧（フロントエンド）

| 画面 | 内容 |
|---|---|
| タスク一覧画面 | タスクの一覧表示、完了チェック、削除ボタン |
| タスク追加フォーム | タイトル・詳細を入力して追加 |
| タスク編集画面（モーダル or インライン） | タイトル・詳細・完了状態の更新 |

## 4. API一覧

レスポンス形式は共通ルール（`# 02_ARCHITECTURE.md`）に従い統一する。

| Method | Path | 説明 |
|---|---|---|
| GET | /tasks | タスク一覧取得 |
| GET | /tasks/{id} | タスク詳細取得 |
| POST | /tasks | タスク作成 |
| PUT | /tasks/{id} | タスク更新 |
| DELETE | /tasks/{id} | タスク削除 |

### リクエスト/レスポンス例

POST /tasks
```json
{
  "title": "設計書を書く",
  "description": "Project01の要件定義",
  "is_done": false
}
```

レスポンス
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "設計書を書く",
    "description": "Project01の要件定義",
    "is_done": false,
    "created_at": "2026-07-05T00:00:00",
    "updated_at": "2026-07-05T00:00:00"
  },
  "message": "Success"
}
```

エラー例（404）
```json
{
  "success": false,
  "message": "Task not found"
}
```

## 5. DB設計

### テーブル: tasks

| カラム | 型 | 制約 | 説明 |
|---|---|---|---|
| id | INTEGER | PK, autoincrement | タスクID |
| title | VARCHAR(200) | NOT NULL | タスクタイトル |
| description | TEXT | NULL可 | 詳細 |
| is_done | BOOLEAN | NOT NULL, default false | 完了フラグ |
| created_at | DATETIME | NOT NULL | 作成日時 |
| updated_at | DATETIME | NOT NULL | 更新日時 |

開発環境: SQLite / 本番想定: PostgreSQL（`# 01_DEVELOPMENT_RULES.md` 共通ルールに準拠）

## 6. ディレクトリ構成

`# 01_DEVELOPMENT_RULES.md` の標準構成に準拠。

```text
portfolio-01-task-management/
  backend/
    app/
      api/
        tasks.py
      core/
        config.py
      models/
        task.py
      schemas/
        task.py
      services/
        task_service.py
      repositories/
        task_repository.py
      db/
        session.py
        base.py
      main.py
    tests/
      test_tasks_api.py
      test_task_service.py
    migrations/
  docs/
    requirements.md
  screenshots/
  .github/
    workflows/
      ci.yml
  README.md
  LICENSE
  .env.example
  .gitignore
  docker-compose.yml
  Dockerfile
```

フロントエンド（Next.js）はバックエンドAPIが動作確認できてから着手する。

## 7. 技術選定理由

- **FastAPI**: 型ヒント + Pydanticで実務レベルのバリデーションを最初から経験できる。自動生成されるSwagger UIでAPI動作確認がしやすい。
- **SQLAlchemy + SQLite**: マイグレーション（Alembic）とORMの基本を、まずは軽量なSQLiteで学ぶ。
- **Service / Repository分離**: `# 02_ARCHITECTURE.md`の共通アーキテクチャに合わせ、最初のプロジェクトから責務分離の習慣をつける。

## 8. 完成条件（Definition of Done）

- [ ] 4つのAPIが正常に動作する
- [ ] pytestでAPIテスト・Serviceテストが通る
- [ ] Docker Composeで起動できる
- [ ] README完成
- [ ] GitHub Actions（Ruff + pytest）が通る
- [ ] GitHubへPush
