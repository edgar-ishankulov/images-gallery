import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  server: { 
    port: 3000,
    watch: { 
      usePolling: true } },
  plugins: [
    inject({
      $: 'jquery',
    }),
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});