"use client";

import { useEffect, useMemo, useState } from "react";
import { loadTasks, saveTasks } from "./storage";
import type { Task } from "./task";

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

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadTasks();
    setTasks(sortTasks(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return; 
    saveTasks(tasks);
  }, [tasks, loaded]);

  const sortedTasks = useMemo(() => sortTasks(tasks), [tasks]);

  function addTask(input: { title: string; description?: string }) {
    const t: Task = {
      id: newId(),
      title: input.title,
      description: input.description ?? "",
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => sortTasks([t, ...prev]));
    return t.id;
  }

  function updateTask(id: string, patch: { title: string; description?: string }) {
    setTasks((prev) =>
      sortTasks(
        prev.map((t) =>
          t.id === id
            ? { ...t, title: patch.title, description: patch.description ?? "" }
            : t
        )
      )
    );
  }

  function toggleCompleted(id: string) {
    setTasks((prev) =>
      sortTasks(prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => sortTasks(prev.filter((t) => t.id !== id)));
  }

  function getTask(id: string) {
    return tasks.find((t) => t.id === id);
  }

  return {
    tasks: sortedTasks,
    addTask,
    updateTask,
    toggleCompleted,
    deleteTask,
    getTask,
    loaded,
  };
}
