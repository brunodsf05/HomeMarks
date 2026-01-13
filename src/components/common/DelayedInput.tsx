import { useState, useEffect, type InputHTMLAttributes } from "react";

type onChange = (line: string) => void;

interface DelayedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onInstantChange: onChange;
  onDelayedChange: onChange;
  delayChangeMs: number;
}

export const DelayedInput: React.FC<DelayedInputProps> = ({
  onInstantChange,
  onDelayedChange,
  delayChangeMs,
  ...inputProps
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    onInstantChange(query);

    const onDelayedChangeCaller = setTimeout(() => {
      onDelayedChange(query);
    }, delayChangeMs);

    return () => clearTimeout(onDelayedChangeCaller);
  }, [query]);

  return (
    <input {...inputProps} onChange={(e) => setQuery(e.target.value.trim())} />
  );
};
