/**
 * Análisis del cuerpo de los posts: cruce de citas (I3 b, criterio 3 de la
 * Etapa 4), portabilidad (I2) y preparación del RSS.
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { analizarMdx, citasNoDeclaradas } from '../scripts/lib/mdx.mjs'
import {
  problemasDePortabilidad,
  textoVisible,
  textosPerdidos,
} from '../scripts/verificar-portabilidad.mjs'
import { problemasDeColeccion } from '../src/lib/coleccion'
import { limpiarParaFeed } from '../src/lib/feed'
import { VERSION_NOM } from '../src/config/norma'
import portables from '../componentes-portables.json'

const RAIZ = path.resolve(import.meta.dirname, '..')
const PERMITIDOS = Object.keys(portables.componentes)

const DECLARADAS = [
  { ref: '430-22', tipo: 'articulo', version: VERSION_NOM },
  { ref: '310-15(b)(16)', tipo: 'tabla', version: VERSION_NOM },
]

describe('analizarMdx (remark puro)', () => {
  const fuente = [
    '---',
    'title: x',
    '---',
    '',
    '## Título',
    '',
    'Párrafo con *énfasis* y `código`.',
    '',
    '<CalloutNormativo ref="430-22" tipo="articulo">',
    '  Texto dentro de la cita.',
    '</CalloutNormativo>',
    '',
    '| A | B |',
    '| - | - |',
    '| uno | dos |',
  ].join('\n')
  const r = analizarMdx(fuente)

  it('encuentra los componentes y las citas con sus atributos', () => {
    expect(r.componentes.get('CalloutNormativo')).toBe(1)
    expect(r.citas).toEqual([{ ref: '430-22', tipo: 'articulo', version: undefined, linea: 9 }])
  })

  it('recoge el texto por bloques, incluidas las celdas de las tablas GFM', () => {
    expect(r.textos).toEqual([
      'Título',
      'Párrafo con énfasis y código.',
      'Texto dentro de la cita.',
      'A',
      'B',
      'uno',
      'dos',
    ])
  })

  it('no confunde el frontmatter con texto del post', () => {
    expect(r.textos.join(' ')).not.toMatch(/title/)
  })
})

describe('citasNoDeclaradas — criterio 3 de la Etapa 4', () => {
  it('acepta citas declaradas', () => {
    const cuerpo = '<CalloutNormativo ref="430-22">t</CalloutNormativo>'
    expect(citasNoDeclaradas(cuerpo, DECLARADAS, VERSION_NOM)).toEqual([])
  })

  it('rechaza una cita del cuerpo que no está en normativa[]', () => {
    const cuerpo = '\n<CalloutNormativo ref="250-122">t</CalloutNormativo>'
    expect(citasNoDeclaradas(cuerpo, DECLARADAS, VERSION_NOM)).toEqual([
      'línea 2: cita «250-122» en el cuerpo, pero no está declarada en normativa[]',
    ])
  })

  it('rechaza un tipo distinto del declarado', () => {
    const cuerpo = '<CalloutNormativo ref="430-22" tipo="tabla">t</CalloutNormativo>'
    expect(citasNoDeclaradas(cuerpo, DECLARADAS, VERSION_NOM)[0]).toMatch(/«tabla».*«articulo»/)
  })

  it('rechaza pintar una versión distinta de la declarada', () => {
    const otra = [{ ref: '430-22', tipo: 'articulo', version: 'NOM-001-SEDE-2005' }]
    const cuerpo = '<CalloutNormativo ref="430-22">t</CalloutNormativo>'
    expect(citasNoDeclaradas(cuerpo, otra, VERSION_NOM)[0]).toMatch(/NOM-001-SEDE-2005/)
  })

  it('rechaza una cita sin ref literal', () => {
    const cuerpo = '<CalloutNormativo tipo="tabla">t</CalloutNormativo>'
    expect(citasNoDeclaradas(cuerpo, DECLARADAS, VERSION_NOM)[0]).toMatch(/sin atributo ref/)
  })
})

describe('problemasDeColeccion — lo que rompe el build', () => {
  const entrada = (id: string, body: string) => ({ id, body, data: { normativa: DECLARADAS } })

  it('reúne problemas de slug y de citas de todas las entradas', () => {
    const problemas = problemasDeColeccion([
      entrada('bien-escrito', '<CalloutNormativo ref="430-22">t</CalloutNormativo>'),
      entrada('Mal-Slug', 'texto'),
      entrada('cita-ajena', '<CalloutNormativo ref="999">t</CalloutNormativo>'),
    ])
    expect(problemas).toHaveLength(2)
    expect(problemas[0]).toMatch(/^Mal-Slug\.mdx: el slug/)
    expect(problemas[1]).toMatch(/^cita-ajena\.mdx, línea 1: cita «999»/)
  })

  it('con filePath, la línea es la del archivo y no la del cuerpo', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'calcinst-coleccion-'))
    const archivo = path.join(dir, 'post.mdx')
    // Frontmatter de 4 líneas y una línea en blanco: la cita está en la línea 6.
    const texto =
      '---\ntitle: x\nborrador: true\n---\n\n<CalloutNormativo ref="999">t</CalloutNormativo>\n'
    writeFileSync(archivo, texto)
    try {
      const [problema] = problemasDeColeccion([
        { id: 'post', filePath: archivo, body: 'no se usa', data: { normativa: DECLARADAS } },
      ])
      expect(problema).toBe(
        'post.mdx, línea 6: cita «999» en el cuerpo, pero no está declarada en normativa[]',
      )
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('no puede cruzar una entrada que no conserva el cuerpo', () => {
    expect(problemasDeColeccion([{ id: 'x', data: { normativa: [] } }])[0]).toMatch(/cuerpo/)
  })
})

describe('portabilidad (I2)', () => {
  it('rechaza componentes fuera de componentes-portables.json', () => {
    expect(problemasDePortabilidad('<Grafica datos="x" />', PERMITIDOS)[0]).toMatch(/<Grafica>/)
  })

  it('rechaza import, export y expresiones de MDX', () => {
    const fuente = "import X from './x'\n\nexport const y = 1\n\nTexto {1 + 1}"
    const problemas = problemasDePortabilidad(fuente, PERMITIDOS)
    expect(problemas.filter((p) => /import\/export/.test(p))).toHaveLength(2)
    expect(problemas.filter((p) => /expresión/.test(p))).toHaveLength(1)
  })

  it('admite etiquetas HTML en minúscula y los componentes permitidos', () => {
    const fuente = '<CalloutNormativo ref="430-22">t</CalloutNormativo>\n\n<div>html</div>'
    expect(problemasDePortabilidad(fuente, PERMITIDOS)).toEqual([])
  })

  it('detecta un texto que no llegó a la página', () => {
    expect(textosPerdidos('Uno.\n\nDos.', '<p>Uno.</p>')).toEqual(['Dos.'])
  })

  it('decodifica entidades antes de comparar', () => {
    expect(textoVisible('<p>a &amp; b &#39;c&#x27; &lt;d&gt;</p>')).toBe("a & b 'c' <d>")
    expect(textosPerdidos("A & B 'c'", '<p>A &amp; B &#39;c&#39;</p>')).toEqual([])
  })

  it('la lista de componentes inyectados coincide con componentes-portables.json', () => {
    // COMPONENTES_MDX importa componentes .astro, que Vitest no carga: se lee el
    // código para comparar las claves con la lista documentada.
    const fuente = readFileSync(path.join(RAIZ, 'src/lib/componentes-mdx.ts'), 'utf8')
    const bloque = fuente.slice(fuente.indexOf('COMPONENTES_MDX = {'))
    const claves = [...bloque.slice(0, bloque.indexOf('}')).matchAll(/^\s+(\w+),/gm)].map(
      (m) => m[1],
    )
    expect(claves.sort()).toEqual([...PERMITIDOS].sort())
  })
})

describe('limpiarParaFeed', () => {
  const sitio = 'https://calcinst.mx'

  it('quita scripts, estilos y atributos internos de Astro', () => {
    const html = '<p data-astro-cid-x1>t</p><script>alert(1)</script><style>p{}</style>'
    expect(limpiarParaFeed(html, sitio)).toBe('<p>t</p>')
  })

  it('quita los atributos style que Shiki pone en el código', () => {
    const html = '<pre class="shiki" style="--shiki-dark:#e1e4e8"><code>x</code></pre>'
    expect(limpiarParaFeed(html, sitio)).toBe('<pre class="shiki"><code>x</code></pre>')
  })

  it('convierte enlaces relativos en absolutos y respeta los externos', () => {
    const html = '<a href="/blog/">b</a><a href="https://ejemplo.org/">e</a><a href="//cdn/x">c</a>'
    expect(limpiarParaFeed(html, sitio)).toBe(
      '<a href="https://calcinst.mx/blog/">b</a><a href="https://ejemplo.org/">e</a><a href="//cdn/x">c</a>',
    )
  })
})
