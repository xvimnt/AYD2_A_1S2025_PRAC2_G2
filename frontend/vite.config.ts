import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 5173,
    strictPort: true,
   },
  server: {
    strictPort: true,
    origin: "http://0.0.0.0:5173",
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 500
    }
  }
})
