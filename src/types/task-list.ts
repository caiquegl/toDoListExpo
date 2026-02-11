import { Task } from '@/types/task';

export type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
};
