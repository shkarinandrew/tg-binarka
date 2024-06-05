import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import svgr from 'vite-plugin-svgr';

interface ViteConfigProps {
  mode: 'development' | 'production';
  command: string;
}

export default ({ mode }: ViteConfigProps) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
      }),
      splitVendorChunkPlugin(),
    ],
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
  });
};
