import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
export default defineConfig({
    plugins: [react(), dts()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        lib: {
            entry: './src/index.ts', // your entry point
            name: 'gipsySharedComponents',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'], // both ES module and CommonJS
        },
        rollupOptions: {
            external: ['react', 'react-dom'], // Peer dependencies
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
