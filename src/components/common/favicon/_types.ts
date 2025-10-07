import * as favicon from "@/lib/favicon";

export interface FaviconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Url The URL of the website to fetch the favicon for.
   */
  url: string;
  /**
   * The size of the favicon to display.
   */
  size: favicon.Sizes;
  /**
   * Executed after the favicon's image url is loaded. Useful to fetch which
   * image was loaded.
   */
  onImageSourceUpdate?: (src: string) => void;
}

interface FaviconBoxClassNames {
  container?: string;
  background?: string;
  icon?: string;
};

/**
 * A component that displays the favicon for a given URL inside a box thats the same image.
 * Thanks to this the background can be a blurred version of the favicon to simulate an automatic bg color.
 *
 * You can modify the className applied for each part of this component. See `FaviconBoxClassNames` to know the targets.
 */
export interface FaviconBoxProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Url The URL of the website to fetch the favicon for.
   */
  url?: string;
  /**
   * The size of the favicon to display (default is 16).
   */
  size: favicon.Sizes;
  /**
   * Overrides the default className
   */
  overrideClassNames?: FaviconBoxClassNames;
  /**
   * Adds a new className on top of the default/overriden className.
   */
  additionalClassNames?: FaviconBoxClassNames;
}