import type { TranslationContract } from "./contract";

type TranslationKey = keyof TranslationContract;
type VariantKey = `${TranslationKey}_${string}`;

/**
 * The schema that all translations must follow.
 * A translation is made of keys and translations.
 * A key is used to identify some translation.
 * A translation can be a string or null (will use fallback translation).
 *
 * All keys come from {@link TranslationContract}.
 *
 * Example:
 * ```
 * {
 *   "greet": "Hello world!",
 *   "count": "You have {{number}} apples",
 *   "wait": null,
 * }
 * ```
 *
 * Variations allow finegrained translations that use parameters:
 * ```
 * {
 *   "greet": "Hello world!",
 *   "count": "You have {{number}} apples",
 *   "count_one": "You have only {{number}} apple",
 *   "wait": null,
 * }
 * ```
 */
export type TranslationSchema = {
  // Every key must be present
  [K in TranslationKey]: string | null;
} & {
  // Any key can appear again but as a variant
  [K in VariantKey]?: string | null;
};
