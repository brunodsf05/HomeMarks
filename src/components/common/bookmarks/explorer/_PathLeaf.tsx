import { type BookmarkComponentProps, onClickNotImplemented } from "../common";
import styles from "./styles.module.css";

export const Leaf: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => (
  <button onClick={() => onClick && onClick(bookmark)} className={styles.pathLeaf}>
    {bookmark.title ?? "Folder"}
  </button>
);