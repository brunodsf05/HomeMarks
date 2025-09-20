import { useState, useEffect, use } from "react";
import { type Bookmark, BookmarkService } from "@/lib/bookmarks";
import { BookmarkComponent } from "@/components/common/bookmarks";

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
          : <ul>
            {
              bookmarks?.children?.map((b) => (
                <li>
                  <BookmarkComponent bookmark={b} onClick={(b) => {
                    console.log(
                      `${BookmarkService.getInstance().isFolder(b) ? 'Folder' : 'Url'} clicked!`
                    );
                  }} />
                </li>
              ))
            }
          </ul>
      }
    </>
  );
};

export default App;
