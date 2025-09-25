import { useState } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkClickable } from "../BookmarkClickable";
import { PathBar } from "./_PathBar";
import styles from "./styles.module.css";

interface BookmarkExplorerProps {
  rootBookmark: Bookmark;
}

const CLICK_DELAY = 150; // ms

export const BookmarkExplorer: React.FC<BookmarkExplorerProps> = ({ rootBookmark }) => {
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark>(rootBookmark);
  const [hasClicked, setHasClicked] = useState<boolean>(false);

  // Handlers
  const onBookmarkFolderClickHandler = (b: Bookmark) => {
    setCurrentBookmark(b);
  };

  const onBookmarkUrlClickHandler = (b: Bookmark) => {
    window.open(b.url, "_self");
  };

  const onBookmarkClickHandler = (b: Bookmark) => {
    if (hasClicked) return;

    const executeWithDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, CLICK_DELAY));

      const isFolder = BookmarkService.getInstance().isFolder(b);
      (isFolder ? onBookmarkFolderClickHandler : onBookmarkUrlClickHandler)(b);
    };

    executeWithDelay();
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