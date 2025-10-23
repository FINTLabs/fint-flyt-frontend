import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactRouter } from "@react-router/dev/vite";

export default ({ mode }) => {
    return defineConfig({
        plugins: [react(), reactRouter()],
        build: {
            outDir: 'build', // CRA's default build output
        },
        define: {
            "process.env.NODE_ENV": `"${mode}"`,
        }
    })
}