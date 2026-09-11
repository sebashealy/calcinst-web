/**
 * mdx.mjs — análisis del cuerpo de un post con remark puro (D8, I2, I3 b).
 *
 * Astro 7 no usa remark para MDX (lo renderiza con markdown-satteri), así que
 * este análisis es independiente del motor del sitio: es la prueba de que el
 * contenido se entiende sin Astro. Lo usan el build (cruce cuerpo↔frontmatter,
 * que rompe el build) y `scripts/verificar-portabilidad.mjs`.
 */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'

// GFM incluido: tablas, tachado y notas al pie son Markdown portable (lo leen GitHub,
// pandoc y casi cualquier generador) y Astro 7 los renderiza. Aprobado por Sebastián.
const procesador = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkGfm)
  .use(remarkMdx)

/** Nodos cuyo texto se recoge entero; sus contenedores (listas, tablas…) no. */
const CON_TEXTO = new Set(['paragraph', 'heading', 'tableCell', 'code'])

const ELEMENTOS_JSX = new Set(['mdxJsxFlowElement', 'mdxJsxTextElement'])

function recorrer(nodo, visitar) {
  visitar(nodo)
  for (const hijo of nodo.children ?? []) recorrer(hijo, visitar)
}

/** Valor literal de un atributo JSX; `undefined` si falta o es una expresión. */
function atributo(nodo, nombre) {
  const a = nodo.attributes?.find((x) => x.type === 'mdxJsxAttribute' && x.name === nombre)
  return typeof a?.value === 'string' ? a.value : undefined
}

/**
 * @param {string} fuente contenido del .mdx (con o sin frontmatter)
 * @returns {{
 *   componentes: Map<string, number>,
 *   citas: Array<{ ref: string | undefined, tipo: string | undefined, version: string | undefined, linea: number }>,
 *   esm: number[],
 *   expresiones: number[],
 *   textos: string[],
 * }}
 */
export function analizarMdx(fuente) {
  const arbol = procesador.parse(fuente)
  const componentes = new Map()
  const citas = []
  const esm = []
  const expresiones = []
  const textos = []

  recorrer(arbol, (nodo) => {
    const linea = nodo.position?.start.line ?? 0
    if (ELEMENTOS_JSX.has(nodo.type)) {
      const nombre = nodo.name ?? '(fragmento)'
      componentes.set(nombre, (componentes.get(nombre) ?? 0) + 1)
      if (nombre === 'CalloutNormativo') {
        citas.push({
          ref: atributo(nodo, 'ref'),
          tipo: atributo(nodo, 'tipo'),
          version: atributo(nodo, 'version'),
          linea,
        })
      }
    } else if (nodo.type === 'mdxjsEsm') {
      esm.push(linea)
    } else if (nodo.type === 'mdxFlowExpression' || nodo.type === 'mdxTextExpression') {
      expresiones.push(linea)
    } else if (CON_TEXTO.has(nodo.type)) {
      const texto = toString(nodo).replace(/\s+/g, ' ').trim()
      if (texto) textos.push(texto)
    }
  })

  return { componentes, citas, esm, expresiones, textos }
}

/**
 * I3 b — cruce cuerpo↔frontmatter: toda cita del cuerpo debe estar declarada en
 * `normativa[]`, con el mismo tipo si el cuerpo lo indica y con la misma versión
 * que se va a pintar (la explícita o, si falta, `versionPorOmision`).
 *
 * @param {string} cuerpo
 * @param {Array<{ ref: string, tipo: string, version: string }>} declaradas
 * @param {string} versionPorOmision la de `src/config/norma.ts`
 * @returns {string[]}
 */
export function citasNoDeclaradas(cuerpo, declaradas, versionPorOmision) {
  const porRef = new Map(declaradas.map((n) => [n.ref, n]))
  return analizarMdx(cuerpo).citas.flatMap(({ ref, tipo, version, linea }) => {
    if (!ref) return [`línea ${linea}: <CalloutNormativo> sin atributo ref literal`]
    const declarada = porRef.get(ref)
    if (!declarada) {
      return [`línea ${linea}: cita «${ref}» en el cuerpo, pero no está declarada en normativa[]`]
    }
    if (tipo && tipo !== declarada.tipo) {
      return [
        `línea ${linea}: «${ref}» es «${tipo}» en el cuerpo y «${declarada.tipo}» en normativa[]`,
      ]
    }
    const pintada = version ?? versionPorOmision
    if (pintada !== declarada.version) {
      return [
        `línea ${linea}: «${ref}» se pintaría como ${pintada} pero normativa[] declara ${declarada.version}`,
      ]
    }
    return []
  })
}
