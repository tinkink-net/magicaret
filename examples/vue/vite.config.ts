import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'magicaret': resolve(__dirname, '../../dist'),
      'magicaret/vue': resolve(__dirname, '../../dist/vue'),
    },
  },
  server: {
    port: 3001,
  },
})
