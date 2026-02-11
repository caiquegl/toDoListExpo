import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKey } from '@/types/storage';

export async function readJson<T>(key: StorageKey): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function writeJson<T>(key: StorageKey, value: T): Promise<void> {
  const serialized = JSON.stringify(value);
  await AsyncStorage.setItem(key, serialized);
}
