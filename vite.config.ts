import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
    },
    server: {
        port: 3000,
        proxy: {
            '/api/intern/value-convertings': {
                target: 'http://localhost:8094/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/integrasjoner': {
                target: 'http://localhost:8090/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/authorization': {
                target: 'http://localhost:8086/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/arkiv': {
                target: 'http://localhost:8085/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/metadata': {
                target: 'http://localhost:8084/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/instance-flow-tracking': {
                target: 'http://localhost:8083/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/konfigurasjoner': {
                target: 'http://localhost:8082/beta/vlfk-no',
                changeOrigin: true,
            },
            '/api/intern/handlinger/instanser': {
                target: 'http://localhost:8081/beta/vlfk-no',
                changeOrigin: true,
            },
        },
    },
    test: {
        globals: true,
        environment: 'node',
        setupFiles: './src/setupTests.js',
    },
});
