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

export type WellKnownFolders = "bar";

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
}
