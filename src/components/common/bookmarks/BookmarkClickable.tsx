import { useState } from 'react';
import { Favicon } from '@/components/common/Favicon';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';
import styles from './BookmarkClickable.module.css';

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  const [faviconBg, setFaviconBg] = useState<string>(); // Avoids searching/loading the same favicon twice 

  return (
    <div onClick={() => onClick(bookmark)} className={styles.this}>
      {bookmark.url && <div className={styles.faviconContainer}>
        {faviconBg && <div className={styles.faviconBackground} style={{ backgroundImage: `url(${faviconBg})` }} />}
        <Favicon
          url={bookmark.url}
          size={64}
          className={styles.favicon}
          onImageSourceUpdate={setFaviconBg}
          draggable={false}
        />
      </div>}
      <p className={styles.title}>{bookmark.title}</p>
    </div >
  );
};
