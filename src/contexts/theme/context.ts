import { createContext, useContext } from "react";
import type { ThemePreferences } from "./types";

export interface ThemeContextValue {
  themePreferences: ThemePreferences;
  setThemePreferences: React.Dispatch<React.SetStateAction<ThemePreferences>>;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
