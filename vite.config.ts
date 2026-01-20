import { defineConfig, type AliasOptions } from "vite";
import path from "path"; // From @types/node
import react from "@vitejs/plugin-react-swc";

const VALID_RUNTIMES = [
  "web",
  "extension.chrome",
  "extension.firefox",
] as const;

type Runtime = (typeof VALID_RUNTIMES)[number];

function getValidRuntime(
  checkedRuntime: string | undefined,
  isCommandBuild: boolean,
): Runtime {
  if (checkedRuntime === undefined) return "web";

  const runtime = checkedRuntime as Runtime;

  if (!VALID_RUNTIMES.includes(runtime))
    throw new Error(
      `Invalid runtime "${checkedRuntime}". ` +
        `Valid values are: ${VALID_RUNTIMES.join(", ")}.`,
    );

  if (!isCommandBuild && runtime !== "web")
    throw new Error(
      `Runtime "${runtime}" cannot be used with "vite dev". ` +
        `Extension APIs are not available in dev mode. ` +
        `Use runtime "web" or run "vite build" instead.`,
    );
  return runtime;
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Per-browser builds
  // TODO: Improve builds by storing each build inside a folder with the browser's name
  const runtime = getValidRuntime(process.env.RUNTIME, command === "build");
  console.log({ runtime });

  const webExtensionPolyfillPatch =
    runtime === "web"
      ? {
          "webextension-polyfill": path.resolve(
            __dirname,
            "src/mock/webextension-polyfill.ts",
          ),
        }
      : {};

  return {
    plugins: [react()],
    define: {
      __RUNTIME__: JSON.stringify(runtime),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        ...webExtensionPolyfillPatch,
      } as AliasOptions,
    },
    build: {
      outDir: path.resolve(
        __dirname,
        "dist",
        runtime.replace("extension.", ""),
      ),
      emptyOutDir: true, // Clears directory before building
    },
  };
});
