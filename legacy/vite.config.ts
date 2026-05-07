import react from '@vitejs/plugin-react-swc';
import path from 'path';
import vike from 'vike/plugin';
import { UserConfig } from 'vite';
import { cjsInterop } from 'vite-plugin-cjs-interop';

const config: UserConfig = {
  plugins: [
    react(),
    vike({ prerender: true }),
    cjsInterop({
      dependencies: ['@fluentui/react-components', 'file-saver'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssr: {
    noExternal: ['@fluentui/react-icons'],
  },
};

export default config;
