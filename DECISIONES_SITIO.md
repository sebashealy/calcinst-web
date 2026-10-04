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
| D8 | Arquitectura de contenido del blog | URLs permanentes: `/blog/{slug}/` sin fecha ni categoría, slug inmutable (renombrar = 301 en `_redirects` + `slugsAnteriores[]`); una categoría exacta por post (5 categorías cerradas hasta 20 posts), etiquetas libres en kebab-case; RSS 2.0 íntegro; frontmatter validado con Zod (`normativa[]` ≥ 1, `verificadoDOF`); cruce cuerpo↔frontmatter de `CalloutNormativo` en build; `/normativa/{ref}/` generado desde `normativa[]`. Ejemplo de `ref` para una tabla: **`cap10-tabla-4`** — corregido en AD7; el plan decía «cap9», que es la estructura del NEC y no la de la norma mexicana | Bajo para taxonomía (no está en la URL); alto para el formato de URL del post — por eso se cierra ahora y se protege con `_redirects` | cerrada |

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

### AD6 — H1 refutada en firme: rige la NOM-001-SEDE-2012 (2026-09-12)

**Contexto.** El plan asumía que regía la NOM-001-SEDE-2018. La Etapa 4 la dejó «refutada provisionalmente» y reservó a Sebastián la verificación definitiva, que bloqueaba publicar T01.

**Decisión de Sebastián, con las tres comprobaciones hechas:** rige la **NOM-001-SEDE-2012**. La 2018 nunca se expidió: se publicó en el DOF el 06/08/2018 como proyecto para consulta pública y su proceso se dio de baja del SPNIC en 2022; la Revisión Sistemática de la SENER (oficio 300.E487/2023) lo declara literalmente y concluye que hay que *modificar* la de 2012. Las cuatro fuentes están en `HIPOTESIS_SITIO.md` § Evidencia de H1.

**Efecto en el sitio:** ninguno estructural. La cadena de versión ya era `NOM-001-SEDE-2012` desde la Etapa 4; lo que cambia es que deja de ser provisional y que el bloqueo sobre T01 se levanta. La numeración de artículos y tablas no cambia.

**Costo de revertir:** una línea en `src/config/norma.ts`, más los posts ya publicados.

### AD7 — Las tablas son el Capítulo 10, no el 9: corrección de una referencia del plan (2026-09-12)

**Contexto.** El plan (§7 en T06, T10 y T14, y §D8 en el ejemplo de `ref`) sitúa las tablas de relleno de tubería y de resistencia/reactancia en el «Capítulo 9». Esa es la estructura del NEC, no la de la norma mexicana. Verificado por Sebastián en el índice del texto publicado en el DOF: en la NOM-001-SEDE-2012 el **Capítulo 9** es «Instalaciones destinadas al Servicio Público» (artículos 920 a 924) y el **Capítulo 10** es «Tablas» (1, 2, 4, 5, 5A, 8, 9, 10, 11(A), 11(B), 12(A), 12(B)).

**Decisión:** el ejemplo de `ref` de D8 pasa de `cap9-tabla-4` a **`cap10-tabla-4`**, y una `ref` que cite una tabla del Capítulo 9 **rompe el build**. Se aplica en dos sitios, a propósito:

- el esquema del frontmatter (`src/lib/blog.ts`), que falla al construir con el mensaje de por qué;
- el invariante **REFNORMA** de `verificar-invariantes.mjs`, que además recorre `tests/` y los documentos de gobierno. Busca solo en posición de `ref` —atributo JSX, clave JSON, campo YAML o propiedad de objeto—, para que estos documentos puedan nombrar la forma equivocada al explicarla.

Las referencias de **artículo no cambian**: 110-14(c), 310-15(b)(16), 310-15(b)(2)(a), 310-15(b)(3)(a), 430-22, 430-24 y 250-122 existen con esa numeración en el texto de 2012 (verificado por Sebastián).

**Por qué ahora.** `ref` alimenta las URL `/normativa/{ref}/`, que D8 declara inmutables. Corregirlo antes del primer post no cuesta nada; después cuesta redirecciones permanentes que citan mal la norma.

**Costo de revertir:** bajo mientras no exista ningún post publicado; alto en cuanto exista uno.

### AD8 — La versión sola no identifica un texto único (2026-09-12)

**Contexto.** La Nota Aclaratoria publicada en el DOF el **07/02/2014** (código 5331914) corrige la NOM-001-SEDE-2012 en erratas de redacción «así como en algunos valores». «NOM-001-SEDE-2012» a secas es por tanto ambiguo para al menos dos tablas que CalcInst usa.

