// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

// Rama prueba/i5-humo: adaptador de Cloudflare SOLO para la prueba de humo I5.
// Las páginas existentes siguen prerenderizadas; únicamente /api/ping es bajo demanda.
// https://astro.build/config
export default defineConfig({
  site: 'https://calcinst.mx',
  adapter: cloudflare(),
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
})
