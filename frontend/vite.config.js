import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default ({ mode }) => {
    // Load environment variables from .env:
    const env = loadEnv(mode, path.resolve(__dirname), '');
    const defineEnv = Object.fromEntries(
      Object.entries(env).map(([k, v]) => [`import.meta.env.${k}`, JSON.stringify(v)])
    );

    return defineConfig({
        plugins: [react()],
        build: {
            outDir: path.resolve(__dirname, 'public'),
            emptyOutDir: true
        },
        server: {
            port: Number(env.FE_PORT || 5173),
            host: true, // listen on all network interfaces
            proxy: {
                '/api': {
                    target: `http://${env.BE_HOST}:${env.BE_PORT}`,
                    changeOrigin: true,
                },
            },
        },
        preview: {
            host: '0.0.0.0', // bind to all interfaces
            port: Number(env.FE_PORT || 5173),
            allowedHosts: [
                'localhost',
                'uncaramelized-darron-subpatronal.ngrok-free.dev'
            ],
        },
        define: {
            ...defineEnv
        }
    });
}
