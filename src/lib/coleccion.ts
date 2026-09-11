/**
 * coleccion.ts — comprobaciones que el esquema no puede hacer porque necesitan
 * el cuerpo del post, no solo su frontmatter.
 *
 * Se llaman desde `getStaticPaths` de la página del post, que Astro ejecuta en
 * cada build: un problema aquí rompe el build (D8, I3 b). Recorren TODAS las
 * entradas, borradores incluidos, para que un error no espere a la publicación.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { citasNoDeclaradas } from '../../scripts/lib/mdx.mjs'
import { problemasDeSlug } from './blog'
import { VERSION_NOM } from '../config/norma'

interface Entrada {
  id: string
  body?: string
  /** Ruta del archivo que guarda el cargador `glob`, relativa a la raíz del proyecto. */
  filePath?: string
  data: { normativa: Array<{ ref: string; tipo: string; version: string }> }
}

/**
 * Fuente a analizar. Se prefiere el archivo completo: `body` no incluye el
 * frontmatter, así que sus números de línea no coinciden con los del archivo y
 * mandarían a quien redacta al lugar equivocado.
 */
function fuente(e: Entrada): { texto: string; lineasDelArchivo: boolean } | undefined {
  if (e.filePath) {
    const ruta = path.resolve(e.filePath)
    if (existsSync(ruta)) return { texto: readFileSync(ruta, 'utf8'), lineasDelArchivo: true }
  }
  return e.body === undefined ? undefined : { texto: e.body, lineasDelArchivo: false }
}

export function problemasDeColeccion(entradas: Entrada[]): string[] {
  return entradas.flatMap((e) => {
    const f = fuente(e)
    const citas = f
      ? citasNoDeclaradas(f.texto, e.data.normativa, VERSION_NOM).map(
          (p) => `${e.id}.mdx, ${p}${f.lineasDelArchivo ? '' : ' (línea contada desde el cuerpo)'}`,
        )
      : [`${e.id}.mdx: la entrada no conserva el cuerpo; no se puede cruzar con el frontmatter`]
    return [...problemasDeSlug(e.id).map((p) => `${e.id}.mdx: el slug ${p}`), ...citas]
  })
}

export function exigirColeccionValida(entradas: Entrada[]): void {
  const problemas = problemasDeColeccion(entradas)
  if (problemas.length > 0) {
    throw new Error(
      `El blog tiene ${problemas.length} problema(s) que impiden construir:\n` +
        problemas.map((p) => `  - ${p}`).join('\n'),
    )
  }
}
