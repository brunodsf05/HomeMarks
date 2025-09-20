import React from 'react';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';

export const BookmarkComponent: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  return (
    <div onClick={() => onClick(bookmark)}>
      {bookmark.title}
    </div>
  );
};
