import browser from "@/lib/browser_api";
import type { Bookmark, IBookmarkService, WellKnownFolders } from "./types";

/**
 * Singleton service to manage bookmarks. Attempts to abstract the underlying browser API for both
 * Chrome and Firefox engines.
 */
export class BookmarkService implements IBookmarkService {
  private static instance: BookmarkService;
  private api: typeof browser.api.bookmarks;

  private constructor() {
    this.api = browser.api.bookmarks;
  }

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance)
      BookmarkService.instance = new BookmarkService();

    return BookmarkService.instance;
  }

  // ---- CRUD ----
  public async createUrl(folderId: string, title: string, url: string): Promise<void> {
    await this.create(folderId, title, url);
  };

  public async createFolder(folderId: string, title: string): Promise<void> {
    await this.create(folderId, title);
  }

  private async create(folderId: string, title: string, url?: string): Promise<void> {
    // If the url is omitted, a folder will be created.
    await this.api.create({ parentId: folderId, title, url });
  };

  public async update(id: string, title?: string, url?: string): Promise<void> {
    await this.api.update(id, { title, url });
  };

  public async delete(id: string): Promise<void> {
    await this.api.removeTree(id);
  };

  public async get(id: string): Promise<Bookmark> {
    const nodes = await this.api.getSubTree(id);

    if (nodes.length === 0)
      throw new Error(`Bookmark with id "${id}" not found`);

    return nodes[0] as unknown as Bookmark;
  };

  public async getRoot(): Promise<Bookmark> {
    const nodes = await this.api.getTree();

    if (nodes.length === 0)
      throw new Error(`Root of the whole bookmark tree not found`);

    return nodes[0] as unknown as Bookmark;
  };

  public async getWellKnown(type: WellKnownFolders): Promise<Bookmark> {
    switch (type) {
      case "bar":
        if (!browser.isChrome)
          return this.get("toolbar_____");

        // Search for chrome
        const chromeBookmarksBar = (await this.getRoot()).children?.find(n => n.folderType === "bookmarks-bar") as Bookmark | undefined;

        if (!chromeBookmarksBar)
          throw new Error("Bookmarks bar folder not found");

        return chromeBookmarksBar;

      default:
        throw new Error(`Well-known folder of type "${type}" is not supported`);
    }
  };

  // --- Utilities ---
  public isFolder(bookmark: Bookmark): boolean {
    return bookmark.url === undefined;
  }

  public getFolderRange(oldest: Bookmark, youngest: Bookmark): Bookmark[] {
    // DFS to find the path from oldest to youngest
    function findPath(parent: Bookmark, targetId: string): Bookmark[] | null {
      if (parent.id === targetId) return [parent]; // Target was found, stop searching

      if (parent.children) { // Only explore children from folders
        for (const child of parent.children) {
          const path = findPath(child, targetId);
          if (path) return [parent, ...path]; // Target was found in subtree, generate path from targetId to parent
        }
      }

      return null; // Target was not found in this subtree, stop searching
    }

    // Get the youngest folder id or exit earlier for safety
    const isYoungestFolder = this.isFolder(youngest);
    if (!isYoungestFolder && youngest.parentId === undefined) return [];
    const youngestFolderId: string = isYoungestFolder ? youngest.id : youngest.parentId!;

    // Start DFS
    // TODO: Remove children from each bookmark to reduce memory usage. This requires updating BookmarkExplorer.PathBar behavior so it does not depend's of this function's returned array.
    return findPath(oldest, youngestFolderId) ?? [];
  }
}
