#!/usr/bin/env node
/**
 * generar-fuentes.mjs — descarga y subconjunta las fuentes del sitio.
 *
 * El plan (§3.3) pide IBM Plex Sans 400/600 e IBM Plex Mono 400/500, autoalojadas
 * y subconjuntadas, con un presupuesto de < 60 KB en total (I4, Etapa 2).
 * Los archivos `latin` completos de Fontsource suman 74.6 KiB, así que se recortan
 * al juego de caracteres que el sitio usa de verdad.
 *
 * Es un script de mantenimiento, no de build: se ejecuta a mano cuando cambian las
 * fuentes o el juego de caracteres, y su salida (`public/fuentes/`) se versiona.
 *
 *   node scripts/generar-fuentes.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import subsetFont from 'subset-font'

const VERSION_FONTSOURCE = '5.3.0'
const PRESUPUESTO_BYTES = 60 * 1024

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = path.join(RAIZ, 'public', 'fuentes')

/** Juego de caracteres del sitio: español, notación técnica y tipografía de cita. */
const CARACTERES = [
  Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCodePoint(0x20 + i)).join(''),
  'áéíóúüñÁÉÍÓÚÜÑ¿¡',
  '–—‘’“”…·«»',
  '°±×÷≤≥≈ΩµμΔ²³→←↑↓',
  '€✓✗',
].join('')

/** Las cuatro caras del plan §3.3. */
const CARAS = [
  { familia: 'ibm-plex-sans', peso: 400 },
  { familia: 'ibm-plex-sans', peso: 600 },
  { familia: 'ibm-plex-mono', peso: 400 },
  { familia: 'ibm-plex-mono', peso: 500 },
]

const urlDe = ({ familia, peso }) =>
  `https://cdn.jsdelivr.net/npm/@fontsource/${familia}@${VERSION_FONTSOURCE}/files/${familia}-latin-${peso}-normal.woff2`

const nombreDe = ({ familia, peso }) => `${familia}-${peso}.woff2`

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`

async function main() {
  await mkdir(DESTINO, { recursive: true })

  let totalOriginal = 0
  let totalFinal = 0
  const filas = []

  for (const cara of CARAS) {
    const url = urlDe(cara)
    const respuesta = await fetch(url)
    if (!respuesta.ok) {
      throw new Error(`No se pudo descargar ${url}: HTTP ${respuesta.status}`)
    }
    const original = Buffer.from(await respuesta.arrayBuffer())
    const recortada = await subsetFont(original, CARACTERES, { targetFormat: 'woff2' })

    await writeFile(path.join(DESTINO, nombreDe(cara)), recortada)

    totalOriginal += original.length
    totalFinal += recortada.length
    filas.push({
      archivo: nombreDe(cara),
      original: original.length,
      final: recortada.length,
      reduccion: `${(100 - (recortada.length / original.length) * 100).toFixed(1)} %`,
    })
  }

  for (const f of filas) {
    console.log(
      `${f.archivo.padEnd(24)} ${kib(f.original).padStart(9)} -> ${kib(f.final).padStart(9)}  (-${f.reduccion})`,
    )
  }
  console.log('-'.repeat(64))
  console.log(
    `${'TOTAL'.padEnd(24)} ${kib(totalOriginal).padStart(9)} -> ${kib(totalFinal).padStart(9)}`,
  )
  console.log(`Presupuesto: ${kib(PRESUPUESTO_BYTES)} (${PRESUPUESTO_BYTES} B)`)
  console.log(
    `Resultado:   ${totalFinal} B - ${totalFinal < PRESUPUESTO_BYTES ? 'DENTRO' : 'EXCEDE'}`,
  )
  console.log(`Caracteres subconjuntados: ${[...new Set(CARACTERES)].length}`)

  if (totalFinal >= PRESUPUESTO_BYTES) {
    process.exitCode = 1
  }
}

await main()
