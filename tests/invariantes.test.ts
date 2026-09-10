/**
 * Pruebas del verificador de invariantes contra árboles de archivos temporales.
 *
 * El criterio de la Etapa 3 pide una prueba negativa de I7: introducir un
 * literal prohibido, ver fallar el script, quitarlo y verlo pasar. Aquí esa
 * prueba es permanente — corre en cada CI —, de modo que si alguien debilita
 * el verificador sin querer, el fallo aparece en la misma PR.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  normalizar,
  tieneColorLiteral,
  verificarI7,
  verificarTokens,
} from '../scripts/verificar-invariantes.mjs'

let raiz: string | undefined

/** Crea un árbol temporal con los archivos dados y devuelve su raíz. */
function arbol(archivos: Record<string, string>): string {
  raiz = mkdtempSync(path.join(tmpdir(), 'calcinst-invariantes-'))
  for (const [ruta, contenido] of Object.entries(archivos)) {
    const completa = path.join(raiz, ruta)
    mkdirSync(path.dirname(completa), { recursive: true })
    writeFileSync(completa, contenido)
  }
  return raiz
}

afterEach(() => {
  if (raiz) rmSync(raiz, { recursive: true, force: true })
  raiz = undefined
})

describe('I7 — el estado de lanzamiento vive solo en src/config/', () => {
  it('falla si un componente contiene un literal de estado', () => {
    const r = arbol({ 'src/components/Prueba.astro': '<a href="/x/">Únete a la lista</a>' })
    const fallos = verificarI7(r)
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toContain('src/components/Prueba.astro:1')
  })

  it('pasa cuando el literal se retira', () => {
    const r = arbol({ 'src/components/Prueba.astro': '<a href="/x/">{texto}</a>' })
    expect(verificarI7(r)).toEqual([])
  })

  it('no reporta los literales dentro de src/config/', () => {
    const r = arbol({
      'src/config/lanzamiento.ts': "accion: 'Únete a la lista', insignia: 'Próximamente'",
    })
    expect(verificarI7(r)).toEqual([])
  })

  it('detecta variantes sin acento y en mayúsculas', () => {
    const r = arbol({
      'src/pages/a.astro': '<p>PRÓXIMAMENTE</p>',
      'src/pages/b.astro': '<p>unete a la lista</p>',
      'src/pages/c.astro': '<p>Descargar BETA</p>',
    })
    expect(verificarI7(r)).toHaveLength(3)
  })

  it('trata la comparación de estados fuera de config como violación', () => {
    // Comparar estados en un componente es lógica de estado fuera de su sitio.
    const r = arbol({ 'src/components/Nav.astro': 'if (estado === ESTADOS.proximamente) {}' })
    expect(verificarI7(r)).toHaveLength(1)
  })

  it('revisa también el contenido en Markdown', () => {
    const r = arbol({ 'src/content/blog/post.mdx': 'Muy pronto: próximamente.' })
    expect(verificarI7(r)).toHaveLength(1)
  })

  it('normalizar quita diacríticos y mayúsculas', () => {
    expect(normalizar('Únete PRÓXIMAMENTE')).toBe('unete proximamente')
  })
})

describe('TOKENS — el color se define solo en tokens.css', () => {
  it('falla si un componente escribe un hex', () => {
    const r = arbol({ 'src/components/X.astro': '.a { color: #5cc8ff; }' })
    expect(verificarTokens(r)).toHaveLength(1)
  })

  it('falla con funciones de color', () => {
    expect(tieneColorLiteral('color: rgb(0 0 0);')).toBe(true)
    expect(tieneColorLiteral('color: oklch(70% 0.1 200);')).toBe(true)
  })

  it('acepta variables y las variables de Shiki', () => {
    expect(tieneColorLiteral('color: var(--link);')).toBe(false)
    expect(tieneColorLiteral('color: var(--shiki-dark);')).toBe(false)
  })

  it('no revisa tokens.css, que es donde el color debe vivir', () => {
    const r = arbol({ 'src/styles/tokens.css': ':root { --link: #5cc8ff; }' })
    expect(verificarTokens(r)).toEqual([])
  })
})
