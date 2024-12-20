import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> | false = {
  theme_color: '#6533c0',
  background_color: '#18181e',
  icons: [
    {
      purpose: 'maskable',
      sizes: '512x512',
      src: 'icon512_maskable.png',
      type: 'image/png'
    },
    {
      purpose: 'any',
      sizes: '512x512',
      src: 'icon512_rounded.png',
      type: 'image/png'
    }
  ],
  orientation: 'any',
  display: 'standalone',
  lang: 'en-US',
  name: 'pwaclient',
  short_name: 'pwa',
  start_url: '/',
  scope: '/'
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,css,js,ico,png,svg}']
      },
      manifest: manifest
    })
  ]
});
