import { useEffect, useState } from "react";
import { type ThemePreferences } from "./types";
import { ThemeContext, type ThemeContextValue } from "./context";
import { loadThemePreference, saveThemePreference } from "./persistence";
import { applyTheme } from "./dom";

// TEMP
const defaultThemePreferences: ThemePreferences = {
  polarity: "dark",
  isPolarityAuto: false,
  themes: {
    dark: { id: "dark" },
    light: { id: "light" },
  },
};

/**
 * Context provider that manages the application theme.
 *
 * - The state is {@link ThemePreferences}.
 * - The initial value of `themePreference` is the result of
 *   {@link loadThemePreference}.
 *   If no theme is found, it falls back to a TODO: default.
 * - Applies the active theme to the document root using {@link applyTheme}.
 * - Persists preference changes using {@link saveThemePreference}.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themePreferences, setThemePreferences] = useState<ThemePreferences>(
    () => {
      return loadThemePreference() ?? defaultThemePreferences;
    },
  );

  useEffect(() => {
    saveThemePreference(themePreferences);

    // TODO: Support polarity "auto" by detecting current polarity of OS
    const theme =
      themePreferences.polarity === "dark"
        ? themePreferences.themes.dark
        : themePreferences.themes.light;

    applyTheme(theme);
  }, [themePreferences]);

  const value: ThemeContextValue = {
    themePreferences: themePreferences,
    setThemePreferences: setThemePreferences,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
