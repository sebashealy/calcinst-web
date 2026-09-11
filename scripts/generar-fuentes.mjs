#!/usr/bin/env node
/**
 * generar-fuentes.mjs — subconjunta IBM Plex al juego de caracteres declarado.
 *
 * Origen: las fuentes COMPLETAS de IBM (@ibm/plex-sans, @ibm/plex-mono), no el
 * recorte `latin` de Fontsource que usaba la Etapa 2 y que perdía en silencio el
 * griego, los operadores y las flechas (P2). El conjunto vive en
 * `src/config/caracteres.json`; este script no lo define, lo lee.
 *
 * Falla —exit 1— si un carácter declarado no sobrevive en su rol o si el total
 * supera el presupuesto. Es un script de mantenimiento: se ejecuta a mano cuando
 * cambian las fuentes o el conjunto, y su salida (`public/fuentes/`) se versiona.
 * En CI, la misma comprobación la corre `verificar-invariantes.mjs`.
 *
 *   npm run fuentes
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import subsetFont from 'subset-font'
import { kib, leerConjunto, verificarGlifos } from './lib/fuentes.mjs'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = path.join(RAIZ, 'public', 'fuentes')
const requerir = createRequire(import.meta.url)

/** §3 fija «< 60 KB». Se adopta la lectura estricta, 60 000 B, no 61 440. */
const PRESUPUESTO_BYTES = 60_000

/** Las cuatro caras de §3.3, con su archivo de origen dentro del paquete de IBM. */
const CARAS = [
  {
    id: 'ibm-plex-sans-400',
    origen: '@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2',
  },
  {
    id: 'ibm-plex-sans-600',
    origen: '@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-SemiBold.woff2',
  },
  {
    id: 'ibm-plex-mono-400',
    origen: '@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2',
  },
  {
    id: 'ibm-plex-mono-500',
    origen: '@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Medium.woff2',
  },
]

const version = (paquete) => requerir(`${paquete}/package.json`).version

async function main() {
  const { declarados } = leerConjunto(RAIZ)
  const texto = String.fromCodePoint(...declarados)
  mkdirSync(DESTINO, { recursive: true })

  console.log(
    `Origen: @ibm/plex-sans ${version('@ibm/plex-sans')}, @ibm/plex-mono ${version('@ibm/plex-mono')}`,
  )
  console.log(`Conjunto declarado: ${declarados.size} caracteres (src/config/caracteres.json)\n`)

  let total = 0
  for (const { id, origen } of CARAS) {
    const fuente = readFileSync(requerir.resolve(origen))
    const recortada = await subsetFont(fuente, texto, { targetFormat: 'woff2' })
    writeFileSync(path.join(DESTINO, `${id}.woff2`), recortada)
    total += recortada.length
    console.log(
      `${id.padEnd(20)} ${kib(fuente.length).padStart(9)} -> ${String(recortada.length).padStart(6)} B`,
    )
  }

  // La OFL exige que la licencia acompañe a la fuente cuando se redistribuye.
  copyFileSync(
    requerir.resolve('@ibm/plex-sans/LICENSE.txt'),
    path.join(DESTINO, 'LICENSE-IBM-Plex-OFL.txt'),
  )

  console.log('-'.repeat(52))
  console.log(`${'TOTAL'.padEnd(20)} ${String(total).padStart(19)} B = ${kib(total)}`)
  console.log(
    `Presupuesto: ${PRESUPUESTO_BYTES} B — ${total < PRESUPUESTO_BYTES ? 'DENTRO' : 'EXCEDE'}\n`,
  )

  const { fallos, deRespaldo } = await verificarGlifos({ raiz: RAIZ })
  for (const [cara, caracteres] of Object.entries(deRespaldo)) {
    console.log(`${cara} toma de su respaldo (IBM Plex Sans): ${caracteres.join(', ')}`)
  }
  if (fallos.length > 0) {
    console.error('\nCARACTERES DECLARADOS QUE NO SOBREVIVEN AL SUBCONJUNTADO:')
    for (const f of fallos) console.error(`  - ${f}`)
  } else {
    console.log('Todos los caracteres declarados sobreviven en su rol.')
  }

  if (fallos.length > 0 || total >= PRESUPUESTO_BYTES) process.exitCode = 1
}

await main()
