import { useTranslation } from "react-i18next";
import type { TranslationContract } from "./contract";

/**
 * Maps a translation key to its parameter type.
 * Basically if you input a key you receive its parameter.
 *
 * Example:
 * ```
 * type TranslationKeysAndParams = {
 *   "greet": { name: string };
 *   "count": { price: number };
 *   "wiki": null;
 * };
 *
 * type A = ParamsFor<"greet">; // { name: string }
 * type B = ParamsFor<"count">; // { price: number }
 * type C = ParamsFor<"wiki">;  // null
 * ```
 */
type ParamsFor<K extends keyof TranslationContract> = TranslationContract[K];

/**
 * Returns the same values as {@link useTranslation} but the {@link t} function
 * is a type-safe wrapper.
 */
export function useTypedTranslation() {
  const { t, i18n } = useTranslation();

  function tt<K extends keyof TranslationContract>(
    key: K,
    ...args: ParamsFor<K> extends null ? [] : [params: ParamsFor<K>]
  ): string {
    if (args.length === 0) {
      return t(key as string) as string;
    }

    return t(key as string, args[0] as Record<string, unknown>) as string;
  }

  return { t: tt, i18n };
}
