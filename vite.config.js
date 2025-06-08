import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/task_manager/', // include leading and trailing slash
  plugins: [vue()]
})
