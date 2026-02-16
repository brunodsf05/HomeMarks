import { type Theme, type ThemePolarity } from "./types";

/**
 * Applies the given {@link Theme} to the document by updating DOM-level
 * attributes used by CSS to apply different styles.
 *
 * The theme is applied by:
 * 1. Setting the `data-theme` attribute on the root `<html>` element.
 * 2. Adding/removing CSS variables in the inline style attribute of
 *    the root `<html>` element.
 *
 * @param theme - The theme to apply.
 */
export function applyTheme(theme: Theme) {
  document.documentElement.style.background = "";
  console.log("Updating the theme...", theme);
  document.documentElement.dataset.theme = theme.id;
  cacheSaveStyleBackground();
}

/**
 * Reads the current `background` style of the `<body/>` and saves it in
 * {@link localStorage}.
 *
 * If you go to `/src/index.html` you will see a script tag that loads the
 * style before the first render.
 */
function cacheSaveStyleBackground() {
  const STORAGE_KEY = "CacheStyleBackground";
  const bg = getComputedStyle(document.body).background;
  localStorage.setItem(STORAGE_KEY, bg);
}

// ------ OS ThemePolarity ------ //

/**
 * @returns A {@link MediaQueryList} that matches when the OS uses dark mode.
 */
export function getMediaQueryDarkMode(): MediaQueryList {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

/**
 * Resolves the {@link ThemePolarity} from the OS color scheme preference.
 *
 * Accepts either an existing {@link MediaQueryList} or a change event
 * to avoid re-querying the media query when already available.
 *
 * @param event - Existing media query or change event.
 * @returns The resolved theme polarity ("dark" or "light").
 */
export function getThemePolarity(
  event: MediaQueryList | MediaQueryListEvent = getMediaQueryDarkMode(),
): ThemePolarity {
  return (event ?? getMediaQueryDarkMode()).matches ? "dark" : "light";
}

/**
 * Subscribes to OS-level theme changes and executes the listener on updates.
 * @param listener - Callback invoked with the new {@link ThemePolarity}.
 * @returns A function to remove the listener.
 */
export function onThemePolaritySwitch(
  listener: (polarity: ThemePolarity) => void,
): () => void {
  const handler = (event: MediaQueryListEvent) =>
    listener(getThemePolarity(event));

  getMediaQueryDarkMode().addEventListener("change", handler);
  return () => getMediaQueryDarkMode().removeEventListener("change", handler);
}
