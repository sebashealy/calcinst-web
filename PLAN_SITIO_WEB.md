> Nota de conservación (2026-10-24): el texto original que sigue se conserva sin reescritura. Las correcciones se emiten como addenda en `ESTADO_SITIO.md`, nunca editando el plan. AD7, documentado en `DECISIONES_SITIO.md` y E4-q de `ESTADO_SITIO.md`, corrige las referencias al Capítulo 9: las tablas están en el Capítulo 10. H12, cerrada en `HIPOTESIS_SITIO.md` con evidencia E1-a y E4-s, fija Astro 7.3.1, no 5.x. Ambas correcciones se señalan aquí y no se aplican al texto histórico.

---

# PLAN_SITIO_WEB.md — Sitio definitivo de CalcInst

> Versión 1.0 · 2026-09-05 · Consumidor previsto: Claude Code, en sesiones sucesivas con puertas de verificación.
> Documentos hermanos: `ESTADO_SITIO.md` (estado vivo, lo crea la Etapa 0), `DECISIONES_SITIO.md` (decisiones cerradas, lo crea la Etapa 0), `HIPOTESIS_SITIO.md` (registro §8 de este plan, lo crea la Etapa 0).
> Este plan no se reescribe: las correcciones se emiten como *addenda* numerados **A1, A2, …** al final de `ESTADO_SITIO.md`.

**Regla de puertas (literal, aplica a todas las etapas):**

> No se autoriza la etapa N+1 sin evidencia presentada. La autoatestación ("etapa completada") no se acepta como evidencia.

---

## 1. Resumen ejecutivo

1. El sitio se construye con **Astro 5 + MDX + Tailwind CSS v4**, desplegado como HTML estático en **Cloudflare Pages** desde un repositorio propio en GitHub. Costo operativo de v1: el dominio.
2. El **estado de lanzamiento** (`proximamente` → `beta` → `disponible`) es un único archivo de configuración leído por todos los componentes; cambiar de estado es un commit de una línea. Se verifica en CI que ningún componente contiene el literal "próximamente".
3. Se agrega un segundo dato configurable del mismo tipo: el **registro de capacidades** del producto (`capacidades.json`). El sitio solo describe lo que está marcado `verificado`. Protecciones, memoria de cálculo formateada y facturación quedan como `planeado` y **no aparecen como funcionalidad** hasta que el registro cambie.
4. El **blog** es la prioridad de entrega (Etapa 4, antes que Inicio/Producto). Posts en MDX con esquema de *frontmatter* validado, URLs sin fecha ni categoría (`/blog/{slug}/`), taxonomía separada del path, RSS, y un campo `normativa[]` que enlaza cada post con los artículos y tablas de la NOM que cita.
5. **Correo:** Buttondown con *double opt-in*, formulario propio (no *embed*) que muestra error explícito si el alta falla (I1). Aviso de privacidad y términos se publican en la Etapa 6, **antes** de activar el formulario en la Etapa 8 (I6).
6. **Fase 2 (comercio)** está diseñada, no construida: Astro admite renderizado bajo demanda por ruta con el adaptador de Cloudflare, así que `/comprar/`, `/cuenta/` y los *webhooks* de pago se agregan como rutas nuevas al mismo repositorio. Ninguna página de hoy cambia.
7. Decisiones comerciales (no implementadas): licencia **perpetua por versión mayor con un año de actualizaciones + prueba de 30 días**, cobro con **Stripe México + emisión propia de CFDI** vía API de un PAC (Facturapi o equivalente), porque un *merchant of record* extranjero no puede emitir CFDI y el cliente objetivo lo exige.
8. Dirección visual: **oscura, técnica, densa**, emparentada con el tema CAD de la app; retícula métrica como motivo; tipografía IBM Plex Sans + IBM Plex Mono; bordes en lugar de sombras; sin degradados ni ilustraciones 3D. Capturas reales del lienzo como protagonista.
9. Siete invariantes con método de verificación automatizado donde es posible (grep en CI, Lighthouse CI, test de formulario con red bloqueada).
10. Once etapas (0–10). Cada una declara objetivo, archivos, criterios de aceptación, evidencia literal exigida y riesgos de regresión.
11. Calendario editorial: 14 temas clasificados en imán / demuestra valor, con artículos y tablas NOM implicados y dificultad. Cadencia sostenible: **un post cada dos semanas**, escritos por lotes.
12. Riesgo dominante: publicar una interpretación normativa incorrecta. Mitigación: política de errata visible por post, descargo honesto, y verificación de toda cita contra el DOF antes de publicar (el PDF disponible es anteproyecto).
13. Hipótesis abiertas más importantes: versión de la NOM vigente (H1), ley de datos personales vigente en 2026 (H2), disponibilidad del dominio (H3), figura fiscal del vendedor (H4), existencia de capturas reales presentables (H5).

---

## 2. Decisiones D1–D8

Formato de cada decisión: opciones → criterios → recomendación → costo de revertir.

### D1 — Stack del sitio

**Opciones:** (a) Astro; (b) Next.js; (c) React + Vite (stack de CalcInst).

**Criterios:** SEO y HTML estático; calidad de la capa de contenido Markdown/MDX; costo; curva dado el stack conocido; ruta a comercio en fase 2 sin migración (I5).

| Criterio | Astro | Next.js | React + Vite |
|---|---|---|---|
| HTML estático por defecto, JS cero en páginas de contenido | Sí, por diseño | Sí con configuración; el *runtime* de React se envía igual | No: SPA por defecto; el prerender exige tooling adicional |
| Contenido Markdown/MDX con esquema validado | *Content Collections* con esquema Zod, nativo | Posible vía librerías (Contentlayer/MDX manual); no nativo | Manual: plugin de Vite + parser propio |
| Curva de aprendizaje | Baja: componentes `.astro` son HTML+TS; permite islas React donde haga falta | Media-alta: App Router, RSC, cachés | Nula, pero el costo se paga en tooling de contenido y SEO |
| Costo de hosting | Estático: cero | Estático posible, pero la propuesta de valor empuja a Vercel | Estático: cero |
| Fase 2: rutas dinámicas y *webhooks* | Adaptador Cloudflare; renderizado bajo demanda por ruta, el resto sigue estático | Nativo | Requiere backend separado |
| Reutilización de componentes React de CalcInst | Sí (islas React) | Sí | Sí |

**Recomendación: Astro (a).** Cumple I4 sin esfuerzo, tiene la mejor capa de contenido para I2 y I3 (el *frontmatter* validado permite exigir `normativa[]` en cada post), y su ruta a fase 2 no requiere cambiar de framework. La reutilización de componentes React de CalcInst (p. ej. una mini-vista del lienzo) se conserva como isla.

**Costo de revertir:** medio-bajo. Los posts MDX se llevan a cualquier stack sin reescribirse (I2 lo exige y la Etapa 4 lo verifica). Los componentes `.astro` sí habría que reescribirlos; son la parte más pequeña del sitio.

### D2 — Hosting, dominio y despliegue continuo

**Opciones de hosting:** Cloudflare Pages; Netlify; Vercel; GitHub Pages.

**Criterios:** costo cero en v1; despliegue por *push* a `main` y *previews* por *pull request*; dominio propio con TLS; redirecciones declarativas (necesarias para no romper URLs, D8); ruta a funciones serverless en fase 2 sin cambiar de proveedor.

**Recomendación: Cloudflare Pages.** Plan gratuito con dominio propio, *previews* por rama, archivo `_redirects`, cabeceras vía `_headers`, y en fase 2 Pages Functions/Workers, KV y D1 en el mismo proveedor. Netlify es equivalente en v1 pero su ruta a fase 2 es menos barata. Vercel empuja a Next.js. GitHub Pages no tiene redirecciones ni *previews*.

**Dominio:** registrar **`calcinst.mx` como canónico** y **`calcinst.com` como redirección 301**, si ambos están disponibles (H3). Razón: el mercado es mexicano y el `.mx` refuerza que el producto habla de la NOM, no del NEC. Si `.mx` no está disponible, el `.com` pasa a canónico y se documenta en `DECISIONES_SITIO.md`. El registrador no es material; el DNS sí debe vivir en Cloudflare para que Pages gestione TLS y redirecciones. `www.` redirige al apex.

**Despliegue:** GitHub → Cloudflare Pages (integración nativa). Rama `main` = producción; toda rama = *preview*. CI en GitHub Actions ejecuta `astro check`, `vitest`, verificación de invariantes (§5) y Lighthouse CI en cada PR. Cloudflare solo despliega lo que pasó CI.

**Costo de revertir:** bajo. Un sitio estático se mueve entre proveedores en una tarde; solo cambia el archivo de redirecciones (formato casi idéntico entre Cloudflare y Netlify).

### D3 — Captura de correos y newsletter

**Opciones:** Buttondown; Kit (antes ConvertKit); Mailchimp; Resend + lista propia; Listmonk autoalojado.

**Criterios:** costo cero al inicio; API para formulario propio (I1 exige control del error); *double opt-in*; exportación de suscriptores en CSV (portabilidad); soporte de Markdown para redactar; ubicación de datos y contrato de tratamiento de datos disponible; sin cookies de rastreo en el formulario.

**Recomendación: Buttondown.** Tiene API de suscripción para formulario propio, *double opt-in* configurable, exporta CSV, se redacta en Markdown, tiene nivel gratuito de arranque y no inyecta rastreadores en el sitio. Kit es una alternativa válida y con nivel gratuito más amplio, pero su ecosistema empuja a *embeds* y *landing pages* propias que no controlamos. Mailchimp añade cookies y complejidad. Resend + lista propia exige base de datos (prohibido en v1). Listmonk exige un servidor (costo y mantenimiento).

