import browser from "@/lib/browser_api";
import type { IWebSearchService } from "./types";

/**
 * Singleton service to manage bookmarks. Attempts to abstract the underlying browser API for both
 * Chrome and Firefox engines.
 */
export class WebSearchService implements IWebSearchService {
  private static instance: WebSearchService;
  private api: typeof browser.api.search;

  private constructor() {
    this.api = browser.api.search;
  }

  public static getInstance(): WebSearchService {
    if (!WebSearchService.instance)
      WebSearchService.instance = new WebSearchService();

    return WebSearchService.instance;
  }

  public search(text: string): void {
    this.api.query({
      text: text
    });
  }
}
