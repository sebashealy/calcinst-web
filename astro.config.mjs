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
    // Apagado por decisión de Sebastián (reversión de AD10). Venía activo por
    // omisión de Astro: convertía las comillas rectas del .mdx en inglesas, la
    // raya doble en raya y los tres puntos en puntos suspensivos. En un sitio
    // cuya premisa es que cada afirmación se rastrea hasta el DOF, que la página
    // muestre caracteres distintos de los de la fuente —en texto citado— es el
    // tipo de silencio que el proyecto no acepta. Además produce comillas
    // inglesas, no las angulares del español: ni siquiera acertaba. Quien quiera
    // comillas tipográficas teclea « » y pasan intactas.
    smartypants: false,
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  integrations: [mdx()],
})
