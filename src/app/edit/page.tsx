"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { findTask, updateTask } from "../lib/taskActions";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      return;
    }

    const task = findTask(id);
    if (!task) {
      setNotFound(true);
      return;
    }

    setTitle(task.title);
    setDescription(task.description ?? "");
  }, [id]);

  function onUpdate() {
    if (!id) return;

    const trimmed = title.trim();
    if (!trimmed) {
      setError("タイトルは必須です");
      return;
    }

    setError(null);
    updateTask(id, { title: trimmed, description });
    router.push("/");
  }

  function onCancel() {
    router.push("/");
  }

  if (notFound) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Edit Task</h1>
        <p>タスクが見つかりませんでした。</p>
        <button onClick={() => router.push("/")}>Back</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 16, maxWidth: 560 }}>
      <h1>Edit Task</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Title *</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Description</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </label>

        {error && <p style={{ color: "crimson", margin: 0 }}>{error}</p>}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onUpdate}>Update</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </main>
  );
}
