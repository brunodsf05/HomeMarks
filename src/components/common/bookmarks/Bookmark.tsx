import React from 'react';
import type { Bookmark } from '@/lib/bookmarks';

type BookmarkComponentProps = {
  bookmark: Bookmark;
  onClick?: (bookmark: Bookmark) => void;
};

const onClickNotImplemented = (bookmark: Bookmark) => {
  console.warn(`onClick not implemented for bookmark:`, bookmark);
};

export const BookmarkComponent: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  return (
    <div onClick={() => onClick(bookmark)}>
      {bookmark.title}
    </div>
  );
};
