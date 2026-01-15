import { useState, useEffect, useRef } from "react";

import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { WebSearchService } from "@/lib/websearch";
import { initKeyNav } from "@/lib/keynav";

import { DelayedInput } from "@/components/common/DelayedInput";

import { KeyboardHints, type KeyboardHintsContext } from "./_KeyboardHints";
import { SearchResult } from "./_SearchResults";

import styles from "./App.module.css";

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryDelayed, setSearchQueryDelayed] = useState<string>("");
  const [keyboardHints, setKeyboardHints] =
    useState<KeyboardHintsContext>("search.empty");

  const refInput = useRef<HTMLInputElement>(null);

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

  // Init input manager
  useEffect(() => {
    const clearKeyNav = initKeyNav();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        refInput.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearKeyNav();
      window.removeEventListener("keydown", handleKeyDown);
    };
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
        data-keynav="ignore-up ignore-left ignore-right"
        {...{ ref: refInput, autoFocus: true }}
      />
      <div id="search" className={styles.searchResults}>
        <SearchResult bookmarks={bookmarks} query={searchQueryDelayed} />
      </div>
      <KeyboardHints context={keyboardHints} className={styles.keyboardHints} />
    </main>
  );
};

export default App;