**Cumplimiento (LFPDPPP / ley vigente, ver H2):**
- El formulario muestra, junto al botón, la finalidad ("recibir avisos sobre CalcInst y publicaciones del blog") y enlace al aviso de privacidad **integral**; el texto del botón no es "Suscribirme" sino "Aceptar y unirme a la lista", y se registra el consentimiento con la fecha (Buttondown lo guarda).
- *Double opt-in* obligatorio: el correo de confirmación es la evidencia de consentimiento.
- El aviso de privacidad nombra a Buttondown como encargado del tratamiento y declara la transferencia internacional (servidores fuera de México).
- Derechos ARCO: canal por correo declarado en el aviso; la baja es de un clic desde cada envío y también atendible por correo.
- Datos recolectados: **solo correo**. No nombre, no empresa, no cargo. Menos datos, menos obligaciones.

**Costo de revertir:** bajo. La lista se exporta en CSV; el formulario es propio, así que cambiar de proveedor es cambiar un *endpoint* y una clave. El costo real de reversión es el reconsentimiento si el nuevo proveedor está en otra jurisdicción, y eso se mitiga declarando la transferencia internacional de forma genérica desde el inicio.

### D4 — Modelo de venta (decidir, no implementar)

**Opciones:** (a) licencia perpetua + prueba; (b) suscripción anual; (c) freemium.

**Análisis para software técnico de nicho vendido a ingenieros y despachos en México:**
- El comprador típico (proyectista independiente, despacho pequeño, área de ingeniería de una planta) **compra por proyecto o por año fiscal**, con presupuesto aprobado por un tercero y con exigencia de CFDI. La suscripción mensual con tarjeta personal encaja mal; el pago anual encaja bien con ambos.
- El **rechazo al software que deja de funcionar si se deja de pagar** es alto en este segmento: la memoria de cálculo firmada de hace tres años tiene que poder reabrirse. Esto descarta la suscripción pura como única opción.
- El **freemium** en una herramienta cuyo valor es la corrección normativa es peligroso: la versión gratuita tendría que ser incompleta en algo que no sea la corrección, y cualquier recorte del cálculo genera resultados parciales que alguien firmará. Además, no hay evidencia de que el volumen justifique conversión por embudo (no invento cifras: no las tengo).
- El **costo de mantenimiento no es cero**: la NOM cambia de versión, las tablas se actualizan, y eso es trabajo continuo que una licencia perpetua sin ingresos recurrentes no financia.

**Recomendación: (a′) licencia perpetua por versión mayor, con un año de actualizaciones incluido, renovable; prueba gratuita de 30 días con funcionalidad completa y marca de agua "PRUEBA — NO VÁLIDO PARA FIRMA" en la exportación.** Es decir: el modelo "licencia + mantenimiento anual" clásico del software de ingeniería, no SaaS. Variante para despachos: licencia por puesto con descuento por volumen. La clave de licencia se valida **sin conexión** con firma asimétrica (el archivo de licencia lleva la firma; la app lleva la clave pública), lo que además elimina el servidor de licencias en línea como punto único de falla y responde a la confidencialidad de clientes industriales.

Esto coincide con la recomendación previa registrada en `DECISIONES.md` de CalcInst (Tauri + licencia anual con *fallback* perpetuo).

**Efecto sobre el sitio hoy:** el modelo de datos de `producto.json` reserva `precios: null`, `licencia: { tipo: 'perpetua-mantenimiento', pruebaDias: 30 }`, y la navegación reserva el espacio de **Precios** (oculto mientras `estado !== 'disponible'`). Ningún texto del sitio menciona precio ni modelo hasta que se cierre D5 con el contador.

**Costo de revertir:** medio. Cambiar de perpetua a suscripción tras vender licencias perpetuas obliga a respetar las ya vendidas para siempre; el costo es operativo, no técnico. Cambiar de suscripción a perpetua es trivial. Por eso conviene arrancar con la opción más conservadora para el comprador y más exigente para el vendedor.

### D5 — Cobro y facturación (decidir, no implementar)

**Opciones:** (a) *merchant of record* extranjero (Paddle, Lemon Squeezy); (b) Stripe México con facturación propia; (c) Mercado Pago con facturación propia; (d) híbrido.

**Punto crítico:** el cliente profesional y la empresa **exigen CFDI 4.0** con su RFC, régimen fiscal y uso de CFDI para deducir el gasto. Un MoR extranjero factura a nombre propio y **no emite CFDI**. Aunque una empresa mexicana puede en ciertos casos deducir un gasto con comprobante extranjero cumpliendo requisitos adicionales, el área contable del cliente lo rechazará en la práctica y la venta se caerá en el último paso. Este solo hecho descarta (a) como canal principal para México.

| Criterio | Paddle / Lemon Squeezy | Stripe MX + CFDI propio | Mercado Pago + CFDI propio |
|---|---|---|---|
| Emite CFDI al cliente | No | Sí, vía PAC integrado por API | Sí, vía PAC integrado por API |
| Quién es el vendedor fiscal | El MoR (declara IVA de servicios digitales en México) | Sebastián o su entidad (RFC obligatorio) | Ídem |
| IVA | El MoR lo maneja | 16% desglosado en el CFDI; se traslada y se entera | Ídem |
| Retenciones | N/A al vendedor | Si el cliente es persona moral y el vendedor persona física: el cliente **retiene** ISR e IVA parcial y el CFDI lleva complemento; el flujo lo debe soportar el PAC | Ídem |
| Métodos de pago locales (SPEI, OXXO) | Limitados | SPEI y OXXO disponibles en Stripe MX | Muy fuerte en pagos locales |
| Complejidad para el desarrollador | Mínima | Media: Stripe Checkout + *webhook* + llamada al PAC | Media-alta: API menos madura para SaaS |
| Ventas fuera de México | Óptimo | Posible, sin CFDI (factura simple) | Débil |

**Recomendación: (b) Stripe México + emisión de CFDI por API de un PAC (Facturapi, o equivalente con integración a Stripe), con (a) como canal secundario para compradores fuera de México en una fase posterior.** Requisitos previos, todos fuera del sitio y marcados pendientes: RFC activo con régimen que permita la actividad (persona física con actividad empresarial o RESICO, o persona moral — decisión con el contador, ver H4), firma electrónica y certificado de sello digital, alta ante un PAC.

**Flujo diseñado (fase 2, no se implementa):** Checkout de Stripe → *webhook* `checkout.session.completed` recibido por una Pages Function → generación del archivo de licencia firmado → llamada al PAC con los datos fiscales capturados en el checkout (RFC, razón social, régimen, código postal fiscal, uso de CFDI) → correo con licencia + XML + PDF. Si la emisión del CFDI falla, la licencia **sí** se entrega y el CFDI queda en cola con aviso explícito al cliente y al vendedor (I1 aplicado al comercio: nada falla en silencio).

**Costo de revertir:** medio-alto en dirección (b)→(a) (perder el CFDI enoja a clientes ya facturados); bajo en (b)→(c) (mismo PAC, otro procesador). Por eso conviene abstraer "procesador de pago" y "emisor de CFDI" como dos módulos independientes desde el diseño.

**Fecha de corte:** la consulta con el contador (H4) debe cerrarse **antes de que `estado` pase a `disponible`**. No bloquea ninguna etapa de este plan.

### D6 — Empaquetado de escritorio, solo en lo que afecta al sitio

**Decisión de fondo (ya tomada en CalcInst): Tauri 2.** Aquí solo se derivan sus consecuencias para la página de descarga.

| Aspecto | Tauri 2 | Electron | Efecto en el sitio |
|---|---|---|---|
| Sistemas operativos | Windows 10/11 x64; macOS 11+ (Intel y Apple Silicon o *universal*); Linux (.deb/.AppImage) | Los mismos | La página de descarga lista **plataforma × arquitectura**; se recomienda lanzar **solo Windows x64** en beta (H7) y agregar macOS/Linux cuando existan probadores |
| Peso del instalador | Decenas de MB o menos (usa el *webview* del sistema) | Típicamente >100 MB (incluye Chromium) | El contrato de datos lleva `tamanoBytes` por artefacto; con Tauri el peso es un argumento de venta que se muestra |
| Dependencia de sistema | WebView2 en Windows (preinstalado en Win 11; el instalador lo descarga en Win 10 si falta) | Ninguna | La sección "Requisitos" debe mencionar WebView2 y qué pasa si no está |
| Actualizaciones | Plugin `updater`: la app consulta un JSON (`latest.json`) firmado con clave del desarrollador; los binarios se sirven desde GitHub Releases | Squirrel/electron-updater | El sitio **publica el manifiesto de actualización** en una URL estable (`/descarga/latest.json` o redirección a GitHub Releases). El contrato de datos de la Etapa 7 debe ser un superconjunto del formato del *updater* de Tauri |
| Firma de código Windows | Certificado OV/EV de una CA, o Azure Trusted Signing (verificar elegibilidad para personas físicas, H8) | Ídem | Sin firma, SmartScreen muestra "Windows protegió su PC". Con firma nueva, la advertencia persiste hasta acumular reputación. La página de descarga **debe explicar esto con captura y pasos** ("Más información → Ejecutar de todas formas"), sin normalizar ignorar advertencias en general |
| Firma macOS | Apple Developer Program (anual) + notarización | Ídem | Sin notarizar, Gatekeeper bloquea; el usuario debe usar clic derecho → Abrir. Se explica igual. Si no se paga el programa, **no se publica beta para macOS** |
| Hash | SHA-256 por artefacto | Ídem | Se publica junto a cada descarga con el comando para verificarlo en PowerShell (`Get-FileHash`) y en Terminal (`shasum -a 256`) |

