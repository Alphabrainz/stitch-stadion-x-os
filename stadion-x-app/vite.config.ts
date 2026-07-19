/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
          if (id.includes('src/components/fan')) {
            return 'fan-components';
          }
          if (id.includes('src/components/ops')) {
            return 'ops-components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
