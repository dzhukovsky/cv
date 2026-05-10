import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import YAML from 'yaml'

// `import data from './foo.yml'` → parsed object, anchors/aliases resolved at build time.
function yamlPlugin(): Plugin {
  return {
    name: 'yaml-loader',
    transform(code, id) {
      if (!/\.ya?ml$/.test(id)) return null
      const data = YAML.parse(code)
      return {
        code: `export default ${JSON.stringify(data)}`,
        map: { mappings: '' },
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), yamlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
