import { useState } from "react";
import * as favicon from "@/lib/favicon";

interface FaviconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  size: favicon.Sizes;
  onImageSourceUpdate?: (src: string) => void;
}

/**
 * This checks if a favicon downloaded via `https://t2.gstatic.com/faviconV2`
 */
function isOnlineFaviconPlaceholder(img: HTMLImageElement, targetSize: favicon.Sizes): boolean {
  const imgSize: number = img.naturalWidth;
  console.log(`imgSize ${imgSize} targetSize ${targetSize}`);
  return imgSize < targetSize && imgSize === favicon.sizePlaceholderT2GStatic;
}

/**
 * An image component that displays the favicon for a given URL.
 *
 * @param url The URL of the website to fetch the favicon for.
 * @param size The size of the favicon to display (default is 16).
 * @param onImageSourceUpdate Executed when the image loads, either successfully or when the fallback image is used.
 */
export const Favicon: React.FC<FaviconProps> = ({ url, size, onImageSourceUpdate, ...rest }) => {
  const [faviconUrl, setFaviconUrl] = useState<string>(favicon.getUrlOnline(url, size));
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const img = event.currentTarget;

    onImageSourceUpdate && onImageSourceUpdate(img.src);

    // Handle fallback image
    if (isUsingFallback) return;

    // Image search failed
    if (isOnlineFaviconPlaceholder(img, size) && true) {
      setFaviconUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'); // TODO: Load/generate it from somewhere
      setIsUsingFallback(true);
    }
  };

  return (
    <img
      src={faviconUrl}
      alt="favicon"
      width={size}
      height={size}
      onLoad={handleLoad}
      {...rest}
    />
  );
};