import { Task } from '@/types/task';

export type TaskListItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onDrag: () => void;
  isActive: boolean;
};
