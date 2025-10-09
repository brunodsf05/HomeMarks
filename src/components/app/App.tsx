import { useState, useEffect } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { WebSearchService } from "@/lib/websearch";
import { initKeyNav } from "@/lib/keynav";
import { BookmarkExplorer } from "@/components/common/bookmarks";
import { exampleBookmark } from "@/globals.d"; // TODO: Remove
import { DelayedInput } from "@/components/common/DelayedInput";
import { KeyboardHints, type KeyboardHintsContext } from "./_KeyboardHints";
import styles from "./App.module.css";

interface SearchResultProps {
  bookmarks?: Bookmark,
  query: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ bookmarks, query }) => {
  const [explorers, setExplorers] = useState<Bookmark[]>([]);

  useEffect(() => {
    const clearKeyNav = initKeyNav();
    return () => clearKeyNav();
  });

  // Filter
  useEffect(() => {
    if (bookmarks === undefined || query.length === 0) {
      setExplorers([]);
      return;
    }

    setExplorers([
      BookmarkService.getInstance().filter(
        bookmarks,
        {
          title: new RegExp(`${query}`, "i"),
          type: "all",
          style: "flat"
        }
      )
    ]);
  }, [bookmarks, query]);

  // Render
  if (!bookmarks) return <></>;

  return (
    <>
      <BookmarkExplorer key={bookmarks.id} rootBookmark={bookmarks} />
      {
        explorers.map((b, i) =>
          <BookmarkExplorer key={`${i}-${b.id}`} rootBookmark={b} />
        )
      }
    </>
  );
};

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryDelayed, setSearchQueryDelayed] = useState<string>("");
  const [keyboardHints, setKeyboardHints] = useState<KeyboardHintsContext>("search.empty");

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
    <main className={styles.this}>
      <h1>Bookmarks</h1>
      <DelayedInput
        onInstantChange={(line) => setSearchQuery(line)}
        onDelayedChange={(line) => setSearchQueryDelayed(line)}
        delayChangeMs={500}
        type="search"
        placeholder="Search the web or filter bookmarks by name or url..."
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              WebSearchService.getInstance().search(searchQuery);
              break;

            case "Tab":
              e.preventDefault();
              alert("Tab key pressed"); // TODO: Remove this test
              break;
          }
        }}
        className={styles.searchBar}
      />
      <div id="search" className={styles.searchResults}>
        <SearchResult bookmarks={bookmarks} query={searchQueryDelayed} />
      </div>
      <KeyboardHints context={keyboardHints} className={styles.keyboardHints} />
    </main>
  );
};

export default App;;
