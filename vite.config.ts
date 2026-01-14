import { defineConfig } from "vite";
import path from "path"; // From @types/node
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Per-browser builds
  // TODO: Improve builds by storing each build inside a folder with the browser's name
  const browser = mode === "firefox" ? "firefox" : "chrome";
  const isExtension =
    command === "build" && process.env.IS_EXTENSION === "true";

  console.log({ isExtension });

  return {
    plugins: [react()],
    define: {
      __BROWSER__: JSON.stringify(browser),
      __IS_EXTENSION__: JSON.stringify(process.env.IS_EXTENSION === "true"),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
