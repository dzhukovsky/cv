import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import YAML from 'yaml'

// Inline YAML loader — `import data from './foo.yml'` returns the parsed object.
// Resolves anchors/aliases at build time, no runtime parser in the bundle.
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), yamlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
