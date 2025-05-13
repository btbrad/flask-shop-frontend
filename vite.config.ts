import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import tailwindcss from '@tailwindcss/vite'

import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      eslintrc: {
        enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
        filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
      },
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({}),
      ],
      vueTemplate: true, // 是否在 vue 模板中自动导入
    }),
    Components({
      dts: path.resolve(pathSrc, 'types', 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
        }),
      ],
    }),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
})
