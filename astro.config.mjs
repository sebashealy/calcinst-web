// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { SITIO } from './src/config/sitio.ts'

// https://astro.build/config
export default defineConfig({
  // Fuente única del canónico: src/config/sitio.ts.
  site: SITIO.dominio,
  integrations: [mdx()],
})
