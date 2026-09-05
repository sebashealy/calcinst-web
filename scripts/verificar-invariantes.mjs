#!/usr/bin/env node
/**
 * verificar-invariantes.mjs — verificación de invariantes I1, I3 e I7 en CI.
 *
 * Contrato: sale con código 0 si todas las verificaciones activas pasan;
 * con código 1 si alguna falla, listando cada fallo por su invariante.
 *
 * Esqueleto de la Etapa 1. Las verificaciones se activan en su etapa:
 *  - I7 (Etapa 3): literales de estado de lanzamiento fuera de src/config/.
 *  - I3c (Etapa 4): términos de credenciales profesionales en src/ y content/.
 *  - I1 (Etapa 8): bloques catch vacíos en src/.
 */

/** @type {Array<{ invariante: string, descripcion: string, verificar: () => string[] }>} */
const verificaciones = [
  // Se agregan en las etapas 3, 4 y 8. Cada `verificar` devuelve la lista de fallos (vacía = OK).
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
  `verificar-invariantes: ${verificaciones.length} verificaciones activas, ${totalFallos} fallos (esqueleto Etapa 1)`,
)
process.exit(totalFallos === 0 ? 0 : 1)
