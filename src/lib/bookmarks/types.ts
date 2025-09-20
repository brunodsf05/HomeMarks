export interface Bookmark {
  id: string;
  title: string;
  url?: string;
  parentId?: string;
  children?: Bookmark[];
}

/**
 * Basic operations to read/write from the browser's bookmark database.
 */
export interface BookmarkOperations {
  /**
   * Creates a bookmark url/folder under the given parent folder.
   * Check `url`param to know how to make the new bookmark an url or folder.
   *
   * @param parentId The id of the parent folder where to create the new bookmark.
   * @param title The title that the new bookmark will have.
   * @param url If omitted, the new bookmark will be a folder. If provided, it will be a url bookmark.
   */
  create(parentId: string, title: string, url?: string): Promise<void>;
  update(id: string, title?: string, url?: string): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Bookmark>;
  getChildren(id: string): Promise<Bookmark[]>;
}
