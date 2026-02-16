import { type Theme } from "./types";

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
