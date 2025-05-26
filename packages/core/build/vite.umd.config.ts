import terser from '@rollup/plugin-terser'
import { hooksPlugin as hooks } from '@seam-element/vite-plugins'
import vue from '@vitejs/plugin-vue'
import { readFile } from 'fs'
import { defer, delay } from 'lodash-es'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression2'

const TRY_MOVE_STYLES_DELAY = 750 as const

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

function moveStyles() {
  readFile('./dist/umd/index.css.gz', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'))
  })
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    visualizer({
      filename: 'dist/stats.umd.html',
    }),
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
      rmFiles: ['./dist/umd', './dist/index.css', './dist/stats.umd.html'],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'SeamUI',
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
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') {
            return 'index.css'
          }
          return chunkInfo.name as string
        },
      },
    },
  },
})
