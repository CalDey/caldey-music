import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需引入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
        '@': '/src/'
    }
  },
  build: {
    sourcemap: false,
    terserOptions: {
      compress: {
        // 生产环境移除console,debugger
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