**Costo de revertir (Tauri→Electron):** para el sitio, casi nulo: cambian los pesos y el formato del manifiesto de actualización; el contrato de datos de la Etapa 7 se diseña con campos genéricos para que sobreviva.

### D7 — Analítica respetuosa de la privacidad

**Opciones:** Cloudflare Web Analytics; Plausible (nube); Umami (nube o autoalojado); GoatCounter; nada.

**Criterios:** sin cookies (evita el banner de consentimiento, que además contradice la dirección visual); costo cero; datos suficientes para saber qué posts atraen y qué convierte al formulario; sin transferir el correo del usuario ni identificadores persistentes.

**Recomendación: Cloudflare Web Analytics** en v1 (sin cookies, sin costo, ya está en el proveedor). Limitación aceptada: métricas más pobres que Plausible (sin embudos ni eventos personalizados sofisticados). **Evento único que sí se necesita** — "alta en lista exitosa" — se registra del lado del servidor en Buttondown, no en la analítica, así que no se pierde. Si en seis meses la limitación duele, se pasa a Plausible (nube, de pago, también sin cookies) cambiando un `<script>`. Se descarta Google Analytics por cookies y transferencia de datos.

**Costo de revertir:** trivial: un *script tag*. Se pierde la continuidad histórica, que en v1 vale poco.

### D8 — Arquitectura de contenido del blog

**Objetivo:** URLs permanentes que no se rompan cuando el blog crezca, taxonomía que pueda reorganizarse sin mover posts, y relación explícita post ↔ artículo normativo.

**URLs (decisión cerrada):**

| Ruta | Contenido | Regla |
|---|---|---|
| `/blog/` | Índice paginado (`/blog/2/`, …) | — |
| `/blog/{slug}/` | Post | El `slug` **no contiene fecha ni categoría** y es **inmutable** una vez publicado. Renombrar exige una entrada en `_redirects` (301) y se registra en el post (`slugsAnteriores[]`) |
| `/blog/categoria/{slug}/` | Una categoría | Un post tiene **exactamente una** categoría |
| `/blog/etiqueta/{slug}/` | Una etiqueta | Un post tiene cero o más etiquetas |
| `/blog/rss.xml` | RSS 2.0 completo (contenido íntegro, no solo resumen) | Se alimenta a Buttondown para "RSS a correo" si se desea |
| `/normativa/` | Índice de artículos y tablas de la NOM citados, generado desde `normativa[]` de todos los posts | Fase 1 tardía (Etapa 9); es el activo SEO de largo plazo |
| `/normativa/{ref}/` | Todos los posts que citan un artículo o tabla (`ref` = `310-15-b-16`, `430-22`, `cap9-tabla-4`) | Ídem |

**Categorías iniciales (5, cerradas hasta que existan 20 posts):** `conductores`, `motores`, `canalizaciones`, `puesta-a-tierra`, `practica-profesional`. **Etiquetas** libres pero normalizadas a minúsculas con guiones; el esquema rechaza etiquetas con mayúsculas o espacios.

**Esquema de *frontmatter* (validado por Zod en la colección `blog`; el build falla si un post no cumple):**

```yaml
title: string                    # ≤ 70 caracteres
description: string              # 120–160 caracteres (meta description)
fechaPublicacion: date
fechaActualizacion: date?        # obligatoria si erratas no está vacía
categoria: enum                  # una de las 5
etiquetas: string[]              # kebab-case
normativa:                       # ≥ 1 entrada; I3 se verifica aquí
  - ref: "310-15(b)(16)"         # artículo, sección o tabla
    tipo: "tabla" | "articulo" | "nota"
    version: "NOM-001-SEDE-2018" # la versión citada (ver H1)
    verificadoDOF: boolean       # false = no publicar; el build falla si es false y borrador es false
borrador: boolean                # true → se excluye del build de producción
erratas:                         # visible en el post (política §11)
  - fecha: date
    descripcion: string
    afectaResultado: boolean
slugsAnteriores: string[]        # para trazabilidad de redirecciones
imagenPortada: string?
```

**Relación post ↔ artículo normativo:** el componente `<CalloutNormativo ref="430-22" version="NOM-001-SEDE-2018">` se usa en el cuerpo del post cada vez que se cita; el build cruza las referencias del cuerpo con `normativa[]` del *frontmatter* y **falla si el cuerpo cita algo que el frontmatter no declara**. Así I3 no depende de disciplina, sino del compilador.

**Costo de revertir:** bajo para taxonomía (categorías y etiquetas no están en la URL del post); alto para el formato de URL del post, por eso se cierra ahora y se protege con `_redirects`.

---

## 3. Sistema de diseño

### 3.1 Dirección visual

Técnica, precisa, densa. El sitio se ve como una extensión del lienzo CAD de CalcInst, no como un SaaS. Reglas:

- **Oscuro por defecto** en todo el sitio, incluido el blog. Tema claro disponible por `prefers-color-scheme: light` y por conmutador manual; ambos comparten los mismos tokens semánticos. El tema claro no se diseña aparte: se deriva invirtiendo la escala de neutros y se verifica contraste igual que el oscuro.
- **Retícula métrica** como motivo: fondo SVG de líneas cada 1 "m" (24 px) con línea mayor cada 5, en `--color-grid` a opacidad baja. Aparece en el hero, en las tarjetas de características y como separador de secciones. Estática; nada se anima si `prefers-reduced-motion: reduce`.
- **Bordes, no sombras.** La elevación se expresa con `--color-line` y cambios de fondo (`--bg-1`, `--bg-2`), como los paneles de la app.
- **Datos técnicos siempre en monoespaciada** y alineados a la derecha en tablas: calibres, ampacidades, porcentajes, artículos de la NOM.
- **Prohibido:** degradados de color, blobs, ilustraciones 3D, iconografía genérica de "rayo con engranaje", fotos de stock de ingenieros con casco. Los únicos elementos visuales son capturas reales del producto, diagramas técnicos en SVG y la retícula.
- **Capturas reales del lienzo son protagonistas.** Se capturan desde la app en su tema oscuro, a 2× de densidad, sin datos de clientes reales, con un proyecto de demostración fijo versionado en el repositorio del sitio (`demo.calcinst.json`) para que las capturas sean reproducibles cuando cambie la UI.

### 3.2 Tokens de color (tema oscuro)

Los contrastes indicados son estimaciones calculadas con la fórmula WCAG 2.x sobre `--bg-0`; la Etapa 2 **debe verificarlos con herramienta** (axe o Polypane) y registrar la salida como evidencia. Objetivo: AA en todo texto (≥ 4.5:1) y AAA en texto de cuerpo (≥ 7:1).

| Token | Valor | Uso | Contraste est. sobre `--bg-0` |
|---|---|---|---|
| `--bg-0` | `#0B0F14` | Fondo de página | — |
| `--bg-1` | `#11161D` | Paneles, tarjetas | — |
| `--bg-2` | `#182028` | Elementos elevados, código | — |
| `--color-line` | `#263140` | Bordes, separadores | (decorativo) |
| `--color-grid` | `#1C2530` | Retícula | (decorativo) |
| `--fg-0` | `#E6EDF3` | Texto principal | ≈ 15:1 |
| `--fg-1` | `#9AA7B4` | Texto secundario | ≈ 7.9:1 |
| `--fg-2` | `#6B7885` | Texto terciario, deshabilitado | ≈ 4.6:1 (solo para texto ≥ 18 px o no esencial) |
| `--accent` | `#F5B72B` | Acción principal, foco, resaltes (ámbar de *snap* CAD) | ≈ 10.7:1; texto `--bg-0` sobre `--accent` ≈ 10.7:1 |
| `--link` | `#5CC8FF` | Enlaces, referencias normativas | ≈ 10.3:1 |
| `--ok` | `#3DD68C` | Estado correcto | verificar |
| `--warn` | `#F5B72B` | Advertencia (comparte con `--accent`; se distingue por icono y texto, nunca solo por color) | ≈ 10.7:1 |
| `--danger` | `#F0716B` | Error, errata que afecta resultado | verificar |

Tema claro: `--bg-0 #F6F8FA`, `--bg-1 #FFFFFF`, `--bg-2 #EEF1F4`, `--fg-0 #0B0F14`, `--fg-1 #3D4753`, `--accent #9A6700` (ámbar oscurecido para contraste sobre claro), `--link #0969DA`. Verificar igual.

### 3.3 Tipografía

- **Texto:** IBM Plex Sans (OFL), pesos 400 y 600, autoalojada vía `@fontsource-variable` o subconjunto latino estático; `font-display: swap`.
- **Datos y código:** IBM Plex Mono (OFL), 400 y 500. Se usa para calibres, tablas, referencias normativas (`Art. 310-15(b)(16)`), bloques de código y el manifiesto de descarga.
- **Escala** (ratio 1.25, base 16 px): `--text-xs 12` · `--text-sm 14` · `--text-base 16` · `--text-lg 20` · `--text-xl 25` · `--text-2xl 31` · `--text-3xl 39` · `--text-4xl 49`. Interlineado 1.6 en cuerpo, 1.2 en títulos. Ancho de medida del blog: 68 caracteres máximo.
- Números en tablas con `font-variant-numeric: tabular-nums`.

