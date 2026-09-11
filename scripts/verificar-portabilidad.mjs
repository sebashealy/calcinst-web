#!/usr/bin/env node
/**
 * verificar-portabilidad.mjs — invariante I2: el contenido es portable.
 *
 * Analiza cada post con remark puro, fuera de Astro (que en la versión 7 ni
 * siquiera usa remark para MDX), y falla si:
 *   1. usa un componente que no está en `componentes-portables.json`;
 *   2. contiene `import`/`export` o expresiones `{…}`, que solo entiende MDX;
 *   3. algún texto del archivo no aparece en la página que construyó Astro.
 *
 * La comprobación 3 necesita el post construido en `dist/`. Los borradores no
 * se construyen en producción: se informan y se omiten. Para validarlos,
 * `MOSTRAR_BORRADORES=1 npm run build` antes de ejecutar este script.
 *
 *   node scripts/verificar-portabilidad.mjs
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { analizarMdx } from './lib/mdx.mjs'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

/** Texto visible de un HTML: sin scripts ni estilos, con entidades decodificadas. */
export function textoVisible(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entidad, nombre) => {
      if (nombre[0] === '#') {
        const hex = nombre[1] === 'x' || nombre[1] === 'X'
        return String.fromCodePoint(parseInt(nombre.slice(hex ? 2 : 1), hex ? 16 : 10))
      }
      return ENTIDADES[nombre.toLowerCase()] ?? entidad
    })
    .replace(/\s+/g, ' ')
}

/** Los componentes son los nombres con mayúscula; en minúscula, MDX los trata como HTML. */
const esComponente = (nombre) => /^[A-Z]/.test(nombre)

/**
 * Comprobaciones 1 y 2: lo que no sobreviviría fuera de Astro.
 *
 * @param {string} fuente
 * @param {string[]} permitidos
 * @returns {string[]}
 */
export function problemasDePortabilidad(fuente, permitidos) {
  const { componentes, esm, expresiones } = analizarMdx(fuente)
  return [
    ...[...componentes.keys()]
      .filter((n) => esComponente(n) && !permitidos.includes(n))
      .map((n) => `usa <${n}>, que no está en componentes-portables.json`),
    ...esm.map(
      (l) => `línea ${l}: import/export de MDX; los componentes se inyectan, no se importan`,
    ),
    ...expresiones.map((l) => `línea ${l}: expresión {…} de MDX, que no existe en Markdown`),
  ]
}

/**
 * Comprobación 3: textos del .mdx, leídos con remark, que no aparecen en el HTML.
 *
 * @param {string} fuente
 * @param {string} html
 * @returns {string[]}
 */
export function textosPerdidos(fuente, html) {
  const visible = textoVisible(html)
  return analizarMdx(fuente).textos.filter((t) => !visible.includes(t))
}

function main() {
  const permitidos = Object.keys(
    JSON.parse(readFileSync(path.join(RAIZ, 'componentes-portables.json'), 'utf8')).componentes,
  )
  const dir = path.join(RAIZ, 'src/content/blog')
  const posts = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.mdx')) : []

  let fallos = 0
  let comparados = 0
  for (const archivo of posts) {
    const slug = archivo.replace(/\.mdx$/, '')
    const fuente = readFileSync(path.join(dir, archivo), 'utf8')
    const problemas = problemasDePortabilidad(fuente, permitidos)
    const pagina = path.join(RAIZ, 'dist/blog', slug, 'index.html')
    let perdidos = []
    let nota = ''
    if (existsSync(pagina)) {
      perdidos = textosPerdidos(fuente, readFileSync(pagina, 'utf8'))
      comparados++
    } else {
      nota =
        ' (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)'
    }
    const todos = [
      ...problemas,
      ...perdidos.map((t) => `texto que no aparece en la página: «${t}»`),
    ]
    fallos += todos.length
    console.log(`${todos.length === 0 ? '[OK]' : '[FALLA]'} ${archivo}${nota}`)
    for (const p of todos) console.log(`  - ${p}`)
  }

  console.log(
    `verificar-portabilidad: ${posts.length} post(s), ${comparados} comparado(s) con su página, ${fallos} fallo(s)`,
  )
  process.exitCode = fallos === 0 ? 0 : 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
