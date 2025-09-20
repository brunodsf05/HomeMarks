import { useState, useEffect } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { Visor } from "@/Visor";

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark>();

  useEffect(() => {
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
