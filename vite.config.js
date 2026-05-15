import { defineConfig } from 'vite';
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '/poa/api': {
                target: 'http://localhost:8080/poa-editor',
                changeOrigin: true,
            },
        },
    },
    base: '/poa-editor/',
    build: {
        outDir: 'E:/Project/poa-editor-server/src/main/webapp/poa-editor',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './index.html',
                fieldManager: './field-manager.html',
            },
        },
    },
});
