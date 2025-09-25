import { useState } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkClickable } from "../BookmarkClickable";
import { PathBar } from "./_PathBar";
import styles from "./styles.module.css";

interface BookmarkExplorerProps {
  rootBookmark: Bookmark;
}

export const BookmarkExplorer: React.FC<BookmarkExplorerProps> = ({ rootBookmark }) => {
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark>(rootBookmark);

  // Handlers
  const onBookmarkFolderClickHandler = (b: Bookmark) => {
    setCurrentBookmark(b);
  };

  const onBookmarkUrlClickHandler = (b: Bookmark) => {
    window.open(b.url, "_self");
  };

  const onBookmarkClickHandler = (b: Bookmark) => {
    const isFolder = BookmarkService.getInstance().isFolder(b);
    (isFolder ? onBookmarkFolderClickHandler : onBookmarkUrlClickHandler)(b);
  };

  // Render
  return (
    <div className={styles.this}>
      <PathBar
        rootBookmark={rootBookmark}
        currentBookmark={currentBookmark}
        onFolderClick={onBookmarkFolderClickHandler}
      />
      <div className={styles.clickableContainer}>
        {
          currentBookmark?.children?.map((b) =>
            <BookmarkClickable
              key={b.id}
              bookmark={b}
              onClick={onBookmarkClickHandler}
            />
          )
        }
      </div>
    </div>
  );
};