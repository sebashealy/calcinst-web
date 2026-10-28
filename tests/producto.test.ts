import { describe, expect, it } from 'vitest'
import { problemasProducto } from '../scripts/verificar-producto.mjs'
import { DESTINOS, ESTADOS } from '../src/config/lanzamiento'

const capacidades = [
  { id: 'a', estado: 'verificado' },
  { id: 'b', estado: 'implementado' },
  { id: 'c', estado: 'planeado' },
]
const html =
  '<header data-hero><span class="insignia">Próximamente</span></header><div data-capacidades="verificadas"><article data-capacidad="a"></article></div><section data-capacidades="desarrollo">En desarrollo<li data-capacidad="b"></li><li data-capacidad="c"></li></section><img width="2560" height="1600">'
describe('puerta del HTML de Inicio y Producto', () => {
  it('acepta la separación completa del inventario', () =>
    expect(problemasProducto(html, capacidades)).toEqual([]))
  it('rechaza promocionar una capacidad implementada', () =>
    expect(
      problemasProducto(html.replace('data-capacidad="a"', 'data-capacidad="b"'), capacidades),
    ).not.toEqual([]))
  it('detecta un cambio de estado sin reconstruir el HTML', () =>
    expect(
      problemasProducto(
        html,
        capacidades.map((c) => ({ ...c, estado: 'planeado' })),
      ),
    ).not.toEqual([]))
  it('rechaza duplicados y capacidades inventadas', () =>
    expect(
      problemasProducto(
        html.replace('</article>', '</article><article data-capacidad="x"></article>'),
        capacidades,
      ),
    ).not.toEqual([]))
  it('rechaza ocultar lo planeado', () =>
    expect(problemasProducto(html.replace('data-capacidad="c"', ''), capacidades)).not.toEqual([]))
  it('rechaza fechas y promesas fuera de la insignia', () =>
    expect(
      problemasProducto(
        html.replace('<header data-hero>', '<header data-hero>Pronto, en 2027'),
        capacidades,
      ),
    ).not.toEqual([]))
  it('rechaza imágenes que no reservan espacio', () =>
    expect(problemasProducto(html.replace('width="2560"', ''), capacidades)).not.toEqual([]))
  it('dirige al blog durante desarrollo y reserva descarga para después', () => {
    expect(DESTINOS[ESTADOS.proximamente]).toBe('/blog/')
    expect(DESTINOS[ESTADOS.beta]).toBe('/descarga/')
    expect(DESTINOS[ESTADOS.disponible]).toBe('/descarga/')
  })
})
