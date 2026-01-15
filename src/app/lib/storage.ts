import { Task, TASKS_STORAGE_KEY } from "./task";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
