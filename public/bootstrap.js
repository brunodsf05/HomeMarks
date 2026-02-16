// Avoid FOUC. (https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
try {
  const bg = localStorage.getItem("CacheStyleBackground");
  if (bg) document.documentElement.style.background = bg;
} catch {}
