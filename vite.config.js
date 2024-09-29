import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-simple-captcha'],
    include: ['htmlparser2']
  },
  build: {
    commonjsOptions: {
      include: [/htmlparser2/, /node_modules/]
    }
  }
})
