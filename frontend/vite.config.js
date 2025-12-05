import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const enableHttps = env.VITE_ENABLE_HTTPS === 'true'
  const keyPath = env.VITE_HTTPS_KEY
  const certPath = env.VITE_HTTPS_CERT

  let httpsConfig
  if (enableHttps && keyPath && certPath) {
    try {
      httpsConfig = {
        key: fs.readFileSync(path.resolve(process.cwd(), keyPath)),
        cert: fs.readFileSync(path.resolve(process.cwd(), certPath)),
      }
    } catch (e) {
      console.warn('[Vite] HTTPS requested but certificate files could not be read. Falling back to HTTP.')
      httpsConfig = undefined
    }
  }

  const backendTarget = env.VITE_BACKEND_URL || 'http://127.0.0.1:10000'
  console.log('[Vite] Proxying /api to:', backendTarget)

  return {
    plugins: [react()],
    server: {
      https: false,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
