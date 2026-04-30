import { defineConfig } from 'vite';

export default defineConfig({
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
