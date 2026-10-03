"use client";

import React, { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle);
    setTitle("");
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-xl border border-gray-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Hapus size="md" di bawah ini */}
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tambahkan tugas baru..." className="flex-1 bg-white" />

        <Button type="submit" disabled={!title.trim()} variant="default" size="md">
          Tambah
        </Button>
      </form>
    </div>
  );
}
