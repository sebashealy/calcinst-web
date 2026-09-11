/**
 * componentes-mdx.ts — los únicos componentes que un post puede usar (I2).
 *
 * Se inyectan con `<Content components={COMPONENTES_MDX} />`, así que los posts
 * no importan nada: un `.mdx` con `import` no sería portable fuera de Astro, y
 * `verificar-portabilidad.mjs` lo rechaza. La lista debe coincidir con
 * `componentes-portables.json`, que documenta el equivalente en Markdown de
 * cada uno; una prueba lo exige.
 */
import CalloutNormativo from '../components/CalloutNormativo.astro'
import AvisoErrata from '../components/AvisoErrata.astro'
import Tabla from '../components/Tabla.astro'
import BloqueCodigo from '../components/BloqueCodigo.astro'
import Descargo from '../components/Descargo.astro'

export const COMPONENTES_MDX = {
  CalloutNormativo,
  AvisoErrata,
  Tabla,
  BloqueCodigo,
  Descargo,
}
