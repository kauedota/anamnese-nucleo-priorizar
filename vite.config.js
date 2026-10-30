import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // desenvolvimento: encaminha o envio da ficha para o backend local da clínica
  server: { proxy: { '/api': 'http://localhost:8080' } },
})
