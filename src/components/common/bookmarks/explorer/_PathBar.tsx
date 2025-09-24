import { useEffect, useRef } from "react";
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

  // Converts vertical scrolling into horizontal 
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const barEl = barRef.current;
    if (!barEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      barEl.scrollLeft += e.deltaY;
    };
    barEl.addEventListener("wheel", handleWheel, { passive: false });

    return () => barEl.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div ref={barRef} className={styles.path}>
      {
        path.map((b, idx) => (
          <Leaf key={idx} bookmark={b} onClick={onFolderClick} />
        ))
      }
    </div>
  );
};