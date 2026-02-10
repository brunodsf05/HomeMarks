// ------ Theme ------ //

export type ThemeID = string;

export type Theme = {
  id: ThemeID;
};

// ------ ThemePreference ------ //

export type ThemePolarity = "dark" | "light";

export type ThemePreferences = {
  polarity: ThemePolarity | "auto";
  themes: Record<ThemePolarity, Theme>;
};

// ------ Utilities ------ //

export function isThemePreferences(value: unknown) {
  // Ensure value is a non-null object
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;

  // Validate polarity
  const polarity = v.polarity;
  if (polarity !== "dark" && polarity !== "light" && polarity !== "auto") {
    return false;
  }

  // Validate themes object
  const themes = v.themes;
  if (typeof themes !== "object" || themes === null) return false;

  const t = themes as Record<string, unknown>;

  // Validate dark theme
  if (typeof t.dark !== "object" || t.dark === null) return false;
  const dark = t.dark as Record<string, unknown>;
  if (typeof dark.id !== "string") return false;

  // Validate light theme
  if (typeof t.light !== "object" || t.light === null) return false;
  const light = t.light as Record<string, unknown>;
  if (typeof light.id !== "string") return false;

  // Ensure no extra keys exist in themes
  const keys = Object.keys(t);
  if (keys.length !== 2 || !keys.includes("dark") || !keys.includes("light")) {
    return false;
  }

  return true;
}
