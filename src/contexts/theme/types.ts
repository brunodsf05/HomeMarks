export type Theme = {
  name: string;
};

export function isTheme(value: unknown) {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.name === "string";
}

export const defaultTheme: Theme = {
  name: "dark",
};
