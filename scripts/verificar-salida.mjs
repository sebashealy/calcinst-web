#!/usr/bin/env node
/**
 * verificar-salida.mjs — NOTACION sobre `dist/`, no sobre el código fuente (AD9).
 *
 * NOTACION comprueba que ningún punto de código prohibido esté en `src/` ni en
 * `content/`. Eso no cubre una ventana real: NFKC convierte U+00B5 en U+03BC, o
 * sea que la relación de compatibilidad Unicode empuja en sentido contrario a la
 * decisión de AD9. Si algún paso posterior al check normalizara —un minificador,
 * un plugin, una plantilla, un generador de imágenes— el carácter prohibido
 * llegaría a producción con el código fuente limpio y el invariante en verde.
 *
 * Este script mira lo que de verdad se sirve. Va después del build, no dentro de
 * `npm run verificar`, que en CI corre antes de construir.
 *
 *   npm run build && npm run verificar:salida
 */
import { pathToFileURL } from 'node:url'
import { verificarNotacionEnSalida } from './verificar-invariantes.mjs'

function main() {
  const fallos = verificarNotacionEnSalida()
  if (fallos.length > 0) {
    console.error('[FALLA] NOTACION-SALIDA — punto de código prohibido en dist/')
    for (const fallo of fallos) console.error(`  - ${fallo}`)
  } else {
    console.log('[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/')
  }
  console.log(`verificar-salida: ${fallos.length} fallo(s)`)
  process.exitCode = fallos.length === 0 ? 0 : 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
