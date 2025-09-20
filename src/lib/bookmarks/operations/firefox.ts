import type {
  BookmarkCreateArgs,
  BookmarkUpdateArgs,
  BookmarkOperations as BmOp
} from '../types';



// CRUD

export const createBookmark: BmOp['create'] = async (bookmark: BookmarkCreateArgs) => {
  // @ts-ignore
  const _bookmark = bookmark;
  console.log('Called createBookmark from firefox.ts');
};

export const updateBookmark: BmOp['update'] = async (bookmark: BookmarkUpdateArgs) => {
  // @ts-ignore
  const _bookmark = bookmark;
  console.log('Called updateBookmark from firefox.ts');
};

export const deleteBookmark: BmOp['delete'] = async (id: string) => {
  // @ts-ignore
  const _id = id;
  console.log('Called deleteBookmark from firefox.ts');
  await new Promise(() => null);
};

export const getBookmark: BmOp['get'] = async (id: string) => {
  // @ts-ignore
  const _id = id;
  console.log('Called getBookmark from firefox.ts');
  return { id: "wip", title: "template" };
};
