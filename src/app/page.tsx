"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Task } from "./lib/task";
import { readTasks, toggleCompleted, deleteTask } from "./lib/taskActions";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(readTasks());
  }, []);

  function refresh() {
    setTasks(readTasks());
  }

  function onToggle(id: string) {
    toggleCompleted(id);
    refresh();
  }

  function onDelete(id: string) {
    const ok = confirm("削除しますか？");
    if (!ok) return;
    deleteTask(id);
    refresh();
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Todo List</h1>

      <p style={{ display: "flex", gap: 12 }}>
        <Link href="/new">Create</Link>
      </p>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
          {tasks.map((t) => (
            <li
              key={t.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => onToggle(t.id)}
                  aria-label={`toggle-${t.id}`}
                />
                <strong style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                  {t.title}
                </strong>
              </div>

              {t.description && <p style={{ margin: 0 }}>{t.description}</p>}

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Link href={`/edit?id=${t.id}`}>Edit</Link>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
