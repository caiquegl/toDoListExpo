import { readJson, writeJson } from '@/services/storage';
import { STORAGE_KEYS } from '@/types/storage';
import { Task } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
  const stored = await readJson<Task[]>(STORAGE_KEYS.tasks);
  return stored ?? [];
}

export async function addTask(title: string): Promise<Task> {
  const tasks = await getTasks();
  const task: Task = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    status: 'pending',
    createdAt: Date.now(),
  };

  await new Promise((resolve) => setTimeout(resolve, 1500));
  await writeJson(STORAGE_KEYS.tasks, [task, ...tasks]);
  return task;
}
