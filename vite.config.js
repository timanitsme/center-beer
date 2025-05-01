import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    historyApiFallback: true,
    proxy:{
      '/api': {
        target: "https://api.center.beer/web/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/authApi': {
        target: "https://api.center.beer:8443/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/authApi/, ''),
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    }
  }
})

