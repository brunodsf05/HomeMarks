import { BookmarkService } from "@/lib/bookmarks";

const App = () => {
  // TODO: Remove this, just for testing
  BookmarkService.getInstance()
    .getWellKnown("bar")
    .then(console.log)
    .catch(console.error);

  return (
    <p>Hello world!</p>
  );
};

export default App;
