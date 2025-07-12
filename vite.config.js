import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import svgr from "vite-plugin-svgr";
import path from 'path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);


export default defineConfig({
    server: {
        hmr: process.env.NODE_ENV !== 'production',
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: ({ name }) => {
                    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
                    const fontExtensions = ['woff', 'woff2', 'eot', 'ttf', 'otf'];
                    const extension = path.extname(name).slice(1);

                    const imageWithoutHash = ['android-chrome-192x192.png', 'android-chrome-512x512.png'];
                    if (imageWithoutHash.includes(path.basename(name))) {
                        return 'assets/[name][extname]';
                    }

                    if (imageExtensions.includes(extension)) {
                        return 'assets/images/[name]-[hash][extname]';
                    }
                    if (fontExtensions.includes(extension)) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/assets/admin/style/index.sass',
                'resources/assets/admin/main.jsx',

                'resources/assets/site/style/index.sass',
                'resources/assets/site/js/index.js',
                'resources/assets/site/js/libs.js',
                'resources/assets/site/js/react.jsx',
            ],
            refresh: true,
        }),
        react(),
        svgr({
            svgrOptions: {
                icon: true,
                // This will transform your SVG to a React component
                exportType: "named",
                namedExport: "ReactComponent",
            },
        }),
        ckeditor5({theme: require.resolve('@ckeditor/ckeditor5-theme-lark')})
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './resources/assets/admin/setupTests.js',
        // coverage: { reporter: ['text', 'html'] },
    },
});