### 3.4 Espaciado, radios, elevación, foco

- **Espaciado:** base 4 px; escala `1 2 3 4 6 8 12 16 24 32` (×4 px). La retícula de 24 px alinea las secciones.
- **Radios:** `--r-sm 2px`, `--r-md 4px`, `--r-lg 6px`. Nada más redondo: el lenguaje es técnico.
- **Elevación:** tres niveles, expresados como cambio de fondo + borde `--color-line`. Sin `box-shadow` salvo en menús flotantes (`0 8px 24px rgb(0 0 0 / .4)`).
- **Foco:** `outline: 2px solid var(--accent); outline-offset: 2px` en todo elemento interactivo; nunca `outline: none` sin reemplazo visible. Verificado con navegación por teclado en la Etapa 10.
- **Movimiento:** transiciones ≤ 150 ms solo en `color`, `background`, `border-color`, `opacity`. Todas envueltas en `@media (prefers-reduced-motion: no-preference)`.

### 3.5 Componentes base (Etapa 2)

| Componente | Variantes / notas |
|---|---|
| `Boton` | `primario` (ámbar, texto oscuro), `secundario` (borde `--color-line`), `fantasma`; tamaños `sm/md`; estado `cargando` y `deshabilitado`; nunca solo icono sin `aria-label` |
| `Tarjeta` | Fondo `--bg-1`, borde `--color-line`, opcional fondo de retícula |
| `BarraNav` | Logo, Producto, Quiénes somos, Blog, botón de acción (texto según estado), conmutador de tema. Menú hamburguesa < 768 px, accesible (`aria-expanded`, foco atrapado) |
| `Pie` | Términos, Privacidad, Contacto, redes, RSS, "Estado: en desarrollo" leído del estado de lanzamiento |
| `BloqueCodigo` | Shiki en build (sin JS en cliente), tema propio derivado de los tokens, botón copiar como isla mínima |
| `Tabla` | Cabecera fija en móvil por scroll horizontal, numéricos en mono a la derecha, caption obligatorio |
| `CalloutNormativo` | Props `ref`, `version`, `tipo`; renderiza etiqueta "NOM-001-SEDE-2018 · Art. 430-22" en mono, borde izquierdo `--link`; enlaza a `/normativa/{ref}/` |
| `AvisoErrata` | Lista visible al inicio del post si `erratas.length > 0`; en `--danger` si alguna `afectaResultado` |
| `Insignia` | `proximamente`, `beta`, `disponible`, `borrador` |
| `FormularioCorreo` | Isla con estado `inactivo | enviando | exito | error`; el estado `error` muestra el mensaje y un correo de contacto alterno (I1) |
| `Descargo` | Bloque estándar al pie de cada post técnico (texto en §11) |

---

## 4. Arquitectura del sitio y ruta a fase 2

### 4.1 Estructura del repositorio (`calcinst-web`)

```
calcinst-web/
├─ src/
│  ├─ config/
│  │  ├─ lanzamiento.ts        # ESTADO_LANZAMIENTO — único lugar (I7)
│  │  ├─ producto.json         # nombre, versión, licencia, precios: null
│  │  ├─ capacidades.json      # registro de capacidades (§11, "prometer de más")
│  │  └─ sitio.ts              # dominio canónico, correo de contacto, redes
│  ├─ content/
│  │  ├─ blog/                 # *.mdx
│  │  ├─ legal/                # terminos.mdx, privacidad.mdx (versionados con fecha)
│  │  └─ config.ts             # esquemas Zod
│  ├─ components/              # .astro + islas .tsx
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ producto.astro
│  │  ├─ quienes-somos.astro
│  │  ├─ descarga/index.astro
│  │  ├─ descarga/latest.json.ts   # manifiesto (contrato §Etapa 7)
│  │  ├─ blog/…
│  │  ├─ normativa/…
│  │  ├─ contacto.astro
│  │  ├─ terminos.astro · privacidad.astro · 404.astro
│  │  └─ (fase 2, reservado, no existe hoy) comprar/ · cuenta/ · api/
│  └─ styles/tokens.css
├─ public/
│  ├─ _redirects · _headers · robots.txt
│  └─ capturas/                # PNG/AVIF generadas desde demo.calcinst.json
├─ scripts/
│  ├─ verificar-invariantes.mjs   # I1, I3, I7 en CI
│  └─ generar-capturas.md         # procedimiento manual documentado
├─ tests/                         # Vitest: esquemas, estado, componentes puros
├─ demo.calcinst.json
├─ ESTADO_SITIO.md · DECISIONES_SITIO.md · HIPOTESIS_SITIO.md
└─ astro.config.mjs · package.json · tsconfig.json (estricto, mismas banderas que CalcInst)
```

### 4.2 Estado de lanzamiento (I7)

```ts
// src/config/lanzamiento.ts — el ÚNICO lugar
export const ESTADOS = { proximamente: 'proximamente', beta: 'beta', disponible: 'disponible' } as const
export type EstadoLanzamiento = (typeof ESTADOS)[keyof typeof ESTADOS]
export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.proximamente

export const TEXTO = {
  proximamente: { accion: 'Únete a la lista', banner: null,                          descarga: 'aviso' },
  beta:         { accion: 'Descargar beta',   banner: 'Versión beta: puede contener errores. Verifica cada resultado.', descarga: 'lista' },
  disponible:   { accion: 'Descargar',        banner: null,                          descarga: 'lista' },
} as const satisfies Record<EstadoLanzamiento, unknown>
```

Los componentes importan `ESTADO_LANZAMIENTO` y `TEXTO[ESTADO_LANZAMIENTO]`. El script de invariantes falla si algún archivo fuera de `src/config/` contiene los literales `"próximamente"`, `"proximamente"`, `"Descargar beta"` o `"Únete a la lista"`.

### 4.3 Registro de capacidades (`capacidades.json`)

Cada capacidad tiene `id`, `nombre`, `descripcion`, `estado: 'verificado' | 'implementado' | 'planeado'`, `normativa[]`. Reglas:
- La página Producto y el Inicio **solo renderizan `verificado`**.
- `implementado` (código existe, sin caso de referencia calculado a mano) **no se muestra**.
- `planeado` puede listarse en una sección explícita "En desarrollo" con esa etiqueta, nunca mezclado.

Valores iniciales derivados de `ESTADO_PROYECTO.md` (2026-07-30):

| id | estado inicial | Razón |
|---|---|---|
| `dibujo-reticula-metros` | verificado | Completo, sin dependencia normativa |
| `distancias-grafo` | verificado | Completo |
| `factor-agrupamiento` | verificado | Tabla 310-15(b)(3)(a), tests |
| `correccion-temperatura` | verificado | Tests; Ft sin clamp ≤ 1 (decisión registrada) |
| `sizing-caso-1` | **implementado** | Falta corregir Art. 430-22 y construir caso de referencia a mano |
| `sizing-caso-2` | **implementado** | Ídem |
| `sizing-caso-3-alimentador` | **implementado** | Falta corregir Art. 430-24 (suma aritmética + 25 %); Bug 4 abierto |
| `caida-tension` | implementado | Depende del calibre; pasa a verificado con los casos de referencia |
| `protecciones` | **planeado** | No iniciado. **No aparece como funcionalidad.** |
| `memoria-calculo-exportable` | **planeado** | Hoy solo CSV. El sitio dice "exportación CSV", no "memoria de cálculo" |
| `exportacion-csv` | verificado | Completo |

Consecuencia dura para el redactor de Inicio y Producto: hasta que Caso 1–3 pasen a `verificado`, el sitio describe el dimensionamiento de conductores como **"en verificación normativa"**, no como característica lista. Esto es incómodo y es correcto.

### 4.4 Ruta explícita a fase 2 (sin migración)

| Necesidad de fase 2 | Cómo se agrega | Qué cambia de hoy |
|---|---|---|
| Página de compra `/comprar/` | Ruta estática que abre Stripe Checkout | Nada; se agrega |
| *Webhook* de Stripe | `src/pages/api/stripe.ts` con `export const prerender = false` + adaptador `@astrojs/cloudflare` | Se añade el adaptador; las páginas existentes siguen prerenderizadas |
| Emisión de licencia | Función en el mismo *webhook*: firma Ed25519 con clave privada en variable de entorno de Cloudflare | Nada |
| Emisión de CFDI | Llamada al PAC desde el *webhook*; cola de reintento en Cloudflare Queues o KV | Nada |
| Portal de cuenta `/cuenta/` | Acceso por enlace mágico al correo de compra (sin contraseñas); datos en D1 | Se añade D1; **decisión de almacenamiento se cierra en fase 2 con fecha de corte al iniciar esa fase** |
| Precios en navegación | Ya reservado: `BarraNav` renderiza "Precios" si `ESTADO_LANZAMIENTO === 'disponible' && producto.precios !== null` | Solo datos |
| Facturación posterior (cliente que olvidó su RFC) | Formulario en `/cuenta/` | Nada |

Ninguna de estas adiciones toca las páginas de contenido ni el blog. I5 queda satisfecha por diseño; su verificación es una prueba de humo en la Etapa 1 (§6).

---

## 5. Invariantes I1–I7 y método de verificación