**Decisión, sin añadir un campo por cita:**

1. `src/config/norma.ts` documenta que la cadena designa el texto del 29/11/2012 **corregido por la nota del 07/02/2014**, con el enlace al DOF.
2. `src/config/nota-aclaratoria.json` lista las referencias que la nota tocó (`ref`, `descripcion`, `afectaValor`), validadas con Zod en `src/lib/nota-aclaratoria.ts` al importar: un dato mal formado rompe el build, no se degrada en silencio (I1). Semilla: `cap10-tabla-5` y `310-15(b)(2)(a)` cambian valores; `230-95`, `250-53(a)(2)` y `522-25(c)(2)` cambian el sentido de la disposición. — _Corregido el 2026-10-04 (E4-ak): **`310-15(b)(2)(a)` no cambia valores**. La nota corrige la etiqueta de un renglón —el texto de 2012 imprime `91-75 °C` donde debe decir `71-75 °C`— y los factores no cambian. Verificado por Sebastián contra el texto publicado al redactar T01. La semilla se escribió antes de esa verificación; queda aquí para que se vea de dónde venía el dato._
3. `CalloutNormativo` consulta ese archivo en cada cita y pinta el aviso con el enlace al DOF. **No depende de que el redactor se acuerde.** `LayoutPost` marca lo mismo en la lista de «Referencias citadas».

**Costo de revertir:** bajo. Es un archivo de datos y una consulta; quitarlo devuelve la cita a su forma anterior.

**Apéndices normativos e informativos.** En la NOM-001-SEDE-2012 solo el **Apéndice D** es normativo; A, B, C y E son informativos. `normativa[].tipo` se extiende a `tabla | articulo | nota | apendice-normativo | apendice-informativo`, y la cita marca el informativo como que **orienta sin obligar**. Presentarlo como obligatorio sería exactamente el error que el descargo del §9.1 promete no cometer.

### AD9 — Micro se escribe U+00B5, no U+03BC (2026-09-12)

**Contexto.** AD4 eligió la mu griega (U+03BC) para el prefijo micro, por coherencia con la omega griega del ohm y porque es la forma a la que NFKC reduce el signo micro de Latin-1. Sebastián pidió medir si IBM Plex Mono cubre U+00B5. **Lo cubre**, y no cubre ninguna letra griega (medido sobre las fuentes completas de `node_modules`, no sobre el subconjunto).

**Decisión:** micro pasa a **U+00B5** y **U+03BC se suma a los prohibidos**, con la regla ya acordada. Con la mu griega, cada «µF» de un bloque de código o de una tabla salía de IBM Plex Sans; con el signo micro sale de la propia Plex Mono. El respaldo mono baja de tres caracteres a dos: quedan Ω y Δ, que ninguna cara mono de IBM Plex tiene.

**Advertencia registrada.** La relación de compatibilidad va en sentido contrario al de la decisión: NFKC convierte U+00B5 en U+03BC. Una normalización de compatibilidad en cualquier punto de la cadena produciría el carácter ahora prohibido. Por eso la comprobación NOTACION corre en cada build y no solo una vez; el motivo está escrito en `caracteres.json` para que nadie la «arregle» después.

**Costo de revertir:** una entrada en `caracteres.json` y regenerar las fuentes.

### AD10 — La prueba de portabilidad compara módulo tipografía (2026-10-04) — **REVERTIDA el mismo día por AD11**

> Se conserva a propósito. Duró un día y es la decisión equivocada de la que se aprende: ante una comprobación que falla, relajé la comprobación en vez de mirar qué la hacía fallar. Lo que sigue es el texto original; la reversión y sus motivos están en AD11.

**Contexto.** Al construir T01 y T03, la comprobación I2 dio 11 fallos, todos en párrafos con una comilla doble (E4-ab). Causa: Astro trae `smartypants` activo por omisión, que convierte las comillas rectas del `.mdx` en curvas en la página; remark puro no lo hace, así que la comparación literal daba un falso positivo por cada párrafo con comillas. No había salido antes porque los posts de prueba no tenían ninguna.

**Decisión:** `textosPerdidos` normaliza **los dos lados** a la forma recta antes de comparar: comillas curvas y latinas, apóstrofos tipográficos, raya y semirraya, y puntos suspensivos. Los posts no se tocaron.

