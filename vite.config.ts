import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const mode = process.env.MODE

const devConfig = {
  server: {
    proxy: {
      '/api/v1.0': 'http://localhost:3030'
    }
  }
}

const commonConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src')
    }
  }
}

export default defineConfig({
  ...(mode === 'development' ? devConfig : {}),
  ...commonConfig
})
