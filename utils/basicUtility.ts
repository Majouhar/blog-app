export function hasAllKeys(object: any, keys: string[]): boolean {
  return keys.every((key) => key in object);
}
