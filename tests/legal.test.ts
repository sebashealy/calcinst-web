import { describe, expect, it } from 'vitest'
import { esquemaLegal, legalPublicable } from '../src/lib/legal'

const aprobado = {
  titulo: 'Aviso de privacidad',
  tipo: 'privacidad',
  version: '1.0.0',
  publicado: true,
  revisionHumana: true,
  fechaVigencia: '2026-10-28',
  pendientes: [],
  responsable: 'Responsable de prueba',
  domicilio: 'Domicilio de prueba',
}

describe('publicación legal', () => {
  it('permite un documento aprobado vigente hoy', () =>
    expect(legalPublicable(aprobado, '2026-10-28')).toBe(true))
  it('permite documentos vigentes desde una fecha anterior', () =>
    expect(legalPublicable(aprobado, '2026-10-29')).toBe(true))
  it('no publica antes de la fecha de vigencia', () =>
    expect(legalPublicable(aprobado, '2026-10-27')).toBe(false))
  it('no publica un borrador aunque tenga fecha y aprobación', () =>
    expect(legalPublicable({ ...aprobado, publicado: false }, '2026-10-28')).toBe(false))
  it.each([
    { revisionHumana: false },
    { fechaVigencia: null },
    { pendientes: ['Resolver identidad'] },
    { responsable: null },
    { domicilio: null },
    { responsable: '  ' },
  ])('rechaza activar publicación con requisitos incompletos: %j', (cambio) => {
    expect(esquemaLegal.safeParse({ ...aprobado, ...cambio }).success).toBe(false)
    expect(legalPublicable({ ...aprobado, ...cambio }, '2026-10-28')).toBe(false)
  })
  it('acepta borrador incompleto sin hacerlo publicable', () => {
    const borrador = {
      ...aprobado,
      publicado: false,
      revisionHumana: false,
      fechaVigencia: null,
      responsable: null,
      domicilio: null,
      pendientes: ['Revisión'],
    }
    expect(esquemaLegal.safeParse(borrador).success).toBe(true)
    expect(legalPublicable(borrador, '2026-10-28')).toBe(false)
  })
  it.each(['2026-02-30', '2026-13-01', '28/10/2026'])(
    'rechaza fecha inválida %s',
    (fechaVigencia) =>
      expect(esquemaLegal.safeParse({ ...aprobado, fechaVigencia }).success).toBe(false),
  )
  it('rechaza una fecha de evaluación inválida', () =>
    expect(legalPublicable(aprobado, 'hoy')).toBe(false))
  it('no acepta metadatos ajenos al contrato', () =>
    expect(legalPublicable(null, '2026-10-28')).toBe(false))
})
