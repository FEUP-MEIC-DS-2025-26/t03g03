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
            proxy: {
                '/api': {
                    target: `http://${env.BE_HOST}:${env.BE_PORT}`,
                    changeOrigin: true,
                },
            },
        },
        preview: {
            host: env.HOST || '0.0.0.0',
            port: Number(env.FE_PORT || 5173)
        },
        define: {
            ...defineEnv
        }
    });
}


