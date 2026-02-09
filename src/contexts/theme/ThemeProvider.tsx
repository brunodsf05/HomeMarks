import { useEffect, useState } from "react";
import { defaultTheme, type Theme } from "./types";
import { ThemeContext, type ThemeContextValue } from "./context";
import { loadTheme, saveTheme } from "./persistence";
import { applyTheme } from "./dom";

/**
 * Context provider that manages the application theme.
 *
 * - The initial value of `theme` is the result of {@link loadTheme}.
 *   If no theme is found, it falls back to {@link defaultTheme}.
 * - Applies the active theme to the document root using {@link applyTheme}.
 * - Persists theme changes using {@link saveTheme}.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return loadTheme() ?? defaultTheme;
  });

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const value: ThemeContextValue = {
    theme: theme,
    setTheme: setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
