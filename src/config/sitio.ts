/**
 * sitio.ts — datos globales del sitio (§4.1).
 *
 * `dominio` es la fuente única del canónico: `astro.config.mjs` lo importa
 * de aquí en lugar de repetirlo.
 */

export interface Red {
  nombre: string
  url: string
}

export const SITIO = {
  nombre: 'CalcInst',
  dominio: 'https://calcinst.mx',
  /**
   * Correo público elegido por Sebastián el 2026-10-28 (E6-a).
   * Contacto lo utilizará en la Etapa 6; no activa formularios de la Etapa 8.
   */
  correoContacto: 'instcalc@gmail.com' as string | null,
  redes: [] as Red[],
} as const
