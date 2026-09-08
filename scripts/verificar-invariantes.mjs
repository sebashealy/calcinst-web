#!/usr/bin/env node
/**
 * verificar-invariantes.mjs — verificación de invariantes del proyecto en CI.
 *
 * Contrato: sale con código 0 si todas las verificaciones activas pasan;
 * con código 1 si alguna falla, listando cada fallo por su invariante.
 *
 * Verificaciones activas:
 *  - TOKENS (Etapa 2): colores literales fuera de src/styles/tokens.css.
 *
 * Pendientes, cada una en su etapa:
 *  - I7 (Etapa 3): literales de estado de lanzamiento fuera de src/config/.
 *  - I3c (Etapa 4): términos de credenciales profesionales en src/ y content/.
 *  - I1 (Etapa 8): bloques catch vacíos en src/.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Lista recursiva de archivos bajo `directorio` con alguna de las extensiones dadas. */
function archivos(directorio, extensiones) {
  const absoluto = path.join(RAIZ, directorio)
  let entradas
  try {
    entradas = readdirSync(absoluto)
  } catch {
    // El directorio aún no existe en esta etapa: no es un fallo.
    return []
  }
  return entradas.flatMap((entrada) => {
    const completa = path.join(absoluto, entrada)
    const relativa = path.join(directorio, entrada)
    if (statSync(completa).isDirectory()) return archivos(relativa, extensiones)
    return extensiones.includes(path.extname(entrada)) ? [relativa] : []
  })
}

/**
 * El color solo se define en `tokens.css`; el resto del sitio lo consume por
 * variable. Mitiga el riesgo que el plan anota para la Etapa 2: colores sueltos
 * en componentes que luego escapan a la verificación de contraste.
 */
function coloresLiteralesFueraDeTokens() {
  const hex = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1,5})?\b/
  const funcional = /\b(?:rgba?|hsla?|oklch|color-mix)\s*\(/
  const fallos = []

  for (const relativa of [
    ...archivos('src/components', ['.astro', '.ts', '.tsx']),
    ...archivos('src/pages', ['.astro', '.ts', '.tsx']),
    ...archivos('src/layouts', ['.astro']),
  ]) {
    const lineas = readFileSync(path.join(RAIZ, relativa), 'utf8').split('\n')
    lineas.forEach((linea, i) => {
      // `currentColor` y las variables de Shiki no son colores literales.
      if (linea.includes('--shiki')) return
      if (hex.test(linea) || funcional.test(linea)) {
        fallos.push(`${relativa}:${i + 1} — ${linea.trim().slice(0, 90)}`)
      }
    })
  }
  return fallos
}

/** @type {Array<{ invariante: string, descripcion: string, verificar: () => string[] }>} */
const verificaciones = [
  {
    invariante: 'TOKENS',
    descripcion: 'el color se define solo en src/styles/tokens.css',
    verificar: coloresLiteralesFueraDeTokens,
  },
]

let totalFallos = 0
for (const { invariante, descripcion, verificar } of verificaciones) {
  const fallos = verificar()
  if (fallos.length > 0) {
    totalFallos += fallos.length
    console.error(`[FALLA] ${invariante} — ${descripcion}`)
    for (const fallo of fallos) console.error(`  - ${fallo}`)
  } else {
    console.log(`[OK] ${invariante} — ${descripcion}`)
  }
}

console.log(
  `verificar-invariantes: ${verificaciones.length} verificacion(es) activas, ${totalFallos} fallo(s)`,
)
process.exit(totalFallos === 0 ? 0 : 1)
