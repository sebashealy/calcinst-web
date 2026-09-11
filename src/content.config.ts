/**
 * Colecciones de contenido. Astro 7 busca este archivo en `src/content.config.ts`;
 * el plan lo situaba en `src/content/config.ts`, que ya no se lee (A8).
 */
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { esquemaPost } from './lib/blog'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: esquemaPost,
})

export const collections = { blog }
