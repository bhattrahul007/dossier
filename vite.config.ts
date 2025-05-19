import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';

const getReactAppPath = (_path: string) => path.resolve(__dirname, _path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@dossier-ui': getReactAppPath('./src/dossier-ui'),
      '@dossier-common': getReactAppPath('./src/dossier-common'),
      '@editor-core': getReactAppPath('./src/editor-core')
    }
  }
});
