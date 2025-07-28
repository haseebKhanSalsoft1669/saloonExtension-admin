import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/saloon-xtension/admin",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
