import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export function problemasProducto(html, capacidades) {
  const errores = []
  const corte = html.indexOf('data-capacidades="desarrollo"')
  if (corte < 0 || !html.includes('data-capacidades="verificadas"'))
    return ['Faltan secciones de capacidades']
  for (const [nombre, contenido, esperados] of [
    ['verificadas', html.slice(0, corte), capacidades.filter((c) => c.estado === 'verificado')],
    ['desarrollo', html.slice(corte), capacidades.filter((c) => c.estado !== 'verificado')],
  ]) {
    const ids = [...contenido.matchAll(/data-capacidad="([^"]+)"/g)].map((m) => m[1]).sort()
    if (JSON.stringify(ids) !== JSON.stringify(esperados.map((c) => c.id).sort()))
      errores.push(`Inventario distinto en ${nombre}`)
  }
  if (!html.includes('En desarrollo')) errores.push('Falta etiqueta En desarrollo')
  const hero = html.match(/<header[^>]*data-hero[^>]*>([\s\S]*?)<\/header>/)?.[1] ?? ''
  const sinInsignia = hero.replace(
    /<span[^>]*class="[^"]*insignia[^"]*"[^>]*>[\s\S]*?<\/span>/g,
    '',
  )
  if (/\b(pronto|próxim\w*|20\d{2})\b/i.test(sinInsignia))
    errores.push('Fecha o promesa temporal fuera del estado')
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/width="\d+"/.test(img[0]) || !/height="\d+"/.test(img[0]))
      errores.push('Imagen sin dimensiones')
  }
  return errores
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { capacidades } = JSON.parse(readFileSync('src/config/capacidades.json', 'utf8'))
  let fallos = 0
  for (const archivo of ['dist/index.html', 'dist/producto/index.html']) {
    const problemas = problemasProducto(readFileSync(archivo, 'utf8'), capacidades)
    console.log(
      `${archivo}: ${problemas.length ? problemas.join('; ') : 'HTML coincide con inventario; estados y dimensiones correctos'}`,
    )
    fallos += problemas.length
  }
  if (fallos) process.exitCode = 1
}
