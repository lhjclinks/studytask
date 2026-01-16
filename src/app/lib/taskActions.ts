import type { Task } from "./task";
import { loadTasks, saveTasks } from "./storage";

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function readTasks(): Task[] {
  return sortTasks(loadTasks());
}

export function addTask(input: { title: string; description?: string }): string {
  const tasks = loadTasks();
  const t: Task = {
    id: newId(),
    title: input.title,
    description: input.description ?? "",
    completed: false,
    createdAt: Date.now(),
  };

  const next = sortTasks([t, ...tasks]);
  saveTasks(next);
  return t.id;
}

export function findTask(id: string): Task | undefined {
  return loadTasks().find((t) => t.id === id);
}

export function updateTask(id: string, patch: { title: string; description?: string }) {
  const tasks = loadTasks();
  const next = sortTasks(
    tasks.map((t) =>
      t.id === id ? { ...t, title: patch.title, description: patch.description ?? "" } : t
    )
  );
  saveTasks(next);
}

export function toggleCompleted(id: string) {
  const tasks = loadTasks();
  const next = sortTasks(
    tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
  );
  saveTasks(next);
}

export function deleteTask(id: string) {
  const tasks = loadTasks();
  const next = sortTasks(tasks.filter((t) => t.id !== id));
  saveTasks(next);
}