| Inv. | Enunciado | Verificación | Cuándo |
|---|---|---|---|
| **I1** | Ningún contacto se pierde en silencio | Test de componente: con `fetch` simulado que devuelve 500, la UI muestra estado `error` con texto y correo alterno; con red bloqueada (`fetch` lanza), ídem. Prohibido `try/catch` vacío: regla de lint `no-empty` sin excepciones + búsqueda en CI de `catch {}` / `catch (e) {}` en `src/` | Etapa 8, y CI siempre |
| **I2** | Contenido portable | Prueba de portabilidad: script que renderiza cada `.mdx` con `remark` puro (fuera de Astro) y falla si un post usa un componente no listado en `componentes-portables.json`. Solo se permiten `CalloutNormativo`, `AvisoErrata`, `Tabla`, `BloqueCodigo`, `Descargo`, y sus equivalentes tienen fallback Markdown documentado | Etapa 4, y CI siempre |
| **I3** | Trazabilidad normativa, no autoridad personal | (a) Esquema Zod exige `normativa.length ≥ 1` y `verificadoDOF: true` para publicar. (b) Cruce cuerpo ↔ frontmatter (D8). (c) Búsqueda en CI de los términos `Ing\.`, `ingeniero titulado`, `cédula`, `licencia profesional`, `colegiado` en todo `src/` y `content/` fuera de una lista blanca de contextos negativos ("no soy ingeniero titulado"). (d) JSON-LD `Person` **sin** `hasCredential`, `jobTitle` = "Estudiante de ingeniería eléctrica" | Etapas 4, 6, 9; CI siempre |
| **I4** | Rendimiento | Lighthouse CI en PR con presupuestos: **LCP ≤ 2.0 s** en Moto G4 emulado / 4G lento; **peso total de post de blog ≤ 300 KB** transferidos (imágenes incluidas, AVIF/WebP, `loading="lazy"` fuera del primer pantallazo); **JS en páginas de contenido ≤ 5 KB** (solo conmutador de tema y botón copiar); Inicio ≤ 600 KB con capturas. El build falla si se excede | Etapa 1 configura, Etapa 10 endurece; CI siempre |
| **I5** | Fase 2 sin migración | Prueba de humo en Etapa 1: crear una ruta `/api/ping.ts` con `prerender = false` bajo el adaptador de Cloudflare en una rama de prueba, desplegar a *preview*, verificar respuesta, **borrar la rama**. Evidencia: URL de preview y `curl`. Demuestra que el camino existe sin dejar código | Etapa 1 |
| **I6** | Legal antes del primer correo | `FormularioCorreo` solo se monta si `legal/privacidad.mdx` y `legal/terminos.mdx` tienen `publicado: true` y `fechaVigencia ≤ hoy`; si no, renderiza el bloque "Lista próximamente" **sin campo de correo**. Test unitario de esa condición | Etapas 6 y 8 |
| **I7** | El estado de lanzamiento vive en un solo lugar | Script `verificar-invariantes.mjs`: falla si los literales de estado aparecen fuera de `src/config/`. Test: cambiar `ESTADO_LANZAMIENTO` a cada valor y comprobar que hero, botón, pie y descarga cambian sin tocar otro archivo (`git diff --stat` debe mostrar un solo archivo) | Etapa 3, y CI siempre |

---

## 6. Etapas 0–10

Convenciones comunes a todas las etapas:
- Cada etapa arranca compartiendo `ESTADO_SITIO.md` y termina actualizándolo (sección "Última etapa cerrada" + evidencia adjunta).
- Cierre de etapa **siempre** con la salida literal de: `npx astro check` (0 errores), `npm test` (conteo de pruebas antes/después), `npm run build` (éxito), `node scripts/verificar-invariantes.mjs` (OK), `git diff --stat` contra el commit de inicio de etapa.
- Addenda: `A{n}` en `ESTADO_SITIO.md`, con fecha, etapa afectada, cambio, razón. Nunca se edita el plan.
- Claude Code no instala dependencias sin listarlas primero con versión exacta y esperar aprobación (regla heredada de CalcInst).

### Etapa 0 — Reconocimiento, hipótesis y decisión de stack. No escribe código.

- **Objetivo:** confirmar que las decisiones D1–D3 y D7 son ejecutables hoy con versiones concretas; crear los tres documentos de gobierno; verificar disponibilidad del dominio; registrar hipótesis.
- **Archivos:** `ESTADO_SITIO.md`, `DECISIONES_SITIO.md`, `HIPOTESIS_SITIO.md` (nuevos, en un repositorio vacío `calcinst-web` con solo `README.md` y `.gitignore`).
- **Criterios de aceptación:** los tres documentos existen; `DECISIONES_SITIO.md` copia D1–D8 con versiones exactas de Astro, `@astrojs/mdx`, `@astrojs/cloudflare`, Tailwind v4, Node LTS, verificadas con `npm view <paquete> version` (salida literal); `HIPOTESIS_SITIO.md` contiene H1–H10 de §8 con estado `abierta`; se documenta el resultado de la consulta `whois`/registrador para `calcinst.mx` y `calcinst.com` (H3).
- **Evidencia:** salida de `node -v`, `npm -v`, cada `npm view … version`; `git log --oneline` (1 commit); listado `ls -la`.
- **Riesgos de regresión:** ninguno (no hay código). Riesgo real: que Claude Code "avance" y genere scaffolding. **Prohibido explícitamente en el prompt** (§9).

### Etapa 1 — Andamiaje, tooling, página en blanco desplegada al dominio

- **Objetivo:** `npm create astro` con TypeScript estricto, MDX, Tailwind v4, Vitest, ESLint, Prettier; CI en GitHub Actions; Cloudflare Pages conectado; `calcinst.mx` sirviendo una página en blanco con el título "CalcInst" y `noindex` temporal; prueba de humo I5.
- **Archivos:** `astro.config.mjs`, `tsconfig.json` (mismas banderas que CalcInst), `package.json`, `.github/workflows/ci.yml`, `src/pages/index.astro` (vacío), `public/_headers` (`X-Robots-Tag: noindex` hasta la Etapa 9), `scripts/verificar-invariantes.mjs` (esqueleto que ya corre), `lighthouserc.json`.
- **Criterios de aceptación:** `npm run build` genera `dist/` estático; CI verde en PR; `https://calcinst.mx` responde 200 con TLS y `www.` y `.com` redirigen 301; prueba de humo I5 documentada y rama borrada; Lighthouse CI corre (presupuestos aún laxos).
- **Evidencia:** URL de producción; `curl -I` de las cuatro URLs (apex, www, .com, .com/www); captura del panel de Cloudflare Pages; enlace al run de CI; `git diff --stat`.
- **Riesgos:** DNS mal apuntado deja el sitio en `.pages.dev`; certificado pendiente; olvidar el `noindex` y que Google indexe una página en blanco.

### Etapa 2 — Sistema de diseño y componentes base

- **Objetivo:** materializar §3 en `tokens.css` y componentes, con una página interna `/_diseno/` (excluida del sitemap, `noindex`) que muestra todos los componentes en todos sus estados, en ambos temas.
- **Archivos:** `src/styles/tokens.css`, `src/components/{Boton,Tarjeta,BarraNav,Pie,BloqueCodigo,Tabla,CalloutNormativo,AvisoErrata,Insignia,Descargo}.astro`, `src/components/islas/ConmutadorTema.tsx`, `src/pages/_diseno.astro`, `public/fuentes/`.
- **Criterios de aceptación:** contraste verificado con herramienta para **cada** par token/fondo de §3.2 en ambos temas (≥ 4.5:1 texto, ≥ 3:1 UI); navegación por teclado completa en `/_diseno/` con foco visible; `prefers-reduced-motion` respetado (comprobado con emulación en DevTools); fuentes autoalojadas y subconjuntadas (< 60 KB total WOFF2); cero JS salvo el conmutador de tema.
- **Evidencia:** tabla de contrastes con valores medidos (salida de la herramienta, no la estimación de este plan); capturas de `/_diseno/` en 360 px y 1280 px, ambos temas; tamaño de `dist/_astro/*.woff2`; `git diff --stat`.
- **Riesgos:** definir colores en componentes en lugar de tokens (regla de lint: prohibir hex en `.astro` y `.tsx`); `outline: none` sin reemplazo.

### Etapa 3 — Layout global: navegación, pie, estado de lanzamiento

- **Objetivo:** `lanzamiento.ts`, `producto.json`, `capacidades.json`, `sitio.ts`; `LayoutBase.astro` con `BarraNav` y `Pie` leyendo el estado; menú móvil accesible; `verificar-invariantes.mjs` implementa I7.
- **Archivos:** `src/config/*`, `src/layouts/LayoutBase.astro`, `src/components/BarraNav.astro` (cableado), `src/components/Pie.astro` (cableado), `scripts/verificar-invariantes.mjs`, `tests/lanzamiento.test.ts`.
- **Criterios de aceptación:** cambiar `ESTADO_LANZAMIENTO` a cada uno de los tres valores cambia el texto del botón de acción y el pie sin tocar otro archivo (`git diff --stat` = 1 archivo en cada prueba); el script I7 falla intencionalmente al introducir un literal prohibido en un componente de prueba y vuelve a pasar al quitarlo (prueba negativa documentada); menú móvil operable con teclado y lector de pantalla (`aria-expanded`, `Escape` cierra).
- **Evidencia:** tres `git diff --stat` (uno por estado) + captura de cada estado; salida del script en fallo y en éxito; conteo de tests antes/después.
- **Riesgos:** el estado se filtra a `producto.json` y queda duplicado; menú móvil sin cierre por `Escape`.

### Etapa 4 — Blog completo, con dos posts reales

