import { useState, useEffect } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkExplorer } from "@/components/common/bookmarks";
import { exampleBookmark } from "@/globals.d"; // TODO: Remove
import styles from "./App.module.css";

interface SearchResultProps {
  bookmarks?: Bookmark,
  query: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ bookmarks, query }) => {
  if (!bookmarks) return <></>;

  const explorers: Bookmark[] = [bookmarks];

  return (
    <>
      {
        query.length > 0 && <p>DEBUG: Wants to search</p>
      }
      {
        explorers.map((b, i) =>
          <BookmarkExplorer key={i} rootBookmark={b} />
        )
      }
    </>
  );
};

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load users bookmarks
  useEffect(() => {
    // TODO: Remove this "if" and keep "else", just for testing
    if (import.meta.env.DEV) {
      setBookmarks(exampleBookmark);
      return;
    }

    BookmarkService.getInstance()
      .getWellKnown("bar")
      .then((b) => setBookmarks(b))
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Bookmarks</h1>
      <input type="search" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value.trim())} />
      <div id="search" className={styles.search}>
        <SearchResult bookmarks={bookmarks} query={searchQuery} />
      </div>
    </>
  );
};

export default App;
