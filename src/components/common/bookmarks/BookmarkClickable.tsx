import { FaviconBox } from '@/components/common/favicon';
import { type BookmarkComponentProps, onClickNotImplemented } from './common';
import styles from './BookmarkClickable.module.css';

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  return (
    <div onClick={() => onClick(bookmark)} className={styles.this}>
      <FaviconBox
        url={bookmark.url}
        size={64}
        draggable={false}
        additionalClassNames={
          {
            container: styles.faviconContainer,
            icon: styles.faviconIcon
          }
        }
      />
      <p className={styles.title}>{bookmark.title}</p>
    </div >
  );
};
