export interface Bookmark {
  id: string;
  title: string;
  url?: string;
  parentId?: string;
  children?: Bookmark[];
}

export interface BookmarkCreateArgs {
  title: string;
  url?: string;
  parentId?: string;
}

export interface BookmarkUpdateArgs {
  id: string;
  title?: string;
  url?: string;
}

/**
 * Basic operations to read/write from the browser's bookmark database.
 */
export interface BookmarkOperations {
  create(bookmark: BookmarkCreateArgs): Promise<void>;
  update(bookmark: BookmarkUpdateArgs): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string, depth?: number): Promise<Bookmark>;
  getChildren(id: string, depth?: number): Promise<Bookmark[]>;
}
