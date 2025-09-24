import { type BookmarkComponentProps, onClickNotImplemented } from "../common";
import styles from "./styles.module.css";

export const Leaf: React.FC<BookmarkComponentProps> = ({ bookmark, onClick = onClickNotImplemented }) => (
  <div onClick={() => onClick && onClick(bookmark)} className={styles.leaf}>
    {bookmark.title ?? "Folder"}
  </div>
);