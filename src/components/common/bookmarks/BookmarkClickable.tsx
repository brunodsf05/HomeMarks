import { FaviconBox } from "@/components/common/favicon";
import { BookmarkService } from "@/lib/bookmarks";
import { type BookmarkComponentProps, onClickNotImplemented } from "./common";
import styles from "./BookmarkClickable.module.css";

export const BookmarkClickable: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => {
  const isFolder = BookmarkService.getInstance().isFolder(bookmark);
  const hasChildren = (bookmark.children?.length ?? 0) > 0;
  const renderFolder = isFolder && hasChildren;

  return (
    <div onClick={() => onClick(bookmark)} className={styles.this}>
      {
        renderFolder
          // Render folder's children
          ? <div className={styles.faviconFolder}>
            {
              bookmark.children?.map((b) => (
                <FaviconBox
                  key={`${b.id}`}
                  url={b.url}
                  size={16}
                  draggable={false}
                  additionalClassNames={{
                    container: styles.faviconContainerMultiple,
                    background: styles.faviconBackgroundMultiple,
                    icon: styles.faviconIconMultiple
                  }}
                />
              ))
            }
          </div>
          // Render website's favicon
          : <FaviconBox
            url={bookmark.url}
            size={64}
            draggable={false}
            additionalClassNames={{
              container: styles.faviconContainerSingle,
              icon: styles.faviconIcon
            }}
          />
      }

      <p className={styles.title}>{bookmark.title}</p>
    </div>
  );
};
