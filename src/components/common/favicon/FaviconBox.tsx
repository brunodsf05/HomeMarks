import { useState } from "react";
import { type FaviconBoxProps } from "./_types";
import { Favicon } from "./Favicon";
import styles from "./FaviconBox.module.css";

/**
 * @param defaultClassName The base className. Can be overriden with `overrideClassName`.
 * @param overrideClassName If present, `defaultClassName` is not added to result.
 * @param additionalClassName Class name added on top of `defaultClassName` or `overrideClassName`.
 */
function generateClassNameString(defaultClassName: string, overrideClassName?: string, additionalClassName?: string): string {
  return `${overrideClassName ?? defaultClassName} ${additionalClassName ?? ""}`;
}

/**
 * A component that displays the favicon for a given URL inside a box thats the same image.
 * Thanks to this the background can be a blurred version of the favicon to simulate an automatic bg color.
 *
 * You can modify the className applied for each part of this component. See `FaviconBoxClassNames` to know the targets.
 *
 * @param url The URL of the website to fetch the favicon for.
 * @param size The size of the favicon to display (default is 16).
 * @param overrideClassNames Overrides the default className.
 * @param additionalClassNames Adds a new className on top of the default/overriden className. 
 */
export function FaviconBox({ url, size, overrideClassNames, additionalClassNames }: FaviconBoxProps) {
  const [faviconBg, setFaviconBg] = useState<string>();

  const containerClassName = generateClassNameString(styles.container, overrideClassNames?.container, additionalClassNames?.container);
  const backgroundClassName = generateClassNameString(styles.background, overrideClassNames?.background, additionalClassNames?.background);
  const iconClassName = generateClassNameString(styles.icon, overrideClassNames?.icon, additionalClassNames?.icon);

  return (
    <div className={containerClassName}>
      {faviconBg && <div
        className={backgroundClassName}
        style={{ backgroundImage: `url(${faviconBg})` }}
      />}
      {url && <Favicon
        url={url}
        size={size}
        className={iconClassName}
        onImageSourceUpdate={setFaviconBg}
        draggable={false}
      />}
    </div>
  );
}