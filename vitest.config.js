import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
const path = require('path')

const configTest = defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, '/src'),
      },
    ],
  },
  test: {
    setupFiles: ['./tests/setup.js'],
    environment: 'jsdom',
    globals: true,
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    root: 'src', //Define the root
  },
})
export default configTest
