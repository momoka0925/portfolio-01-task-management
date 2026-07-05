"use client";

import { Button } from "@/components/Button";
import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <input
        type="checkbox"
        checked={task.is_done}
        onChange={() => onToggle(task)}
        className="mt-1 h-4 w-4 cursor-pointer"
        aria-label={`${task.title}を完了にする`}
      />
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium ${
            task.is_done ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => onEdit(task)}>
          編集
        </Button>
        <Button variant="danger" onClick={() => onDelete(task)}>
          削除
        </Button>
      </div>
    </li>
  );
}
