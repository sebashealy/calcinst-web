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
   * Pendiente de Sebastián: qué correo público usar. Lo necesitan la página de
   * Contacto (Etapa 6) y el correo alterno del formulario (I1, Etapa 8). Se deja
   * en `null` en vez de inventar uno: publicar una dirección es una decisión suya.
   */
  correoContacto: null as string | null,
  redes: [] as Red[],
} as const
