"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import { Modal } from "@/components/Modal";
import type { Task, TaskInput } from "@/types/task";

interface TaskEditModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (id: number, input: TaskInput) => Promise<void>;
}

export function TaskEditModal({ task, onClose, onSave }: TaskEditModalProps) {
  return (
    <Modal open={task !== null} title="タスクを編集" onClose={onClose}>
      {/* key で対象タスクごとに再マウントし、初期値をpropsから直接与える（useEffectでの同期を避ける） */}
      {task && (
        <EditForm key={task.id} task={task} onClose={onClose} onSave={onSave} />
      )}
    </Modal>
  );
}

interface EditFormProps {
  task: Task;
  onClose: () => void;
  onSave: (id: number, input: TaskInput) => Promise<void>;
}

function EditForm({ task, onClose, onSave }: EditFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [isDone, setIsDone] = useState(task.is_done);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await onSave(task.id, {
        title: title.trim(),
        description: description.trim() || null,
        is_done: isDone,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        maxLength={200}
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="詳細（任意）"
        rows={3}
      />
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => setIsDone(e.target.checked)}
          className="h-4 w-4 cursor-pointer"
        />
        完了にする
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onClose}>
          キャンセル
        </Button>
        <Button onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? "保存中..." : "保存"}
        </Button>
      </div>
    </div>
  );
}
