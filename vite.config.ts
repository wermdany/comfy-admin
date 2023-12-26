import { resolve } from 'node:path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
// import inspect from "vite-plugin-inspect";
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [react(), createStyleImportPlugin({ resolves: [AntdResolve()] })],

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
