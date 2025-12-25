import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'magicaret': resolve(__dirname, '../../dist'),
      'magicaret/react': resolve(__dirname, '../../dist/react'),
    },
  },
  server: {
    port: 3000,
  },
})