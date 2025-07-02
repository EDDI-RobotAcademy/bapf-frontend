import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'snackApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/app.vue'
      },
      shared: ['vue']
    })
  ],
  server: {
    port: 3001,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue']
    }
  }
})