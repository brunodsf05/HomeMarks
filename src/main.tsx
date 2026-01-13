import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/reset.css";
import "@/global.css";
import App from "@/components/app/App";

// TODO: Load this if user wants to
// Steals focus from browser focus bar
// Downside is that the search bar gets ugly
if (window.location.search !== "?x") {
  window.location.search = "?x";
  throw new Error("Reload to steal focus");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
