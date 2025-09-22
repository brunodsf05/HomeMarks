import { useState } from "react";
import * as favicon from "@/lib/favicon";

interface FaviconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  size: favicon.Sizes;
}

/**
 * An image component that displays the favicon for a given URL.
 * 
 * @param url The URL of the website to fetch the favicon for.
 * @param size The size of the favicon to display (default is 16).
 */
export const Favicon: React.FC<FaviconProps> = ({ url, size, ...rest }) => {
  const [faviconUrl, setFaviconUrl] = useState<string>(favicon.getUrlOnline(url, size));
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    if (isUsingFallback) return;

    // Image search failed
    if (event.currentTarget.naturalWidth < size) {
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