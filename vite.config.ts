import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    AutoImport({
      // 你可以指定要自动导入的库
      imports: [
        'vue',
        // ...其他库
      ],
    }),
    vue()
  ],
})
