const glb = (globalThis as any);
const isChrome = glb.chrome !== undefined;
const api = glb[isChrome ? 'chrome' : 'browser'];

/**
 * Unified browser API access for Chrome and Firefox.
 * WARNING: This assumes that the `browser` APIs (from Firefox) are similar to `chrome`.
 * Also provides a flag to know if the current browser API is Chrome or Firefox.
 */
interface BrowserApi {
  isChrome: boolean;
  api: {
    all: typeof chrome;
    bookmarks: typeof chrome.bookmarks;
  };
}

const browserApi: BrowserApi = {
  isChrome: isChrome,
  api: {
    all: api,
    bookmarks: api.bookmarks
  }
};

export default browserApi;