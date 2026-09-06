// Prueba de humo I5 (PLAN_SITIO_WEB.md §5): demuestra que una ruta bajo demanda
// funciona con el adaptador de Cloudflare sin migrar el resto del sitio.
// Esta rama se borra tras verificar la respuesta en el preview.
export const prerender = false

export function GET(): Response {
  return new Response(JSON.stringify({ ok: true, prueba: 'i5-humo' }), {
    headers: { 'content-type': 'application/json' },
  })
}
