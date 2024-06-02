import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import { templateCompilerOptions } from '@tresjs/core'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    ...templateCompilerOptions
  }),
  svgLoader()
  ],
  optimizeDeps: {
    exclude: ['@tresjs/core']
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  assetsInclude: ['**/*.glb', '**/*.gltf']
})
