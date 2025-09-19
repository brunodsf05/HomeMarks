import { defineConfig } from 'vite';
import path from 'path'; // From @types/node
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Per-browser builds
  // TODO: Improve builds by storing each build inside a folder with the browser's name
  const browser = mode === 'firefox' ? 'firefox' : 'chrome';

  return {
    plugins: [react()],
    define: {
      __BROWSER__: JSON.stringify(browser)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
});
