import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import ปลั๊กอินเข้ามา

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), ],
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
})
