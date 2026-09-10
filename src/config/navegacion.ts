/**
 * navegacion.ts — enlaces de la barra y del pie.
 *
 * La regla de "Precios" (§4.4) depende del estado de lanzamiento, así que vive
 * aquí y no en `BarraNav`: fuera de `src/config/` ningún archivo puede comparar
 * estados (I7). La función es pura para poder probarla sin renderizar nada.
 */
import { ESTADOS, type EstadoLanzamiento } from './lanzamiento'

export interface Enlace {
  href: string
  texto: string
}

/** Forma mínima de `producto.precios`; su contenido real se define en la fase 2. */
export type Precios = Record<string, unknown>

const PRODUCTO: Enlace = { href: '/producto/', texto: 'Producto' }
const PRECIOS: Enlace = { href: '/precios/', texto: 'Precios' }
const QUIENES: Enlace = { href: '/quienes-somos/', texto: 'Quiénes somos' }
const BLOG: Enlace = { href: '/blog/', texto: 'Blog' }

/**
 * §4.4: "Precios" solo aparece con el producto disponible **y** precios
 * publicados. Cualquiera de las dos condiciones sola no basta.
 */
export function enlacesPrincipales(estado: EstadoLanzamiento, precios: Precios | null): Enlace[] {
  const conPrecios = estado === ESTADOS.disponible && precios !== null
  return conPrecios ? [PRODUCTO, PRECIOS, QUIENES, BLOG] : [PRODUCTO, QUIENES, BLOG]
}

export const ENLACES_PIE: readonly Enlace[] = [
  { href: '/terminos/', texto: 'Términos' },
  { href: '/privacidad/', texto: 'Privacidad' },
  { href: '/contacto/', texto: 'Contacto' },
  { href: '/blog/rss.xml', texto: 'RSS' },
]