- **Objetivo:** colección `blog` con el esquema D8; índice paginado; página de post; categoría; etiqueta; RSS con contenido íntegro; cruce cuerpo↔frontmatter de `CalloutNormativo`; prueba de portabilidad I2; verificación I3 (a)(b)(c); **dos posts reales publicables** (T01 y T03 del calendario §7, redactados por Sebastián — Claude Code no redacta contenido normativo).
- **Archivos:** `src/content/config.ts`, `src/content/blog/*.mdx`, `src/pages/blog/{index,[...pagina],[slug],categoria/[slug],etiqueta/[slug],rss.xml}.astro|ts`, `src/layouts/LayoutPost.astro`, `scripts/verificar-portabilidad.mjs`, `componentes-portables.json`, `tests/blog-schema.test.ts`.
- **Criterios de aceptación:** un post sin `normativa` rompe el build (prueba negativa); un post con `verificadoDOF: false` y `borrador: false` rompe el build; un `CalloutNormativo` en el cuerpo no declarado en el frontmatter rompe el build; `rss.xml` valida en el validador W3C; el post renderizado con `remark` puro conserva todo el texto; Lighthouse del post: LCP ≤ 2.0 s, JS ≤ 5 KB, peso ≤ 300 KB; los dos posts tienen todas sus citas con `verificadoDOF: true` (con nota de qué versión del DOF se consultó, ver H1).
- **Evidencia:** salidas de las tres pruebas negativas; resultado del validador RSS; informe Lighthouse; `git diff --stat`; conteo de tests.
- **Riesgos:** el redactor (humano) publica con `verificadoDOF: true` sin haber verificado — esto no lo detecta el código; se mitiga con la regla del calendario editorial (§7: la verificación se hace en la sesión de redacción, no al publicar).

### Etapa 5 — Inicio y Producto

- **Objetivo:** ambas páginas leyendo `capacidades.json` y `lanzamiento.ts`; capturas reales desde `demo.calcinst.json`; comparación honesta contra el flujo en Excel (basada en los errores documentados de `examen1_2.xlsx`, sin nombrar el archivo ni a terceros).
- **Archivos:** `src/pages/index.astro`, `src/pages/producto.astro`, `public/capturas/*.avif|png`, `demo.calcinst.json`, `scripts/generar-capturas.md`, componentes de sección.
- **Criterios de aceptación:** ninguna característica renderizada tiene `estado !== 'verificado'` (test que inspecciona el HTML generado contra `capacidades.json`); la sección "En desarrollo" existe, etiquetada, y lista `implementado` y `planeado` sin adjetivos de disponibilidad; el hero no contiene fecha ni la palabra "pronto/próximo" fuera del componente de estado; capturas a 2× con `width/height` declarados (sin CLS); Inicio ≤ 600 KB.
- **Evidencia:** capturas en 360/768/1280; informe Lighthouse; salida del test de capacidades; `git diff --stat`.
- **Riesgos:** **prometer de más** (§11); capturas con datos de un proyecto real de ProICMex — prohibido, solo `demo.calcinst.json`.

### Etapa 6 — Quiénes somos, Contacto, Términos, Privacidad, 404

- **Objetivo:** cuatro páginas de contenido + 404; textos legales en `src/content/legal/` con `fechaVigencia`, `version` y `publicado`; JSON-LD `Person` conforme a I3(d).
- **Archivos:** `src/pages/{quienes-somos,contacto,terminos,privacidad,404}.astro`, `src/content/legal/{terminos,privacidad}.mdx`.
- **Criterios de aceptación:** el aviso de privacidad incluye: identidad y domicilio del responsable (H4 decide la identidad; hasta entonces, nombre de persona física y correo — se acepta como pendiente con fecha de corte), datos tratados (solo correo), finalidades primarias, ausencia de finalidades secundarias o su opt-out, transferencias (Buttondown, Cloudflare), medios ARCO, mecanismo de revocación, cambios al aviso, y la fecha; los términos cubren: sitio informativo, contenido del blog sin carácter de dictamen profesional, propiedad intelectual del sitio, y reservan la sección de licencia de software para fase 2 (marcada "no aplicable hasta la puesta a disposición del software"); I3(c) pasa; 404 propone Inicio, Blog y buscador de posts (lista estática).
- **Evidencia:** `git diff --stat`; salida de I3(c); captura de cada página en 360 px; revisión de los textos legales por Sebastián registrada en `ESTADO_SITIO.md` (**los textos legales no se publican sin revisión humana; idealmente del abogado ya consultado para `EXPEDIENTE_LEGAL_CALCINST.md`**).
- **Riesgos:** publicar el aviso con la ley equivocada (H2); atribuir credenciales en "Quiénes somos" por descuido de redacción.

### Etapa 7 — Descarga en estado `proximamente`, contrato de datos completo

- **Objetivo:** página `/descarga/` que en `proximamente` muestra aviso + formulario (I6 lo bloquea hasta la Etapa 8) y en `beta`/`disponible` lista artefactos; `/descarga/latest.json` sirviendo el manifiesto; sección "Advertencias de Windows/macOS" redactada (D6).
- **Contrato de datos (`src/config/descargas.json`), superconjunto del manifiesto del updater de Tauri:**

```json
{
  "canal": "beta" | "estable",
  "version": "0.1.0",
  "fechaPublicacion": "AAAA-MM-DD",
  "notasUrl": "/blog/…/",
  "notas": "texto corto",
  "requisitos": { "windows": "Windows 10 1809+ x64, WebView2", "macos": null, "linux": null },
  "artefactos": [
    {
      "plataforma": "windows" | "macos" | "linux",
      "arquitectura": "x86_64" | "aarch64" | "universal",
      "formato": "msi" | "nsis-exe" | "dmg" | "appimage" | "deb",
      "url": "https://github.com/…/releases/download/v0.1.0/…",
      "tamanoBytes": 0,
      "sha256": "…",
      "firmaUpdater": "…",
      "firmadoCodigo": false
    }
  ]
}
```

- **Criterios de aceptación:** esquema Zod del contrato; `latest.json` se genera desde `descargas.json` en el formato que espera el plugin `updater` de Tauri 2 (verificar formato exacto en la documentación de Tauri en el momento de la etapa y registrar la URL consultada); con `descargas.json` vacío y estado `proximamente`, la página no muestra ningún botón de descarga ni menciona plataformas como "disponibles"; con un `descargas.json` de prueba y estado `beta`, lista los artefactos con hash, tamaño legible, comando de verificación por plataforma, y la insignia `firmadoCodigo: false` produce el aviso de SmartScreen redactado; los artefactos de prueba **no se despliegan** (`git stash` documentado).
- **Evidencia:** captura en cada estado; `curl https://…/descarga/latest.json` (404 controlado o `{ "canal": null }` en `proximamente` — decidir y documentar); salida del test de esquema; `git diff --stat`.
- **Riesgos:** el formato del updater cambia entre versiones de Tauri (por eso el contrato propio es la fuente y `latest.json` se deriva); prometer macOS sin poder notarizar (H7).

### Etapa 8 — Captura de correos

- **Objetivo:** `FormularioCorreo` conectado a Buttondown con *double opt-in*; I1 y I6 verificados; el formulario aparece en Inicio, Descarga y pie del blog.
- **Archivos:** `src/components/islas/FormularioCorreo.tsx`, `tests/formulario-correo.test.tsx`, `src/config/sitio.ts` (correo alterno de contacto), aviso de privacidad ya publicado (Etapa 6, requisito bloqueante).
- **Criterios de aceptación:** test: respuesta 500 → estado `error` con texto y correo alterno; `fetch` lanza → ídem; 2xx → estado `exito` con texto "Revisa tu correo para confirmar" (no "Listo"); doble envío bloqueado durante `enviando`; sin JS habilitado, el `<form>` hace POST nativo al endpoint público de Buttondown (degradación funcional) — **excepción documentada a la regla "sin `<form>`" de artefactos, porque aquí no es un artefacto React sino una página estática**; I6: con `publicado: false` en el aviso, el campo no se renderiza (test); la clave de API de Buttondown **no está en el cliente** — se usa el endpoint público de suscripción o, si el proveedor lo exige, una Pages Function mínima (si se necesita, se documenta como la primera función serverless y se acepta como excepción a "sin backend" solo para este propósito, con addendum).
- **Evidencia:** salidas de los tests; captura de los cuatro estados; un alta real de prueba con el correo de Sebastián y captura del correo de confirmación recibido; `git diff --stat`.
- **Riesgos:** *fallback* silencioso en el `catch`; texto de éxito que afirma el alta antes de la confirmación (falso).

### Etapa 9 — SEO técnico, datos estructurados, sitemap, RSS, Open Graph, `/normativa/`

- **Objetivo:** quitar `noindex`; `sitemap-index.xml`; `robots.txt`; canónicas; Open Graph y Twitter Card con imagen generada por post (plantilla SVG → PNG en build, con retícula y título); JSON-LD `Organization`, `SoftwareApplication` (con `offers` ausente hasta `disponible`), `BlogPosting` por post, `Person` sin credenciales (I3d); índice `/normativa/` y páginas `/normativa/{ref}/` generadas desde `normativa[]`.
- **Criterios de aceptación:** validador de resultados enriquecidos de Google sin errores en un post y en Inicio; `sitemap` incluye posts y taxonomías, excluye `/_diseno/` y borradores; cada post tiene OG image única ≤ 100 KB; `/normativa/430-22/` lista los posts que lo citan; I3(c) pasa sobre el JSON-LD.
- **Evidencia:** capturas del validador; `curl` de `robots.txt` y `sitemap-index.xml`; conteo de páginas generadas en la salida de `astro build`; `git diff --stat`.
- **Riesgos:** `noindex` olvidado en algún layout; OG images que reproducen tablas de la NOM (prohibido, §11).

