import type { BookmarkOperations as BmOp } from '../types';



// CRUD

export const createBookmark: BmOp['create'] = async (parentId: string, title: string, url?: string) => {
  console.log('Called createBookmark from firefox.ts');
};

export const updateBookmark: BmOp['update'] = async (id: string, title?: string, url?: string) => {
  console.log('Called updateBookmark from firefox.ts');
};

export const deleteBookmark: BmOp['delete'] = async (id: string) => {
  console.log('Called deleteBookmark from firefox.ts');
  await new Promise(() => null);
};

export const getBookmark: BmOp['get'] = async (id: string) => {
  console.log('Called getBookmark from firefox.ts');
  return { id: "wip", title: "template" };
};
