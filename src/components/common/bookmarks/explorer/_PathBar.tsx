import { useEffect, useRef, Fragment } from "react";
import { BookmarkService, type Bookmark } from "@/lib/bookmarks";
import { Leaf } from "./_PathLeaf";
import styles from "./styles.module.css";

const Separator: React.FC = () => (
  <div>►</div>
);

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
    <div ref={barRef} className={styles.pathBar}>
      {
        path.map((b, idx) => (
          <Fragment key={idx}>
            {idx !== 0 && <Separator />}
            <Leaf bookmark={b} onClick={onFolderClick} />
          </Fragment>
        ))
      }
    </div>
  );
};