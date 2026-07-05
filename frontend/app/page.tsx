import { TaskList } from "@/features/tasks/TaskList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          FastAPI + Next.js で作成したタスク管理アプリ
        </p>
      </header>
      <TaskList />
    </main>
  );
}
