import { defineConfig } from 'vite';

export default defineConfig({
    server: {
    host: '0.0.0.0',  
    port: 5173,
    strictPort: true, 
  },
  base: '/poa-editor/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
