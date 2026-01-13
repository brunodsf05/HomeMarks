import { useState, useEffect, useRef } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkExplorer } from "@/components/common/bookmarks";

interface SearchResultProps {
  bookmarks?: Bookmark;
  query: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  bookmarks,
  query,
}) => {
  const [explorers, setExplorers] = useState<Bookmark[]>([]);

  // Filter
  useEffect(() => {
    if (bookmarks === undefined || query.length === 0) {
      setExplorers([]);
      return;
    }

    setExplorers([
      BookmarkService.getInstance().filter(bookmarks, {
        title: new RegExp(`${query}`, "i"),
        type: "all",
        style: "flat",
      }),
    ]);
  }, [bookmarks, query]);

  // Render
  if (!bookmarks) return <></>;

  return (
    <>
      <BookmarkExplorer key={bookmarks.id} rootBookmark={bookmarks} />
      {explorers.map((b, i) => (
        <BookmarkExplorer key={`${i}-${b.id}`} rootBookmark={b} />
      ))}
    </>
  );
};
