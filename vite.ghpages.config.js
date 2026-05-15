import { defineConfig } from 'vite';
export default defineConfig({
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
