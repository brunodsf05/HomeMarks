import { useState, useEffect } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { Visor } from "@/Visor";
import { exampleBookmark } from "./globals.d"; // TODO: Remove

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark>();

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

  // TODO: Remove this, just for testing
  return (
    <>
      <h1>Bookmarks</h1>
      {
        bookmarks === undefined
          ? <p>Loading...</p>
          : <Visor rootBookmark={bookmarks} />
      }
    </>
  );
};

export default App;
