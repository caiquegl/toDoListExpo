import { Task } from '@/types/task';

export type EditTaskModalProps = {
  visible: boolean;
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
};
