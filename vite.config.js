import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//Configuration to allow __dirname to be accessible.
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    //Adding configuration to resolve shadcn-ui paths.
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
