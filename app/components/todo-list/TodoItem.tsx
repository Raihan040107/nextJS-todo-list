import { Badge } from "@/app/components/ui/badge";

type TodoItemProps = {
  id: number;
  title: string;
  done: boolean;
};

export default function TodoItem({ id, title, done }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between border rounded-lg px-4 py-2 mb-2">
      <span className={done ? "line-through text-gray-400" : "text-gray-800"}>{title}</span>
      <Badge variant={done ? "default" : "secondary"}>{done ? "Selesai" : "Pending"}</Badge>
    </li>
  );
}
