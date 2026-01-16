import browser from "webextension-polyfill";

import type { IWebSearchService } from "./types";

/**
 * Executes a web search using the user's search engine.
 */
export class WebSearchService implements IWebSearchService {
  private static instance: WebSearchService;

  public static getInstance(): WebSearchService {
    if (!WebSearchService.instance)
      WebSearchService.instance = new WebSearchService();

    return WebSearchService.instance;
  }

  public search(text: string): void {
    if (__RUNTIME__ === "web")
      alert(
        "Web search is only available when HomeMarks is run as an extension."
      );
    else
      browser.search.query({
        text: text,
      });
  }
}
