/**
 * blog.ts — esquema del frontmatter (D8) y reglas de publicación del blog.
 *
 * Vive fuera de `content.config.ts` para poder probarlo sin Astro:
 * `tests/blog-schema.test.ts` lo ejerce con frontmatters de prueba. Astro lo
 * aplica a cada entrada al construir, así que un post que no cumple rompe el
 * build (I3 a).
 */
import { z } from 'astro/zod'
import { VERSION_NOM } from '../config/norma'

/** Cinco categorías cerradas hasta que existan 20 posts (D8). */
export const CATEGORIAS = [
  'conductores',
  'motores',
  'canalizaciones',
  'puesta-a-tierra',
  'practica-profesional',
] as const

export type Categoria = (typeof CATEGORIAS)[number]

export const NOMBRE_CATEGORIA: Record<Categoria, string> = {
  conductores: 'Conductores',
  motores: 'Motores',
  canalizaciones: 'Canalizaciones',
  'puesta-a-tierra': 'Puesta a tierra',
  'practica-profesional': 'Práctica profesional',
}

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const esquemaNormativa = z.object({
  /** Artículo, sección o tabla tal como se cita: "430-22", "310-15(b)(16)". */
  ref: z.string().min(1),
  tipo: z.enum(['tabla', 'articulo', 'nota']),
  /** Versión citada; por omisión, la que fija `src/config/norma.ts` (H1). */
  version: z.string().min(1).default(VERSION_NOM),
  /** `false` impide publicar: solo Sebastián lo pone en `true`, tras cotejar con el DOF. */
  verificadoDOF: z.boolean(),
})

export const esquemaErrata = z.object({
  fecha: z.coerce.date(),
  descripcion: z.string().min(1),
  afectaResultado: z.boolean(),
})

export const esquemaPost = z
  .object({
    title: z.string().min(1).max(70, 'el título no debe pasar de 70 caracteres'),
    description: z
      .string()
      .min(120, 'la descripción debe tener al menos 120 caracteres')
      .max(160, 'la descripción no debe pasar de 160 caracteres'),
    fechaPublicacion: z.coerce.date(),
    fechaActualizacion: z.coerce.date().optional(),
    categoria: z.enum(CATEGORIAS),
    etiquetas: z.array(z.string().regex(KEBAB, 'etiqueta en minúsculas con guiones')).default([]),
    normativa: z
      .array(esquemaNormativa)
      .min(1, 'cada post debe citar al menos una referencia normativa (I3)'),
    /** Obligatorio y explícito: nadie publica por omisión. */
    borrador: z.boolean(),
    erratas: z.array(esquemaErrata).default([]),
    slugsAnteriores: z.array(z.string().regex(KEBAB)).default([]),
    imagenPortada: z.string().optional(),
  })
  .superRefine((post, ctx) => {
    if (!post.borrador) {
      post.normativa.forEach((n, i) => {
        if (!n.verificadoDOF) {
          ctx.addIssue({
            code: 'custom',
            path: ['normativa', i, 'verificadoDOF'],
            message: `«${n.ref}» no está cotejada con el DOF: un post publicado no puede citarla (I3)`,
          })
        }
      })
    }
    if (post.erratas.length > 0 && !post.fechaActualizacion) {
      ctx.addIssue({
        code: 'custom',
        path: ['fechaActualizacion'],
        message: 'un post con erratas debe declarar fechaActualizacion',
      })
    }
  })

export type DatosPost = z.infer<typeof esquemaPost>

/**
 * Slugs que no pueden usarse porque chocarían con rutas del blog: los
 * números son páginas del índice (`/blog/2/`) y el resto, secciones.
 */
const SLUGS_RESERVADOS = new Set(['categoria', 'etiqueta', 'rss', 'erratas', 'normativa'])

/**
 * D8: el slug no contiene fecha ni categoría y es inmutable. Aquí se valida su
 * forma; la inmutabilidad la protege `slugsAnteriores` y `_redirects`.
 */
export function problemasDeSlug(slug: string): string[] {
  const problemas: string[] = []
  if (!KEBAB.test(slug)) problemas.push('debe estar en minúsculas con guiones')
  if (/^\d+$/.test(slug)) problemas.push('no puede ser solo un número: chocaría con la paginación')
  if (/^\d{4}-\d{2}/.test(slug)) problemas.push('no puede empezar por una fecha (D8)')
  if (SLUGS_RESERVADOS.has(slug)) problemas.push('es una ruta reservada del blog')
  return problemas
}

/**
 * Los borradores se excluyen del build. Solo entran con MOSTRAR_BORRADORES=1,
 * que existe para validar la infraestructura en local y nunca se configura en
 * Cloudflare.
 */
export const mostrarBorradores = () => process.env.MOSTRAR_BORRADORES === '1'

interface ConFecha {
  data: { borrador: boolean; fechaPublicacion: Date }
}

/** Posts que se publican, del más reciente al más antiguo. */
export function publicables<T extends ConFecha>(entradas: T[]): T[] {
  return entradas
    .filter((e) => !e.data.borrador || mostrarBorradores())
    .sort((a, b) => b.data.fechaPublicacion.getTime() - a.data.fechaPublicacion.getTime())
}

export const fechaLarga = (fecha: Date) =>
  new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' }).format(fecha)
