import { defineConfig } from 'vitest/config';
// @ts-ignore
import react from '@vitejs/plugin-react';

const BASE_URL = process.env.BASE_PATH;

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'build',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes('@emotion/react') ||
                        id.includes('@emotion/styled') ||
                        id.includes('@mui/material')
                    )
                        return 'mui';
                    if (id.includes('@navikt/aksel-icons') || id.includes('@mui/icons-material'))
                        return 'icons';
                    if (id.includes('@navikt/ds-css') || id.includes('@navikt/ds-react'))
                        return 'aksel';
                    if (
                        id.includes('/node_modules/react-dom') ||
                        id.includes('/node_modules/react/') ||
                        id.includes('\\node_modules\\react-dom') ||
                        id.includes('\\node_modules\\react\\')
                    ) {
                        return 'react';
                    }

                    if (id.includes('node_modules')) return 'vendor';
                },
            },
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
    server: {
        port: 3000,
        allowedHosts: ['flyt.vigoiks.no'],
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
