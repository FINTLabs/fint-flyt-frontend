import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const basePath = env.VITE_BASE_PATH ? `${env.VITE_BASE_PATH}/` : '';

    console.log(`basePath: ${basePath}`);
    console.log('env.VITE_BASE_PATH', env.VITE_BASE_PATH);
    console.log('env.BASE_URL', env.BASE_URL);
    console.log('mode', mode);

    return {
        plugins: [react()],
        base: mode === 'production' ? basePath : '',
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
        define: {
            'process.env': {},
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
