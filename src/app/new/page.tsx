"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addTask } from "../lib/taskActions";

export default function NewPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onCreate() {
    const trimmed = title.trim();

    if (!trimmed) {
      setError("タイトルは必須です");
      return;
    }

    setError(null);

    addTask({ title: trimmed, description });

    router.push("/");
  }

  function onCancel() {
    router.push("/");
  }

  return (
    <main style={{ padding: 16, maxWidth: 560 }}>
      <h1>New Task</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Title *</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            rows={4}
          />
        </label>

        {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCreate}>Create</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </main>
  );
}
