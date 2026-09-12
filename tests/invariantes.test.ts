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
  terminosDeCredencial,
  tieneColorLiteral,
  verificarCaracteres,
  verificarI3c,
  verificarI7,
  verificarNotacion,
  verificarRefNorma,
  verificarTokens,
  refsDeCapitulo9,
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

  it('rechaza la mu griega y el incremento', () => {
    const r = conDeclaracion({
      'src/components/C.astro': `<p>22 ${MU}F</p>`,
      'src/components/D.astro': `<p>${INCREMENTO}V</p>`,
    })
    expect(verificarNotacion(r)).toHaveLength(2)
  })

  it('rechaza la mu griega y propone el signo micro (AD9)', () => {
    const r = conDeclaracion({ 'src/components/M.astro': `<p>22 ${MU}F</p>` })
    const fallos = verificarNotacion(r)
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toContain('U+03BC')
    expect(fallos[0]).toContain('U+00B5')
  })

  it('rechaza los ornamentos que van como SVG y apunta al componente', () => {
    const r = conDeclaracion({ 'src/components/E.astro': `<p>${ASPA} fallo</p>` })
    expect(verificarNotacion(r)[0]).toContain('<Icono nombre="incorrecto" />')
  })

  it('también revisa el contenido en .mdx', () => {
    const r = conDeclaracion({ 'src/content/blog/post.mdx': `Resistencia de 10 ${SIGNO_OHM}.` })
    expect(verificarNotacion(r)).toHaveLength(1)
  })

  it('acepta las formas elegidas: omega griega, signo micro y delta griega', () => {
    const r = conDeclaracion({
      'src/components/F.astro': `<p>4.7 k${OMEGA} · 22 ${SIGNO_MICRO}F · ${cp(0x0394)}V</p>`,
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
      'src/content/blog/b.mdx': `¿Cuál?\n\t8 mm² a 75 °C, ${OMEGA} y ${SIGNO_MICRO} ≤ 3 % — «nota»\r\n`,
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
    expect(deRespaldo['ibm-plex-mono-400']).toEqual(['Ω U+03A9', 'Δ U+0394'])
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

describe('REFNORMA — el Capítulo 9 no contiene tablas (AD7)', () => {
  /**
   * La ref equivocada se arma por partes, nunca escrita entera: si estuviera
   * literal en posición de ref, este mismo archivo violaría el invariante que
   * la prueba verifica. Mismo criterio que los puntos de código ambiguos.
   */
  const cap9 = (sufijo: string) => ['cap', '9-tabla-', sufijo].join('')

  // Prueba negativa, como la de I7: se introduce la ref equivocada, el
  // verificador falla; se corrige a Capítulo 10 y pasa. Corre en cada CI.
  it('falla con una ref de tabla del Capítulo 9 y dice dónde está', () => {
    const r = arbol({
      'src/content/blog/post.mdx': `<CalloutNormativo ref="${cap9('4')}">t</CalloutNormativo>`,
    })
    const fallos = verificarRefNorma(r)
    expect(fallos).toHaveLength(1)
    expect(fallos[0]).toContain('src/content/blog/post.mdx:1')
    expect(fallos[0]).toContain('cap9-tabla-4')
    expect(fallos[0]).toContain('Capítulo 10')
  })

  it('pasa cuando la ref se corrige al Capítulo 10', () => {
    const r = arbol({
      'src/content/blog/post.mdx': '<CalloutNormativo ref="cap10-tabla-4">t</CalloutNormativo>',
    })
    expect(verificarRefNorma(r)).toEqual([])
  })

  it.each([
    ['atributo JSX', `ref="${cap9('1')}"`],
    ['propiedad de objeto', `ref: '${cap9('8')}'`],
    ['clave JSON', `"ref": "${cap9('9')}"`],
    ['campo YAML', `  - ref: ${cap9('10')}`],
    ['con acento y espacio', `ref: "${['capitulo', '9', 'tabla', '4'].join(' ')}"`],
  ])('detecta la forma en %s', (_forma, texto) => {
    expect(refsDeCapitulo9(texto)).toHaveLength(1)
  })

  it('no confunde una mención del texto con una ref', () => {
    // Los documentos de gobierno tienen que poder nombrar la forma equivocada
    // para explicar por qué lo es.
    expect(refsDeCapitulo9(`El plan escribía ${cap9('4')}; es un error.`)).toEqual([])
  })

  it('tampoco marca las referencias reales del Capítulo 9, que sí existen', () => {
    // 920 a 924 son artículos del Capítulo 9; lo que no existe son sus tablas.
    expect(refsDeCapitulo9('ref="920-4"')).toEqual([])
  })

  it('revisa el repositorio real, documentos de gobierno incluidos', () => {
    expect(verificarRefNorma()).toEqual([])
  })
})

describe('I3c — sin credenciales profesionales (§9.1)', () => {
  it.each([
    ['Ing. Pérez revisó el cálculo.', 'Ing.'],
    ['Soy ingeniero titulado.', 'ingeniero titulado'],
    ['Con cédula profesional vigente.', 'cédula'],
    ['Con CEDULA vigente.', 'cédula'],
    ['Tengo licencia profesional.', 'licencia profesional'],
    ['Miembro colegiado.', 'colegiado'],
  ])('detecta «%s»', (texto, termino) => {
    expect(terminosDeCredencial(texto).map((h) => h.termino)).toEqual([termino])
  })

  it('admite el contexto negativo del descargo de §9.1', () => {
    expect(terminosDeCredencial('un estudiante, no un profesionista con cédula. Su valor')).toEqual(
      [],
    )
  })

  it('una negación no declarada no basta: la lista blanca es explícita', () => {
    expect(terminosDeCredencial('No tengo cédula, pero sé calcular.')).toHaveLength(1)
  })

  it('no confunde «Ing.» con otras palabras', () => {
    expect(terminosDeCredencial('Ingeniería eléctrica; ingresos; Inglés.')).toEqual([])
  })

  it('recorre src/ y content/ y señala archivo y línea', () => {
    const r = arbol({ 'src/pages/quienes.astro': '<p>Texto</p>\n<p>Ing. Sebastián</p>' })
    expect(verificarI3c(r)).toEqual([
      'src/pages/quienes.astro:2 — «Ing.» fuera de un contexto negativo declarado',
    ])
  })
})
