import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/linktest/',
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: [
      'all',
      '7abe11d8-6835-47fb-a9cb-67f1bce57c74-00-z5hycn6qgkic.spock.replit.dev',
      '.replit.dev'
    ]
  },
  preview: {
    port: 4173,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  publicDir: 'public'
});