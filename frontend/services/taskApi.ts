import { apiFetch } from "@/services/api";
import type { Task, TaskInput } from "@/types/task";

export const taskApi = {
  list: () => apiFetch<Task[]>("/tasks"),

  create: (input: TaskInput) =>
    apiFetch<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  update: (id: number, input: TaskInput) =>
    apiFetch<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),

  remove: (id: number) =>
    apiFetch<null>(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