### Etapa 10 — Analítica, accesibilidad y auditoría de rendimiento

- **Objetivo:** Cloudflare Web Analytics; auditoría axe en todas las páginas; navegación por teclado completa; presupuestos I4 endurecidos y bloqueantes en CI; revisión final de textos con la lista I3(c) ampliada.
- **Criterios de aceptación:** axe: 0 violaciones críticas o serias en todas las páginas, ambos temas; recorrido con teclado documentado (orden de foco lógico, sin trampas, `skip link` presente); Lighthouse ≥ 95 en Rendimiento, Accesibilidad, Buenas prácticas y SEO en Inicio, Producto y un post, móvil; analítica confirmada sin cookies (inspección de `document.cookie` vacío y de la pestaña Application).
- **Evidencia:** informes axe y Lighthouse adjuntos; video corto o secuencia de capturas del recorrido con teclado; `git diff --stat`.
- **Riesgos:** el script de analítica empuja LCP; el conmutador de tema provoca *flash* (resolver con script inline bloqueante de < 300 bytes en `<head>`).

---

## 7. Calendario editorial inicial

Ejes: **Imán** = atrae a la lista de espera (búsqueda amplia, dolor común). **Demuestra** = muestra un cálculo tedioso que CalcInst automatiza. Dificultad: B (baja: 3–4 h), M (media: 6–8 h), A (alta: >10 h, exige caso numérico completo).

Regla operativa: **toda cita se verifica contra el texto publicado en el DOF durante la sesión de redacción**, no al publicar. El PDF disponible es anteproyecto. Si la referencia no coincide, el post no sale.

| # | Título de trabajo | Intención de búsqueda | NOM implicada | Dif. | Imán | Demuestra |
|---|---|---|---|---|---|---|
| T01 | ¿Qué versión de la NOM-001-SEDE está vigente? Cómo verificarlo tú mismo en el DOF | "NOM-001-SEDE vigente", "NOM-001-SEDE-2018 vs 2012" | Portada y transitorios de la norma en DOF | M | ●● | — |
| T02 | Cómo leer la Tabla 310-15(b)(16) sin equivocarte: columnas de temperatura, mm² y AWG/kcmil | "tabla 310-15(b)(16)", "ampacidad conductores NOM" | Tabla 310-15(b)(16), 310-15(b) | B | ●● | ● |
| T03 | La regla que casi todos saltan: el Art. 110-14(c) decide la columna, no el conductor | "110-14(c) terminales 75 °C", "por qué usar columna de 75" | 110-14(c), Tabla 310-15(b)(16) | M | ● | ●● |
| T04 | El factor de temperatura puede ser mayor que 1 (y por qué no debes recortarlo) | "factor corrección temperatura conductores" | Tabla 310-15(b)(2)(a), 310-15(b)(2) | B | ● | ●● |
| T05 | Factor de agrupamiento: cuándo cuenta un conductor, y la regla del 10 % y 3 metros | "factor agrupamiento tubería", "más de 3 conductores 310-15" | Tabla 310-15(b)(3)(a), 310-15(a)(2) | A | ● | ●●● |
| T06 | Caída de tensión: el 3 % y el 5 % son una nota, no un requisito — y cómo calcularla bien | "caída de tensión NOM 3 %", "fórmula caída de tensión trifásica" | Notas de 210-19(a) y 215-2(a), Cap. 9 Tabla 9 | M | ●●● | ●● |
| T07 | Placa vs tabla: qué corriente usar para dimensionar el conductor de un motor | "430-22 125 %", "corriente a plena carga motor tabla 430-250" | 430-6(a), 430-22, Tablas 430-248/430-250 | M | ● | ●●● |
| T08 | Alimentador de varios motores: suma aritmética, 25 % del mayor, y el error del fasor | "430-24 alimentador motores", "cálculo alimentador tablero de motores" | 430-24, 430-22 | A | ● | ●●● |
| T09 | Protección del ramal de un motor: Tabla 430-52 y cuándo puedes redondear hacia arriba | "430-52 interruptor motor", "protección motor NOM" | 430-52, Tabla 430-52, 240-6 | M | ● | ● (⚠ CalcInst **no** lo calcula todavía: el post no lo insinúa) |
| T10 | Relleno de tubería paso a paso: Tablas 1, 4 y 5 del Capítulo 9 (y sí, el de tierra cuenta) | "relleno tubería conduit 40 %", "tabla 4 capítulo 9" | Cap. 9 Tablas 1, 4, 5; Nota 1–9 del Cap. 9 | M | ●● | ●● |
| T11 | Conductor de puesta a tierra de equipos: Tabla 250-122 y el ajuste cuando aumentas calibre por caída | "tabla 250-122", "conductor tierra aumentar calibre 250-122(b)" | 250-122, 250-122(b) | M | ● | ●● |
| T12 | Qué debe contener una memoria de cálculo para que un DRO o Corresponsable la firme | "memoria de cálculo instalación eléctrica", "qué lleva una memoria de cálculo" | Transversal; 90-, 110-, 215-, 220- como estructura | M | ●●● | ● |
| T13 | Cálculo de carga de una vivienda: método estándar del 220 y método opcional 220-82 | "cálculo de carga vivienda NOM", "220-82 método opcional" | 220-12, 220-42, 220-52, 220-55, 220-82 | A | ●●● | — (fuera del alcance actual de CalcInst; se declara) |
| T14 | Cinco errores que hemos visto en hojas de Excel para instalaciones eléctricas (y cómo detectarlos) | "hoja Excel cálculo instalación eléctrica", "plantilla cálculo conductores" | 430-22, 430-24, Cap. 9 Tabla 4, notas de caída | M | ●●● | ●●● |

**Orden de publicación sugerido:** T01 → T03 → T02 → T06 → T07 → T05 → T10 → T14 → T08 → T04 → T11 → T12 → T09 → T13. T01 primero porque es la duda que el propio proyecto tiene (H1) y su resolución es prerequisito de todos los demás; T03 segundo porque es el hallazgo más contraintuitivo y fija el tono. T14 se pospone hasta tener cuatro posts técnicos que lo respalden.

**Cadencia sostenible (una persona que programa y estudia):** un post cada **dos semanas**; redacción por lotes de dos posts en un fin de semana al mes; **cuatro semanas de colchón** (dos posts terminados y verificados antes de publicar el primero). Si el colchón se agota, se pausa la publicación, no se recorta la verificación. Tiempo estimado total por post de dificultad M: ~8 h incluyendo verificación DOF y diagramas. Asunción explícita, no dato medido.

---

## 8. Registro de suposiciones (hipótesis)

Se copian a `HIPOTESIS_SITIO.md` en la Etapa 0. Cada una tiene dueño (S = Sebastián, CC = Claude Code), fecha de corte y consecuencia si resulta falsa.

| ID | Hipótesis | Dueño | Corte | Si es falsa |
|---|---|---|---|---|
| **H1** | La versión de la NOM-001-SEDE que rige y que el sitio citará es la 2018, publicada en el DOF; la memoria del proyecto registra que las fuentes conflictúan (2018 vs 2022) | S | Antes de publicar T01 | El campo `version` del frontmatter absorbe el cambio; T01 se reescribe; `capacidades.json` y los textos de Producto cambian la cadena. Ningún cambio estructural |
| **H2** | La ley aplicable al aviso de privacidad en 2026 es la LFPDPPP (versión vigente tras la reforma de 2025 que reorganizó la autoridad garante). Debe verificarse el texto vigente y el nombre de la autoridad antes de la Etapa 6 | S (con abogado) | Etapa 6 | Cambian referencias y autoridad en el aviso; el modelo de consentimiento (finalidad + opt-in + ARCO) se mantiene |
| **H3** | `calcinst.mx` y `calcinst.com` están disponibles | CC verifica en Etapa 0 | Etapa 0 | Se decide canónico entre los disponibles; se registra en `DECISIONES_SITIO.md` |
| **H4** | La figura fiscal del vendedor (persona física con actividad empresarial / RESICO / persona moral) se decide con el contador antes de `disponible` | S | Antes de `disponible` | Cambia el "responsable" del aviso de privacidad y la mecánica de retenciones en D5; no cambia el sitio v1 |
| **H5** | Existen o pueden producirse capturas presentables del lienzo en tema oscuro desde `demo.calcinst.json` antes de la Etapa 5 | S | Etapa 5 | La Etapa 5 se retrasa; **no** se sustituyen por maquetas ni ilustraciones (§3.1) |
| **H6** | Tauri 2 sigue siendo la decisión de empaquetado (así lo registra `DECISIONES.md`); `ESTADO_PROYECTO.md` aún lista "Persistencia Supabase + login" como pendiente, lo que sugiere una arquitectura web multiusuario que **contradice** la distribución de escritorio con licencia sin conexión. Se asume que Supabase queda descartado o pospuesto | S | Etapa 7 | Si se mantiene Supabase, D4/D5 y el portal de cuenta de fase 2 cambian de forma; el sitio v1 no |
| **H7** | La beta se publica solo para Windows x64 | S | Etapa 7 | Se agregan artefactos; requiere resolver firma/notarización macOS |
| **H8** | Existe una vía de firma de código Windows accesible a una persona física a costo razonable (CA con certificado OV, o Azure Trusted Signing si admite personas físicas). Se verifica en el momento de la beta, no ahora | S | Antes de `beta` | La beta sale sin firma con la explicación de SmartScreen redactada en la Etapa 7 |
| **H9** | Buttondown ofrece un endpoint público de suscripción utilizable desde un formulario propio sin exponer la clave de API | CC verifica en Etapa 0 | Etapa 0 | Se usa Kit, o una Pages Function mínima con addendum |
| **H10** | Los errores documentados en `examen1_2.xlsx` (fórmula de tubería, factor de caída, 430-22/430-24) son representativos de la práctica común y pueden describirse en T14 sin identificar el archivo ni a su autor | S | Antes de T14 | T14 se reescribe como lista de verificación genérica |
| **H11** | Las decisiones D4 y D5 son las que la memoria del proyecto ya apuntaba (licencia anual con fallback perpetuo; CFDI con contador); este plan las formaliza, no las contradice | S | Etapa 0 | Se emite addendum A1 con la corrección |

