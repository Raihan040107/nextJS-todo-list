"use client";

import React from "react";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo } from "@/types/todo";

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({ initialTodos }: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("TODO_LIST_CACHE", initialTodos);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: "Tugas baru yang disimpan ke localStorage.",
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleReset = () => {
    setTodos(initialTodos);
  };

  return (
    <div>
      <div className="mb-4">
        <TodoForm onAddTodo={handleAddTodo} />
      </div>

      <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />

      <div className="mt-6 text-center">
        <button type="button" onClick={handleReset} className="text-sm text-gray-500 hover:text-gray-700 underline">
          Reset Data
        </button>
      </div>
    </div>
  );
}