**Esto relaja la comprobación**, y por eso se registra como decisión en vez de arreglarse en silencio. El límite de la relajación está fijado por una prueba: solo se igualan formas equivalentes del mismo carácter, de modo que un texto que de verdad desaparezca de la página sigue delatándose, porque le faltarían caracteres y no una variante tipográfica de ellos.

**Decisión abierta, de Sebastián:** `smartypants` está activo porque es el valor por omisión de Astro, no porque se eligiera. Hoy las comillas rectas que se teclean se publican curvas. Si se prefiere que la página muestre exactamente lo tecleado, se apaga en `astro.config.mjs` y esta normalización pasa a ser innecesaria (aunque conviene dejarla: cuesta nada y cubre el caso de que alguien teclee comillas curvas directamente). — _Resuelto en AD11: se apaga el tipógrafo **y** se retira la normalización. La última frase era el error: dejarla «porque cuesta nada» es cómo un invariante relajado se vuelve permanente._

**Costo de revertir:** bajo. Es una función de cuatro sustituciones en el verificador.

### AD11 — Reversión de AD10: el tipógrafo se apaga; I2 vuelve a ser estricta (2026-10-04)

**AD10 se mantiene en el historial a propósito.** Duró un día y es la decisión equivocada de la que se aprende: ante una comprobación que falla, relajé la comprobación en vez de mirar qué la hacía fallar.

**Decisión de Sebastián:** se desactiva `smartypants` en `astro.config.mjs` y `textosPerdidos` vuelve a comparar carácter a carácter, sin normalización tipográfica.

**Razones, por orden de peso:**

1. **Relajar un invariante es permanente; el beneficio era cosmético.** La normalización se queda en el verificador para siempre, y lo que compraba eran comillas más bonitas.
2. **Lo que se transformaba era texto citado.** En un sitio cuya premisa es que cada afirmación se rastrea hasta el DOF, que la página muestre caracteres distintos de los de la fuente es exactamente el silencio que el proyecto no acepta, por pequeño que sea.
3. **Nadie lo eligió:** venía activo por omisión de Astro. Es el mismo criterio por el que se desinstaló Tailwind (AD2).
4. **Ni siquiera acertaba.** `smartypants` produce comillas inglesas; la convención del español son las angulares. Quien quiera comillas tipográficas teclea « » en el `.mdx` y pasan intactas, porque están en el conjunto declarado de caracteres.

**Lo que se conserva de AD10:** la prueba que fija el límite —un texto que de verdad falte sigue delatándose— sirve igual con comparación estricta, y es la que impide que alguien vuelva a relajar I2 sin notarlo. Se añadieron dos más: una comprueba que una comilla transformada **cuenta como texto perdido**, y otra que `astro.config.mjs` mantiene el tipógrafo apagado. La segunda no depende de que haya posts construidos, que es importante porque en CI los borradores no se construyen y la comprobación 3 se omite.

**Deuda técnica conocida, con decisión pendiente de Sebastián.** `markdown.smartypants` está obsoleto en Astro 7: funciona, pero avisa en cada build. La forma vigente es `markdown.processor: satteri({ features: { smartPunctuation: false } })`, y `@astrojs/markdown-satteri` **0.4.0** hoy solo está en `node_modules` como dependencia transitiva. Declararla es añadir una dependencia, así que queda a la espera de aprobación.

**Costo de revertir:** una línea en `astro.config.mjs`. La normalización, en cambio, ya no está.

### AD12 — El aviso de la nota aclaratoria se colapsa por post (2026-10-04)

**Contexto.** T01 cita tres referencias corregidas por la nota de 2014, así que la cola del aviso —«Publicada en el DOF el 7 de febrero de 2014; texto oficial (código 5331914)»— salía idéntica tres veces (E4-w).

**Decisión de Sebastián:** la primera aparición en un post va completa; las siguientes conservan el aviso y el enlace, y omiten la frase de publicación. **El enlace se queda en las tres**, porque alguien puede llegar a mitad de página desde un ancla compartida y ese aviso tiene que sostenerse solo. En la forma colapsada el enlace carga la identidad del documento: «Nota Aclaratoria del 07/02/2014 en el DOF».

**Es colapso por post, no global.** El ámbito es `Astro.locals`, y no se supuso: se midió con una sonda temporal en el build (E4-ae). Es el mismo objeto en todos los componentes de una página, distinto entre páginas, y la API de contenedor del RSS da uno por item, así que cada entrada del feed colapsa por su cuenta. Se registra con un `WeakMap` para no escribir en un objeto que es de Astro.

**Costo de revertir:** bajo. Es una condición en el componente y una función de cuatro líneas.
