"use client";

import { useCallback, useEffect, useState } from "react";

import { taskApi } from "@/services/taskApi";
import type { Task, TaskInput } from "@/types/task";

import { TaskEditModal } from "./TaskEditModal";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);

  // 初回マウント時にタスクを取得する。最初のawaitより前で同期的にsetStateしないことで
  // effect内での不要な再レンダリング（react-hooks/set-state-in-effect）を避ける
  const loadTasks = useCallback(async () => {
    try {
      const data = await taskApi.list();
      setTasks(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // マウント時のデータ取得はuseEffectの正当な用途。取得完了後(await後)にのみstateを更新する
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTasks();
  }, [loadTasks]);

  const handleCreate = async (input: TaskInput) => {
    const created = await taskApi.create(input);
    setTasks((prev) => [...prev, created]);
  };

  const handleToggle = async (task: Task) => {
    const updated = await taskApi.update(task.id, {
      title: task.title,
      description: task.description,
      is_done: !task.is_done,
    });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleSave = async (id: number, input: TaskInput) => {
    const updated = await taskApi.update(id, input);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (task: Task) => {
    await taskApi.remove(task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div className="space-y-6">
      <TaskForm onSubmit={handleCreate} />

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-center text-sm text-gray-500">読み込み中...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          タスクはまだありません。上のフォームから追加してください。
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <TaskEditModal
        task={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
}
