import { useState } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkClickable } from "@/components/common/bookmarks";

interface VisorProps {
  rootBookmark: Bookmark;
}

export const Visor: React.FC<VisorProps> = ({ rootBookmark }) => {
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark>(rootBookmark);
  const path: Bookmark[] = BookmarkService.getInstance().getFolderRange(rootBookmark, currentBookmark);

  const onBookmarkClickHandler = (b: Bookmark) => {
    const isFolder = BookmarkService.getInstance().isFolder(b);

    if (isFolder) {
      setCurrentBookmark(b);
    }
    else {
      window.open(b.url, '_self');
    }
  };



  return (
    <div>
      <div >
        {
          path.map((b, idx) => (
            <>
              <div style={{ display: "inline-block" }}>
                <BookmarkClickable bookmark={b} onClick={onBookmarkClickHandler} />
              </div>
              {idx < path.length - 1 && ' / '}

            </>
          ))
        }
      </div>
      <hr />
      <ul>
        {
          currentBookmark?.children?.map((b) =>
            <li key={b.id}><BookmarkClickable bookmark={b} onClick={onBookmarkClickHandler} /></li>
          )
        }
      </ul>
    </div>
  );
};