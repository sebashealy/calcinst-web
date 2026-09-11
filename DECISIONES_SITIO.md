# DECISIONES_SITIO.md — Decisiones cerradas del sitio CalcInst

> Creado en la Etapa 0 (2026-09-05) conforme a `PLAN_SITIO_WEB.md` v1.0, §2 (D1–D8).
> Las versiones citadas provienen de las salidas literales de `npm view` registradas en
> `ESTADO_SITIO.md` § Evidencia Etapa 0, E0-b. Marca de tiempo de las consultas `npm view`:
> **2026-09-05, entre ~08:40 y 08:47 (hora local, UTC-6)**, sesión Etapa 0.

| ID | Decisión | Recomendación | Costo de reversión | Estado |
|---|---|---|---|---|
| D1 | Stack del sitio | **Astro + MDX + Tailwind CSS v4.** Versiones verificadas en el registro npm (E0-b, 2026-09-05 ~08:40–08:47 -06:00): `astro` 7.3.1 (`latest`; el plan asume 5.x — ver H12 en `HIPOTESIS_SITIO.md`, la decisión de stack no se cambia), `@astrojs/mdx` 8.0.0, `@astrojs/sitemap` 3.7.4, `@astrojs/rss` 4.0.19, `tailwindcss` 4.3.3, `@tailwindcss/vite` 4.3.3, `vitest` 5.0.0, `zod` 4.5.4. Node local: v24.16.0 (satisface `>=22.12.0` de Astro); npm 11.13.0 | Medio-bajo: los posts MDX se llevan a cualquier stack sin reescribirse (I2); los componentes `.astro` habría que reescribirlos, son la parte más pequeña del sitio | cerrada |
| D2 | Hosting, dominio y despliegue continuo | **Cloudflare Pages** (plan gratuito, dominio propio, previews por rama, `_redirects`, `_headers`, ruta a Functions/KV/D1 en fase 2). Dominio: **`calcinst.mx` canónico** y **`calcinst.com` redirección 301** — ambos verificados disponibles/no registrados el 2026-09-05 (E0-c: whois autoritativo de NIC México "Disponible/Available"; RDAP Verisign HTTP 404). DNS en Cloudflare; `www.` redirige al apex. Despliegue GitHub → Cloudflare Pages; `main` = producción; CI en GitHub Actions. Adaptador para fase 2: `@astrojs/cloudflare` 14.3.0 (E0-b, misma marca de tiempo) | Bajo: un sitio estático se mueve de proveedor en una tarde; solo cambia el archivo de redirecciones | cerrada |
| D3 | Captura de correos y newsletter | **Buttondown**: endpoint público `embed-subscribe` sin clave de API, double opt-in activo por defecto, exportación CSV — los tres puntos confirmados en documentación oficial (E0-d, con matiz de implementación para la Etapa 8: la documentación pide no usar `fetch` contra `embed-subscribe`). Formulario propio, solo correo, aviso de privacidad integral antes de activar (I6) | Bajo: lista exportable en CSV; cambiar de proveedor es cambiar un endpoint y una clave; el reconsentimiento se mitiga declarando la transferencia internacional desde el inicio | cerrada |
| D4 | Modelo de venta | **Licencia perpetua por versión mayor con un año de actualizaciones incluido, renovable; prueba de 30 días** con funcionalidad completa y marca de agua en la exportación. Validación de licencia sin conexión con firma asimétrica. `producto.json` reserva `precios: null` y la navegación reserva "Precios" (oculto mientras `estado !== 'disponible'`) | Medio: pasar de perpetua a suscripción obliga a respetar las licencias ya vendidas; el sentido inverso es trivial | cerrada (no implementar hasta fase 2) |
| D5 | Cobro y facturación | **Stripe México + emisión de CFDI por API de un PAC** (Facturapi o equivalente); MoR extranjero solo como canal secundario fuera de México en fase posterior. Requisitos previos fuera del sitio (RFC, e.firma, CSD, alta en PAC — ver H4). Si el CFDI falla, la licencia sí se entrega y el CFDI queda en cola con aviso explícito | Medio-alto hacia MoR (perder CFDI); bajo hacia Mercado Pago (mismo PAC, otro procesador). Abstraer "procesador de pago" y "emisor de CFDI" como módulos independientes | cerrada (no implementar hasta fase 2) |
| D6 | Empaquetado de escritorio (efectos en el sitio) | **Tauri 2** (decisión de fondo ya tomada en CalcInst). El sitio: página de descarga por plataforma×arquitectura (beta solo Windows x64, H7), requisitos con WebView2, manifiesto de actualización en URL estable como superconjunto del formato del updater de Tauri, SHA-256 por artefacto con comando de verificación, explicación de SmartScreen/Gatekeeper sin normalizar ignorar advertencias | Casi nulo para el sitio (Tauri→Electron): cambian pesos y formato del manifiesto; el contrato de datos de la Etapa 7 se diseña genérico | cerrada |
| D7 | Analítica respetuosa de la privacidad | **Cloudflare Web Analytics** en v1 (sin cookies, sin costo, mismo proveedor). El evento "alta en lista exitosa" se registra del lado del servidor en Buttondown, no en la analítica. Si la limitación duele en seis meses, migrar a Plausible cambiando un `<script>` | Trivial: un script tag; se pierde continuidad histórica que en v1 vale poco | cerrada |
| D8 | Arquitectura de contenido del blog | URLs permanentes: `/blog/{slug}/` sin fecha ni categoría, slug inmutable (renombrar = 301 en `_redirects` + `slugsAnteriores[]`); una categoría exacta por post (5 categorías cerradas hasta 20 posts), etiquetas libres en kebab-case; RSS 2.0 íntegro; frontmatter validado con Zod (`normativa[]` ≥ 1, `verificadoDOF`); cruce cuerpo↔frontmatter de `CalloutNormativo` en build; `/normativa/{ref}/` generado desde `normativa[]` | Bajo para taxonomía (no está en la URL); alto para el formato de URL del post — por eso se cierra ahora y se protege con `_redirects` | cerrada |

