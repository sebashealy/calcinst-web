/**
 * Estado de lanzamiento y configuración derivada (Etapa 3).
 *
 * Ninguna prueba fija el estado vigente ni copia sus textos: si lo hiciera,
 * cambiar `ESTADO_LANZAMIENTO` obligaría a editar también este archivo y se
 * rompería el criterio de la etapa («un solo archivo cambia»). Las pruebas
 * comparan contra la propia configuración.
 */
import { describe, expect, it } from 'vitest'
import {
  DESTINO_ACCION,
  ESTADOS,
  ESTADO_LANZAMIENTO,
  TEXTO,
  TEXTO_VIGENTE,
  type EstadoLanzamiento,
} from '../src/config/lanzamiento'
import {
  ENLACES_PIE,
  enlacesPrincipales,
  type Enlace,
  type Precios,
} from '../src/config/navegacion'
import producto from '../src/config/producto.json'
import capacidades from '../src/config/capacidades.json'

const TODOS = Object.values(ESTADOS) as EstadoLanzamiento[]

describe('estado de lanzamiento', () => {
  it('el estado vigente es uno de los tres definidos', () => {
    expect(TODOS).toContain(ESTADO_LANZAMIENTO)
  })

  it('TEXTO_VIGENTE corresponde al estado vigente', () => {
    expect(TEXTO_VIGENTE).toBe(TEXTO[ESTADO_LANZAMIENTO])
  })

  it('cada estado define un texto de acción no vacío', () => {
    for (const estado of TODOS) {
      expect(TEXTO[estado].accion.trim()).not.toBe('')
    }
  })

  it('el botón de acción dice algo distinto en cada estado', () => {
    expect(new Set(TODOS.map((e) => TEXTO[e].accion)).size).toBe(TODOS.length)
  })

  it('la línea del pie distingue los tres estados', () => {
    expect(new Set(TODOS.map((e) => TEXTO[e].pie)).size).toBe(TODOS.length)
  })

  it('la insignia distingue los tres estados', () => {
    expect(new Set(TODOS.map((e) => TEXTO[e].insignia.texto)).size).toBe(TODOS.length)
  })

  it('el botón de acción apunta a una ruta interna', () => {
    expect(DESTINO_ACCION).toMatch(/^\/[a-z-]+\/$/)
  })
})

describe('navegación — regla de «Precios» (§4.4)', () => {
  const tienePrecios = (enlaces: Enlace[]) => enlaces.some((e) => e.href === '/precios/')
  const precios: Precios = { ejemplo: 1 }

  const casos: Array<[EstadoLanzamiento, Precios | null, boolean]> = [
    [ESTADOS.proximamente, null, false],
    [ESTADOS.proximamente, precios, false],
    [ESTADOS.beta, precios, false],
    [ESTADOS.disponible, null, false],
    [ESTADOS.disponible, precios, true],
  ]

  it.each(casos)('estado %s, precios %o → «Precios» visible: %s', (estado, p, esperado) => {
    expect(tienePrecios(enlacesPrincipales(estado, p))).toBe(esperado)
  })

  it('los enlaces base aparecen en todos los estados', () => {
    for (const estado of TODOS) {
      const hrefs = enlacesPrincipales(estado, precios).map((e) => e.href)
      expect(hrefs).toEqual(expect.arrayContaining(['/producto/', '/quienes-somos/', '/blog/']))
    }
  })

  it('el pie enlaza términos, privacidad, contacto y RSS', () => {
    expect(ENLACES_PIE.map((e) => e.href)).toEqual([
      '/terminos/',
      '/privacidad/',
      '/contacto/',
      '/blog/rss.xml',
    ])
  })
})

describe('producto.json no duplica el estado (riesgo de la Etapa 3)', () => {
  const valores = (o: unknown): unknown[] =>
    o !== null && typeof o === 'object' ? Object.values(o).flatMap(valores) : [o]

  it('no tiene un campo «estado»', () => {
    expect(producto).not.toHaveProperty('estado')
  })

  it('ningún valor es el nombre de un estado de lanzamiento', () => {
    const coincidencias = valores(producto).filter((v) => TODOS.includes(v as EstadoLanzamiento))
    expect(coincidencias).toEqual([])
  })
})

describe('capacidades.json', () => {
  const lista = capacidades.capacidades

  it('los id son únicos', () => {
    expect(new Set(lista.map((c) => c.id)).size).toBe(lista.length)
  })

  it('cada capacidad está en uno de los tres estados de §4.3', () => {
    for (const c of lista) {
      expect(['verificado', 'implementado', 'planeado']).toContain(c.estado)
    }
  })

  it('cada capacidad tiene nombre, descripción y motivo', () => {
    for (const c of lista) {
      expect(c.nombre.trim(), c.id).not.toBe('')
      expect(c.descripcion.trim(), c.id).not.toBe('')
      expect(c.motivo.trim(), c.id).not.toBe('')
    }
  })

  it('una capacidad verificada no se apoya en normativa sin cotejar con el DOF', () => {
    // Guardia para la Etapa 5: Producto solo muestra lo `verificado`, y lo que
    // muestra no puede citar una referencia que nadie cotejó con el DOF (I3).
    for (const c of lista.filter((c) => c.estado === 'verificado')) {
      for (const n of c.normativa as Array<{ verificadoDOF?: boolean }>) {
        expect(n.verificadoDOF, c.id).toBe(true)
      }
    }
  })
})
