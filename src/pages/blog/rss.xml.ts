/**
 * /blog/rss.xml — RSS 2.0 con el contenido ÍNTEGRO de cada post (D8), no solo
 * el resumen: permite leer el blog completo en un lector y alimentar el envío
 * por correo de la Etapa 8.
 *
 * Astro no ofrece el HTML de un MDX como cadena; se renderiza con su API de
 * contenedor, con los mismos componentes que la página del post.
 */
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection, render } from 'astro:content'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getContainerRenderer as rendererMdx } from '@astrojs/mdx/container-renderer'
import { publicables } from '../../lib/blog'
import { COMPONENTES_MDX } from '../../lib/componentes-mdx'
import { limpiarParaFeed } from '../../lib/feed'
import { SITIO } from '../../config/sitio'

export async function GET(context: APIContext) {
  const sitio = (context.site?.origin ?? SITIO.dominio).replace(/\/$/, '')
  const container = await AstroContainer.create({
    renderers: await loadRenderers([rendererMdx()]),
  })
  const posts = publicables(await getCollection('blog'))

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post)
      const html = await container.renderToString(Content, {
        props: { components: COMPONENTES_MDX },
      })
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.fechaPublicacion,
        link: `/blog/${post.id}/`,
        categories: [post.data.categoria, ...post.data.etiquetas],
        content: limpiarParaFeed(html, sitio),
      }
    }),
  )

  return rss({
    title: `${SITIO.nombre} · Blog`,
    description:
      'Artículos sobre instalaciones eléctricas y la NOM-001-SEDE, cada afirmación con su referencia.',
    site: sitio,
    items,
    // atom:link rel="self" es la autorreferencia que recomienda la especificación;
    // sin ella el validador del W3C lo advierte.
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>es-mx</language><atom:link href="${sitio}/blog/rss.xml" rel="self" type="application/rss+xml"/>`,
  })
}
