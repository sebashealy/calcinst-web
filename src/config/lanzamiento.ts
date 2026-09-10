/**
 * lanzamiento.ts — el ÚNICO lugar donde vive el estado de lanzamiento (I7, §4.2).
 *
 * Cambiar de estado es cambiar una línea: la de `ESTADO_LANZAMIENTO`. Todo lo que
 * depende del estado (texto del botón de acción, aviso, pie, insignia) se deriva
 * de aquí. `scripts/verificar-invariantes.mjs` falla si algún literal de estado
 * aparece fuera de `src/config/`, así que los componentes no pueden comparar
 * estados: solo reciben valores ya resueltos.
 */

export const ESTADOS = {
  proximamente: 'proximamente',
  beta: 'beta',
  disponible: 'disponible',
} as const

export type EstadoLanzamiento = (typeof ESTADOS)[keyof typeof ESTADOS]

export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.proximamente

export interface TextoEstado {
  /** Texto del botón de acción de la barra de navegación. */
  accion: string
  /** Aviso global bajo la barra; `null` si el estado no lo necesita. */
  banner: string | null
  /** Qué muestra la página de descarga (Etapa 7). */
  descarga: 'aviso' | 'lista'
  /** Línea de estado del pie; `null` la oculta. */
  pie: string | null
  /** Insignia de estado para las páginas que la muestren (Etapas 5 y 7). */
  insignia: { tono: 'neutro' | 'info' | 'ok' | 'aviso' | 'peligro'; texto: string }
}

export const TEXTO = {
  proximamente: {
    accion: 'Únete a la lista',
    banner: null,
    descarga: 'aviso',
    pie: 'Estado: en desarrollo',
    insignia: { tono: 'aviso', texto: 'Próximamente' },
  },
  beta: {
    accion: 'Descargar beta',
    banner: 'Versión beta: puede contener errores. Verifica cada resultado.',
    descarga: 'lista',
    pie: 'Estado: versión beta',
    insignia: { tono: 'info', texto: 'Beta' },
  },
  disponible: {
    accion: 'Descargar',
    banner: null,
    descarga: 'lista',
    pie: null,
    insignia: { tono: 'ok', texto: 'Disponible' },
  },
} as const satisfies Record<EstadoLanzamiento, TextoEstado>

/** Textos del estado vigente: lo que consumen el layout y las páginas. */
export const TEXTO_VIGENTE: TextoEstado = TEXTO[ESTADO_LANZAMIENTO]

/**
 * Destino del botón de acción. Es el mismo en los tres estados: la página de
 * descarga muestra el aviso con el formulario de lista o los instaladores
 * según `descarga` (Etapa 7).
 */
export const DESTINO_ACCION = '/descarga/'
