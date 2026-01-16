/**
 * Declares what a WebSearchService should do.
 */
export interface IWebSearchService {
  search(text: string): void;
}

/**
 * TODO: Make the WebSearchService use something like the StrategyPattern.
 *       In short, I want to have multiple search engines.
 *       Example: The user's default search engine, youtube search, github...
 */
