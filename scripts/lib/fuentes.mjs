/**
 * fuentes.mjs — el juego de caracteres declarado y su cobertura real (P2, AD4).
 *
 * Lo comparten `scripts/generar-fuentes.mjs` y `scripts/verificar-invariantes.mjs`
 * para que la regla sea una sola: el defecto de la Etapa 2 no fue que faltaran
 * glifos, fue que `subset-font` los descartaba en silencio.
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import subsetFont from 'subset-font'

/** `U+03A9` → código numérico. */
export const aCodigo = (texto) => parseInt(texto.replace(/^U\+/i, ''), 16)

/** Código numérico o carácter → `U+03A9`. */
export const aTextoCodigo = (c) =>
  'U+' + (typeof c === 'number' ? c : c.codePointAt(0)).toString(16).toUpperCase().padStart(4, '0')

/**
 * Lee `src/config/caracteres.json` y devuelve el conjunto ya resuelto.
 *
 * @param {string} raiz
 */
export function leerConjunto(raiz) {
  const datos = JSON.parse(readFileSync(path.join(raiz, 'src/config/caracteres.json'), 'utf8'))
  const declarados = new Set()
  for (const grupo of datos.grupos) {
    if (grupo.rango) {
      const [desde, hasta] = grupo.rango.map(aCodigo)
      for (let cp = desde; cp <= hasta; cp++) declarados.add(cp)
    }
    for (const c of grupo.caracteres ?? '') declarados.add(c.codePointAt(0))
  }
  const prohibidos = datos.prohibidos.map((p) => ({
    ...p,
    cp: aCodigo(p.codigo),
    sugerencia: p.usarCodigo
      ? `${String.fromCodePoint(aCodigo(p.usarCodigo))} (${p.usarCodigo})`
      : p.usar,
  }))
  for (const p of prohibidos) {
    if (declarados.has(p.cp)) {
      throw new Error(`caracteres.json: ${p.codigo} está declarado y prohibido a la vez`)
    }
  }
  return { declarados, prohibidos, fuentes: datos.fuentes }
}

// harfbuzzjs exporta una promesa en CommonJS. Se carga con require: la
// importación ESM la envuelve en un espacio de nombres bajo el transformador de
// Vitest y deja de ser una promesa utilizable.
const requerir = createRequire(import.meta.url)
let hbPromesa
const hb = () => (hbPromesa ??= requerir('harfbuzzjs'))

/**
 * Códigos de `candidatos` que la fuente contiene de verdad. Descomprime a
 * TrueType con subset-font porque harfbuzz no lee WOFF2: sin ese paso la
 * medición da cero glifos, como pasó la primera vez en la Etapa 3.
 *
 * @param {Buffer} fuente WOFF2 o TTF
 * @param {Iterable<number>} candidatos
 * @returns {Promise<Set<number>>}
 */
export async function glifosPresentes(fuente, candidatos) {
  const texto = String.fromCodePoint(...candidatos)
  const ttf = await subsetFont(fuente, texto, { targetFormat: 'truetype' })
  const motor = await hb()
  const blob = motor.createBlob(ttf)
  const cara = motor.createFace(blob, 0)
  try {
    return new Set(cara.collectUnicodes())
  } finally {
    cara.destroy()
    blob.destroy()
  }
}

/**
 * Comprobación A de P2 — bloqueante: todo carácter declarado debe sobrevivir
 * al subconjuntado **en su rol**. Una cara de texto debe cubrir el conjunto
 * entero; una cara mono puede apoyarse en su respaldo (IBM Plex Sans), pero
 * cada carácter tomado del respaldo se informa, no se oculta.
 *
 * @param {{ raiz: string, directorio?: string, declarados?: Set<number> }} opciones
 * @returns {Promise<{ fallos: string[], deRespaldo: Record<string, string[]> }>}
 */
export async function verificarGlifos({ raiz, directorio = 'public/fuentes', declarados }) {
  const conjunto = leerConjunto(raiz)
  const objetivo = declarados ?? conjunto.declarados
  const leer = (id) => readFileSync(path.join(raiz, directorio, `${id}.woff2`))

  const cobertura = new Map()
  const todas = [
    ...new Set(Object.values(conjunto.fuentes).flatMap((r) => [...r.caras, ...r.respaldo])),
  ]
  for (const id of todas) cobertura.set(id, await glifosPresentes(leer(id), objetivo))

  const fallos = []
  const deRespaldo = {}
  for (const [rol, def] of Object.entries(conjunto.fuentes)) {
    for (const id of def.caras) {
      const propios = cobertura.get(id)
      const tomados = []
      for (const cp of objetivo) {
        if (propios.has(cp)) continue
        const enRespaldo =
          def.respaldo.length > 0 && def.respaldo.every((r) => cobertura.get(r).has(cp))
        if (enRespaldo) tomados.push(cp)
        else fallos.push(`${id} (${rol}): ${aTextoCodigo(cp)} no tiene glifo ni en su respaldo`)
      }
      if (tomados.length > 0) {
        deRespaldo[id] = tomados.map((cp) => `${String.fromCodePoint(cp)} ${aTextoCodigo(cp)}`)
      }
    }
  }
  return { fallos, deRespaldo }
}

export const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`
