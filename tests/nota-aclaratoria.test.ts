/**
 * AD8 — la Nota Aclaratoria del 07/02/2014 no depende de que el redactor se
 * acuerde: `CalloutNormativo` consulta el archivo de datos en cada cita.
 *
 * La prueba renderiza el componente de verdad con la API de contenedor de
 * Astro; comprobar solo `correccionDe()` no diría nada sobre lo que ve el lector.
 */
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import CalloutNormativo from '../src/components/CalloutNormativo.astro'
import { NOTA_ACLARATORIA, correccionDe } from '../src/lib/nota-aclaratoria'

const render = async (props: Record<string, unknown>) => {
  const container = await AstroContainer.create()
  return container.renderToString(CalloutNormativo, { props, slots: { default: 'Texto citado.' } })
}

describe('datos de la nota aclaratoria', () => {
  it('apunta al DOF del 07/02/2014, código 5331914', () => {
    expect(NOTA_ACLARATORIA.fuente.fechaDOF).toBe('2014-02-07')
    expect(NOTA_ACLARATORIA.fuente.codigoDOF).toBe('5331914')
    expect(NOTA_ACLARATORIA.fuente.url).toContain('5331914')
  })

  it('distingue las que cambian un valor de las que cambian el sentido', () => {
    const valores = NOTA_ACLARATORIA.referencias.filter((r) => r.afectaValor).map((r) => r.ref)
    expect(valores).toEqual(['cap10-tabla-5', '310-15(b)(2)(a)'])
  })

  it('correccionDe solo responde a las referencias listadas', () => {
    expect(correccionDe('cap10-tabla-5')?.afectaValor).toBe(true)
    expect(correccionDe('430-22')).toBeUndefined()
  })
})

describe('CalloutNormativo y la nota aclaratoria', () => {
  it('una cita a una ref corregida pinta el aviso y enlaza al DOF', async () => {
    const html = await render({ ref: 'cap10-tabla-5', tipo: 'tabla' })
    expect(html).toContain('La Nota Aclaratoria corrige un valor de esta referencia.')
    expect(html).toContain('15.68')
    // El href sale con & escapado como &amp;, que es el HTML correcto.
    expect(html).toContain(NOTA_ACLARATORIA.fuente.url.replace(/&/g, '&amp;'))
  })

  it('distingue un cambio de sentido de un cambio de valor', async () => {
    const html = await render({ ref: '230-95', tipo: 'articulo' })
    expect(html).toContain('La Nota Aclaratoria modifica esta referencia.')
    expect(html).not.toContain('corrige un valor')
  })

  it('una cita a 430-22 no pinta ningún aviso', async () => {
    const html = await render({ ref: '430-22', tipo: 'articulo' })
    expect(html).not.toContain('Nota Aclaratoria')
    expect(html).not.toContain('dof.gob.mx')
  })
})

describe('apéndices normativos e informativos', () => {
  it('marca el apéndice informativo como que orienta y no obliga', async () => {
    const html = await render({ ref: 'apendice-a', tipo: 'apendice-informativo' })
    expect(html).toContain('Apéndice apendice-a')
    expect(html).toContain('informativo: orienta, no obliga')
  })

  it('no pone esa marca en el apéndice normativo', async () => {
    const html = await render({ ref: 'apendice-d', tipo: 'apendice-normativo' })
    expect(html).toContain('Apéndice apendice-d')
    expect(html).not.toContain('orienta, no obliga')
  })
})
