export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">📋 My Todo List</h1>
      {children}
    </section>
  );
}
