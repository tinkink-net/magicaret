import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      'magicaret': resolve(__dirname, '../../dist'),
    },
  },
  server: {
    port: 3002,
  },
})