---

## 9. Riesgos documentados y su mitigación

### 9.1 Publicar una interpretación normativa incorrecta

- **Política de errata visible:** cada post tiene `erratas[]`; al haber una, `AvisoErrata` aparece **al inicio del post** (no al final), con fecha, descripción y si afecta un resultado numérico. El RSS reemite el post corregido. Un registro global `/blog/erratas/` lista todas. Nunca se corrige en silencio: el diff de un post publicado sin entrada en `erratas[]` que cambie un número o un artículo citado es una violación (revisión humana en PR; se puede automatizar comparando el HTML anterior en fase posterior).
- **Descargo honesto (texto fijo del componente `Descargo`, al pie de todo post técnico):**

  > Este artículo lo escribe un estudiante de ingeniería eléctrica, no un profesionista con cédula. Su valor está en las referencias: cada afirmación técnica cita el artículo o la tabla de la NOM-001-SEDE en que se apoya, para que puedas verificarla directamente en el texto publicado en el Diario Oficial de la Federación. No sustituye el criterio del profesional responsable de firmar un proyecto. Si encuentras un error, escríbeme: se corrige y se registra públicamente en la sección de erratas.

  Informa, no destruye la credibilidad: traslada la autoridad a las citas (I3) y convierte la limitación en un compromiso de trazabilidad.

### 9.2 Derechos de autor sobre la NOM y sus tablas

Regla fija del proyecto: **parafrasear y citar, nunca reproducir tablas completas.** Se permite: citar un valor puntual de una tabla con su referencia ("la Tabla 310-15(b)(16) asigna al 8 AWG de cobre a 75 °C una ampacidad de 50 A"), reproducir la *estructura* de una tabla con datos de ejemplo inventados y etiquetados como tales, y enlazar al DOF. Se prohíbe: transcribir filas completas, publicar imágenes de páginas de la norma, y publicar el PDF del anteproyecto. Verificación: revisión humana en PR con lista de cotejo; los diagramas SVG propios se marcan como "elaboración propia".

### 9.3 El blog consume el tiempo del desarrollo

Cadencia y colchón en §7. Regla adicional: **el blog nunca bloquea una etapa del producto**. Si en una quincena hay que elegir, se elige el producto y se salta la publicación; el colchón de dos posts existe para eso. Presupuesto máximo: 8 h/quincena al blog.

### 9.4 Prometer de más en la landing

Mecanismo: `capacidades.json` (§4.3) + test de la Etapa 5 que impide renderizar capacidades no verificadas. Consecuencia aceptada: **hoy el sitio no puede afirmar "dimensiona conductores conforme a la NOM"** porque Caso 1–3 tienen defectos normativos conocidos (430-22, 430-24) y sin casos de referencia a mano. El texto permitido es: "dibuja la instalación sobre una retícula en metros, calcula longitudes reales por el trazo, determina factores de agrupamiento y temperatura, y dimensiona conductores — este último módulo está en verificación normativa". El cambio a la afirmación plena es un cambio de un campo en JSON el día que los casos de referencia existan.

---

## 10. Prompt de ejecución — Etapa 0

> Copiar desde la línea siguiente hasta el final. Adjuntar `PLAN_SITIO_WEB.md`. **No** adjuntar el código de CalcInst.

---

```
# Sesión Etapa 0 — calcinst-web — Reconocimiento, hipótesis y decisión de stack

## Rol
Eres el ejecutor de la Etapa 0 del plan `PLAN_SITIO_WEB.md` (adjunto). Trabajas en español.
Entorno: Windows, PowerShell. Puedes ejecutar comandos de solo lectura (`node -v`, `npm -v`,
`npm view`, `git`, `whois` o equivalente, `Invoke-WebRequest` para consultar disponibilidad
de dominio en la página del registrador). NO instalas dependencias, NO ejecutas
`npm create`, `npm init` ni `npm install`, NO creas archivos de código fuente, NO creas
`package.json`. Esta etapa produce únicamente documentos markdown y evidencia.

## Objetivo
Dejar el repositorio `calcinst-web` con tres documentos de gobierno y la evidencia de que
las decisiones D1, D2, D3 y D7 del plan son ejecutables hoy con versiones concretas.

## Pasos, en orden

1. Confirma el entorno. Ejecuta y copia la salida literal:
   - `node -v`
   - `npm -v`
   - `git --version`
   Si Node no es una versión LTS activa, detente y repórtalo antes de seguir.

2. Verifica versiones actuales de los paquetes del stack decidido. Ejecuta y copia la
   salida literal de cada uno:
   - `npm view astro version`
   - `npm view @astrojs/mdx version`
   - `npm view @astrojs/cloudflare version`
   - `npm view @astrojs/sitemap version`
   - `npm view @astrojs/rss version`
   - `npm view tailwindcss version`
   - `npm view @tailwindcss/vite version`
   - `npm view vitest version`
   - `npm view zod version`
   Si `astro` no es 5.x, no cambies la decisión: regístralo como hallazgo H-nuevo en
   `HIPOTESIS_SITIO.md` y continúa.

3. Verifica H3 (dominio). Consulta la disponibilidad de `calcinst.mx` y `calcinst.com`
   con la herramienta que tengas (whois, o la búsqueda pública del registrador). Registra
   el resultado literal y la fuente. No compres nada.

4. Verifica H9 (Buttondown). Consulta la documentación pública de Buttondown y registra:
   (a) si existe un endpoint o formulario público de suscripción utilizable desde un
   formulario propio sin exponer la clave de API; (b) si el double opt-in es configurable;
   (c) si la exportación de suscriptores en CSV está disponible. Copia la URL exacta de
   cada página consultada. Si algo no se puede confirmar, escribe "no confirmado", no
   supongas.

5. Crea el repositorio local `calcinst-web` (carpeta hermana de `calcinst`, nunca dentro
   de él) con `git init`, un `README.md` de tres líneas ("CalcInst — sitio web. Ver
   ESTADO_SITIO.md.") y un `.gitignore` estándar de Node (sin ejecutar `npm`).

6. Crea `DECISIONES_SITIO.md`: copia las decisiones D1–D8 del plan en formato de tabla
   (ID, decisión, recomendación, costo de reversión, estado = "cerrada" o "pendiente
   con corte"). En D1 y D2 añade las versiones exactas obtenidas en el paso 2. D4 y D5
   quedan "cerrada (no implementar hasta fase 2)". Añade al final la sección "Addenda"
   vacía.

7. Crea `HIPOTESIS_SITIO.md`: copia H1–H11 del plan (§8) con columnas ID, hipótesis,
   dueño, corte, si-es-falsa, estado. Actualiza H3 y H9 con lo verificado en los pasos
   3 y 4 (estado "confirmada", "refutada" o "no confirmado"). Si el paso 2 produjo
   hallazgos, agrégalos como H12+.

8. Crea `ESTADO_SITIO.md` con estas secciones exactas:
   - "Última etapa cerrada": Etapa 0, fecha.
   - "Siguiente etapa": Etapa 1, con sus criterios de aceptación copiados del plan.
   - "Evidencia Etapa 0": todas las salidas literales de los pasos 1–4.
   - "Bloqueos": lo que impida iniciar la Etapa 1 (p. ej. dominio no disponible).
   - "Addenda": vacía.

9. Un solo commit: `Etapa 0: documentos de gobierno y reconocimiento`. Copia la salida de
   `git log --oneline` y de `Get-ChildItem -Force` (o `ls -la`).

## Criterios de aceptación (los verificará el humano, no tú)
- Existen exactamente: `README.md`, `.gitignore`, `DECISIONES_SITIO.md`,
  `HIPOTESIS_SITIO.md`, `ESTADO_SITIO.md`. Ningún otro archivo.
- Toda versión citada en `DECISIONES_SITIO.md` proviene de una salida literal de
  `npm view` incluida en `ESTADO_SITIO.md`.
- H3 y H9 tienen estado distinto de "abierta" y citan fuente.
- Un commit.

## Qué NO hacer
- No generes scaffolding, configuración ni código "para ganar tiempo".
- No propongas cambiar el stack. Si encuentras un motivo real, escríbelo en
  `HIPOTESIS_SITIO.md` y detente al final del paso 9.
- No resumas ni parafrasees salidas de comandos: pégalas literales.
- No declares la etapa completada. Termina tu mensaje con la lista de evidencia
  presentada y la frase: "Evidencia presentada. Espero autorización para la Etapa 1."
```
