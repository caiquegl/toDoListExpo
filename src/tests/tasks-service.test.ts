import { addTask, getTasks, removeTask, reorderTasks, toggleTask, updateTask } from '@/services/tasks-service';
import { Task } from '@/types/task';

const mockReadJson = jest.fn();
const mockWriteJson = jest.fn();

jest.mock('@/services/storage', () => ({
  readJson: (...args: unknown[]) => mockReadJson(...args),
  writeJson: (...args: unknown[]) => mockWriteJson(...args),
}));

describe('tasks-service', () => {
  beforeEach(() => {
    mockReadJson.mockReset();
    mockWriteJson.mockReset();
  });

  it('returns empty list when storage is empty', async () => {
    mockReadJson.mockResolvedValueOnce(null);
    const tasks = await getTasks();
    expect(tasks).toEqual([]);
  });

  it('adds a task with pending status', async () => {
    mockReadJson.mockResolvedValueOnce([]);
    const task = await addTask('Nova tarefa');
    expect(task.status).toBe('pending');
    expect(mockWriteJson).toHaveBeenCalledTimes(1);
  });

  it('toggles task status', async () => {
    const tasks: Task[] = [
      { id: '1', title: 'A', status: 'pending', createdAt: 1 },
    ];
    mockReadJson.mockResolvedValueOnce(tasks);
    const next = await toggleTask('1');
    expect(next[0].status).toBe('done');
  });

  it('removes a task', async () => {
    const tasks: Task[] = [
      { id: '1', title: 'A', status: 'pending', createdAt: 1 },
      { id: '2', title: 'B', status: 'pending', createdAt: 2 },
    ];
    mockReadJson.mockResolvedValueOnce(tasks);
    const next = await removeTask('1');
    expect(next).toHaveLength(1);
    expect(next[0].id).toBe('2');
  });

  it('reorders tasks', async () => {
    const tasks: Task[] = [
      { id: '1', title: 'A', status: 'pending', createdAt: 1 },
      { id: '2', title: 'B', status: 'pending', createdAt: 2 },
    ];
    const next = await reorderTasks([tasks[1], tasks[0]]);
    expect(next[0].id).toBe('2');
    expect(mockWriteJson).toHaveBeenCalledTimes(1);
  });

  it('updates task title', async () => {
    const tasks: Task[] = [
      { id: '1', title: 'A', status: 'pending', createdAt: 1 },
    ];
    mockReadJson.mockResolvedValueOnce(tasks);
    const next = await updateTask('1', 'Novo');
    expect(next[0].title).toBe('Novo');
  });
});
