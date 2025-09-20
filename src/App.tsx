import { useState, useEffect, use } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";

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
          : <li>
            {
              bookmarks?.children?.map((ba) => (
                <ul>
                  {ba.title} - {ba.url === undefined ? "Folder" : <a href={ba.url}>{ba.url}</a>}
                </ul>
              ))
            }
          </li>
      }
    </>
  );
};

export default App;
