import type { BookmarkOperations as BmOp } from '../types';



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

export const getBookmark: BmOp['get'] = async (id: string) => {
  console.log('Called getBookmark from chrome.ts');
  return { id: "wip", title: "template" };
};
