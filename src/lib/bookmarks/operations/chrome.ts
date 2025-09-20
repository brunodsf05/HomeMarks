import type { Bookmark, BookmarkOperations as BmOp } from '../types';



// CRUD

export const createBookmark: BmOp['create'] = async (parentId: string, title: string, url?: string) => {
  console.log('Called createBookmark from chrome.ts');
};

export const updateBookmark: BmOp['update'] = async (id: string, title?: string, url?: string) => {
  console.log('Called updateBookmark from chrome.ts');
};

export const deleteBookmark: BmOp['delete'] = async (id: string) => {
  console.log('Called deleteBookmark from chrome.ts');
  await new Promise(() => null);
};

export const getBookmark: BmOp['get'] = async (id: string) =>
  chrome.bookmarks
    .getSubTree(id)
    .then(nodes => {
      if (nodes.length === 0)
        throw new Error(`Bookmark with id "${id}" not found`);

      return nodes[0] as unknown as Bookmark;
    })
    .catch(err => {
      throw new Error(
        err instanceof Error ? err.message : `Failed to get bookmark: ${err}`
      );
    });
