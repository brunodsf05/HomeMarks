import { BookmarkService, type Bookmark } from "@/lib/bookmarks";
import { Leaf } from "./_PathLeaf";
import styles from "./styles.module.css";

interface PathBarProps {
  rootBookmark: Bookmark;
  currentBookmark: Bookmark;
  onFolderClick: (bookmark: Bookmark) => void;
}

export const PathBar: React.FC<PathBarProps> = ({ rootBookmark, currentBookmark, onFolderClick }) => {
  const path: Bookmark[] = BookmarkService.getInstance().getFolderRange(rootBookmark, currentBookmark);

  return (
    <div className={styles.path}>
      {
        path.map((b, idx) => (
          <Leaf key={idx} bookmark={b} onClick={onFolderClick} />
        ))
      }
    </div>
  );
};