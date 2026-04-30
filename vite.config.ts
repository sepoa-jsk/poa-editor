import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/demo/index.html',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PoaEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `poa-editor.${format}.js`,
    },
    rollupOptions: {
      external: ['dompurify', 'idb'],
    },
  },
});
