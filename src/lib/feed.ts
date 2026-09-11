/**
 * feed.ts — preparación del HTML de un post para el RSS.
 *
 * Separado de `rss.xml.ts` para poder probarlo: el endpoint importa módulos
 * virtuales de Astro que no existen fuera de un build.
 */

/**
 * Deja el HTML apto para un lector de feeds: fuera scripts, estilos —también
 * los atributos `style` que Shiki pone en el código, que el validador del W3C
 * marca como potencialmente peligrosos y los lectores descartan— y atributos
 * internos de Astro; y URL relativas convertidas en absolutas, porque un
 * lector no sabe resolver `/blog/…`.
 */
export function limpiarParaFeed(html: string, sitio: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\s(?:data-astro-[\w-]+|data-copiar)(?:="[^"]*")?/g, '')
    .replace(/(\s(?:href|src))="\/(?!\/)/g, `$1="${sitio}/`)
}
