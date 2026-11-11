import fontverter from 'fontverter'

// Solo nombres de familia/identidad, nunca copyright, fabricante o licencia.
const IDENTIDAD = new Set([1, 3, 4, 6, 16, 18, 21, 25])
const alinear = (n) => Math.ceil(n / 4) * 4

export function checksum(bytes) {
  const padded = Buffer.alloc(alinear(bytes.length))
  bytes.copy(padded)
  let suma = 0
  for (let i = 0; i < padded.length; i += 4) suma = (suma + padded.readUInt32BE(i)) >>> 0
  return suma
}

export function tablasSfnt(bytes) {
  if (bytes.length < 12 || bytes.readUInt32BE(0) !== 0x00010000) {
    throw new Error('Se requiere una fuente TrueType individual')
  }
  const count = bytes.readUInt16BE(4)
  if (12 + count * 16 > bytes.length) throw new Error('Directorio SFNT truncado')
  const tablas = new Map()
  for (let i = 0; i < count; i++) {
    const p = 12 + i * 16
    const tag = bytes.toString('ascii', p, p + 4)
    const inicio = bytes.readUInt32BE(p + 8)
    const largo = bytes.readUInt32BE(p + 12)
    if (inicio + largo > bytes.length || tablas.has(tag)) throw new Error('Tabla SFNT inválida')
    tablas.set(tag, Buffer.from(bytes.subarray(inicio, inicio + largo)))
  }
  return tablas
}

export function registrosNombre(tabla) {
  if (!tabla || tabla.length < 6 || tabla.readUInt16BE(0) !== 0) {
    throw new Error('Solo se admite name formato 0 de las fuentes fijadas')
  }
  const count = tabla.readUInt16BE(2)
  const inicio = tabla.readUInt16BE(4)
  if (inicio < 6 + count * 12 || inicio > tabla.length) throw new Error('name inválida')
  return Array.from({ length: count }, (_, i) => {
    const p = 6 + i * 12
    const offset = inicio + tabla.readUInt16BE(p + 10)
    const largo = tabla.readUInt16BE(p + 8)
    if (offset + largo > tabla.length) throw new Error('Registro name truncado')
    return {
      cabecera: Buffer.from(tabla.subarray(p, p + 8)),
      plataforma: tabla.readUInt16BE(p),
      id: tabla.readUInt16BE(p + 6),
      bytes: Buffer.from(tabla.subarray(offset, offset + largo)),
    }
  })
}

export function textoNombre(registro) {
  const unicode = registro.plataforma === 0 || registro.plataforma === 3
  return unicode
    ? Buffer.from(registro.bytes).swap16().toString('utf16le')
    : registro.bytes.toString('latin1')
}

export function renombrarSfnt(bytes) {
  const tablas = tablasSfnt(bytes)
  if (!tablas.has('head') || tablas.has('DSIG')) throw new Error('Fuente no compatible')
  const registros = registrosNombre(tablas.get('name'))
  let cambios = 0
  for (const r of registros) {
    if (!IDENTIDAD.has(r.id)) continue
    if (![0, 1, 3].includes(r.plataforma)) throw new Error('Plataforma name no compatible')
    const antes = textoNombre(r)
    const despues = antes.replace(/IBM[ ]?Plex/g, 'CalcInst')
    if (/Plex/i.test(despues)) throw new Error('Nombre reservado sin resolver')
    if (antes !== despues) cambios++
    r.bytes =
      r.plataforma === 1 ? Buffer.from(despues, 'latin1') : Buffer.from(despues, 'utf16le').swap16()
  }
  if (!cambios) throw new Error('No se encontró el nombre original esperado')
  const inicio = 6 + registros.length * 12
  const name = Buffer.alloc(inicio + registros.reduce((n, r) => n + r.bytes.length, 0))
  if (name.length > 65535) throw new Error('Tabla name demasiado grande')
  name.writeUInt16BE(registros.length, 2)
  name.writeUInt16BE(inicio, 4)
  let offset = 0
  registros.forEach((r, i) => {
    const p = 6 + i * 12
    r.cabecera.copy(name, p)
    name.writeUInt16BE(r.bytes.length, p + 8)
    name.writeUInt16BE(offset, p + 10)
    r.bytes.copy(name, inicio + offset)
    offset += r.bytes.length
  })
  tablas.set('name', name)
  tablas.get('head').writeUInt32BE(0, 8)
  const salida = Buffer.alloc(
    12 + tablas.size * 16 + [...tablas.values()].reduce((n, t) => n + alinear(t.length), 0),
  )
  bytes.copy(salida, 0, 0, 12)
  let cursor = 12 + tablas.size * 16
  let headOffset
  let i = 0
  for (const [tag, tabla] of tablas) {
    const p = 12 + i++ * 16
    salida.write(tag, p, 4, 'ascii')
    salida.writeUInt32BE(checksum(tabla), p + 4)
    salida.writeUInt32BE(cursor, p + 8)
    salida.writeUInt32BE(tabla.length, p + 12)
    tabla.copy(salida, cursor)
    if (tag === 'head') headOffset = cursor
    cursor += alinear(tabla.length)
  }
  salida.writeUInt32BE((0xb1b0afba - checksum(salida)) >>> 0, headOffset + 8)
  return salida
}

export async function renombrarWoff2(bytes) {
  return fontverter.convert(renombrarSfnt(await fontverter.convert(bytes, 'sfnt')), 'woff2')
}
