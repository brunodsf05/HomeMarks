import React from 'react';
import { Favicon } from '@/components/common/Favicon';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';
import styles from './BookmarkClickable.module.css';

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  return (
    <div onClick={() => onClick(bookmark)} className={styles.this} >
      {bookmark.url && <Favicon url={bookmark.url} size={32} />}
      <p>{bookmark.title}</p>
    </div>
  );
};
