import { type Theme, isTheme } from "./types";

const STORAGE_KEY = "theme";

/**
 * Saves a {@link Theme} object to {@link localStorage}.
 * @param storageKey - The key used to store the theme in localStorage.
 * @param theme - The theme object to persist.
 */
export function saveTheme(theme: Theme, storageKey: string = STORAGE_KEY) {
  localStorage.setItem(storageKey, JSON.stringify(theme));
}

/**
 * Loads a {@link Theme} object from {@link localStorage}.
 * @param storageKey - The key used to read the theme from localStorage.
 * @returns The stored {@link Theme} object if it exists and is valid, otherwise `null`.
 */
export function loadTheme(storageKey: string = STORAGE_KEY): Theme | null {
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
  return isTheme(object) ? (object as Theme) : null;
}
