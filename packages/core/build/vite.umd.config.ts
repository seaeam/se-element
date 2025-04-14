import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs'
import { delay } from 'lodash-es'
import { resolve } from 'path'
import shell from 'shelljs' // 对文件进行操作
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2' // 对生成文件进行压缩
import hooks from './hooksPlugin'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

const TRY_MOVE_FILES_DELAY = 800
function moveStyles() {
  try {
    readFileSync('./dist/umd/index.css.gz')
    shell.cp('./dist/umd/index.css', './dist/index.css')
  } catch (error) {
    delay(moveStyles, TRY_MOVE_FILES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({ include: /.(cjs|css)$/i }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
    }),
    hooks({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'SeElement',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          return assetInfo.name as string
        },
      },
    },
  },
})
