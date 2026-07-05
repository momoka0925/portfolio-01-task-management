"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import type { TaskInput } from "@/types/task";

interface TaskFormProps {
  onSubmit: (input: TaskInput) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        is_done: false,
      });
      setTitle("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクのタイトル"
        maxLength={200}
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="詳細（任意）"
        rows={2}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !title.trim()}>
          {submitting ? "追加中..." : "追加"}
        </Button>
      </div>
    </form>
  );
}
