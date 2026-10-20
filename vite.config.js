import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/send-otp': 'http://127.0.0.1:5000',
      '/verify-otp': 'http://127.0.0.1:5000',
      '/save-internship': 'http://127.0.0.1:5000',
      '/save-workshop': 'http://127.0.0.1:5000',
      '/create-order': 'http://127.0.0.1:5000',
      '/apply': 'http://127.0.0.1:5000',
      '/verify-payment': 'http://127.0.0.1:5000',
    },
  },
})
