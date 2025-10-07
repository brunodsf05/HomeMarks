/**
 * Contains the data of a bookmark. This contains data common for Chrome and Firefox.
 */
export interface Bookmark {
  id: string;
  parentId?: string;
  title: string;
  /**
   * The URL of the bookmark. Omitted for folders.
   */
  url?: string;
  children?: Bookmark[];
  folderType?: string;
}

/**
 * Browser's have the root-level bookmarks-folders.
 * These bookmarks are the only ones to have set the property `folderType`.
 * Depending of the browser the same folder can have diferent folderType name.
 * For example, the bookmarks bar for chrome is "Bookmarks bar" and firefox is "toolbar"
 * So the purpouse of this type is to select which root-level bookmark-folder with IBookmarkService being browser-agnostic.
 */
export type WellKnownFolders = "bar";

export type BookmarkSearchFilter = {
  /**
   * Regular expression used to filter bookmarks by their title.
   * If omitted, no filtering by title is applied.
   */
  title?: RegExp;
  /**
   * Regular expression used to filter bookmarks by their URL.
   * Ignored for bookmark folders since they do not have URLs.
   * If omitted, no filtering by URL is applied.
   */
  url?: RegExp;
  /**
   * Restricts the type of bookmarks returned.
   * - "all": return both folders and URLs (subject to filters).
   * - "folder": return only folder bookmarks.
   * - "url": return only URL bookmarks.
   */
  type: "all" | "folder" | "url";
  /**
   * Defines the structure of the search result.
   * In both cases the result is wrapped in a "root" folder bookmark.
   *
   * - "flat": all matching elements are returned as direct children of "root".
   *   Example: searching "dog" would return root containing only the matching
   *   bookmarks, without their original folder hierarchy.
   *
   * - "hierarchy": returns the original folder structure but pruned so that
   *   only folders and bookmarks matching the filters remain.
   *   Example: searching "dog" in "/animals/dog" would return a "root" that
   *   contains the "animals" folder, which itself contains the "dog" bookmark.
   *   Even if "animals" does not match the filter, it is kept because it
   *   contains a matching descendant.
   */
  style: "flat" | "hierarchy";
};

/**
 * Declares what a BookmarkService should do.
 */
export interface IBookmarkService {
  // ---- CRUD ----
  /**
   * Creates a new bookmark inside a folder.
   *
   * @param folderId The id of the folder.
   * @param title The title of the new bookmark.
   * @param url The url of the new bookmark.
   */
  createUrl(folderId: string, title: string, url: string): Promise<void>;
  /**
   * Creates a new folder inside another folder.
   *
   * @param folderId The id of the folder.
   * @param title The title of the new bookmark.
   * @param url The url of the new bookmark.
   */
  createFolder(folderId: string, title: string): Promise<void>;
  /**
   * Updates the specified properties of a bookmark or folder.
   * Unspecified properties will be left unchanged.
   *
   * @param id The identifier of the bookmark to update.
   * @param title The new title to set.
   * @param url The new url to set. It is ignored when updating a folder.
   */
  update(id: string, title?: string, url?: string): Promise<void>;
  /**
   * Deletes a bookmark or folder.
   *
   * @param id The identifier of the bookmark/folder to delete.
   */
  delete(id: string): Promise<void>;
  /**
   * Gets the bookmark or folder with the given id.
   * 
   * @param id The bookmark to get. Beware that some folder ids (like "bookmarks-bar" folder type)
   *           change depending on the browser engine. (For Chrome it's "1", for Firefox "toolbar_____").
   *
   * @returns The bookmark or folder with the given id.
   */
  get(id: string): Promise<Bookmark>;
  /**
   * Gets the root bookmark folder that contains all bookmarks from the user's browsers.
   *
   * @returns The root bookmark folder.
   */
  getRoot(): Promise<Bookmark>;
  /**
   * Gets the well-known folder of the given type like "bookmarks bar".
   *
   * @param type The type of well-known folder to get.
   * 
   * @returns A bookmark folder.
   */
  getWellKnown(type: WellKnownFolders): Promise<Bookmark>;

  // --- Utilities ---
  /**
   * @param bookmark The bookmark to check.
   * @returns True if the bookmark is a folder, false if it's a URL bookmark.
   */
  isFolder(bookmark: Bookmark): boolean;
  /**
   * Returns all bookmark folders from the oldest ancestor (root) to the youngest descendant
   * (leaf), including both endpoints. Example: [root, ..., leaf]
   *
   * @param root The top-level ancestor folder to start from. It must contain all of its children.
   * @param leaf The deepest folder to end at. If it is a folder, it will be included.
   */
  getFolderRange(root: Bookmark, leaf: Bookmark): Bookmark[];
  /**
   * Reads a bookmark folder and returns its children sorted by type (urls first folder last).
   * This is useful when rendering the preview of a folder's children.
   * Said order will prioritize urls if there are the same or more ammount as limit.
   * 
   * @param folder The bookmark folder to read it's children.
   * @returns The icons that should appear, array is trimmed so expect no children in folders.
   */
  listFolderIcons(folder: Bookmark, limit: number): Bookmark[];
  /**
   * Given a root bookmark folder, this function produces a new folder that
   * represents the filtered search result.
   *
   * @param root Root bookmark folder to start the search from.
   * @param filter Filtering and result-structuring options.
   * @returns A bookmark folder called "root" containing the filtered
   */
  filter(root: Bookmark, filter: BookmarkSearchFilter): Bookmark;
}
