import type { Bookmark, BookmarkOperations as BmOp } from './types';
import { ops } from './operations';

const getChildren: BmOp['getChildren'] = async (id: string, depth: number = 0): Promise<Bookmark[]> => {
  const node = await ops.getBookmark(id, depth + 1);
  return node.children ?? [];
};

export const bookmarkOperations: BmOp = {
  create: ops.createBookmark,
  update: ops.updateBookmark,
  delete: ops.deleteBookmark,
  get: ops.getBookmark,
  getChildren
};

export type { Bookmark };
