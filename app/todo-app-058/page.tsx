import TodoForm from "../components/todo-list/TodoForm";
import TodoList from "../components/todo-list/TodoList";

// simulasi fetch data dari server/database
async function getTodos() {
  // artificial delay 3 detik biar loading.tsx keliatan
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { id: 1, title: "Belajar App Router Next.js", done: false },
    { id: 2, title: "Bikin komponen modular", done: false },
    { id: 3, title: "Pahami Server vs Client Component", done: true },
  ];
}

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <>
      <TodoForm />
      <TodoList todos={todos} />
    </>
  );
}
