export const STORAGE_KEYS = {
  tasks: 'tasks',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
