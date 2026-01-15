"use client";

import Link from "next/link";
import { useTasks } from "./lib/useTasks";

export default function Page() {
  const { tasks, toggleCompleted, deleteTask } = useTasks();

  return (
    <main style={{ padding: 16 }}>
      <h1>Todo List</h1>
      <p>
        <Link href="/new">Create</Link>
      </p>

      <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompleted(t.id)}
              />
              <strong>{t.title}</strong>
            </div>

            {t.description && <p style={{ marginTop: 8 }}>{t.description}</p>}

            <div style={{ display: "flex", gap: 8 }}>
              <Link href={`/edit?id=${t.id}`}>Edit</Link>

              <button
                onClick={() => {
                  const ok = confirm("削除しますか？");
                  if (ok) deleteTask(t.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks yet.</p>}
    </main>
  );
}