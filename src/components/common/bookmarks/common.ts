import type { Bookmark } from "@/lib/bookmarks";

export type BookmarkComponentProps = {
  bookmark: Bookmark;
  onClick?: (bookmark: Bookmark) => void;
};

export const onClickNotImplemented = (bookmark: Bookmark) => {
  console.warn(`onClick not implemented for bookmark:`, bookmark);
};