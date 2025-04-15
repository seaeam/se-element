import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import { readdir, readdirSync } from 'fs'
import { defer, delay, filter, map } from 'lodash-es'
import { resolve } from 'path'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { buildLifecycleHooks, copyREADME } from './hooksPlugin'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

/**
 * 获取指定路径下的所有目录名称。
 *
 * @param basePath - 基础路径，表示要读取目录的路径。
 * @returns 一个包含所有目录名称的字符串数组。
 *
 * 此函数会同步读取指定路径下的所有文件和目录，并筛选出其中的目录名称。
 * 使用时请确保提供的路径是有效的，并且具有读取权限。
 */
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

const TRY_MOVE_FILES_DELAY = 800
function moveStyles() {
  readdir('./dist/es/theme', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_FILES_DELAY)

    defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}

export default defineConfig({
  plugins: [
    vue(),
    copyREADME(),
    // 声明类型文件
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    buildLifecycleHooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'SeElement',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'

          if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name as string)) {
            // 这里不使用 hash， 当用户需要按需引入的时候如果有 hash 值的话就会很麻烦
            return 'theme/[name].[ext]'
          }
          return assetInfo.name as string
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks'
          }
          if (id.includes('/packages/utils') || id.includes('plugin-vue:export-helper')) {
            return 'utils'
          }

          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        },
      },
    },
  },
})
