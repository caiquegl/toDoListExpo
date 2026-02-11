import type { Task } from '@/types/task';

export type ModalFabProps = {
  visible: boolean;
  onClose: () => void;
  onSaved: (tasks: Task[]) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};