## Addenda

### AD1 — `enforce_admins` permanece desactivado en la protección de `main` (2026-09-06)

**Contexto.** D2 quedó cerrado en la opción A: la integración Git de Cloudflare más protección de rama en GitHub exigiendo el check `verificar` (evidencia en `ESTADO_SITIO.md`, E1-o). Al verificar esa protección por API se detectó que `enforce_admins` está en `false`, es decir, una cuenta administradora todavía puede empujar directo a `main` y saltarse la puerta de CI.

**Decisión de Sebastián:** se mantiene en `false`, de forma consciente y no por descuido. Razón: es el único desarrollador del proyecto, y el valor de conservar una salida de urgencia para corregir `main` sin pasar por un PR supera al del hueco que deja abierto.

**Qué implica aceptar.** El enunciado de D2 ("Cloudflare solo despliega lo que pasó CI") se sostiene por convención, no por imposición técnica: un push directo de la cuenta administradora se desplegaría sin esperar a CI. La mitigación es de proceso — trabajar por PR salvo urgencia real.

**Costo de revertir:** nulo. Es una casilla en la configuración de la rama; activarla en cualquier momento cierra el hueco sin tocar el repositorio.

### AD2 — Tailwind CSS se desinstala; D1 queda en «Astro + MDX» (2026-09-10)

**Contexto.** El addendum A5 (`ESTADO_SITIO.md`) registró que el sistema de diseño de la Etapa 2 se construyó con propiedades personalizadas CSS y estilos con ámbito, y que Tailwind seguía instalado sin usarse. Sebastián pidió decidir, con fecha de corte, si entraba en las Etapas 5–6 o se desinstalaba: una dependencia de build que no produce nada es deuda.

**Decisión: desinstalar ya**, con corte en la propia Etapa 3 (commit `e12657c`). Se retiran `tailwindcss` y `@tailwindcss/vite` (13 paquetes menos en `node_modules`) y el registro del plugin en `astro.config.mjs`, que era la única referencia en todo el repositorio. El build no cambia.

**Por qué no esperar a la Etapa 5.** Esperar solo tendría sentido si reinstalar fuera caro, y no lo es: es un comando. Lo que sí tiene costo es mantener una dependencia muerta durante dos etapas. Y la puerta para volver a introducirla ya existe: la regla de aprobación de dependencias con versión exacta. Si una etapa demuestra una necesidad concreta que los tokens y los estilos con ámbito no cubren, se propone entonces, con evidencia, como cualquier otra dependencia.

**Efecto sobre D1:** el stack pasa a ser **Astro + MDX**, con el sistema de diseño en `src/styles/tokens.css`. Las versiones de Tailwind citadas en la fila D1 quedan como registro histórico de la Etapa 0.

**Costo de revertir:** bajo. Reinstalar y registrar el plugin; ningún componente depende de su ausencia.

### AD3 — `workers_dev: true`: se acepta un segundo host para recuperar las previews (2026-09-11)

**Contexto.** P3 (`ESTADO_SITIO.md`): desde que se declaró el dominio personalizado, los PR dejaron de recibir URL de preview. En el PR #4 se probó `preview_urls: true` con `workers_dev: false` y no bastó: la URL de la versión desplegada devolvía 404 (E3-g).

**Decisión de Sebastián: opción A, `workers_dev: true`.** Las previews se sirven en el subdominio `workers.dev` y no existen sin él. Perder la revisión en el entorno real costaría más en las Etapas 5, 9 y 10 —portada y producto, SEO, auditoría de accesibilidad y rendimiento— que exponer un segundo host mientras rige el `noindex` global.

**Costo aceptado:** producción también responde en `https://calcinst-web.instcalc.workers.dev`, un host distinto del canónico que fija D2.

**Condición, no opcional (P4 en `ESTADO_SITIO.md`, destino Etapa 9):** al retirar el `noindex` global se emite `X-Robots-Tag: noindex` condicionado al host para las peticiones que llegan por `*.workers.dev`, y se verifica con `curl -I` literal contra ambos hosts. **La etiqueta canónica no sustituye esa verificación**: es una señal que el buscador puede ignorar, no una directiva.

