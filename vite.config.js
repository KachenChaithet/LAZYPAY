import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: parseInt(process.env.PORT) || 10000,
    host: '0.0.0.0',
    allowedHosts: ['lazypay.onrender.com', '.onrender.com']
  }
})