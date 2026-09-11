// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { SITIO } from './src/config/sitio.ts'

// https://astro.build/config
export default defineConfig({
  // Fuente única del canónico: src/config/sitio.ts.
  site: SITIO.dominio,
  // Todas las URL del sitio terminan en barra (D8: /blog/{slug}/). Con el valor
  // por omisión ('ignore'), paginate() generaba /blog/2 y /blog, y cada clic
  // costaba una redirección 307 hacia la forma con barra.
  trailingSlash: 'always',
  // Bloques de código del Markdown con los dos temas como variables, igual que
  // BloqueCodigo: el CSS del post elige según el tema activo del sitio.
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  integrations: [mdx()],
})