**Costo de revertir:** bajo. Volver a `false` en `wrangler.jsonc`; se pierden de nuevo las previews.

### AD4 — Juego de caracteres: se cambia la fuente de entrada y se prohíbe el silencio (2026-09-11)

**Contexto.** P2 (`ESTADO_SITIO.md`): diez caracteres declarados no tenían glifo en ninguna de las cuatro fuentes, y `subset-font` los descartaba sin avisar. Sebastián lo formuló así: el defecto no fue que faltaran glifos, fue el silencio. Pidió resolverlo como primer bloque de la Etapa 4, antes de tocar el blog.

**Decisiones:**

1. **Origen: las fuentes completas de IBM**, `@ibm/plex-sans` 1.1.0 y `@ibm/plex-mono` 2.5.0 (devDependencies, OFL-1.1), en lugar del recorte `latin` de Fontsource. Los paquetes npm de IBM no publican TTF ni OTF, solo WOFF/WOFF2 completos: es el mismo juego de glifos, comprimido, y `subset-font` lo lee. Aprobado por Sebastián con esa salvedad.
2. **El conjunto es un dato**: `src/config/caracteres.json`, con grupos, prohibidos y roles de fuente. El generador y el verificador lo leen; ninguno lo define.
3. **Puntos de código normalizados.** Ohm: U+03A9; prohibido U+2126 (lo exigió Sebastián). Micro: **U+03BC** (mu griega); prohibido U+00B5 — elección delegada, por coherencia con la omega griega y porque es la forma a la que NFKC reduce el signo micro. Delta: U+0394; prohibido **U+2206** «incremento», añadido a la lista porque es el único parecido sin descomposición Unicode, que ninguna normalización atraparía.
4. **Fuera del conjunto: `✓ ✗ → ← ↑ ↓`**, que pasan a SVG con `<Icono />`. Sebastián nombró los cuatro primeros; su criterio —ornamento de interfaz, no notación, y §3.1 ya pide SVG— se aplicó también a `↑ ↓`.
5. **IBM Plex Mono no tiene griego**, ni en su versión completa: el plan de P2 suponía que la fuente completa cerraba el hueco y solo es cierto para Sans. Decisión de Sebastián: `--fuente-mono` pone IBM Plex Sans de respaldo, y la comprobación de glifos trabaja por rol e informa qué caracteres toma cada cara mono de su respaldo. Costo aceptado: en texto monoespaciado, Ω, μ y Δ son proporcionales.
6. **Requisito bloqueante: el build falla si un carácter declarado no sobrevive al subconjuntado.** Lo aplican el generador (exit 1) y `verificar-invariantes.mjs` (comprobación GLIFOS, en CI). `harfbuzzjs` 0.10.3 se declara explícitamente para que esa comprobación no dependa de una dependencia transitiva.
7. Dos comprobaciones más, también en CI: **NOTACION** rechaza los puntos de código prohibidos en `src/` y `content/` indicando qué usar; **CARACTERES** rechaza en `.md`/`.mdx` todo carácter fuera del conjunto, con archivo, línea y columna.
8. **Presupuesto con lectura estricta**: «< 60 KB» se interpreta como 60 000 B, no 61 440. Resultado: 57 244 B.

**Licencia.** La OFL exige que la licencia acompañe a la fuente al redistribuirla; el generador copia `LICENSE-IBM-Plex-OFL.txt` junto a los archivos servidos. La licencia de IBM Plex declara el nombre reservado «Plex», y la OFL restringe el uso de nombres reservados en versiones modificadas. Subconjuntar es práctica extendida —Fontsource y Google Fonts sirven subconjuntos con el mismo nombre—, pero **no se interpreta aquí cómo aplica esa cláusula**: queda anotado para la revisión legal del proyecto.

**Costo de revertir:** bajo. El generador es reproducible byte a byte, y cambiar de origen es cambiar cuatro rutas.

### AD5 — Las tablas GFM cuentan como Markdown portable (2026-09-11)

**Contexto.** I2 exige que el contenido sea portable y el plan lo verifica «renderizando cada `.mdx` con remark puro». Remark sin extensiones sigue CommonMark: lee una tabla GFM como un párrafo con barras, mientras Astro 7 la pinta como `<table>`. La prueba de portabilidad lo detectó con un post de prueba (E4-i).

**Decisión de Sebastián:** las tablas GFM —y con ellas el tachado, las notas al pie y las listas de tareas— **son portables**: las leen GitHub, pandoc y casi cualquier generador de sitios. Se aprueba `remark-gfm` 4.0.1, y el análisis de portabilidad entiende GFM. Quien redacte puede escribir tablas como tablas, sin recurrir a `<Tabla>` con filas en HTML.

**Costo de revertir:** bajo. Quitar `remark-gfm` del analizador haría fallar la prueba en los posts que usen GFM, que habría que reescribir con `<Tabla>`.
