/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// getViteConfig y no defineConfig a secas: así Vitest carga los componentes
// .astro con el mismo compilador que el sitio, y las pruebas de AD8 pueden
// renderizar CalloutNormativo con la API de contenedor en vez de comprobar
// solo la función que lo alimenta.
export default getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
