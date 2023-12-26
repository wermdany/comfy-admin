import { resolve } from 'node:path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
// import inspect from "vite-plugin-inspect";
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({ resolves: [AntdResolve()] }),
    /** svg 雪碧图 */
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/assets/icons')],
      symbolId: 'icon-[name]',
      inject: 'body-first',
      svgoOptions: true
    })
  ],

  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`
    }
  },

  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:8]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  server: {
    host: true,
    // 4396 越看越高
    port: 4396,
    proxy: {
      '^api': {}
    }
  },

  preview: {
    port: 5396
  }
})
