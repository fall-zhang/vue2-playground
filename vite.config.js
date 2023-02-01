import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import { resolve as resolvePath } from 'path'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9655
  },
  plugins: [
    vue2(),
    vue2Jsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // eslint-disable-next-line no-undef
      // '@': resolvePath(__dirname, 'src')
    }
  }
})
