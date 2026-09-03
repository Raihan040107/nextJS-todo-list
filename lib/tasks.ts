import { todoService } from "@/services/todoService";
import { ApiTodo, TaskItem } from "@/types/api-todo";

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed: boolean;
  userId: number;
}

export function formatApiTodoToTask(raw: ApiTodo): TaskItem {
  return {
    id: raw.id,
    title: raw.todo,
    completed: raw.completed,
    userId: raw.userId,
    source: "dummyjson-api",
  };
}

export async function getTasks(params?: FetchTodosParams): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  try {
    const response = await todoService.fetchTodos(params);

    const tasks = response.todos.map(formatApiTodoToTask);

    return {
      tasks,
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    };
  } catch (error) {
    console.error("[lib/tasks.ts] Error mengambil tasks dari API:", error);

    throw error;
  }
}

export async function getTaskById(id: number | string): Promise<TaskItem | null> {
  try {
    const raw = await todoService.fetchTodoById(id);

    return formatApiTodoToTask(raw);
  } catch (error) {
    console.error(`[lib/tasks.ts] Error mengambil task ID ${id}:`, error);

    return null;
  }
}

export function getTaskStats(tasks: TaskItem[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  const pending = total - completed;

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionPercentage,
  };
}
