import { type ThemePreferences, isThemePreferences } from "./types";

const STORAGE_KEY = "ThemePreferences";

/**
 * Saves a {@link ThemePreferences} object to {@link localStorage}.
 * @param storageKey - The key used to store the theme in localStorage.
 * @param themePreferences - The theme preference object to persist.
 */
export function saveThemePreference(
  themePreferences: ThemePreferences,
  storageKey: string = STORAGE_KEY,
) {
  localStorage.setItem(storageKey, JSON.stringify(themePreferences));
}

/**
 * Loads a {@link ThemePreferences} object from {@link localStorage}.
 * @param storageKey - The key used to read the theme from localStorage.
 * @returns The stored {@link ThemePreferences} object if it exists and is valid, otherwise `null`.
 */
export function loadThemePreference(
  storageKey: string = STORAGE_KEY,
): ThemePreferences | null {
  // Load theme, it is an object serialized as a string
  const item = localStorage.getItem(storageKey);
  if (item === null) return null;
  // Deserialize the object, ensuring type correctness
  let object;
  try {
    object = JSON.parse(item);
  } catch (err) {
    console.error(
      `Failed to parse "${STORAGE_KEY}" from localStorage. Value: ${item}`,
      err,
    );
    object = null;
  }
  return isThemePreferences(object) ? (object as ThemePreferences) : null;
}
