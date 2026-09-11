/**
 * Esquema del frontmatter (D8) y reglas de publicación (I3 a).
 *
 * Son las mismas reglas que Astro aplica al construir: aquí se prueban sin
 * build, con frontmatters en memoria. Ninguno se publica.
 */
import { afterEach, describe, expect, it } from 'vitest'
import { esquemaPost, problemasDeSlug, publicables } from '../src/lib/blog'
import { VERSION_NOM } from '../src/config/norma'

const DESCRIPCION =
  'Descripción de prueba con la longitud justa para cumplir el esquema del blog, que exige entre ciento veinte y ciento sesenta caracteres.'

const base = {
  title: 'Título de prueba',
  description: DESCRIPCION,
  fechaPublicacion: '2026-09-11',
  categoria: 'conductores',
  normativa: [{ ref: '430-22', tipo: 'articulo', verificadoDOF: false }],
  borrador: true,
}

/** Mensajes de error del esquema, con su ruta; vacío si el frontmatter es válido. */
function errores(datos: Record<string, unknown>): string[] {
  const r = esquemaPost.safeParse(datos)
  return r.success ? [] : r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
}

/** Copia de `datos` sin el campo `clave`. */
const sin = (datos: Record<string, unknown>, clave: string) =>
  Object.fromEntries(Object.entries(datos).filter(([k]) => k !== clave))

describe('esquema del frontmatter (D8)', () => {
  it('la descripción de las pruebas cumple su propio requisito de longitud', () => {
    expect(DESCRIPCION.length).toBeGreaterThanOrEqual(120)
    expect(DESCRIPCION.length).toBeLessThanOrEqual(160)
  })

  it('acepta un borrador válido', () => {
    expect(errores(base)).toEqual([])
  })

  it('criterio 1: rechaza un post sin normativa', () => {
    expect(errores(sin(base, 'normativa')).join('\n')).toMatch(/^normativa:/m)
  })

  it('criterio 1: rechaza una normativa vacía', () => {
    expect(errores({ ...base, normativa: [] }).join('\n')).toMatch(/al menos una referencia/)
  })

  it('criterio 2: rechaza publicar con una cita sin cotejar con el DOF', () => {
    const fallos = errores({ ...base, borrador: false })
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toMatch(/^normativa\.0\.verificadoDOF: .*430-22.*DOF/)
  })

  it('admite una cita sin cotejar mientras el post es borrador', () => {
    expect(errores({ ...base, borrador: true })).toEqual([])
  })

  it('exige declarar borrador de forma explícita', () => {
    expect(errores(sin(base, 'borrador')).join('\n')).toMatch(/^borrador:/m)
  })

  it('exige fechaActualizacion si hay erratas', () => {
    const conErratas = {
      ...base,
      erratas: [{ fecha: '2026-09-12', descripcion: 'x', afectaResultado: false }],
    }
    expect(errores(conErratas).join('\n')).toMatch(/^fechaActualizacion:/m)
    expect(errores({ ...conErratas, fechaActualizacion: '2026-09-12' })).toEqual([])
  })

  it('limita el título a 70 caracteres', () => {
    expect(errores({ ...base, title: 't'.repeat(71) }).join('\n')).toMatch(/^title:/m)
  })

  it('limita la descripción a 120–160 caracteres', () => {
    expect(errores({ ...base, description: 'corta' }).join('\n')).toMatch(/^description:/m)
    expect(errores({ ...base, description: 'd'.repeat(161) }).join('\n')).toMatch(/^description:/m)
  })

  it('solo admite las cinco categorías cerradas', () => {
    expect(errores({ ...base, categoria: 'protecciones' }).join('\n')).toMatch(/^categoria:/m)
  })

  it('exige etiquetas en minúsculas con guiones', () => {
    expect(errores({ ...base, etiquetas: ['Mayúsculas'] })).not.toEqual([])
    expect(errores({ ...base, etiquetas: ['con espacio'] })).not.toEqual([])
    expect(errores({ ...base, etiquetas: ['bien-escrita'] })).toEqual([])
  })

  it('toma la versión de la norma de src/config/norma.ts por omisión', () => {
    const r = esquemaPost.parse(base)
    expect(r.normativa[0]?.version).toBe(VERSION_NOM)
  })
})

describe('slug (D8)', () => {
  it('acepta minúsculas con guiones', () => {
    expect(problemasDeSlug('columna-de-75-grados')).toEqual([])
  })

  it.each([
    ['Con-Mayusculas', /minúsculas/],
    ['12', /número/],
    ['2026-09-11-post', /fecha/],
    ['categoria', /reservada/],
  ])('rechaza «%s»', (slug, motivo) => {
    expect(problemasDeSlug(slug).join(' ')).toMatch(motivo)
  })
})

describe('borradores', () => {
  const entrada = (id: string, fecha: string, borrador: boolean) => ({
    id,
    data: { borrador, fechaPublicacion: new Date(fecha) },
  })
  const entradas = [
    entrada('antiguo', '2026-01-01', false),
    entrada('borrador', '2026-06-01', true),
    entrada('reciente', '2026-03-01', false),
  ]

  afterEach(() => {
    delete process.env.MOSTRAR_BORRADORES
  })

  it('excluye los borradores y ordena del más reciente al más antiguo', () => {
    expect(publicables(entradas).map((e) => e.id)).toEqual(['reciente', 'antiguo'])
  })

  it('incluye los borradores solo con MOSTRAR_BORRADORES=1', () => {
    process.env.MOSTRAR_BORRADORES = '1'
    expect(publicables(entradas).map((e) => e.id)).toEqual(['borrador', 'reciente', 'antiguo'])
  })
})
