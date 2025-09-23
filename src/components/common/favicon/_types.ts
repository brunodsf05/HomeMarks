import * as favicon from "@/lib/favicon";

export interface FaviconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  size: favicon.Sizes;
  onImageSourceUpdate?: (src: string) => void;
}

interface FaviconBoxClassNames {
  container?: string;
  background?: string;
  icon?: string;
};

export interface FaviconBoxProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url?: string;
  size: favicon.Sizes;
  overrideClassNames?: FaviconBoxClassNames;
  additionalClassNames?: FaviconBoxClassNames;
}