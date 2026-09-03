"use client";

import React, { useState } from "react";
import { TaskItem } from "@/types/api-todo";
import { todoService } from "@/services/todoService";
import { Badge } from "@/app/components/ui/badge";

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    // Optimistic Update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: targetStatus,
            }
          : t,
      ),
    );

    try {
      await todoService.updateTodoStatus(id, targetStatus);
    } catch (err) {
      console.warn("Simulasi update ke API DummyJSON gagal (fallback state):", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark-70">Daftar Tugas</h2>

        <Badge>{tasks.length} item</Badge>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-muted text-sm">Tidak ada tugas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id, task.completed)} className="w-5 h-5" />

                <span className={task.completed ? "line-through text-gray-400" : "text-dark-70"}>{task.title}</span>
              </div>

              <span className="text-xs text-gray-500">ID: {task.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
