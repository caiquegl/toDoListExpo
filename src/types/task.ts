export type TaskStatus = 'pending' | 'done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
};
