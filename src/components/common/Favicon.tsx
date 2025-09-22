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

  const handleError = () => {
    console.warn(`Favicon for ${url} not found online, switching to local favicon.`);
    setFaviconUrl(favicon.getUrlLocally(url, size)); // TODO: Handle Firefox and local-favicon not found. Maybe the last ends in a loop?
  };

  return (
    <img
      src={faviconUrl}
      alt="favicon"
      width={size}
      height={size}
      {...rest}
      onError={handleError}
    />
  );
};