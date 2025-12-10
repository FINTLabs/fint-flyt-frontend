import { defineConfig } from 'vitest/config';
// @ts-ignore
import react from '@vitejs/plugin-react';

export default defineConfig((conf) => {
    const basePath = process.env.BASE_PATH ? `${process.env.BASE_PATH ?? ''}/` : '';
    const gfheurif = import.meta.env.BASE_PATH;

    console.log(conf)
    console.log(`basePath: ${basePath}`);
    console.log(`gfheurif: ${gfheurif}`);
    return {
        plugins: [react()],
        base: '/beta/fintlabs-no/',
        build: {
            outDir: 'build',
            rollupOptions: {
                output: {
                    manualChunks(id: string) {
                        if (id.includes('node_modules')) return 'vendor';
                    },
                },
            },
        },
        resolve: {
            dedupe: ['react', 'react-dom'],
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
        preview: {
            port: 8000,
            allowedHosts: ['flyt.vigoiks.no'],
            host: '0.0.0.0',
        },
        test: {
            globals: true,
            environment: 'node',
            setupFiles: './src/setupTests.js',
        },
    };
});
