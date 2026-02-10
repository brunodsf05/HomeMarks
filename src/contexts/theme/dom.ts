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
  console.log("Updating the theme...", theme);
  document.documentElement.dataset.theme = theme.id;
}
