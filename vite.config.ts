import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['jspdf']
  },
  // Add this to handle potential source map issues
  resolve: {
    alias: {
      'jspdf': 'jspdf/dist/jspdf.es.min.js'
    }
  }
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });
