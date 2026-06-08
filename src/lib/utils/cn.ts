export type ClassValue = unknown;

export function cn(...values: unknown[]): string {
  const out: string[] = [];

  const walk = (value: unknown): void => {
    if (!value) return;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "bigint"
    ) {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const [key, active] of Object.entries(value as Record<string, unknown>)) {
        if (active) out.push(key);
      }
    }
  };

  values.forEach(walk);
  return out.join(" ");
}
