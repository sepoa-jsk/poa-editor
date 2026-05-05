import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: {
    open: '/demo/index.html',
  },
  plugins: [
    dts({
      rollupTypes: true,
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PoaEditor',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'cjs') return 'poa-editor.cjs.js';
        if (format === 'umd') return 'poa-editor.umd.js';
        return 'poa-editor.es.js';
      },
    },
    rollupOptions: {
      external: ['dompurify', 'idb'],
      output: {
        globals: {
          dompurify: 'DOMPurify',
          idb: 'idb',
        },
        // CSS 파일을 poa-editor.css로 고정
        assetFileNames: (info) =>
          info.name === 'style.css' ? 'poa-editor.css' : (info.name ?? 'asset'),
      },
    },
    sourcemap: true,
    minify: false,
  },
});
