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

export const FaviconBox: React.FC<FaviconBoxProps> = ({ url, size, overrideClassNames, additionalClassNames }) => {
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
};