import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type UserConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import rollupPluginStripPragma from 'rollup-plugin-strip-pragma'
import path from 'path'
import fs from 'fs'

type stripPragmas = (options: { pragmas: string[] }) => Plugin

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }

  if (command === 'build') {
    base.build = {
      rollupOptions: {
        plugins: [
          (rollupPluginStripPragma as stripPragmas)({
            pragmas: ['debug'],
          }),
          {
            name: 'Rename Cesium',
            transform(source, sid) {
              if (/src[/\\]main.ts/.test(sid)) {
                return source.replace(
                  '/node_modules/@vcmap-cesium/engine/Build',
                  './assets/cesium/'
                )
              }
              return source
            },
          },
          {
            name: 'Copy Cesium',
            async closeBundle() {
              const cesiumPath = path.join(
                process.cwd(),
                'node_modules',
                '@vcmap-cesium',
                'engine'
              )
              const buildPath = path.join(
                process.cwd(),
                'dist',
                'assets',
                'cesium'
              )
              await Promise.all([
                fs.promises.cp(
                  path.join(cesiumPath, 'Source', 'Assets'),
                  path.join(buildPath, 'Assets'),
                  {
                    recursive: true,
                  }
                ),
                fs.promises.cp(
                  path.join(cesiumPath, 'Build', 'Workers'),
                  path.join(buildPath, 'Workers'),
                  {
                    recursive: true,
                  }
                ),
              ])
            },
          },
        ],
      },
    }
  }
  const protocol = 'http'
  const host = 'localhost'
  const port = 5173
  const fullHost = `${protocol}://${host}:${port}`
  base.server = {
    proxy: {
      '/node_modules/@vcmap-cesium/engine/Build/Assets': {
        target: fullHost,
        rewrite: (path) => path.replace(/Build/, 'Source'),
      },
    },
  }

  return base
})
