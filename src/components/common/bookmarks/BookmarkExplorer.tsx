import { useState } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkClickable } from "./BookmarkClickable";
import { type BookmarkComponentProps, onClickNotImplemented } from "./common";
import styles from "./BookmarkExplorer.module.css";

// --- BookmarkExplorerPathLeaf ---
const BookmarkExplorerPathLeaf: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => (
  <div onClick={() => onClick && onClick(bookmark)} className={styles.leaf}>
    {bookmark.title ?? "Folder"}
  </div>
);

// --- BookmarkExplorer ---
interface BookmarkExplorerProps {
  rootBookmark: Bookmark;
}

export const BookmarkExplorer: React.FC<BookmarkExplorerProps> = ({ rootBookmark }) => {
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark>(rootBookmark);
  const path: Bookmark[] = BookmarkService.getInstance().getFolderRange(rootBookmark, currentBookmark);

  const onBookmarkClickHandler = (b: Bookmark) => {
    const isFolder = BookmarkService.getInstance().isFolder(b);

    if (isFolder) {
      setCurrentBookmark(b);
    }
    else {
      window.open(b.url, "_self");
    }
  };

  return (
    <div>
      {/* BookmarkExplorerPathBar */}
      <div className={styles.path}>
        {
          path.map((b, idx) => (
            <BookmarkExplorerPathLeaf key={idx} bookmark={b} onClick={onBookmarkClickHandler} />
          ))
        }
      </div>
      <hr />
      <ul>
        {
          currentBookmark?.children?.map((b) =>
            <li key={b.id}><BookmarkClickable key={b.id} bookmark={b} onClick={onBookmarkClickHandler} /></li>
          )
        }
      </ul>
    </div >
  );
};