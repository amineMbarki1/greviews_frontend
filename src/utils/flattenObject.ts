export function flattenObject(
  obj: object,
  prefix = "",
  getNewKey?: (path: string, oldKey: string) => string
): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flattenObject(value, path, getNewKey));
    } else {
      acc[getNewKey ? getNewKey(path, key) : key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);
}
