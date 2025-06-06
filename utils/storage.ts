const memoryStore: Record<string, string> = {};

function hasLocalStorage() {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  if (hasLocalStorage()) {
    localStorage.setItem(key, value);
  } else {
    memoryStore[key] = value;
  }
}

export async function getItem(key: string): Promise<string | null> {
  if (hasLocalStorage()) {
    return localStorage.getItem(key);
  }
  return memoryStore[key] ?? null;
}

export async function removeItem(key: string): Promise<void> {
  if (hasLocalStorage()) {
    localStorage.removeItem(key);
  }
  delete memoryStore[key];
}

export async function clear(): Promise<void> {
  if (hasLocalStorage()) {
    localStorage.clear();
  }
  Object.keys(memoryStore).forEach((k) => delete memoryStore[k]);
}

export async function setObject<T>(key: string, value: T): Promise<void> {
  await setItem(key, JSON.stringify(value));
}

export async function getObject<T>(key: string): Promise<T | null> {
  const str = await getItem(key);
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}
