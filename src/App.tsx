import { bookmarkOperations } from "@/lib/bookmarks";

const App = () => {
  // TODO: Remove this, just for testing
  bookmarkOperations.create("", "Test");
  bookmarkOperations.update("");
  bookmarkOperations.delete("");
  bookmarkOperations.get("");
  bookmarkOperations.getChildren("");

  return (
    <p>Hello world!</p>
  );
};

export default App;
