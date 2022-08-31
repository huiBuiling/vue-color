import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // createStyleImportPlugin({
    //   // resolves: [VantResolve()],
    //   libs: [
    //     {
    //       libraryName: 'colorpicker-v3',
    //       esModule: true,
    //       resolveStyle: () => {
    //         return 'colorpicker-v3/dist/style.css'
    //       }
    //     }
    //   ]
    // }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
