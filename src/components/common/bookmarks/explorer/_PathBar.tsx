import { useEffect, useRef, Fragment } from "react";
import { BookmarkService, type Bookmark } from "@/lib/bookmarks";
import pathSeparatorIcon from "@/assets/icons/path_separator.svg";
import { Leaf } from "./_PathLeaf";
import styles from "./styles.module.css";

const TIME_TO_ALLOW_SCROLLING = 100; // ms

const Separator: React.FC = () => (
  <span className={styles.pathSeparator} />
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

    const isWideEnoughToScroll = () => barEl.scrollWidth > barEl.clientWidth;

    // State
    let canScroll = false;
    let timer: NodeJS.Timeout | null = null;

    // Enable scrolling after some small time passes
    // Wihout this, if while scrolling the page the cursor lands on "barEl"
    // the user would feel friction because it would be scrolling the "barEl"
    // TLDR Removes vertical scrolling being horrible
    const handleMouseEnter = () => {
      timer = setTimeout(() => {
        canScroll = isWideEnoughToScroll();
      }, TIME_TO_ALLOW_SCROLLING);
    };

    const handleMouseLeave = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      canScroll = false;
    };

    // Allows to scroll the path bar with mouse wheel
    const handleScroll = (e: WheelEvent) => {
      if (!canScroll) return;
      e.preventDefault();
      barEl.scrollLeft += e.deltaY;
    };

    // Manage DOM events creation and destruction
    barEl.addEventListener("mouseenter", handleMouseEnter);
    barEl.addEventListener("mouseleave", handleMouseLeave);
    barEl.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      barEl.removeEventListener("mouseenter", handleMouseEnter);
      barEl.removeEventListener("mouseleave", handleMouseLeave);
      barEl.removeEventListener("wheel", handleScroll);
      if (timer) clearTimeout(timer);
    };
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