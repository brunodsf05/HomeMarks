import browser from "webextension-polyfill";

import type { IWebSearchService } from "./types";

/**
 * Singleton service to manage bookmarks. Attempts to abstract the underlying browser API for both
 * Chrome and Firefox engines.
 */
export class WebSearchService implements IWebSearchService {
  private static instance: WebSearchService;

  public static getInstance(): WebSearchService {
    if (!WebSearchService.instance)
      WebSearchService.instance = new WebSearchService();

    return WebSearchService.instance;
  }

  public search(text: string): void {
    browser.search.query({
      text: text,
    });
  }
}
