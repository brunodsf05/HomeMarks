// import browserApi from "./browser_api";

export type Sizes = 8 | 16 | 32 | 64 | 128;
export const sizePlaceholderT2GStatic: Sizes = 16;
type FaviconGetter = (url: string, size: Sizes) => string;

/// --- UTILS ---
const encode = encodeURIComponent;

/// --- FAVICON GETTERS ---
/**
 * Generates URL that can be used to fetch favicons via Google's `t2.gstatic.com/faviconV2` service.
 */
export const getUrlFromT2GStatic: FaviconGetter = (url: string, size: Sizes) =>
  `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encode(url)}&size=${size}`;

/**
 * Generates URL that can be used to fetch favicons via an external service.
 */
export const getUrlOnline: FaviconGetter = (url: string, size: Sizes) =>
  getUrlFromT2GStatic(url, size);

// /**
//  * Generates URL that can be used to fetch favicons locally without a connection.
//  */
// export const getUrlLocally: FaviconGetter = (url: string, size: Sizes) =>
//   `chrome://favicon/size/${size}/${url}`;
