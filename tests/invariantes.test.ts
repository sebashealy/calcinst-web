/**
 * Pruebas del verificador de invariantes contra árboles de archivos temporales.
 *
 * El criterio de la Etapa 3 pide una prueba negativa de I7: introducir un
 * literal prohibido, ver fallar el script, quitarlo y verlo pasar. Aquí esa
 * prueba es permanente — corre en cada CI —, de modo que si alguien debilita
 * el verificador sin querer, el fallo aparece en la misma PR.
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  normalizar,
  tieneColorLiteral,
  verificarCaracteres,
  verificarI7,
  verificarNotacion,
  verificarTokens,
} from '../scripts/verificar-invariantes.mjs'
import { leerConjunto, verificarGlifos } from '../scripts/lib/fuentes.mjs'

const RAIZ_REAL = path.resolve(import.meta.dirname, '..')

/** La declaración real, para copiarla en los árboles de prueba. */
const CARACTERES_JSON = readFileSync(path.join(RAIZ_REAL, 'src/config/caracteres.json'), 'utf8')

/**
 * Los puntos de código ambiguos se construyen por número, nunca tecleados:
 * es la ambigüedad que P2 cierra y no debe colarse en las propias pruebas.
 */
const cp = (n: number) => String.fromCodePoint(n)
const SIGNO_OHM = cp(0x2126)
const OMEGA = cp(0x03a9)
const SIGNO_MICRO = cp(0x00b5)
const MU = cp(0x03bc)
const INCREMENTO = cp(0x2206)
const ASPA = cp(0x2717)

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

describe('NOTACION — puntos de código prohibidos (P2)', () => {
  const conDeclaracion = (archivos: Record<string, string>) =>
    arbol({ 'src/config/caracteres.json': CARACTERES_JSON, ...archivos })

  it('rechaza el signo de ohm y propone la omega griega', () => {
    const r = conDeclaracion({ 'src/components/R.astro': `<p>4.7 k${SIGNO_OHM}</p>` })
    const fallos = verificarNotacion(r)
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toContain('U+2126')
    expect(fallos[0]).toContain('U+03A9')
  })

  it('rechaza el signo micro y el incremento', () => {
    const r = conDeclaracion({
      'src/components/C.astro': `<p>22 ${SIGNO_MICRO}F</p>`,
      'src/components/D.astro': `<p>${INCREMENTO}V</p>`,
    })
    expect(verificarNotacion(r)).toHaveLength(2)
  })

  it('rechaza los ornamentos que van como SVG y apunta al componente', () => {
    const r = conDeclaracion({ 'src/components/E.astro': `<p>${ASPA} fallo</p>` })
    expect(verificarNotacion(r)[0]).toContain('<Icono nombre="incorrecto" />')
  })

  it('también revisa el contenido en .mdx', () => {
    const r = conDeclaracion({ 'src/content/blog/post.mdx': `Resistencia de 10 ${SIGNO_OHM}.` })
    expect(verificarNotacion(r)).toHaveLength(1)
  })

  it('acepta las formas elegidas: omega, mu y delta griegas', () => {
    const r = conDeclaracion({
      'src/components/F.astro': `<p>4.7 k${OMEGA} · 22 ${MU}F · ${cp(0x0394)}V</p>`,
    })
    expect(verificarNotacion(r)).toEqual([])
  })
})

describe('CARACTERES — el contenido solo usa el conjunto declarado (P2)', () => {
  const conDeclaracion = (archivos: Record<string, string>) =>
    arbol({ 'src/config/caracteres.json': CARACTERES_JSON, ...archivos })

  it('falla con un carácter fuera del conjunto y dice dónde está', () => {
    const r = conDeclaracion({ 'src/content/blog/a.mdx': 'Línea uno\nCon ☺ al final' })
    const fallos = verificarCaracteres(r)
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toMatch(/a\.mdx:2:5 — U\+263A/)
  })

  it('pasa con español, notación declarada, tabuladores y saltos de línea', () => {
    const r = conDeclaracion({
      'src/content/blog/b.mdx': `¿Cuál?\n\t8 mm² a 75 °C, ${OMEGA} y ${MU} ≤ 3 % — «nota»\r\n`,
    })
    expect(verificarCaracteres(r)).toEqual([])
  })

  it('no revisa componentes .astro, solo contenido', () => {
    const r = conDeclaracion({ 'src/components/G.astro': '<p>☺</p>' })
    expect(verificarCaracteres(r)).toEqual([])
  })
})

describe('GLIFOS — nada declarado se pierde al subconjuntar (P2, bloqueante)', () => {
  it('las fuentes versionadas cubren todo el conjunto declarado en su rol', async () => {
    const { fallos, deRespaldo } = await verificarGlifos({ raiz: RAIZ_REAL })
    expect(fallos).toEqual([])
    // El respaldo no es silencioso: Mono declara qué toma de Plex Sans.
    expect(deRespaldo['ibm-plex-mono-400']).toEqual(['Ω U+03A9', 'μ U+03BC', 'Δ U+0394'])
  })

  it('falla, sin callar, si se declara un carácter que ninguna cara tiene', async () => {
    // El aspa no existe en ninguna cara de IBM Plex: si alguien la declarara,
    // la verificación debe nombrarla en vez de dejar que se pierda.
    const declarados = new Set([...leerConjunto(RAIZ_REAL).declarados, 0x2717])
    const { fallos } = await verificarGlifos({ raiz: RAIZ_REAL, declarados })
    expect(fallos.length).toBeGreaterThan(0)
    expect(fallos.every((f) => f.includes('U+2717'))).toBe(true)
  })
})
