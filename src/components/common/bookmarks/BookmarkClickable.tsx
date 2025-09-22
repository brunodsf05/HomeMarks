import React from 'react';
import { Favicon } from '@/components/common/Favicon';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {

  return (
    <div onClick={() => onClick(bookmark)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {bookmark.url && <Favicon url={bookmark.url} size={32} />}
      <p>{bookmark.title}</p>
    </div>
  );
};
