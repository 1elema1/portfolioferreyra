import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      tailwindcss(),
      react(),
    ],
    define: {
      '__ADMIN_PASSWORD__': JSON.stringify(env.ADMIN_PASSWORD || env.PORTFOLIOVERCEL || ''),
      '__PORTFOLIOVERCEL__': JSON.stringify(env.PORTFOLIOVERCEL || ''),
      '__SESSION_SECRET__': JSON.stringify(env['SESSION.SECRET'] || env.SESSION_SECRET || ''),
    },
    envPrefix: ['VITE_', 'ADMIN_', 'PORTFOLIO', 'SESSION'],
  }
})
