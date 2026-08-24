"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export default function TodoForm() {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    alert(`Tugas ditambahkan (demo): ${value}`);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mb-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Tulis tugas baru..." />
      <Button type="submit">Tambah</Button>
    </form>
  );
}
