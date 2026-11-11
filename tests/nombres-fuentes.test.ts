import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import {
  checksum,
  registrosNombre,
  renombrarSfnt,
  renombrarWoff2,
  tablasSfnt,
  textoNombre,
} from '../scripts/lib/nombres-fuentes.mjs'
import { leerConjunto } from '../scripts/lib/fuentes.mjs'

const require = createRequire(import.meta.url)
// Estos dos módulos CommonJS no incluyen declaraciones TypeScript.
const fontverter = require('fontverter') as {
  convert: (bytes: Buffer, formato: string) => Promise<Buffer>
}
const subsetFont = require('subset-font') as (
  bytes: Buffer,
  texto: string,
  opciones: { targetFormat: string; preserveNameIds: number[] },
) => Promise<Buffer>
const caras = [
  ['sans-400', '@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-Regular.woff2'],
  ['sans-600', '@ibm/plex-sans/fonts/complete/woff2/IBMPlexSans-SemiBold.woff2'],
  ['mono-400', '@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2'],
  ['mono-500', '@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Medium.woff2'],
]

describe('subconjuntos con identidad propia', () => {
  it.each(caras)('%s conserva dibujo, métricas, avisos y regeneración', async (id, origen) => {
    const original = readFileSync(require.resolve(origen))
    const texto = String.fromCodePoint(...leerConjunto(process.cwd()).declarados)
    const subset = await subsetFont(original, texto, {
      targetFormat: 'woff2',
      preserveNameIds: [0, 7, 8, 9, 11, 13, 14],
    })
    const antes = await fontverter.convert(subset, 'sfnt')
    const despues = renombrarSfnt(antes)
    const ta = tablasSfnt(antes)
    const td = tablasSfnt(despues)
    expect([...td.keys()]).toEqual([...ta.keys()])
    for (const [tag, tabla] of ta) {
      if (tag === 'name') continue
      const nueva = Buffer.from(td.get(tag))
      const vieja = Buffer.from(tabla)
      if (tag === 'head') {
        nueva.writeUInt32BE(0, 8)
        vieja.writeUInt32BE(0, 8)
      }
      expect(nueva.equals(vieja), tag).toBe(true)
    }
    expect(checksum(despues)).toBe(0xb1b0afba)
    const registros = registrosNombre(td.get('name'))
    const nombres = registros.filter((r) => [1, 3, 4, 6, 16, 18, 21, 25].includes(r.id))
    expect(nombres.length).toBeGreaterThan(0)
    for (const r of nombres) expect(textoNombre(r)).not.toMatch(/plex/i)
    expect(nombres.some((r) => textoNombre(r).includes('CalcInst'))).toBe(true)
    const avisos = registrosNombre(ta.get('name')).filter((r) =>
      [0, 7, 8, 9, 11, 13, 14].includes(r.id),
    )
    expect(avisos.some((r) => r.id === 0)).toBe(true)
    for (const r of avisos) {
      expect(registros.some((n) => n.cabecera.equals(r.cabecera) && n.bytes.equals(r.bytes))).toBe(
        true,
      )
    }
    const woff = await renombrarWoff2(subset)
    expect(woff.equals(readFileSync(`public/fuentes/calcinst-${id}.woff2`))).toBe(true)
    expect((await renombrarWoff2(subset)).equals(woff)).toBe(true)
  })

  it('rechaza entradas que no sean TrueType', () => {
    expect(() => renombrarSfnt(Buffer.from('invalid'))).toThrow(/TrueType/)
  })

  it('rechaza una tabla name de formato desconocido', () => {
    const tabla = Buffer.alloc(6)
    tabla.writeUInt16BE(1)
    expect(() => registrosNombre(tabla)).toThrow(/formato 0/)
  })

  it('rechaza registros fuera de la tabla', () => {
    const tabla = Buffer.alloc(18)
    tabla.writeUInt16BE(1, 2)
    tabla.writeUInt16BE(18, 4)
    tabla.writeUInt16BE(10, 14)
    expect(() => registrosNombre(tabla)).toThrow(/truncado/)
  })
})
