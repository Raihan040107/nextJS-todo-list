import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-gray-500 italic">Belum ada tugas.</p>;
  }

  return (
    <ul className="w-full max-w-md">
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} />
      ))}
    </ul>
  );
}
