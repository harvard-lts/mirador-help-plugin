import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'demo',
  server: {
    port: 9000,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  build: {
    outDir: 'dist',
  },
});
