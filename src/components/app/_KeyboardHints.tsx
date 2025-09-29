import styles from "./_keyboardHints.module.css";

export type KeyboardHintsContext = "search.empty" | "search.written" | "bookmark";

type KeyboardHintsText = {
  [K in KeyboardHintsContext]: { [key: string]: string; };
};

const keyboardHintsText: KeyboardHintsText = {
  "search.empty": {
    "TAB": "Focus on bookmarks",
  },
  "search.written": {
    "TAB": "Focus on bookmarks",
    "ENTER": "Search the web",
  },
  "bookmark": {
    "TAB": "Change bookmarks panel",
    "ARROWS": "Select bookmark",
    "CTRL + K": "Use search bar",
  },
};

interface KeyboardHintsProps {
  context: KeyboardHintsContext;
  className: string;
}

export const KeyboardHints: React.FC<KeyboardHintsProps> = ({ context, className }) => {
  return (
    <div className={`${styles.this} ${className}`}>
      {
        Object.entries(keyboardHintsText[context]).map(([keys, hint]) =>
          <div className={styles.hintTuple}>
            {keys.split("+").map((key, i) => (
              <>
                {i !== 0 && "+"}
                <kbd>{key}</kbd>
              </>
            ))}
            <p>{hint}</p>
          </div>
        )
      }
    </div>
  );
};