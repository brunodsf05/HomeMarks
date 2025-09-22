import { useState } from 'react';
import { Favicon } from '@/components/common/Favicon';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';
import styles from './BookmarkClickable.module.css';

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  const [faviconSrc, setFaviconSrc] = useState<string>(); // Just for the 

  return (
    <div onClick={() => onClick(bookmark)} className={styles.this}>
      {bookmark.url && <div className={styles.faviconContainer}>
        {faviconSrc && <div className={styles.faviconBackground} style={{ backgroundImage: `url(${faviconSrc})` }} />}
        <Favicon
          url={bookmark.url}
          size={64}
          className={styles.favicon}
          onImageSourceUpdate={setFaviconSrc}
          draggable={false}
        />
      </div>}

      <p className={styles.title}>{bookmark.title}</p>
    </div >
  );
};
