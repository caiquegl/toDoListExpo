import { readJson, writeJson } from '@/services/storage';
import { STORAGE_KEYS } from '@/types/storage';
import { Task, TaskStatus } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
  const stored = await readJson<Task[]>(STORAGE_KEYS.tasks);
  return stored ?? [];
}

export async function addTask(title: string): Promise<Task> {
  const tasks = await getTasks();
  const task: Task = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    status: 'pending' as Task['status'],
    createdAt: Date.now(),
  };

  await new Promise((resolve) => setTimeout(resolve, 1500));
  await writeJson(STORAGE_KEYS.tasks, [task, ...tasks]);
  return task;
}

export async function toggleTask(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const nextTasks: Task[] = tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }
    const nextStatus: TaskStatus = task.status === 'pending' ? 'done' : 'pending';
    return {
      ...task,
      status: nextStatus,
    };
  });
  await writeJson(STORAGE_KEYS.tasks, nextTasks);
  return nextTasks;
}

export async function removeTask(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const nextTasks = tasks.filter((task) => task.id !== id);
  await writeJson(STORAGE_KEYS.tasks, nextTasks);
  return nextTasks;
}

export async function reorderTasks(tasks: Task[]): Promise<Task[]> {
  await writeJson(STORAGE_KEYS.tasks, tasks);
  return tasks;
}
