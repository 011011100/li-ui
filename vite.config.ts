import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from "path";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[name]'
        }),
        vueJsx(),
        AutoImport({
            // 你可以指定要自动导入的库
            imports: [
                'vue',
                // ...其他库
            ],
        }),
        Components({
            dts: true,
            include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.md$/],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})
