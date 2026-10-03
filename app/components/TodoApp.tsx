"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { authService } from "@/services/authService";
import { todoService } from "@/services/todoService";
import { ApiError } from "@/services/api";
import { Todo } from "@/types/todo";

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Auth Guard & Pemuatan Data Awal saat Halaman Dibuka
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split("T")[0],
        }));
        setTodos(formatted);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          authService.logout();
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [router]);

  // 2. Handler Tambah Tugas Baru (Create - POST /api/todos)
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo(title);
      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // 3. Handler Checklist / Toggle Status Completed (Update - PUT /api/todos/:id)
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    const nextCompleted = !target.completed;

    // Optimistic Update
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t)));

    try {
      await todoService.updateTodo(id, { is_completed: nextCompleted });
    } catch (err) {
      // Revert Jika Gagal
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !nextCompleted } : t)));
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(`Gagal memperbarui status: ${message}`);
    }
  };

  // 4. Handler Hapus Tugas (Delete - DELETE /api/todos/:id)
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(`Gagal menghapus tugas: ${message}`);
    }
  };

  // 5. Handler Logout
  const handleLogout = () => {
    authService.logout();
    router.replace("/login");
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Memuat daftar tugas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
        <span className="text-sm font-medium text-gray-600">
          Pengguna: <strong>{authService.getUser()?.username || "User"}</strong>
        </span>
        <button onClick={handleLogout} className="text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg transition">
          Keluar (Logout)
        </button>
      </div>

      {/* Form Input Tugas Baru */}
      <TodoForm onAdd={handleAddTodo} />

      {/* Daftar Tugas */}
      <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </div>
  );
}
