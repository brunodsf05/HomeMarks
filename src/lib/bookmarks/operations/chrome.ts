import type {
  BookmarkCreateArgs,
  BookmarkUpdateArgs,
  BookmarkOperations as BmOp
} from '../types';



// CRUD

export const createBookmark: BmOp['create'] = async (bookmark: BookmarkCreateArgs) => {
  // @ts-ignore
  const _bookmark = bookmark;
  console.log('Called createBookmark from chrome.ts');
};

export const updateBookmark: BmOp['update'] = async (bookmark: BookmarkUpdateArgs) => {
  // @ts-ignore
  const _bookmark = bookmark;
  console.log('Called updateBookmark from chrome.ts');
};

export const deleteBookmark: BmOp['delete'] = async (id: string) => {
  // @ts-ignore
  const _id = id;
  console.log('Called deleteBookmark from chrome.ts');
  await new Promise(() => null);
};

export const getBookmark: BmOp['get'] = async (id: string, depth: number = 0) => {
  // @ts-ignore
  const _id = id;
  // @ts-ignore
  const _depth = depth;
  console.log('Called getBookmark from chrome.ts');
  return { id: "wip", title: "template" };
};
