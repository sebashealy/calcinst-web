# ESTADO_SITIO.md — Estado vivo del sitio CalcInst

> Creado en la Etapa 0 (2026-09-05) conforme a `PLAN_SITIO_WEB.md` v1.0.

## Último corte — Etapa 5 cerrada; Etapa 6 en curso (2026-10-28)

Etapa 5: criterios técnicos y aprobación humana registrados en E5-n, integración
confirmada en E5-o. PR #16 y #17 fusionados a main. LCP 1,20–1,22 s, CLS 0 en los
perfiles medidos; 134 pruebas y auditoría en 12 variantes pasan. Esto no certifica
los cálculos del motor. Etapa 6: primer bloque implementado en PR #18; 150 pruebas
y auditoría en 30 variantes pasan. CI y vista previa comprobados en E6-f.
Pendientes: revisión humana, identidad/responsable, Person y textos legales
definitivos. No se publican datos por inferencia ni se declara cerrada la etapa.

## Etapa 5 — Inicio y Producto (2026-10-27 a 2026-10-28)

### E5-a — Autorización, base y fuente del producto

Sebastián autoriza expresamente: «Pasemos a la etapa 5». Se trabaja en
`etapa5/inicio-producto`, creada desde `1577743`, con árbol limpio antes de empezar.
El PR #16 sigue abierto y sin fusionar; esta rama depende de sus cambios de
continuidad. No se fusiona ni se publica nada como parte de esta autorización.

Fuente recibida: `Nueva carpeta comprimida (en zip).zip`, SHA-256
`94b7661f44a6a0022d97712e59e66c759329aa92d075042c05ce3dba74483da8`.
Se conserva intacto; la copia de inspección está fuera del repositorio del sitio,
en `../revision-calcinst-94b7661f/calcinst`. Incluye dependencias existentes; no se
instalan ni actualizan paquetes. El sitio no incorpora el código de la aplicación.

GitHub fue consultado de nuevo: `main` en `2f4c187`, geometría en `62ea6c5` y
charola en `f57c47c`. El ZIP contiene avances posteriores hasta ADR-0023 y evidencia
TAB1 del 27 de octubre. La pregunta de HC-h queda resuelta: el trabajo reciente
se recibió como carpeta local, y no está en las puntas de esas ramas consultadas.
No se conoce un commit Git que identifique esta carpeta: su identidad es el hash.

Prevalecen sobre el diagnóstico antiguo las decisiones y código posteriores:
ADR-0013 corrige Ft y ampacidades; ADR-0014 conecta FLC; ADR-0015 excluye aluminio;
ADR-0016 implementa protecciones; ADR-0020–0022 añaden PDF, plano y archivos.
Los resultados de pruebas citados por esos documentos son evidencia histórica,
no ejecuciones de esta sesión. La evidencia TAB1 declara 1522 pruebas.

Plan del bloque: auditar y actualizar inventario con evidencia y límites; fijar
demostración sintética y capturas reales a 2×; reutilizar LayoutBase, Boton,
Insignia y tokens; llevar el CTA al blog según A9; construir Inicio/Producto y
separar «En desarrollo»; comprobar HTML contra el inventario, accesibilidad,
vista móvil, rendimiento e invariantes. Documentar resultados inmediatamente.
No se adelantan legales, descarga, formularios, normativa ni comercio.
La etapa está autorizada y en curso, no cerrada.

## Bloque de higiene y continuidad previo a la Etapa 5 (2026-10-24)

Encargo de Sebastián: incorporar el plan y el traspaso, corregir H1 y la descripción
general de la Nota Aclaratoria, conservar Lighthouse y alinear pendientes históricos.
No inicia ni autoriza la Etapa 5. `capacidades.json` y el repositorio CalcInst quedan
fuera de este bloque. `TRASPASO_ETAPA5.md` es la instrucción recibida y prevalece sobre
las inferencias del diagnóstico anterior. `DIAGNOSTICO_PRELANZAMIENTO.md`, fechado
2026-10-17 con anotaciones al 23, es contexto del producto; no se copia al sitio ni
se convierte en tareas del motor. Pendiente preguntar en qué rama está el trabajo
posterior al 18 de agosto, o si no está publicado.

Las etiquetas E0–E4 existentes se conservan (Etapa 4 hasta E4-al). Se reserva el
prefijo **HC-** para este bloque de mantenimiento, sin ocupar E5-a ni reabrir etapas.

### HC-a — Base de trabajo y conservación de documentos

Clon nuevo en `C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web`.
Antes de escribir, `git status --short --branch` devolvió `## main...origin/main`,
sin cambios; `git rev-parse HEAD` y `git rev-parse origin/main` devolvieron ambos
`e7728a4d6fc4c9b9c3680475a8e546889dd5bbf0`. Remoto fetch/push:
`https://github.com/sebashealy/calcinst-web.git`. La base no avanzó. Se creó la rama
`mantenimiento/continuidad-pre-etapa5`; no se empuja a `main`.

Se leyeron las 3 389 líneas de este documento, las decisiones, hipótesis y adjuntos.
Se incorpora `PLAN_SITIO_WEB.md` con una nota inicial que remite a los addenda,
AD7 (Capítulo 10) y H12 (Astro 7.3.1). El cuerpo original se conserva byte a byte:
SHA-256 del original `74456178EDF8F390773F17D225AD2010C9DC5AFF0F9BD462E2CDFEAC0E3334CE`.
`TRASPASO_ETAPA5.md` se copia íntegro; SHA-256 de origen y destino:
`29B9D67E2F55A903F061E6D2A2D2D981FEFD4794C4F786BF8A054C81F4943CCD`.
Ambos quedan en `.prettierignore` para que el formateador no reescriba los originales,
igual que los documentos de gobierno ya excluidos. Comprobación ejecutada:

```text
Plan: cuerpo original idéntico byte a byte después de la nota.
```

Verificación: comparación de bytes del cuerpo después del prefijo y hashes del
traspaso. No se ejecutó todavía la batería de cierre. El clon no trae dependencias;
Sebastián autorizó `npm ci` con las versiones exactas de `package.json` y el lockfile
existente. Node disponible: v24.22.1. `npm` y `gh` no están en PATH; se autorizó
descargar npm 11.13.0 en el espacio de trabajo, sin instalación global.

### HC-b — H1 y descripción general de la Nota Aclaratoria alineadas

Se corrigen la fuente 4 y la conclusión de H1 en `HIPOTESIS_SITIO.md`: la Tabla 5
del Capítulo 10 cambia el valor citado; la Tabla 310-15(b)(2)(a) cambia la etiqueta
91-75 a 71-75, no sus factores. Se registra la errata no corregida en la tabla de
base 40 °C, 310-15(b)(2)(b), atribuyéndola al traspaso de Sebastián (§1.2), sin
presentarla como un cotejo nuevo del DOF. Se conservan las frases sustituidas en
una nota de trazabilidad y se cita E4-ak como evidencia que prevalece.

En `src/config/nota-aclaratoria.json` se cambia exclusivamente `descripcion` de
nivel superior. Comparación ejecutada con Node `assert.deepEqual` contra la versión
de HEAD, retirando solo esa propiedad de ambos objetos:

```text
JSON válido: solo cambió descripcion de nivel superior; fuente y referencias idénticas.
```

`git diff --check`: sin salida, exit 0. La batería de cierre sigue pendiente.

### HC-c — Conservación de informes Lighthouse: cambio aplicado; verificado en HC-g

`.github/workflows/ci.yml`: se activa `include-hidden-files: true` únicamente para
la ruta `.lighthouseci`, que es donde `lighthouserc.json` ya escribe los informes.
`if-no-files-found` pasa de `ignore` a `error`: la ausencia de evidencia no puede
producir una subida aparentemente exitosa. Se conserva `if: always()` para recuperar
informes también cuando una aserción de Lighthouse falle. No se cambia el umbral
de Lighthouse ni se añade una dependencia.

El diagnóstico anterior comprobó en el run 37243439794 que se generaron cinco
informes pero no se subió ninguno. Esto corrige la afirmación histórica de E1-h
sobre la conservación del artefacto: ejecutar Lighthouse y conservar su informe
son verificaciones distintas. **Pendiente:** ejecutar el CI del PR y comprobar el
artefacto descargable; el cambio de YAML por sí solo no cumple esa verificación.
**Actualización:** la descarga se comprobó después y quedó registrada en HC-g.

### HC-d — Continuidad histórica y decisiones recibidas

Se alinea el encabezado de la Etapa 4 con E4-al y se registra su ratificación humana
en el traspaso §4.1. Se conservan los antecedentes y se señala qué prevalece:
E3-e para la prueba de Narrador; E4-aj para P1 (incluida la medición previa de E4-z);
AD9/E4-s para micro en P2; PR #5/AD3 para P3; E4-al para la existencia de `/blog/`.
P4, P5 y P6 permanecen abiertos, con sus condiciones y destinos intactos.

H10 pasa a **replanteada**, conforme al traspaso §4.4, conservando el planteamiento
original. A9 registra la modificación autorizada del plan y la decisión de CTA sin
reescribir el original. La implementación del CTA no forma parte de las cuatro
tareas enumeradas en este encargo: `lanzamiento.ts` no se cambia en este bloque.
El criterio de referencia independiente y el cotejo visual de tablas se conservan
en el traspaso §5, que ya está versionado; no se duplican sus reglas aquí.

Entrega en PR #16: https://github.com/sebashealy/calcinst-web/pull/16 (rama propia,
sin fusión). Pendientes al escribir esta entrada: batería local completa, resultado
del CI y descarga del artefacto. Ninguna prueba se declara exitosa por anticipado.

**Entorno:** Node v24.22.1, npm 11.13.0 local autorizado; sin `gh` instalado.
Se usa la API del conector GitHub para el PR. El acceso de red del sandbox impidió
clonar/descargar/publicar; se repitieron con aprobación de ejecución fuera del sandbox.
El lanzador `npm.cmd` del tarball espera una instalación estándar y falló con
`MODULE_NOT_FOUND`; se usa `node ../.tools/package/bin/npm-cli.js` directamente.
El primer `npm ci` sin acceso de red se interrumpió sin resultado; el segundo,
con acceso autorizado, terminó con exit 0. No se cambiaron manifest ni lockfile.

Salida literal completa de ese `npm ci` (dos fragmentos de la misma ejecución):

```text
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated uuid@8.3.2: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).

added 791 packages, and audited 792 packages in 55s

218 packages are looking for funding
  run `npm fund` for details

34 vulnerabilities (2 low, 9 moderate, 22 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

Son avisos distintos de P6. Se reportan sin atribuirles alcance de producción sin
un análisis del árbol; no se ejecuta `npm audit fix` ni se actualizan dependencias.

## Última etapa cerrada

Etapa 4 — 2026-10-04. Evidencia en E4-a … E4-al. **Cierre ratificado por Sebastián en `TRASPASO_ETAPA5.md` §4.1 (2026-10-24)**: ese documento aporta el rastro humano que faltaba. No se reabre. La condición de verificación de la redacción anterior se conserva en E4-al como antecedente.

Cotejo criterio por criterio (plan §6, Etapa 4):

| Criterio de aceptación | Estado | Evidencia |
|---|---|---|
| Un post sin `normativa` rompe el build | cumplido | E4-h, contra el build real; permanente en `tests/blog-schema.test.ts` |
| `verificadoDOF: false` con `borrador: false` rompe el build | cumplido | E4-h; permanente en `tests/blog-schema.test.ts` |
| Un `CalloutNormativo` no declarado en el frontmatter rompe el build | cumplido, y ampliado a tipo y versión | E4-h con posts de prueba; **E4-u sobre contenido real**, con la línea correcta del archivo |
| `rss.xml` valida en el validador del W3C | cumplido | **E4-al: por URL, con items reales, 0 errores y 0 avisos** |
| El post renderizado con remark puro conserva todo el texto | cumplido | E4-ad con comparación estricta; **E4-ak: 2 de 2 comparados en el flujo de CI**, ya sin omisiones |
| Lighthouse del post: LCP ≤ 2.0 s, JS ≤ 5 KB, peso ≤ 300 KB | cumplido | E4-ak: 1.51 s, 1 137 B, 95 170 y 91 357 B sin comprimir |
| Los dos posts con todas sus citas en `verificadoDOF: true` | cumplido | E4-ak: publicados, seis citas cotejadas, cero insignias «Sin cotejar» |

**Bloqueo resuelto en la etapa:** P1, las dos Redirect Rules, **9 de 9** (E4-aj). Era el último pendiente técnico y arrastraba desde la Etapa 1.

**Decisiones registradas:** AD6 (H1 refutada: rige la NOM-001-SEDE-2012), AD7 (las tablas son el Capítulo 10), AD8 (la versión no identifica un texto único), AD9 (micro es U+00B5), AD10 **revertida** por AD11 (el tipógrafo se apaga; I2 vuelve a estricta) y AD12 (el aviso colapsa por post).

**Lo que la etapa deja anotado para después:** P4 y P5 con destino Etapa 9, P6 al subir de versión de Astro, y la observación de E4-ak: `nota-aclaratoria.json` es un segundo lugar donde vive una afirmación normativa y `verificadoDOF` no lo cubre.

**Pruebas: 41 → 126.**

### Etapa 3 — 2026-09-10 (cerrada anteriormente)

Etapa 3 — 2026-09-10. Evidencia presentada en E3-a … E3-h (E3-g: prueba de P3, negativa). **El cierre queda sujeto a la verificación de Sebastián**, conforme a la regla de puertas del plan; la autoatestación no cuenta como evidencia.

Cotejo criterio por criterio (plan §6, Etapa 3):

| Criterio de aceptación | Estado | Evidencia |
|---|---|---|
| Cambiar `ESTADO_LANZAMIENTO` a cada valor cambia el botón de acción y el pie sin tocar otro archivo (`git diff --stat` = 1 archivo) | cumplido | E3-b: tres transiciones, `1 file changed` en cada una; pruebas e invariantes pasan sin modificarse en los tres estados |
| El script I7 falla con un literal prohibido y vuelve a pasar al quitarlo (prueba negativa documentada) | cumplido | E3-d: exit 1 señalando archivo y línea, exit 0 al retirarlo; además permanente en CI |
| Menú móvil operable con teclado y lector de pantalla (`aria-expanded`, `Escape` cierra) | cumplido con límite | E3-e: teclado verificado y árbol de accesibilidad correcto en los tres momentos. **No** se probó con un lector real; queda sugerida una comprobación de un minuto con Narrador |

Actualización de continuidad (HC-d, 2026-10-24): el límite de la última fila quedó
resuelto por Sebastián con Narrador el 2026-09-11, según la ampliación de E3-e.
La fila conserva el estado de la primera entrega; prevalece esa evidencia posterior.

Evidencia pedida: tres `git diff --stat` y captura de cada estado (E3-b, E3-c), salida del script en fallo y en éxito (E3-d), conteo de pruebas antes y después (E3-h: 0 → 31).

Riesgos anotados de la etapa, cubiertos con prueba: «el estado se filtra a `producto.json`» (dos pruebas en `tests/lanzamiento.test.ts`) y «menú móvil sin cierre por `Escape`» (E3-e y la auditoría de E3-f).

También en esta etapa, a pedido de Sebastián: **P2** (juego de caracteres) y **P3** (URL de preview) registrados en «Bloqueos», y Tailwind desinstalado (**AD2** en `DECISIONES_SITIO.md`, **A6** aquí). Addendum **A7** con las decisiones de implementación que precisan el plan.

## Etapa en curso

**Ninguna.** La Etapa 4 se cerró el 2026-10-04 con la verificación en producción (E4-al): los dos posts publicados y servidos, el feed validado por URL con 0 errores y 0 avisos, y P1 cerrado 9 de 9. El cotejo criterio por criterio está arriba, en «Última etapa cerrada».

**La Etapa 5 no se inicia sin autorización de Sebastián**, y antes necesita su revisión de `capacidades.json`, que sigue pendiente y la bloquea. Esa revisión debe distinguir dos cosas distintas: (a) si las correcciones de 430-22 y 430-24 se aplicaron al motor, y (b) si existe el caso de referencia calculado a mano. **Solo (b) permite mover `sizing-caso-1..3` a `verificado`.**

### Índice de la evidencia de la Etapa 4

| Bloque | Evidencia |
|---|---|
| Bloque P2: juego de caracteres y fuentes | E4-a … E4-e |
| Infraestructura del blog | E4-f … E4-o |
| Cierre de H1 y addendum del Capítulo 10 | E4-p … E4-t |
| Integración de T01 y T03 | E4-u … E4-ab |
| Bloque de tipografía | E4-ac … E4-ah |
| Las tres salidas de smartypants | E4-ai |
| Cierre de P1 | E4-aj |
| Publicación de T01 y T03 | E4-ak |
| Verificación en producción y cierre | E4-al |

Diferencias con el plan en el addendum A8.

**Nota de etiquetado.** Las etiquetas de evidencia las asigna Claude y se informan en el reporte, por decisión de Sebastián (2026-10-04): pedirlas de antemano era ruido, y las tres veces que hubo que renumerar fue porque las pedidas ya estaban ocupadas. Las dos renumeraciones de esta etapa quedan registradas aquí para que los números del plan y los del documento se puedan cruzar:

- El bloque del 2026-09-12 pedía E4-j … E4-n; esas cinco ya estaban ocupadas por la infraestructura del blog, así que se registraron como **E4-p … E4-t**, en el mismo orden pedido: E4-p = H1; E4-q = Capítulo 9 contra Capítulo 10; E4-r = `norma.ts` y la nota aclaratoria; E4-s = los cuatro pendientes; E4-t = batería de cierre.
- El bloque de tipografía pedía E4-ac … E4-ag; se registró como **E4-ac … E4-ah**, con una etiqueta de más porque las fechas de publicación merecían entrada propia (E4-ag), de modo que la batería de cierre quedó en E4-ah.


## Evidencia Etapa 0

### E0-a — P1, entorno (2026-09-05)

```
### node -v
v24.16.0
### npm -v
11.13.0
### git --version
git version 2.55.0.windows.3
```

```
> npm view astro engines
{ npm: '>=9.6.5', node: '>=22.12.0', pnpm: '>=7.1.0' }
```

Comparación: Node v24.16.0 satisface el rango `>=22.12.0` que declara Astro. npm 11.13.0 satisface `>=9.6.5`. Sin bloqueo por entorno.

### E0-b — P2, versiones del stack (2026-09-05)

```
### npm view astro version
7.3.1
### npm view @astrojs/mdx version
8.0.0
### npm view @astrojs/cloudflare version
14.3.0
### npm view @astrojs/sitemap version
3.7.4
### npm view @astrojs/rss version
4.0.19
### npm view tailwindcss version
4.3.3
### npm view @tailwindcss/vite version
4.3.3
### npm view vitest version
5.0.0
### npm view zod version
4.5.4
```

Salida de `npm view astro dist-tags` (insertada por redirección directa del comando, sin retecleo):

```
{
  'next--format-astro-url': '0.0.0-20220816201344',
  'next--wasm': '0.0.0-wasm-20220921185024',
  'next--imgcache': '0.0.0-imgcache-20220929145446',
  'next--perf-2': '0.0.0-perf-2-20221003212959',
  'next--node-standalone': '0.0.0-node-standalone-20221011210529',
  'next--include-files': '0.0.0-include-files-20221014142503',
  'next--hmr-recovery': '0.0.0-hmr-recovery-20221027125930',
  'next--config-errors': '0.0.0-config-errors-20221101194733',
  'next--vercel-image-2': '0.0.0-vercel-image-2-20221112151551',
  'next--new-config': '0.0.0-new-config-20221114154518',
  'next--image-next': '0.0.0-image-next-20221114175548',
  'next--image-api': '0.0.0-image-api-20221114180701',
  'next--vercel-code': '0.0.0-vercel-code-20221115191719',
  'next--telefunc': '0.0.0-telefunc-20221130131719',
  'next--error-overlay': '0.0.0-error-overlay-20221203190718',
  'next--join-base': '0.0.0-join-base-20221208170900',
  'next--content-collections': '0.0.0-content-collections-20221215161753',
  'next--prerender': '0.0.0-prerender-20221215222121',
  'next--vercel-proc-bug': '0.0.0-vercel-proc-bug-20230124214915',
  'next--netlify-undici-fix': '0.0.0-netlify-undici-fix-20230131152620',
  'next--mdx-links': '0.0.0-mdx-links-20230206172907',
  'next--shiki-vercel': '0.0.0-shiki-vercel-20230209184129',
  'next--headbody': '0.0.0-headbody-20230210211734',
  'next--devapp': '0.0.0-devapp-20230213161446',
  'next--head-bubbling': '0.0.0-head-bubbling-20230217175534',
  'next--loaders': '0.0.0-loaders-20230222215040',
  'next--vercel-fix': '0.0.0-vercel-fix-20230227215002',
  'next--markdoc': '0.0.0-markdoc-20230302210326',
  'next--check-watch': '0.0.0-check-watch-20230303211357',
  'next--ssr-manifest': '0.0.0-ssr-manifest-20230306183729',
  'next--cloudcannon-fix': '0.0.0-cloudcannon-fix-20230306211609',
  'next--experimental-assets': '0.0.0-experimental-assets-20230307131344',
  'next--vercel-clientaddress': '0.0.0-vercel-clientaddress-20230309142435',
  'next--image-image-size': '0.0.0-image-image-size-20230309180922',
  'next--vercel-json': '0.0.0-vercel-json-20230313201834',
  'next--head-prop': '0.0.0-head-prop-20230323183456',
  'next--schema-image': '0.0.0-schema-image-20230401013700',
  'next--scopedStyleStrategy': '0.0.0-scopedStyleStrategy-20230406135310',
  'next--image-wasm-ssr': '0.0.0-image-wasm-ssr-20230411145607',
  'next--data-collections': '0.0.0-data-collections-20230418125011',
  'next--middleware': '0.0.0-middleware-20230418135507',
  'next--vercel-image': '0.0.0-vercel-image-20230428112211',
  'next--multi-chunk': '0.0.0-multi-chunk-20230508112531',
  'next--outlet': '0.0.0-outlet-20230516145630',
  'next--spa': '0.0.0-spa-20230519211519',
  'next--content-serial': '0.0.0-content-serial-20230522100058',
  'next--nested-hydrate': '0.0.0-nested-hydrate-20230524151829',
  'next--redirects': '0.0.0-redirects-20230524173123',
  'next--markdoc-import-urls': '0.0.0-markdoc-import-urls-20230607221652',
  'next--simple-nested-hydration': '0.0.0-simple-nested-hydration-20230612101258',
  'next--tailwind-config': '0.0.0-tailwind-config-20230612122302',
  'next--pm-fix': '0.0.0-pm-fix-20230620193235',
  'next--markdoc-config-changes': '0.0.0-markdoc-config-changes-20230626153541',
  'next--vercel-split': '0.0.0-vercel-split-20230629135007',
  'next--vercel-edge-middleware': '0.0.0-vercel-edge-middleware-20230630125718',
  'next--netlify-edge-middleware': '0.0.0-netlify-edge-middleware-20230714131425',
  'next--view-transitions': '0.0.0-view-transitions-20230731172701',
  rc: '3.0.0-rc.11',
  'next--astro-check-fix': '0.0.0-astro-check-fix-20230830133734',
  'next--vt-root-anim': '0.0.0-vt-root-anim-20230830212910',
  'next--vt-fallback-filter': '0.0.0-vt-fallback-filter-20230831170045',
  'next--vercel-symbolic-link': '0.0.0-vercel-symbolic-link-20230901110045',
  'next--symbolic-link': '0.0.0-symbolic-link-20230901124103',
  'next--sanitize-filenames': '0.0.0-sanitize-filenames-20230901203435',
  'next--fix-mime': '0.0.0-fix-mime-20230904023307',
  'next--vercel-upgrade': '0.0.0-vercel-upgrade-20230905174957',
  'next--optional-sharp': '0.0.0-optional-sharp-20230906121801',
  'next--propagation-metadata': '0.0.0-propagation-metadata-20230907174633',
  'next--perf': '0.0.0-perf-20230907211643',
  'next--vercel-speed-insights': '0.0.0-vercel-speed-insights-20230912155045',
  'next--picture': '0.0.0-picture-20231008095742',
  'next--srcset-remote': '0.0.0-srcset-remote-20231013141048',
  'next--concurrent-assets': '0.0.0-concurrent-assets-20231015222920',
  'next--fragments': '0.0.0-fragments-20231017161931',
  'next--integration-middleware': '0.0.0-integration-middleware-20231019151221',
  'next--content-cache': '0.0.0-content-cache-20231019190330',
  'experimental--react-children-client': '0.0.0-react-children-client-20231023164643',
  'experimental--dev-overlay': '0.0.0-dev-overlay-20231024213927',
  'experimental--extra-logging': '0.0.0-extra-logging-20231030194239',
  'experimental--i18n-routing': '0.0.0-i18n-routing-20231101144500',
  'experimental--content-cache': '0.0.0-content-cache-20231108193031',
  'experimental--assets-uint8array': '0.0.0-assets-uint8array-20231109073138',
  'experimental--name': '0.0.0-name-20231110143304',
  'experimental--404-trailing-slash': '0.0.0-404-trailing-slash-20231117145629',
  'experimental--self-closing-children': '0.0.0-self-closing-children-20231120173528',
  'experimental--netlify-fix': '0.0.0-netlify-fix-20231122190344',
  'experimental--xray': '0.0.0-xray-20231129021231',
  'experimental--add-stable': '0.0.0-add-stable-20231208215901',
  'experimental--vt-partytown': '0.0.0-vt-partytown-20231212203707',
  'experimental--handle-unhandled': '0.0.0-handle-unhandled-20231213202808',
  'experimental--dupicate-content-entry-improved-message': '0.0.0-dupicate-content-entry-improved-message-20231220220040',
  'experimental--9591': '0.0.0-9591-20240103143428',
  'experimental--ssg-no-streaming': '0.0.0-ssg-no-streaming-20240104123901',
  'experimental--9624': '0.0.0-9624-20240105191325',
  'experimental--pin-sharp': '0.0.0-pin-sharp-20240109233547',
  'experimental--data-astro-transition': '0.0.0-data-astro-transition-20240111220209',
  'experimental--9685': '0.0.0-9685-20240112193246',
  'experimental--isr': '0.0.0-isr-20240125224234',
  'experimental--toolbar-absolute-paths': '0.0.0-toolbar-absolute-paths-20240126155246',
  'experimental--improve-sync-errors': '0.0.0-improve-sync-errors-20240201210128',
  'experimental--cc-hmr': '0.0.0-cc-hmr-20240205141934',
  'experimental--cssesc': '0.0.0-cssesc-20240207015359',
  'experimental--edge-middleware-verification': '0.0.0-edge-middleware-verification-20240207135919',
  'experimental--astro-content-fix': '0.0.0-astro-content-fix-20240207175526',
  'experimental--island-loading-error-messages': '0.0.0-island-loading-error-messages-20240209173859',
  'experimental--debug-missing-endpoint': '0.0.0-debug-missing-endpoint-20240209211325',
  'experimental--get-remote-dimensions': '0.0.0-get-remote-dimensions-20240211001920',
  'experimental--render-nodejs': '0.0.0-render-nodejs-20240213145612',
  'experimental--node-crypto-error': '0.0.0-node-crypto-error-20240214144952',
  'experimental--allow-cc': '0.0.0-allow-cc-20240222155628',
  'experimental--edge-nested': '0.0.0-edge-nested-20240223135627',
  'experimental--audits-ui': '0.0.0-audits-ui-20240223144827',
  'experimental--no-error-in-stream': '0.0.0-no-error-in-stream-20240223213844',
  'experimental--vite-runtime-api': '0.0.0-vite-runtime-api-20240224085712',
  'experimental--svelte-editor-fix': '0.0.0-svelte-editor-fix-20240227111439',
  'experimental--direct-render-script': '0.0.0-direct-render-script-20240227141119',
  'experimental--treeshake-scoped-css': '0.0.0-treeshake-scoped-css-20240304133731',
  'experimental--db-export-bug': '0.0.0-db-export-bug-20240307130354',
  'experimental--db-integrations-support': '0.0.0-db-integrations-support-20240307154857',
  'experimental--db-batch': '0.0.0-db-batch-20240307184301',
  'experimental--non-admin-test': '0.0.0-non-admin-test-20240308195029',
  'experimental--token-renewal': '0.0.0-token-renewal-20240315122343',
  'experimental--inline-ccc': '0.0.0-inline-ccc-20240324145742',
  'experimental--head-body-content': '0.0.0-head-body-content-20240329190922',
  'experimental--10745': '0.0.0-10745-20240410180016',
  'experimental--js-strictest': '0.0.0-js-strictest-20240411160410',
  'experimental--skew-protection': '0.0.0-skew-protection-20240412093445',
  'experimental--cc-invalid': '0.0.0-cc-invalid-20240417202858',
  'experimental--toolbar-improvements': '0.0.0-toolbar-improvements-20240420123233',
  'experimental--assets-vitest': '0.0.0-assets-vitest-20240422184742',
  'experimental--route-key': '0.0.0-route-key-20240430102522',
  'experimental--mdx-v3': '0.0.0-mdx-v3-20240502124041',
  'experimental--cc-preserve-cache': '0.0.0-cc-preserve-cache-20240502141405',
  'experimental--vitals-fix': '0.0.0-vitals-fix-20240503214211',
  'experimental--actions': '0.0.0-actions-20240507170618',
  'experimental--node-streaming': '0.0.0-node-streaming-20240515211034',
  'experimental--astro-env': '0.0.0-astro-env-20240522153443',
  'experimental--container': '0.0.0-container-20240524172326',
  'experimental--cf-build-option': '0.0.0-cf-build-option-20240527121637',
  'experimental--ccc-scripts': '0.0.0-ccc-scripts-20240531125856',
  'experimental--vitest-config': '0.0.0-vitest-config-20240611074527',
  'experimental--experimental-container': '0.0.0-experimental-container-20240613104104',
  'experimental--refactor-prerender': '0.0.0-refactor-prerender-20240614140807',
  'experimental--content-layer': '0.0.0-content-layer-20240628202150',
  'experimental--content-layer-images': '0.0.0-content-layer-images-20240717095022',
  'experimental--noSync': '0.0.0-noSync-20240718092432',
  'experimental--server-islands': '0.0.0-server-islands-20240718131003',
  'experimental--contentlayer': '0.0.0-contentlayer-20240808151214',
  'experimental--content-collections-intellisense': '0.0.0-content-collections-intellisense-20240808223933',
  'experimental--server-island-regression': '0.0.0-server-island-regression-20240814104839',
  'experimental--si-crypto-reg': '0.0.0-si-crypto-reg-20240814162819',
  'experimental--immutable-datastore': '0.0.0-immutable-datastore-20240815133714',
  'experimental--content-types-dev': '0.0.0-content-types-dev-20240815140037',
  'experimental--si-get': '0.0.0-si-get-20240815175345',
  'experimental--mdx-layout-style': '0.0.0-mdx-layout-style-20240822115312',
  'experimental--actions-bun-workaround': '0.0.0-actions-bun-workaround-20240827210959',
  'experimental--dynamic-middleware': '0.0.0-dynamic-middleware-20240829171109',
  'experimental--crypto-env': '0.0.0-crypto-env-20240829194602',
  'experimental--tw5': '0.0.0-tw5-20240917210903',
  'experimental--edge-middleware-regression': '0.0.0-edge-middleware-regression-20241003093448',
  'experimental--test-apis': '0.0.0-test-apis-20241008195645',
  'experimental--astro-url-fix': '0.0.0-astro-url-fix-20241011143901',
  'experimental--env-override': '0.0.0-env-override-20241016131627',
  'experimental--env-middleware': '0.0.0-env-middleware-20241105160737',
  'experimental--env-race-condition': '0.0.0-env-race-condition-20241114151936',
  'experimental--si-header': '0.0.0-si-header-20241120190819',
  'experimental--process-env-override': '0.0.0-process-env-override-20241206130809',
  'experimental--astroenv-dev': '0.0.0-astroenv-dev-20241206160513',
  'experimental--svg-leak': '0.0.0-svg-leak-20241209134543',
  'experimental--routemanifest-refactor': '0.0.0-routemanifest-refactor-20241209145150',
  'experimental--middleware-fix': '0.0.0-middleware-fix-20241210163342',
  'experimental--atomic-writes': '0.0.0-atomic-writes-20241212091949',
  'experimental--sessions': '0.0.0-sessions-20241216171652',
  'experimental--clean-sm': '0.0.0-clean-sm-20241216182429',
  'experimental--dev-after-sync': '0.0.0-dev-after-sync-20250102175105',
  'experimental--render-type': '0.0.0-render-type-20250103094003',
  'experimental--data-store-location': '0.0.0-data-store-location-20250109131010',
  'experimental--alpine-scripts': '0.0.0-alpine-scripts-20250121133658',
  'experimental--trailing-slash-redirect': '0.0.0-trailing-slash-redirect-20250128153540',
  'experimental--router-noexec': '0.0.0-router-noexec-20250129135648',
  'experimental--adapter-sessions': '0.0.0-adapter-sessions-20250207124921',
  legacy: '4.16.19',
  alpha: '7.0.0-alpha.2',
  beta: '7.0.0-beta.6',
  'incremental-graph-hashing': '0.0.0-incremental-graph-hashing-20260807161014',
  latest: '7.3.1'
}
```

Lecturas de E0-b:
- `latest` apunta a `7.3.1` — **no** es prerelease (existen tags `alpha`/`beta` de 7.0.0 anteriores, pero `latest` es una versión estable).
- **Hallazgo:** `astro@latest` es 7.x, no 5.x como asume D1 del plan. Conforme al protocolo, la decisión de stack NO se cambia; se registra como hipótesis nueva **H12** en `HIPOTESIS_SITIO.md`.
- `tailwindcss` 4.3.3 confirma Tailwind v4 (consistente con D1).

### E0-c — P3, dominios (H3) (2026-09-05)

**Método declarado (antes de reportar resultados):**
- `calcinst.com`: RDAP contra el servidor del registro (Verisign), `https://rdap.verisign.com/com/v1/domain/calcinst.com`, vía `Invoke-WebRequest`. Un HTTP 404 en RDAP del registro significa "dominio no encontrado en el registro" = no registrado (evidencia a nivel de registro, no de DNS).
- `calcinst.mx`: el bootstrap RDAP de IANA (`https://data.iana.org/rdap/dns.json`) **no** lista servidor RDAP para `.mx`, así que se usó whois por TCP 43: primero `whois.iana.org` para obtener el servidor autoritativo (`whois.mx`, operado por NIC México), luego la consulta de disponibilidad con la sintaxis propia de ese servidor (`=NombreDominio`), validada con una consulta de control sobre un dominio que sí existe (`nic.mx`).
- **No** se usó resolución DNS ni buscadores de registradores.

**Resultado `calcinst.com` (RDAP Verisign):**

```
HTTP 404 NotFound
```

**Bootstrap RDAP de IANA para `.mx`:**

```
El bootstrap RDAP de IANA NO lista 'mx' (sin servidor RDAP para .mx)
```

**`whois.iana.org`, consulta `mx` (salida literal completa):**

```
===== whois.iana.org / consulta: mx =====
% IANA WHOIS server
% for more information on IANA, visit http://www.iana.org
% This query returned 1 object

domain:       MX

organisation: NIC-Mexico
organisation: ITESM - Campus Monterrey
address:      Av. Revolucion 2703 1
address:      Nuevo Sur, Torre 2, Piso 3
address:      Col. Ladrillera
address:      Monterrey Nuevo Leon 64830
address:      Mexico

contact:      administrative
name:         POC ADM IANA
organisation: NIC-Mexico, ITESM - Campus Monterrey
address:      Av. Revolucion 2703 1
address:      Nuevo Sur, Torre 2, Piso 3
address:      Col. Ladrillera
address:      Monterrey Nuevo Leon 64830
address:      Mexico
phone:        +52 (81) 8864 2600
e-mail:       adm-iana@nic.mx

contact:      technical
name:         POC TECH IANA
organisation: NIC-Mexico, ITESM - Campus Monterrey
address:      Av. Revolucion 2703 1
address:      Nuevo Sur, Torre 2, Piso 3
address:      Col. Ladrillera
address:      Monterrey Nuevo Leon 64830
address:      Mexico
phone:        +52 (81) 8864 2600
e-mail:       tech-iana@nic.mx

nserver:      C.MX-NS.MX 192.100.224.1 2001:1258:0:0:0:0:0:1
nserver:      E.MX-NS.MX 189.201.244.1 2801:c4:c0:0:0:0:0:1
nserver:      I.MX-NS.MX 207.248.68.1 2801:c4:d0:0:0:0:0:1
nserver:      M.MX-NS.MX 200.94.176.1 2001:13c7:7000:0:0:0:0:1
nserver:      O.MX-NS.MX 200.23.1.1 2001:1201:0:0:0:0:0:1
nserver:      X.MX-NS.MX 2001:1201:10:0:0:0:0:1 201.131.252.1
ds-rdata:     43850 8 2 3d4481f6dc8fa708903891bd06481c6069d37baa241022e3699ac8928693dbef

whois:        whois.mx

status:       ACTIVE
remarks:      Registration information: http://www.registry.mx/

created:      1989-02-01
changed:      2026-02-28
source:       IANA
```

**Intentos de sintaxis en `whois.mx` (se registran también los fallidos):**

```
===== whois.mx / consulta: calcinst.mx =====

No_Se_Encontro_El_Objeto/Object_Not_Found

&PARAMETROS VALIDOS:

 &NombreObjeto    Busca en la base de datos de NIC Mexico el objeto solicitado.
 &=NombreDominio  Verifica la disponibilidad de un nombre de dominio.
 &?               Muestra este mensaje.

&NOTA:
 &Si se busca informacion sobre un dominio este debe pertenecer al ccTLD .mx
```

```
===== whois.mx / consulta: &=calcinst.mx =====

Cadena_Invalida/Invalid_String

&PARAMETROS VALIDOS:

 &NombreObjeto    Busca en la base de datos de NIC Mexico el objeto solicitado.
 &=NombreDominio  Verifica la disponibilidad de un nombre de dominio.
 &?               Muestra este mensaje.

&NOTA:
 &Si se busca informacion sobre un dominio este debe pertenecer al ccTLD .mx
```

**Consulta definitiva de disponibilidad (`=calcinst.mx`) y control (`=nic.mx`), salida literal completa:**

```
===== whois.mx / consulta: =calcinst.mx =====

Disponible/Available

% The requested information ("Information") is provided only for the delegation
% of domain names and the operation of the DNS administered by NIC Mexico.

% It is absolutely prohibited to use the Information for other purposes, 
% including sending not requested emails for advertising or promoting products
% and services purposes (SPAM) without the authorization of the owners of the
% Information and NIC Mexico.

% The database generated from the delegation system is protected by the
% intellectual property laws and all international treaties on the matter.

% If you need more information on the records displayed here, please contact us
% by email at ayuda@nic.mx .

% If you want notify the receipt of SPAM or unauthorized access, please send a
% email to abuse@nic.mx .

% La informacion que ha solicitado se provee exclusivamente para fines
% relacionados con la delegacion de nombres de dominio y la operacion del DNS
% administrado por NIC Mexico.

% Queda absolutamente prohibido su uso para otros propositos, incluyendo el
% envio de Correos Electronicos no solicitados con fines publicitarios o de
% promocion de productos y servicios (SPAM) sin mediar la autorizacion de los
% afectados y de NIC Mexico.

% La base de datos generada a partir del sistema de delegacion, esta protegida
% por las leyes de Propiedad Intelectual y todos los tratados internacionales
% sobre la materia.

% Si necesita mayor informacion sobre los registros aqui mostrados, favor de
% comunicarse a ayuda@nic.mx.

% Si desea notificar sobre correo no solicitado o accesos no autorizados, favor
% de enviar su mensaje a abuse@nic.mx.


===== whois.mx / consulta de control: =nic.mx (dominio que SI existe) =====

No_Disponible/Unavailable

% The requested information ("Information") is provided only for the delegation
% of domain names and the operation of the DNS administered by NIC Mexico.

% It is absolutely prohibited to use the Information for other purposes, 
% including sending not requested emails for advertising or promoting products
% and services purposes (SPAM) without the authorization of the owners of the
% Information and NIC Mexico.

% The database generated from the delegation system is protected by the
% intellectual property laws and all international treaties on the matter.

% If you need more information on the records displayed here, please contact us
% by email at ayuda@nic.mx .

% If you want notify the receipt of SPAM or unauthorized access, please send a
% email to abuse@nic.mx .

% La informacion que ha solicitado se provee exclusivamente para fines
% relacionados con la delegacion de nombres de dominio y la operacion del DNS
% administrado por NIC Mexico.

% Queda absolutamente prohibido su uso para otros propositos, incluyendo el
% envio de Correos Electronicos no solicitados con fines publicitarios o de
% promocion de productos y servicios (SPAM) sin mediar la autorizacion de los
% afectados y de NIC Mexico.

% La base de datos generada a partir del sistema de delegacion, esta protegida
% por las leyes de Propiedad Intelectual y todos los tratados internacionales
% sobre la materia.

% Si necesita mayor informacion sobre los registros aqui mostrados, favor de
% comunicarse a ayuda@nic.mx.

% Si desea notificar sobre correo no solicitado o accesos no autorizados, favor
% de enviar su mensaje a abuse@nic.mx.
```

**Conclusión E0-c:**
- `calcinst.mx`: **disponible**, confirmado por el verificador de disponibilidad del registro autoritativo (NIC México), con consulta de control que demuestra que el método discrimina.
- `calcinst.com`: **no registrado** según RDAP del registro (Verisign, HTTP 404). Nota de precisión: RDAP demuestra "no registrado"; no descarta que el nombre esté reservado o con precio premium en algún registrador, aunque para `.com` es improbable.
- H3 → **confirmada** (fuentes: rdap.verisign.com, data.iana.org/rdap/dns.json, whois.iana.org, whois.mx). No se compró nada.

### E0-d — P4, Buttondown (H9) (2026-09-05)

Acceso web disponible en esta sesión (demostrado en E0-c). Fuentes: documentación oficial de Buttondown, con URL exacta por punto.

**(a) Endpoint público de suscripción sin clave de API — CONFIRMADO.**
- URL consultada: `https://docs.buttondown.com/building-your-subscriber-base`
- La página documenta el endpoint `embed-subscribe` como `action` de un `<form>` HTML estándar, sin clave de API. Ejemplo de código transcrito de la página:

```html
<form action="https://buttondown.com/api/emails/embed-subscribe/username" method="post">
  <input type="email" name="email" placeholder="Enter your email" required />
  <input type="submit" value="Subscribe" />
</form>
```

- **Matiz registrado (afecta el diseño de la Etapa 8):** la misma página indica que el endpoint `embed-subscribe` debe ser el `action` de un formulario HTML estándar y pide **no** enviarle peticiones con `fetch` de JavaScript, porque el suscriptor a veces debe seguir la respuesta de Buttondown para completar verificación CAPTCHA o corregir un error de validación. El plan (I1 / Etapa 8) diseña `FormularioCorreo` como isla con `fetch` y estados de error, con POST nativo como degradación. Este matiz no refuta H9 (el endpoint existe y es usable sin clave), pero condiciona cómo se implementa la isla en la Etapa 8; se resuelve en esa etapa (opciones previstas por el propio plan: POST nativo, o Pages Function mínima con addendum).

**(b) Double opt-in — CONFIRMADO (activo por defecto).**
- URL consultada: `https://docs.buttondown.com/double-opt-in`
- La página declara que Buttondown exige double opt-in por defecto para todos los newsletters ("Buttondown requires double opt-in for all newsletters by default"). Desactivarlo requiere: parámetro `type: regular` por suscriptor vía API, o el ajuste oculto `should_require_double_optin` gestionado con soporte; y declaran que no lo desactivan para formularios estándar sin verificación previa. Para el plan (D3 exige double opt-in obligatorio) esto es exactamente la configuración deseada: está activo por defecto y no hay riesgo de perderlo.

**(c) Exportación de suscriptores a CSV — CONFIRMADO.**
- URL consultada: `https://docs.buttondown.com/data-exports-subscriber`
- La página confirma exportación a CSV desde el panel (botón "Export"; para todos los suscriptores, sin selección previa). El CSV incluye ID único, correo y metadatos (fechas de alta/baja, etiquetas, etc.).

**Conclusión E0-d:** H9 → **confirmada** en sus tres puntos, con el matiz de implementación (a) registrado.

### E0-e — P5, repositorio (2026-09-05)

Ruta confirmada por el humano antes de crear nada: `C:\Users\sebas_vf1ofrv\Desktop\calcinst-web` (carpeta hermana de `C:\Users\sebas_vf1ofrv\Desktop\calcinst`; el repositorio `calcinst` no se tocó ni se leyó).

```
> git init
Initialized empty Git repository in C:/Users/sebas_vf1ofrv/Desktop/calcinst-web/.git/
```

Archivos base creados sin ejecutar npm:
- `README.md` — tres líneas: "# CalcInst — sitio web" / (línea en blanco) / "Ver ESTADO_SITIO.md."
- `.gitignore` — estándar de Node (dependencias, builds, logs, cobertura, cachés, `.env`, SO, editores).

## Evidencia Etapa 1 (2026-09-05/06)

### E1-a — Aprobaciones de la puerta de la Etapa 1

Sebastián autorizó el 2026-09-05: (1) **Astro 7.3.1** en lugar del 5.x que asumía D1 — esto resuelve la decisión pendiente de H12 (la hipótesis queda con la salvedad de verificación de APIs, ver E1-c: `astro check` y `astro build` pasan en 7.3.1); (2) la lista de dependencias con versiones exactas; (3) crear el repositorio **privado** `sebashealy/calcinst-web` en GitHub. Ruta de creación confirmada en la Etapa 0.

### E1-b — Andamiaje e instalación

- `npm create astro@5.2.4 -- scaffold --template minimal --no-install --no-git --yes` ejecutado en directorio temporal e integrado a mano al repositorio (create-astro no opera limpio sobre un directorio no vacío con los documentos de gobierno).
- `npm install` con versiones exactas pineadas: `added 712 packages, and audited 713 packages`.
- **Desviación registrada:** `eslint-plugin-jsx-a11y` 6.10.2 se retiró de la lista aprobada (un retiro, no una adición): su peer es `eslint ^3–^9` y el proyecto usa ESLint 10; para `eslint-plugin-astro` es peer **opcional** (`peerOptional` en el árbol de npm). El linting de accesibilidad llega vía axe en la Etapa 10.
- Advertencias de instalación: deprecaciones (`inflight`, `glob@7`, `rimraf@2/3`, `uuid@8`) y `13 vulnerabilities (2 low, 4 moderate, 7 high)` — todas en el árbol de `@lhci/cli` (herramienta solo de CI, no llega al sitio). Se registra, no se resuelve en esta etapa.
- `tsconfig.json`: `extends astro/tsconfigs/strict` + banderas de CalcInst leídas de `calcinst/tsconfig.app.json` (solo lectura): `strict`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.

### E1-c — Batería de verificación local (salidas literales)

```
> astro check
Result (6 files):
- 0 errors
- 0 warnings
- 0 hints
```

```
> vitest run
No test files found, exiting with code 0
```
(`passWithNoTests: true` documentado en `vitest.config.ts`; los primeros tests llegan en la Etapa 3.)

```
> eslint .
(sin salida; exit 0)
```

```
> prettier --check .
All matched files use Prettier code style!
```
(Los tres documentos de gobierno están en `.prettierignore`: contienen evidencia literal que no debe reformatearse.)

```
> node scripts/verificar-invariantes.mjs
verificar-invariantes: 0 verificaciones activas, 0 fallos (esqueleto Etapa 1)
```

```
> astro build
[build] output: "static"
[build] 1 page(s) built in 974ms
```

`dist/` contiene `index.html` (con `<title>CalcInst</title>` y `<meta name="robots" content="noindex">`), `_headers` con `X-Robots-Tag: noindex`, y el CSS de Tailwind compilado.

### E1-d — Lighthouse CI local: dos hallazgos

1. **NO_FCP con body vacío.** Con la página en blanco literal, Lighthouse aborta: "The page did not paint any content" (NO_FCP). El criterio "página en blanco" y el criterio "Lighthouse CI corre" son incompatibles al pie de la letra. **Desviación mínima aplicada:** el body pinta un único `<h1>CalcInst</h1>` sin estilo (comentado en `index.astro`); el diseño real llega en las Etapas 2–5.
2. **EPERM local en Windows.** Tras corregir lo anterior, los audits corren pero `lhci` falla al limpiar el perfil temporal de Chrome (`taskkill` no encuentra el proceso; `EPERM` al borrar `%TEMP%\lighthouse.*`). Reproducido también sin sandbox. Es una limitación del entorno Windows local, no del proyecto; el veredicto de Lighthouse CI es el run de GitHub Actions en ubuntu (pendiente del push).

### E1-e — GitHub

```
> gh repo create sebashealy/calcinst-web --private --source . --remote origin --push
https://github.com/sebashealy/calcinst-web
 ! [remote rejected] HEAD -> main (refusing to allow an OAuth App to create or update workflow
   `.github/workflows/ci.yml` without `workflow` scope)
error: failed to push some refs to 'https://github.com/sebashealy/calcinst-web.git'
```

El repositorio privado quedó **creado** y `origin` configurado; el **push está bloqueado** porque el token de `gh` (scopes: `gist`, `read:org`, `repo`) carece del scope `workflow`, requerido para subir `.github/workflows/ci.yml`. Corrección: `gh auth refresh -h github.com -s workflow` (interactivo, la ejecuta Sebastián).

La rama `main` se renombró desde `master` antes del intento (el plan define `main` = producción).

### E1-f — Rama de humo I5 (preparada localmente)

Rama `prueba/i5-humo` (commit `bee950c`, 5 archivos): `@astrojs/cloudflare` 14.3.0 exacto, `adapter: cloudflare()` en `astro.config.mjs`, y `src/pages/api/ping.ts` con `export const prerender = false`. Build verificado:

```
[build] output: "static"
[build] mode: "server"
[build] Complete!
```

`dist/` resultante: `client/` (index.html prerenderizado + `_headers`) y `server/` (worker para `/api/ping`). Es decir: el sitio sigue estático y solo la ruta de la prueba es bajo demanda — exactamente lo que I5 debe demostrar. Pendiente (requiere GitHub + Cloudflare): push de la rama, PR, verificación del preview con `curl`, y borrado de la rama. Un primer commit de esta rama arrastró `.wrangler/` (estado local de miniflare); se corrigió con amend antes de publicar y `.wrangler/` quedó en `.gitignore`.

### E1-g — GitHub: push y CI verde (2026-09-05)

`gh auth status` confirma el scope pendiente ya resuelto por Sebastián: `Token scopes: 'gist', 'read:org', 'repo', 'workflow'`.

Rama `main` publicada en `https://github.com/sebashealy/calcinst-web` (privado). PR de la prueba de humo abierto: **`https://github.com/sebashealy/calcinst-web/pull/1`**.

```
> gh run list --limit 3
completed  success  Prueba de humo I5: ruta bajo demanda con el adaptador de Cloudflare  CI  prueba/i5-humo  pull_request  33982901641  1m3s
completed  success  Addendum A1: D2 pasa de Cloudflare Pages a Workers con activos estaticos  CI  main  push  33982883798  59s
completed  success  Etapa 1: evidencia parcial y bloqueos actualizados  CI  main  push  33982868218  54s
```

```
> gh pr checks 1
verificar	pass	1m0s	https://github.com/sebashealy/calcinst-web/actions/runs/33982901641/job/101351195321
```

**CI verde en PR** — criterio de aceptación de la Etapa 1 cumplido. El job `verificar` ejecuta, en orden: `astro check`, `vitest`, `eslint`, `prettier --check`, `verificar-invariantes.mjs`, `astro build` y Lighthouse CI.

### E1-h — Lighthouse CI: el hallazgo de E1-d queda resuelto en CI

El fallo `EPERM` de E1-d era una limitación de Windows local, no del proyecto. En ubuntu corre completo. Extracto literal del run de `main` (33982883798):

```
✅  .lighthouseci/ directory writable
✅  Configuration file found
✅  Chrome installation found
Healthcheck passed!
Started a web server on port 42393...
Running Lighthouse 1 time(s) on http://localhost:42393/index.html
Run #1...done.
Done running Lighthouse!
Checking assertions against 1 URL(s), 1 total run(s)
All results processed!
Done running autorun.
```

En el run de la rama de humo, Lighthouse apuntó a `http://localhost:35801/client/index.html`: con el adaptador, `dist/` se divide en `client/` y `server/`, y `staticDistDir` encuentra el HTML prerenderizado dentro de `client/`. Coherente con lo documentado en E1-f.

Advertencia registrada, no bloqueante: `⚠️ GitHub token not set` — `lhci` no publica estados en el PR; el informe se conserva como artefacto (`actions/upload-artifact`).

### E1-i — Configuración de despliegue y normalización de finales de línea

`wrangler.jsonc` creado conforme al addendum A1, con el formato verificado en `https://developers.cloudflare.com/workers/static-assets/binding/`:

```jsonc
{
  "name": "calcinst-web",
  "compatibility_date": "2026-09-05",
  "assets": {
    "directory": "./dist/",
  },
}
```

Sin campo `main`: el sitio de esta etapa es puramente estático y no tiene código de Worker (los ejemplos de la documentación para servir solo activos omiten `main`). La ruta bajo demanda de la fase 2 lo añadirá entonces.

**Defecto encontrado y corregido: la verificación de formato daba veredictos distintos según la máquina.** Tras cambiar de rama, Git entregó el árbol con CRLF en Windows; `prettier --check` espera LF por omisión, así que fallaba en local (`astro.config.mjs`, `package.json`) mientras pasaba en CI sobre ubuntu. Los archivos no tenían ningún cambio de contenido: `git diff` estaba vacío y `git diff --ignore-cr-at-eol` lo confirmó tras reescribirlos. Corregido con `.gitattributes` (`* text=auto eol=lf` más binarios sin conversión), que además elimina los avisos `LF will be replaced by CRLF` que aparecían en cada `git add`.

Batería local tras el cambio: `astro check` 0 errores / 0 avisos / 0 hints · `vitest` sin archivos de prueba (exit 0) · `eslint` exit 0 · `prettier --check` "All matched files use Prettier code style!" · `verificar-invariantes` 0 fallos · `astro build` 1 página.

### E1-j — Conexión con Cloudflare: no ejecutable desde esta sesión

Comprobado en el entorno: `wrangler` no está instalado globalmente; `CLOUDFLARE_API_TOKEN`, `CF_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` están ausentes; `%APPDATA%\xdg.config\.wrangler` contiene solo logs de la build local, sin `config/default.toml`, es decir **sin sesión OAuth de wrangler**.

Conectar un repositorio a Workers Builds requiere instalar la app de GitHub de Cloudflare y autorizarla desde el dashboard; no existe una ruta por CLI para esa conexión. Los pasos 3, 4, 6 y 7 del encargo quedan en manos de Sebastián. El paso 5 (borrar `prueba/i5-humo`) depende del 4 y **no se ejecuta todavía**: la rama existe para demostrar que el camino funciona, y esa demostración aún no está hecha contra un preview real.

### E1-k — Despliegue en Cloudflare Workers y verificación de I5 (2026-09-05/06)

Repositorio conectado por Sebastián con la casilla *Builds for non-production branches* activa. Producción en `https://calcinst-web.instcalc.workers.dev`:

```
> curl -sSI https://calcinst-web.instcalc.workers.dev
HTTP/1.1 200 OK
Content-Type: text/html
CF-Cache-Status: HIT
x-robots-tag: noindex
Server: cloudflare
```

La cabecera `x-robots-tag: noindex` llegando en la respuesta real **verifica empíricamente el hallazgo 1 del addendum A1**: `public/_headers` funciona en Workers con activos estáticos exactamente igual que en Pages. El cuerpo sirve `<title>CalcInst</title>` y el `<h1>` mínimo documentado en E1-d.

**Dos defectos encontrados al construir la rama de prueba, ambos corregidos:**

1. **`main` no puede apuntar a la salida del build.** Con `"main": "./dist/server/entry.mjs"`, tanto `astro check` como el build de Cloudflare fallaron: *"The provided Wrangler config main field (…/dist/server/entry.mjs) doesn't point to an existing file"*. El plugin de Vite de Cloudflare valida ese campo **antes** de construir, así que la ruta a `dist/` todavía no existe. Corregido con `"main": "@astrojs/cloudflare/entrypoints/server"`, que es lo que documenta Astro y lo que el paquete exporta (`node_modules/@astrojs/cloudflare/package.json` → `"./entrypoints/server": "./dist/entrypoints/server.js"`).
2. **La rama de prueba original quedó desfasada.** Se creó antes de `.gitattributes` y de `wrangler.jsonc`, y las compilaciones de ramas no de producción se activaron después de su último push, así que Workers Builds no la había construido nunca. Se recreó sobre el `main` vigente y se reemplazó con *force-push*, lo que actualizó el PR #1 en su sitio.

Nota sobre el reparto de configuración entre ramas: el `wrangler.jsonc` de la raíz es distinto en cada rama —en `main` describe un sitio solo-estático (sin `main`), en `prueba/i5-humo` añade el Worker— y el comando de despliegue del proyecto, que es uno solo y compartido, funciona para ambas sin cambios.

**Resultado de la prueba de humo I5.** PR [#1](https://github.com/sebashealy/calcinst-web/pull/1), commit `2e8d6eb`, ambos checks en verde:

```
> gh pr checks 1
Workers Builds: calcinst-web	pass
verificar	pass	41s
```

Workers Builds publicó en el PR dos URL de preview: `https://3a054c80-calcinst-web.instcalc.workers.dev` (por commit) y `https://prueba-i5-humo-calcinst-web.instcalc.workers.dev` (por rama, estable). **Esto verifica empíricamente el hallazgo 2 del addendum A1.**

```
> curl -sS -i https://prueba-i5-humo-calcinst-web.instcalc.workers.dev/api/ping
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 30
X-Robots-Tag: noindex
Server: cloudflare

{"ok":true,"prueba":"i5-humo"}
```

```
> curl -sSI https://prueba-i5-humo-calcinst-web.instcalc.workers.dev/
HTTP/1.1 200 OK
Content-Type: text/html
x-robots-tag: noindex
```

Es decir: en el mismo despliegue, la ruta bajo demanda responde JSON generado por el Worker y la página sigue sirviéndose prerenderizada. **I5 queda satisfecha**: el camino a la fase 2 existe y está demostrado, no supuesto.

### E1-l — Dominio canónico activo; redirecciones pendientes (2026-09-06)

`calcinst.mx` se adjuntó **desde el repositorio**, no desde el dashboard: `wrangler.jsonc` declara `routes: [{ pattern: "calcinst.mx", custom_domain: true }]`, y el Custom Domain crea su propio registro DNS sin `zone_id` ni `zone_name` (`https://developers.cloudflare.com/workers/wrangler/configuration/`). Queda versionado y reproducible.

```
> Resolve-DnsName calcinst.mx -Type A
Name        IPAddress
calcinst.mx 104.21.31.146
calcinst.mx 172.67.177.201

> curl -sSI https://calcinst.mx
HTTP/1.1 200 OK
Content-Type: text/html
x-robots-tag: noindex
Server: cloudflare
```

**Criterio "`https://calcinst.mx` responde 200 con TLS": cumplido.**

**Las redirecciones no se pueden resolver desde el repositorio.** Se verificó en la documentación (`https://developers.cloudflare.com/workers/static-assets/redirects/`) que `_redirects` marca explícitamente **"Domain-level redirects ❌"**: solo admite rutas relativas dentro del mismo proyecto. Sirve para lo que D8 necesita (301 internas al renombrar un `slug`), no para llevar `www` y `.com` al apex. Eso exige Redirect Rules a nivel de zone, que son operación de dashboard o de API con credenciales de Cloudflare; esta sesión no las tiene (E1-j). Sebastián optó por aplicarlas él.

Estado al cierre: los tres hostnames no canónicos **no resuelven todavía**.

```
> curl -sSI https://www.calcinst.mx    → sin respuesta (el hostname no resuelve)
> curl -sSI https://calcinst.com       → sin respuesta (el hostname no resuelve)
> curl -sSI https://www.calcinst.com   → sin respuesta (el hostname no resuelve)
```

**Pasos exactos pendientes (dashboard de Cloudflare).** Cada hostname necesita dos cosas: un registro DNS *proxied* para que el tráfico llegue a Cloudflare, y una Redirect Rule que lo mande al apex. Sin el registro DNS la regla nunca se dispara, porque el nombre ni siquiera resuelve.

*Zone `calcinst.mx`:*
1. DNS → Add record: tipo `AAAA`, nombre `www`, dirección `100::`, **Proxied** (nube naranja). `100::` es el prefijo de descarte que Cloudflare documenta para registros que solo existen para ser proxeados.
2. Rules → Redirect Rules → Create rule. Nombre `www a apex`. Condición: *Hostname* `equals` `www.calcinst.mx`. Acción: redirección **estática** a `https://calcinst.mx`, tipo **301**, con **Preserve path suffix** y **Preserve query string** activados.

*Zone `calcinst.com`:*
3. DNS → Add record: tipo `AAAA`, nombre `@`, dirección `100::`, **Proxied**.
4. DNS → Add record: tipo `AAAA`, nombre `www`, dirección `100::`, **Proxied**.
5. Rules → Redirect Rules → Create rule. Nombre `.com a .mx`. Condición: *Hostname* `is in` `calcinst.com` `www.calcinst.com`. Acción: 301 a `https://calcinst.mx`, con **Preserve path suffix** y **Preserve query string**.

Nota de orden: las Redirect Rules se evalúan antes que los Workers, así que la redirección responde sin llegar al sitio.

### E1-m — Batería de cierre de la Etapa 1 (2026-09-06)

```
> npx astro check
Result (6 files):
- 0 errors
- 0 warnings
- 0 hints

> npm test
No test files found, exiting with code 0

> node scripts/verificar-invariantes.mjs
verificar-invariantes: 0 verificaciones activas, 0 fallos (esqueleto Etapa 1)

> npm run build
[build] 1 page(s) built in 804ms
[build] Complete!

> git diff --stat 8b2f8ee..HEAD
18 files changed, 11856 insertions(+), 6 deletions(-)
```

Conteo de pruebas: **0 antes, 0 después**. La Etapa 1 no introduce pruebas; las primeras llegan en la Etapa 3 (`tests/lanzamiento.test.ts`), y `vitest.config.ts` declara `passWithNoTests: true` para que CI no afirme una cobertura inexistente.

Estado del repositorio: rama única `main`; `prueba/i5-humo` borrada en local y en GitHub tras verificarse (`git branch -r` solo lista `origin/main`).

### E1-n — Verificación independiente de las redirecciones: defecto encontrado (2026-09-06)

Sebastián aplicó los cinco pasos de E1-l y verificó las cuatro URL raíz. Verificación propia: **las cuatro URL raíz son correctas**, pero **ambas reglas fallan en cuanto la petición lleva una ruta**. Probar solo los dominios pelados no lo revela.

Las cuatro URL raíz, correctas:

```
> curl -sSI https://calcinst.mx
HTTP/1.1 200 OK
Content-Type: text/html
x-robots-tag: noindex

> curl -sSI https://www.calcinst.mx
HTTP/1.1 301 Moved Permanently
Location: https://calcinst.mx/

> curl -sSI https://calcinst.com
HTTP/1.1 301 Moved Permanently
Location: https://calcinst.mx/

> curl -sSI https://www.calcinst.com
HTTP/1.1 301 Moved Permanently
Location: https://calcinst.mx/
```

**Defecto 1 — la regla de `calcinst.mx` produce un hostname inexistente.** El destino se concatena con la ruta sin separador, así que el punto de corte cae dentro del propio dominio:

```
> curl -sSI https://www.calcinst.mx/blog/algo?x=1&y=2
Location: https://calcinst.mxblog/algo?x=1&y=2

> curl -sSI https://www.calcinst.mx/blog/
Location: https://calcinst.mxblog/

> curl -sSI https://www.calcinst.mx/descarga
Location: https://calcinst.mxdescarga/
```

`calcinst.mxblog` no es un subdominio mal formado: es un **hostname que no existe** y que nunca podrá resolverse.

```
> Resolve-DnsName calcinst.mxblog
NO RESUELVE: calcinst.mxblog es un hostname inexistente
```

Causa: la URL de destino se guardó como `https://calcinst.mx`, sin barra final, y *Preserve path suffix* anexa la ruta con su barra inicial ya consumida.

**Defecto 2 — la regla de `calcinst.com` descarta la ruta.** Conserva el query string pero pierde el path, es decir, *Preserve path suffix* no quedó activado:

```
> curl -sSI https://calcinst.com/descarga/?utm_source=prueba
Location: https://calcinst.mx/?utm_source=prueba          ← se perdió /descarga/

> curl -sSI https://www.calcinst.com/ruta/profunda/
Location: https://calcinst.mx/                            ← se perdió /ruta/profunda/
```

**Por qué importa y hasta cuándo se puede esperar.** Hoy el sitio tiene una sola página, así que ninguna ruta profunda existe todavía y el daño real es nulo. Deja de serlo en cuanto haya blog: un enlace entrante a `www.calcinst.mx/blog/mi-post/` —el formato de URL que D8 cierra como permanente— terminaría en un hostname inexistente en vez de en el post. Un 301 a un destino roto es peor que no redirigir, porque los buscadores lo tratan como permanente. **Corte: antes de publicar el primer post (Etapa 4).**

**Corrección exacta.** La documentación de Cloudflare resuelve el caso `www`→apex con comodín (`https://www.*` → `https://${1}`), pero eso no sirve entre dominios distintos, que es la mitad del problema aquí. La forma que cubre ambas reglas con la misma estructura es la redirección **dinámica** con expresión de destino:

```
concat("https://calcinst.mx", http.request.uri.path)
```

*Zone `calcinst.mx`*, regla `www a apex`: condición `http.host eq "www.calcinst.mx"`; tipo **Dynamic**; expresión de destino la de arriba; **301**; **Preserve query string** activado.

*Zone `calcinst.com`*, regla `.com a .mx`: condición `http.host in {"calcinst.com" "www.calcinst.com"}`; tipo **Dynamic**; la misma expresión de destino; **301**; **Preserve query string** activado.

(Alternativa mínima para el defecto 1 sin cambiar a dinámica: dejar la URL de destino como `https://calcinst.mx/`, **con** barra final. Corrige la concatenación, pero sigue dependiendo del comportamiento de *Preserve path suffix*; la expresión dinámica es explícita y se comporta igual en las dos zonas.)

### E1-o — Protección de rama y visibilidad del repositorio (2026-09-06)

**D2 queda cerrado en la opción A.** La protección está activa y es **clásica**, no un ruleset — por eso `gh api …/rulesets` devuelve `[]` mientras la rama sí está protegida:

```
> gh api repos/sebashealy/calcinst-web/branches/main --jq '{protected: .protected}'
{"protected":true}

> gh api repos/sebashealy/calcinst-web/branches/main/protection
required_status_checks: { strict: true, contexts: ["verificar"] }
allow_force_pushes: { enabled: false }
allow_deletions:    { enabled: false }
enforce_admins:     { enabled: false }
```

Con esto, `main` solo recibe commits cuyo check `verificar` pasó, así que lo que Cloudflare despliega ya pasó CI: el enunciado de D2 se cumple sin desplegar desde CI ni guardar tokens.

**Matiz registrado, no bloqueante:** `enforce_admins` está en `false`, así que un administrador —Sebastián, y cualquier sesión autenticada con su cuenta— todavía puede empujar directo a `main` y saltarse la puerta. Activarlo cierra el hueco por completo; se deja a criterio de Sebastián, porque también le impediría a él corregir `main` de urgencia sin PR.

**El repositorio pasó a público.** Revisión de lo versionado en busca de material sensible: sin claves, tokens ni identificadores de cuenta. Las únicas coincidencias de la búsqueda son prosa que **nombra** variables de entorno al documentar su ausencia (E1-j) y dependencias de Azure dentro de `package-lock.json`. Nada que retirar.

## Evidencia Etapa 2 (2026-09-08)

### E2-a — Dependencias y fuentes subconjuntadas

Aprobadas por Sebastián con versión exacta: `subset-font` 2.7.0, `puppeteer-core` 24.43.1, `axe-core` 4.13.0. Ninguna descarga un navegador: `puppeteer-core` usa el Chrome ya instalado, y de hecho ya estaba en el árbol como transitivo de `@lhci/cli`; declararlo lo vuelve estable.

**No se añadió React.** El plan nombraba el conmutador de tema como isla `.tsx` (§4.1), pero React + ReactDOM rondan los 45 KB comprimidos y I4 limita el JS de páginas de contenido a 5 KB. Ver addendum A2.

Las cuatro caras `latin` de Fontsource suman 74.6 KiB, por encima del presupuesto de 60 KB. `scripts/generar-fuentes.mjs` las recorta a un conjunto de 141 caracteres **declarado a mano** (ASCII imprimible, español, tipografía de cita y notación técnica), no derivado del contenido del sitio. *[Corregido el 2026-09-11: la redacción original decía «los 141 caracteres que el sitio usa», que sugería un conjunto derivado del contenido existente y llevó a buscar el defecto en el lugar equivocado; ver P2.]*

```
> npm run fuentes
ibm-plex-sans-400.woff2   22.1 KiB ->  15.4 KiB  (-30.2 %)
ibm-plex-sans-600.woff2   23.7 KiB ->  16.4 KiB  (-30.9 %)
ibm-plex-mono-400.woff2   14.4 KiB ->   9.6 KiB  (-33.4 %)
ibm-plex-mono-500.woff2   14.5 KiB ->   9.8 KiB  (-32.7 %)
----------------------------------------------------------------
TOTAL                     74.6 KiB ->  51.1 KiB
Presupuesto: 60.0 KiB (61440 B)
Resultado:   52340 B - DENTRO
Caracteres subconjuntados: 141
```

52 340 B está por debajo del presupuesto en las dos lecturas posibles de «60 KB» (61 440 B binarios y 60 000 B decimales), y conserva las cuatro caras de §3.3 en lugar de sacrificar el peso Mono 500.

### E2-b — Contraste medido con herramienta, en ambos temas

`scripts/auditar-diseno.mjs` sirve `dist/`, abre `/diseno/` en Chrome y lee los colores **ya renderizados** con `getComputedStyle`. No interpreta el CSS fuente: mide lo que el navegador pinta, que es lo que exige el criterio («salida de la herramienta, no la estimación de este plan»).

```
> npm run auditar

=== TEMA OSCURO ===
token            valor     bg-0    bg-1    bg-2   veredicto
--fg-0           #e6edf3    16.27   15.37   13.93   OK (>=4.5)
--fg-1           #9aa7b4     7.83    7.40    6.71   OK (>=4.5)
--fg-2           #7d8894     5.33    5.03    4.56   OK (>=4.5)
--accent         #f5b72b    10.70   10.11    9.16   OK (>=4.5)
--link           #5cc8ff    10.21    9.65    8.75   OK (>=4.5)
--ok             #3dd68c    10.25    9.68    8.77   OK (>=4.5)
--warn           #f5b72b    10.70   10.11    9.16   OK (>=4.5)
--danger         #f0716b     6.66    6.30    5.70   OK (>=4.5)
--color-line-ui  #636b75     3.56    3.36    3.05   OK (>=3)
--color-line     #263140     1.46    1.38    1.25   decorativo
texto sobre --accent: 10.70

=== TEMA CLARO ===
token            valor     bg-0    bg-1    bg-2   veredicto
--fg-0           #0b0f14    18.05   19.22   16.95   OK (>=4.5)
--fg-1           #3d4753     8.87    9.44    8.33   OK (>=4.5)
--fg-2           #5a6472     5.64    6.00    5.29   OK (>=4.5)
--accent         #956400     4.81    5.12    4.52   OK (>=4.5)
--link           #0969da     4.88    5.19    4.58   OK (>=4.5)
--ok             #0f7b43     5.01    5.34    4.71   OK (>=4.5)
--warn           #956400     4.81    5.12    4.52   OK (>=4.5)
--danger         #c0342b     5.24    5.57    4.92   OK (>=4.5)
--color-line-ui  #858a8e     3.27    3.49    3.08   OK (>=3)
--color-line     #d0d7de     1.36    1.45    1.28   decorativo
texto sobre --accent: 5.12
```

**Dos tokens del plan no llegaban al umbral y se corrigieron** (addendum A3). `--color-line` se declara decorativo y se le añade un compañero `--color-line-ui` para bordes de controles interactivos, que sí deben cumplir 3:1.

### E2-c — axe-core: cero violaciones

Reglas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` sobre `/diseno/`, que muestra todos los componentes en todos sus estados:

```
=== TEMA OSCURO ===
axe-core: 0 violacion(es)

=== TEMA CLARO ===
axe-core: 0 violacion(es)
```

### E2-d — Recorrido con teclado

```
teclado: 21 paradas · salto primero: si · sin foco visible: 0 · Escape cierra menu y devuelve foco: si
```

Idéntico en ambos temas. Es decir: el enlace «Saltar al contenido» es la primera parada, las 21 paradas tienen indicador de foco visible medido (`outline-style` distinto de `none` y `outline-width > 0`), y el menú móvil no es una trampa de teclado — `Escape` lo cierra y devuelve el foco al botón que lo abrió.

### E2-e — `prefers-reduced-motion`

```
prefers-reduced-motion: respetado
```

Comprobado emulando `reduce` y recargando: ningún elemento conserva `transition-duration > 0` ni animación activa. El único elemento animado del sistema (el girador del botón `cargando`) queda estático y su estado se comunica por `aria-busy`, no por movimiento.

### E2-f — Presupuestos

```
=== WOFF2 en dist ===
  ibm-plex-mono-400.woff2   9796 B
  ibm-plex-mono-500.woff2  10016 B
  ibm-plex-sans-400.woff2  15764 B
  ibm-plex-sans-600.woff2  16764 B
  TOTAL: 52340 B = 51.1 KiB  (presupuesto 60 KiB)

=== JS por pagina (I4: <= 5 KB) ===
  dist/index.html         0 script(s)  0 B     (0.00 KiB)
  dist/diseno/index.html  4 script(s)  1459 B  (1.42 KiB)
  archivos .js externos: 0

=== script bloqueante de tema (plan: < 300 B) ===
  241 B
```

Astro deja los cuatro scripts en línea por su tamaño; no se descarga ningún `.js`. Los cuatro son: el fijador de tema, el conmutador, el menú móvil y el botón de copiar. **1.42 KiB frente a los 5 KB del presupuesto**, y el bloqueante de `<head>` en 241 B frente a los 300 B que fijaba el plan.

### E2-g — Capturas

Cuatro capturas a 2× de densidad, página completa, en `evidencia/etapa-2/` (fuera del control de versiones por peso; se adjuntan al presentar la etapa):

| Archivo | Tema | Ancho |
|---|---|---|
| `diseno-oscuro-1280.png` | oscuro | 1280 px |
| `diseno-oscuro-360.png` | oscuro | 360 px |
| `diseno-claro-1280.png` | claro | 1280 px |
| `diseno-claro-360.png` | claro | 360 px |

Revisándolas se detectó y corrigió un defecto que ninguna métrica habría delatado: `BloqueCodigo` fijaba el tema `github-dark` de Shiki, así que en tema claro el bloque seguía siendo oscuro. Ahora emite los dos temas como variables (`defaultColor: false`) y el CSS elige según el tema activo, que es lo que el plan pedía con «tema propio derivado de los tokens».

### E2-h — Batería de cierre

```
> npx astro check
Result (21 files):
- 0 errors
- 0 warnings
- 0 hints

> npm test
No test files found, exiting with code 0

> npm run lint
(sin salida; exit 0)

> npm run format:check
All matched files use Prettier code style!

> node scripts/verificar-invariantes.mjs
verificar-invariantes: 0 verificaciones activas, 0 fallos (esqueleto Etapa 1)

> npm run build
2 page(s) built
```

Conteo de pruebas: **0 antes, 0 después**. La Etapa 2 no introduce pruebas unitarias; las primeras llegan en la Etapa 3. La verificación de esta etapa es de navegador, no de Vitest, y vive en `scripts/auditar-diseno.mjs`.

### E2-i — Verificación de tokens con prueba negativa

El plan anota como riesgo de esta etapa «definir colores en componentes en lugar de tokens» y propone una regla de lint. Se implementó dentro de `verificar-invariantes.mjs` en lugar de traer `stylelint`: no añade dependencias y deja la comprobación en el mismo sitio que las de I1, I3 e I7.

```
> node scripts/verificar-invariantes.mjs
[OK] TOKENS — el color se define solo en src/styles/tokens.css
verificar-invariantes: 1 verificacion(es) activas, 0 fallo(s)
exit: 0
```

Prueba negativa: se sustituyó `color: var(--link)` por `color: #5cc8ff` en `Insignia.astro`.

```
[FALLA] TOKENS — el color se define solo en src/styles/tokens.css
  - src\components\Insignia.astro:42 — color: #5cc8ff;
verificar-invariantes: 1 verificacion(es) activas, 1 fallo(s)
exit: 1
```

Restaurado el archivo, vuelve a pasar con exit 0. La comprobación cubre hex y las funciones `rgb()`, `hsl()`, `oklch()` y `color-mix()` en `src/components`, `src/pages` y `src/layouts`; `tokens.css` queda fuera porque es donde el color debe definirse.

## Evidencia Etapa 3 (2026-09-10)

### E3-a — Configuración y layout

`src/config/` queda con cinco archivos, y es el único lugar donde algo depende del estado de lanzamiento:

| Archivo | Contenido |
|---|---|
| `lanzamiento.ts` | `ESTADOS`, `ESTADO_LANZAMIENTO` (la línea que se cambia), `TEXTO` por estado y `TEXTO_VIGENTE` ya resuelto |
| `navegacion.ts` | Enlaces de barra y pie; la regla de «Precios» de §4.4 como función pura |
| `producto.json` | Nombre, versión (`null`), licencia de D4, `precios: null`. **Sin campo de estado** (riesgo anotado de la etapa) |
| `sitio.ts` | Nombre, dominio canónico —`astro.config.mjs` lo importa de aquí—, correo de contacto (`null`, pendiente de Sebastián) y redes |
| `capacidades.json` | Las once capacidades de §4.3 con su estado inicial; redacción marcada como provisional |

`src/layouts/LayoutBase.astro` es el único punto donde el estado entra en la interfaz: lee `TEXTO_VIGENTE` y los enlaces ya resueltos y se los pasa a `BarraNav` y `Pie`, que siguen siendo presentacionales. `/diseno/` pasa a usar el layout y añade una sección «Estado de lanzamiento vigente» que muestra los cuatro valores sin contener un solo literal de estado.

### E3-b — El criterio central: tres estados, un archivo cada vez

Para que las tres transiciones fueran comparables se hizo un commit por transición en una rama local temporal (`proximamente → beta → disponible → proximamente`), borrada al terminar. En cada estado se construyó el sitio y se corrieron **sin modificar** las pruebas y el verificador de invariantes.

```
################ ESTADO: beta ################
--- git diff --stat HEAD~1..HEAD ---
 src/config/lanzamiento.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
--- linea cambiada ---
-export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.proximamente
+export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.beta
--- build: ok ---
--- pruebas (sin modificar) ---
 Test Files  2 passed (2)
      Tests  31 passed (31)
--- invariantes ---
verificar-invariantes: 2 verificacion(es) activas, 0 fallo(s)

################ ESTADO: disponible ################
--- git diff --stat HEAD~1..HEAD ---
 src/config/lanzamiento.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
--- linea cambiada ---
-export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.beta
+export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.disponible
--- build: ok ---
--- pruebas (sin modificar) ---
 Test Files  2 passed (2)
      Tests  31 passed (31)
--- invariantes ---
verificar-invariantes: 2 verificacion(es) activas, 0 fallo(s)

################ ESTADO: proximamente ################
--- git diff --stat HEAD~1..HEAD ---
 src/config/lanzamiento.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
--- linea cambiada ---
-export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.disponible
+export const ESTADO_LANZAMIENTO: EstadoLanzamiento = ESTADOS.proximamente
--- build: ok ---
--- pruebas (sin modificar) ---
 Test Files  2 passed (2)
      Tests  31 passed (31)
--- invariantes ---
verificar-invariantes: 2 verificacion(es) activas, 0 fallo(s)
```

Lo que renderizó cada build, extraído con selectores DOM desde Chrome (no con expresiones regulares sobre el HTML, que en un primer intento fallaron por los atributos `data-astro-cid-*` que Astro añade):

| | `proximamente` | `beta` | `disponible` |
|---|---|---|---|
| Botón de acción | Únete a la lista | Descargar beta | Descargar |
| Aviso global | — | Versión beta: puede contener errores. Verifica cada resultado. | — |
| Línea del pie | Estado: en desarrollo | Estado: versión beta | (oculta) |
| Insignia | Próximamente | Beta | Disponible |
| Enlace «Precios» | no | no | **no** |
| Destino del botón | `/descarga/` | `/descarga/` | `/descarga/` |

La última fila de «Precios» es la regla de §4.4 funcionando: en `disponible` tampoco aparece, porque `producto.precios` sigue en `null`. Hacen falta las dos condiciones.

### E3-c — Capturas de cada estado

`estado-proximamente.png`, `estado-beta.png`, `estado-disponible.png` (1280 px, tema oscuro, ~40 KB cada una), entregadas a Sebastián durante la sesión. Para que fueran compactas, el script de captura retira las secciones del catálogo de `/diseno/`; barra, aviso, insignia y pie son los reales de cada build. Una primera tanda arrastraba unos 3 800 px de fondo vacío porque la captura de página completa conservaba la altura previa a retirar las secciones; se recortaron al borde inferior del pie.

### E3-d — Prueba negativa de I7

Sobre el árbol real, con un componente de prueba que contiene un literal prohibido:

```
=== con el componente de prueba ===
[FALLA] I7 — el estado de lanzamiento vive solo en src/config/
  - src/components/PruebaI7.astro:3 — contiene «unete a la lista»
[OK] TOKENS — el color se define solo en src/styles/tokens.css
verificar-invariantes: 2 verificacion(es) activas, 1 fallo(s)
exit: 1

=== tras quitarlo ===
[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
verificar-invariantes: 2 verificacion(es) activas, 0 fallo(s)
exit: 0
```

Además la prueba negativa queda **permanente**: `tests/invariantes.test.ts` ejerce el verificador contra árboles temporales en cada CI —literal en un componente, literal retirado, literal dentro de `src/config/`, variantes sin acento y en mayúsculas, comparación `ESTADOS.proximamente` fuera de config y literal en un `.mdx`—. Si alguien debilita el verificador, falla la misma PR.

### E3-e — Menú móvil con teclado y lector de pantalla

Teclado: sin cambios respecto de la Etapa 2, verificado de nuevo sobre el layout nuevo (E3-f). Lo que recibe un lector de pantalla, leído del **árbol de accesibilidad de Chrome** a 360 px, abriendo con `Enter` y cerrando con `Escape`:

```json
{
  "cerrado":    { "rol": "button", "nombre": "Abrir menú",  "expandido": false, "menuVisible": false },
  "abierto":    { "rol": "button", "nombre": "Cerrar menú", "expandido": true,  "menuVisible": true  },
  "enlacesAlcanzables": ["Producto", "Quiénes somos", "Blog", "Únete a la lista"],
  "trasEscape": { "rol": "button", "nombre": "Abrir menú",  "expandido": false, "menuVisible": false, "focoEnBoton": true }
}
```

**Límite de esta evidencia — cerrado por Sebastián el 2026-09-11.** El árbol de accesibilidad de Chrome no equivale a una prueba con lector de pantalla real, así que se dejó sugerida una comprobación con Narrador de Windows. Sebastián la hizo: al enfocar el botón, Narrador anuncia «Abrir menú, botón, contraído». El criterio queda verificado con un lector real, no solo con el árbol que Chrome expone.

### E3-f — Control de regresión sobre la Etapa 2

La migración de `/diseno/` al layout podía romper lo verificado en la Etapa 2. Se reejecutó su auditoría completa:

```
=== TEMA OSCURO ===
axe-core: 0 violacion(es)
teclado: 21 paradas · salto primero: si · sin foco visible: 0 · Escape cierra menu y devuelve foco: si
prefers-reduced-motion: respetado
=== TEMA CLARO ===
axe-core: 0 violacion(es)
teclado: 21 paradas · salto primero: si · sin foco visible: 0 · Escape cierra menu y devuelve foco: si
prefers-reduced-motion: respetado
RESULTADO: sin incumplimientos.
```

Idéntico a E2-c/E2-d/E2-e. El JS de `/diseno/` sigue en 4 scripts y 1 459 B.

### E3-g — Prueba de P3 en este PR: la corrección no bastó

El PR #4 lleva `f0b2b47` (`workers_dev: false` y `preview_urls: true` explícitos). Resultado, observado con un sondeo de 373 s sobre la API de GitHub y luego contra las URL directamente:

```
=== comentario de Cloudflare en PR #4 ===
(ninguno)
=== checks ===
Workers Builds: calcinst-web	pass
verificar	pass
```

El build sí desplegó una versión — la salida del check dice `Version ID: 9c725d17-6488-4392-a992-68785719878a` — y en el PR #1 la URL de preview por versión tenía justamente la forma `<prefijo del ID>-calcinst-web.instcalc.workers.dev`. Probada:

```
> curl -sSI https://9c725d17-calcinst-web.instcalc.workers.dev/diseno/
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=UTF-8

> curl https://etapa-3-layout-estado-calcinst-web.instcalc.workers.dev/diseno/
HTTP 404
```

**Conclusión: con `workers_dev: false`, declarar `preview_urls: true` no genera URL de preview.** Las previews se sirven en el subdominio `workers.dev` y no existen sin él, en línea con la documentación: «Preview URLs are disabled by default when `workers_dev` is disabled». El comentario de `wrangler.jsonc`, que afirmaba lo contrario, se corrigió en este mismo PR. **P3 sigue abierto**; el siguiente paso implica una decisión de Sebastián (ver P3).

### E3-h — Batería de cierre

```
> npx astro check
Result (27 files):
- 0 errors
- 0 warnings
- 0 hints

> npm test
 Test Files  2 passed (2)
      Tests  31 passed (31)

> npm run lint
(sin salida; exit 0)

> npm run format:check
All matched files use Prettier code style!

> node scripts/verificar-invariantes.mjs
[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
verificar-invariantes: 2 verificacion(es) activas, 0 fallo(s)

> npm run build
2 page(s) built
```

**Conteo de pruebas: 0 antes, 31 después**, en dos archivos. Se retiró `passWithNoTests` de `vitest.config.ts`: su justificación (E1-c) era que aún no había pruebas, y con pruebas reales solo serviría para que un CI al que se le borraran todas siguiera en verde.

Al desinstalar Tailwind (AD2), npm informó `removed 13 packages, and audited 708 packages`.

## Evidencia Etapa 4 (2026-09-11 a 2026-10-04; cerrada, E4-al)

La Etapa 4 arranca con el bloque P2, por instrucción de Sebastián: el juego de caracteres se cierra antes de tocar la colección del blog. Decisiones en `DECISIONES_SITIO.md`, AD4.

### E4-a — Bloque P2: el conjunto como dato y la fuente de entrada completa

`src/config/caracteres.json` declara el conjunto por grupos (ASCII como rango, español, tipografía, notación, moneda), los prohibidos con su sustituto, y los roles de fuente. **134 caracteres.** En el archivo, las tres griegas permitidas y los nueve prohibidos se escriben como escapes `\uXXXX`, y los prohibidos se identifican solo por su código `U+XXXX`: el propio archivo no contiene ningún carácter ambiguo.

Durante el trabajo apareció el riesgo en carne propia: una primera versión se redactó con los caracteres tecleados. Se comprobó uno por uno —esa vez coincidían todos con el punto de código buscado— y se rehízo por construcción, a partir de sus códigos, para no depender de lo que produzca el teclado.

Dos hallazgos que corrigen la premisa de P2, medidos antes de pedir aprobación (en memoria, sin instalar nada):

- Los paquetes npm oficiales de IBM **no publican TTF ni OTF**, solo WOFF/WOFF2 completos. Mismo juego de glifos, comprimido.
- **IBM Plex Mono no tiene griego ni en su versión completa**; Sans sí. La fuente completa cierra el hueco para Sans y no para Mono.

```
ibm-plex-sans-400    origen  63020 B ->  15568 B | sin glifo: ninguno
ibm-plex-sans-600    origen  67060 B ->  16616 B | sin glifo: ninguno
ibm-plex-mono-400    origen  49248 B ->  12388 B | sin glifo: Ω μ Δ
ibm-plex-mono-500    origen  50400 B ->  12672 B | sin glifo: Ω μ Δ
```

Hechos Unicode que sostienen la normalización, comprobados en ejecución:

```
 ohm    U+2126 --NFC--> U+03A9 (canónica: NFC ya la sustituye)
 micro  U+00B5 --NFC--> U+00B5 | U+00B5 --NFKC--> U+03BC (solo compatibilidad)
 delta  U+2206 --NFC--> U+2206 | U+2206 --NFKC--> U+2206 (sin descomposición)
```

### E4-b — Generador y presupuesto

`npm run fuentes` subconjunta desde `@ibm/plex-sans` 1.1.0 y `@ibm/plex-mono` 2.5.0 y **falla si algo no sobrevive**:

```
Origen: @ibm/plex-sans 1.1.0, @ibm/plex-mono 2.5.0
Conjunto declarado: 134 caracteres (src/config/caracteres.json)
ibm-plex-sans-400     61.5 KiB ->  15568 B
ibm-plex-sans-600     65.5 KiB ->  16616 B
ibm-plex-mono-400     48.1 KiB ->  12388 B
ibm-plex-mono-500     49.2 KiB ->  12672 B
----------------------------------------------------
TOTAL                              57244 B = 55.9 KiB
Presupuesto: 60000 B — DENTRO
ibm-plex-mono-400 toma de su respaldo (IBM Plex Sans): Ω U+03A9, μ U+03BC, Δ U+0394
ibm-plex-mono-500 toma de su respaldo (IBM Plex Sans): Ω U+03A9, μ U+03BC, Δ U+0394
Todos los caracteres declarados sobreviven en su rol.
```

Tamaño de cada archivo en `dist/` tras construir:

```
  ibm-plex-mono-400.woff2  12388 B
  ibm-plex-mono-500.woff2  12672 B
  ibm-plex-sans-400.woff2  15568 B
  ibm-plex-sans-600.woff2  16616 B
  TOTAL: 57244 B = 55.9 KiB  | < 60000 B: SI
```

**El presupuesto de §3 se cumple en su lectura estricta** (60 000 B). Frente a la Etapa 2 son 4 904 B más (52 340 → 57 244): el precio del griego y los operadores, que antes faltaban. `dist/fuentes/` incluye además `LICENSE-IBM-Plex-OFL.txt`, que la OFL exige al redistribuir.

**Reproducible:** dos regeneraciones consecutivas producen los mismos bytes (hashes SHA-256 idénticos: `9ab9a649…`, `512444bb…`, `1ac4e8a9…`, `0821019a…`).

### E4-c — Tres comprobaciones nuevas en CI, con pruebas negativas

`verificar-invariantes.mjs` pasa de 2 a 5 comprobaciones activas:

```
[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 5 verificacion(es) activas, 0 fallo(s)
```

**NOTACION encontró una violación real en código existente** en su primera ejecución: una flecha U+2192 en un comentario de `Insignia.astro` («estado→insignia»). Se corrigió. Es justo el tipo de carácter que se cuela sin que nadie lo vea.

Pruebas negativas sobre el árbol real. Códigos de salida medidos directamente, sin tuberías que los oculten; los caracteres de prueba se insertaron por punto de código:

```
################ A) GLIFOS: se declara U+263A, que ninguna cara de IBM Plex tiene
[FALLA] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
  - ibm-plex-sans-400 (texto): U+263A no tiene glifo ni en su respaldo
  - ibm-plex-sans-600 (texto): U+263A no tiene glifo ni en su respaldo
  - ibm-plex-mono-400 (mono): U+263A no tiene glifo ni en su respaldo
  - ibm-plex-mono-500 (mono): U+263A no tiene glifo ni en su respaldo
verificar-invariantes: 5 verificacion(es) activas, 4 fallo(s)
exit verificador: 1
CARACTERES DECLARADOS QUE NO SOBREVIVEN AL SUBCONJUNTADO:
  - ibm-plex-sans-400 (texto): U+263A no tiene glifo ni en su respaldo
  - ibm-plex-sans-600 (texto): U+263A no tiene glifo ni en su respaldo
exit generador: 1

################ B) NOTACION: signo de ohm (U+2126) en un componente
[FALLA] NOTACION — ningún punto de código prohibido por caracteres.json
  - src/components/PruebaNotacion.astro:1:9 — U+2126 (signo de ohm); usar Ω (U+03A9)
exit verificador: 1

################ C) CARACTERES: .mdx con U+263A
[FALLA] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
  - src/content/blog/prueba.mdx:1:11 — U+263A fuera del conjunto declarado
exit verificador: 1

################ restaurado
verificar-invariantes: 5 verificacion(es) activas, 0 fallo(s)
exit verificador: 0
fuentes identicas a las previas a la prueba
```

Las tres negativas quedan además **permanentes** en `tests/invariantes.test.ts` (10 pruebas nuevas), incluida la de GLIFOS: declarar `U+2717`, que no existe en ninguna cara de IBM Plex, debe hacer fallar la verificación nombrándolo. Pruebas: **31 → 41**.

Un fallo de plataforma encontrado y corregido por el camino: con harfbuzz (WASM) cargado, `process.exit()` disparaba en Windows una aserción de libuv (`Assertion failed … async.c`) y el proceso salía con 127 en lugar de 1. El verificador fija ahora `process.exitCode` y deja terminar al proceso.

### E4-d — El respaldo funciona en el navegador, no solo en la comprobación

GLIFOS demuestra que los glifos existen en algún archivo; no que el navegador los tome de ahí. Chrome informa por el protocolo de DevTools (`CSS.getPlatformFontsForNode`) qué fuente dibuja cada glifo de un nodo:

```
muestra mono con griego: «R = 4.7 kΩ · C = 22 μF · ΔV = 3.2 % · 8 mm² · 75 °C»
   IBM Plex Mono     48 glifos  (fuente web del sitio)
   IBM Plex Sans      3 glifos  (fuente web del sitio)
muestra mono sin griego: «Mono 400 · 8 AWG · 50 A · 310-15(b)(16)»
   IBM Plex Mono     39 glifos  (fuente web del sitio)
```

Exactamente tres glifos —Ω, μ, Δ— salen de IBM Plex Sans y **ninguno de una fuente del sistema**.

### E4-e — Sistema de diseño y regresión

- `/diseno/` gana la sección «Notación técnica», generada desde `caracteres.json`: los permitidos con su código, los prohibidos **solo por código** —escribir sus glifos haría fallar NOTACION—, la muestra de griego en mono y los seis iconos de `<Icono />`.
- `src/components/Icono.astro`: SVG en línea con `currentColor` y 1em; decorativo por omisión, con `etiqueta` se anuncia como imagen.
- `tokens.css` documenta la pila `--fuente-mono` con IBM Plex Sans de respaldo.

Auditoría de la Etapa 2 repetida con las fuentes nuevas:

```
=== TEMA OSCURO ===
axe-core: 0 violacion(es)
teclado: 22 paradas · salto primero: si · sin foco visible: 0 · Escape cierra menu y devuelve foco: si
prefers-reduced-motion: respetado
=== TEMA CLARO ===
axe-core: 0 violacion(es)
teclado: 22 paradas · salto primero: si · sin foco visible: 0 · Escape cierra menu y devuelve foco: si
prefers-reduced-motion: respetado
RESULTADO: sin incumplimientos.
```

Las paradas pasan de 21 a 22 por un motivo esperado: la tabla de prohibidos es una región desplazable y, como toda `Tabla`, enfocable.

Batería: `astro check` 0 errores en 30 archivos · 41 pruebas · lint limpio · formato limpio · 5 invariantes en verde · build de 2 páginas. Una nota de método: un primer `astro check` con un filtro `grep` en plural («errors») ocultó un «1 error» en singular, de tipos, en `Icono.astro`; se corrigió el error y el filtro. En las etapas anteriores la línea «0 errors» aparecía explícita y CI falla ante cualquier error de tipos, así que no queda nada pendiente hacia atrás.

### E4-f — Infraestructura del blog

Dependencias aprobadas por Sebastián con versión exacta: `@astrojs/rss` 4.0.19 (dependencia) y, para la prueba de portabilidad, `unified` 11.0.5, `remark-parse` 11.0.0, `remark-mdx` 3.1.1, `remark-frontmatter` 5.0.0, `mdast-util-to-string` 4.0.0 y —aprobado durante la etapa, ver E4-i— `remark-gfm` 4.0.1. Zod no necesita dependencia propia: Astro 7 reexporta Zod 4.5.4 en `astro/zod`.

| Archivo | Papel |
|---|---|
| `src/content.config.ts` | Colección `blog` con el cargador `glob` (`src/content/blog/**/*.mdx`) |
| `src/lib/blog.ts` | Esquema D8 en un módulo puro, reglas de publicación, slugs, borradores |
| `src/lib/coleccion.ts` | Comprobaciones que necesitan el cuerpo: slugs y cruce de citas (I3 b) |
| `scripts/lib/mdx.mjs` | Análisis del cuerpo con remark puro; lo usan el build y la prueba I2 |
| `src/lib/componentes-mdx.ts` + `componentes-portables.json` | Los cinco componentes permitidos, inyectados (sin `import`) y con su equivalente en Markdown |
| `src/pages/blog/[slug].astro` | Post; su `getStaticPaths` valida toda la colección antes de generar nada |
| `src/pages/blog/[...page].astro` | Índice paginado, 10 por página |
| `src/pages/blog/categoria/[categoria].astro` | Las cinco categorías, siempre, aunque estén vacías |
| `src/pages/blog/etiqueta/[etiqueta].astro` | Una página por etiqueta en uso |
| `src/pages/blog/rss.xml.ts` + `src/lib/feed.ts` | RSS 2.0 con contenido íntegro, vía la API de contenedor |
| `src/layouts/LayoutPost.astro` | Erratas al inicio (§9.1), referencias citadas desde el frontmatter, etiquetas, descargo |
| `scripts/verificar-portabilidad.mjs` | Invariante I2; corre en CI después del build |
| `src/content/blog/LEEME.md` | Guía para redactar un post: frontmatter, reglas que rompen el build, componentes |

**Borradores.** `borrador: true` excluye el post del build; solo entra con `MOSTRAR_BORRADORES=1`, que existe para validar en local y no se configura en Cloudflare. Un borrador visible lleva `noindex` propio y un aviso en la página. Comprobado en los dos sentidos con dos posts de prueba: el build de producción genera 8 páginas y ningún post; con la variable, 12 páginas con los dos posts y sus dos etiquetas.

**Posts de prueba.** Texto de relleno marcado como tal, sin ninguna afirmación técnica, `borrador: true` y todas sus citas con `verificadoDOF: false`. **Se borraron antes del commit final**, como pidió Sebastián; el estado final no contiene ningún `verificadoDOF: true`.

### E4-g — Esquema y reglas de publicación (I3 a)

`src/lib/blog.ts` implementa el frontmatter de D8 con Zod: título ≤ 70, descripción 120–160, las cinco categorías cerradas, etiquetas en minúsculas con guiones, `normativa[]` con al menos una entrada, `borrador` **obligatorio y explícito** —nadie publica por omisión—, `fechaActualizacion` exigida si hay erratas, y la `version` de cada referencia tomada por omisión de `src/config/norma.ts`. La regla de publicación va en un `superRefine`: con `borrador: false`, toda referencia debe tener `verificadoDOF: true`.

El cruce cuerpo↔frontmatter (I3 b) va más allá del enunciado del plan: además de exigir que cada `<CalloutNormativo ref>` esté declarado, rechaza un `tipo` distinto del declarado y **una versión pintada distinta de la declarada**, porque la cita del cuerpo se pinta con la versión por omisión y podría contradecir al frontmatter.

### E4-h — Las tres pruebas negativas del criterio, contra el build real

Cada post de prueba viola una sola regla. Se ejecutó `npm run build`, que es lo que corre Cloudflare:

```
################ CRITERIO 1: post sin normativa
[InvalidContentEntryDataError] blog → negativa-sin-normativa data does not match collection schema.
  normativa**: **normativa: Required
exit npm run build: 127

################ CRITERIO 2: verificadoDOF false con borrador false
[InvalidContentEntryDataError] blog → negativa-sin-cotejar data does not match collection schema.
  normativa.0.verificadoDOF: «430-22» no está cotejada con el DOF: un post publicado no puede citarla (I3)
exit npm run build: 1

################ CRITERIO 3: CalloutNormativo no declarado en el frontmatter
El blog tiene 1 problema(s) que impiden construir:
  - negativa-cita-no-declarada.mdx, línea 13: cita «250-122» en el cuerpo, pero no está declarada en normativa[]
exit npm run build: 127

################ restaurado
[build] 8 page(s) built
exit npm run build: 0
```

**Sobre el código 127.** En Windows, Astro dispara al cerrarse una aserción de libuv (`Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c`) después de ciertos errores, y el proceso sale con 127 en lugar de 1. Se comprobó ejecutando `npx astro build` directamente. **El build falla en todos los casos**; en Linux —CI y Cloudflare— el código sería 1. No se pudo verificar en Linux porque las negativas son manuales, pero las tres reglas corren en CI de todos modos, como pruebas: `tests/blog-schema.test.ts` (criterios 1 y 2) y `tests/contenido.test.ts` (criterio 3).

**Defecto encontrado en la primera pasada del criterio 3:** el mensaje decía «línea 1», porque `entry.body` no incluye el frontmatter y las líneas se contaban desde el cuerpo. Quien redactara buscaría en el lugar equivocado. Ahora se analiza el archivo completo a partir del `filePath` que guarda el cargador, y la línea es la del archivo —13 en la prueba—; hay una prueba que lo fija.

### E4-i — Portabilidad (I2): hallazgo sobre GFM

**Astro 7 ya no usa remark para MDX:** `@astrojs/mdx` 8 renderiza con `@astrojs/markdown-satteri`. Por eso la prueba I2 es de verdad independiente del motor del sitio. `verificar-portabilidad.mjs` rechaza componentes fuera de la lista, `import`/`export` y expresiones `{…}`, y comprueba que **cada bloque de texto del archivo, leído con remark, aparece en la página que construyó Astro**.

Primera ejecución, con un post que incluía una tabla en sintaxis GFM:

```
[OK] prueba-infraestructura-dos.mdx
[FALLA] prueba-infraestructura-uno.mdx
  - texto que no aparece en la página: «| Columna A | Columna B | | --------- | --------- | | celda uno | celda dos |»
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 1 fallo(s)
```

Todo el texto llegaba intacto —títulos, listas, énfasis, código, el interior de las citas, la notación— salvo la tabla: remark sin GFM sigue CommonMark y la lee como un párrafo con barras, mientras Astro la pinta como `<table>`. La prueba hacía su trabajo. **Decisión de Sebastián: las tablas GFM cuentan como portables** (se aprobó `remark-gfm` 4.0.1). Tras incorporarlo:

```
[OK] prueba-infraestructura-dos.mdx
[OK] prueba-infraestructura-uno.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
```

El análisis compara celda por celda. En CI corre después del build de producción; sin posts publicables informa `0 post(s)`.

### E4-j — RSS: validador del W3C

El feed se envió como texto al servicio oficial (`https://validator.w3.org/feed/check.cgi`, salida SOAP), construido con los dos posts de prueba para que tuviera items con contenido íntegro. Primera pasada:

```
validity>true
errorcount>0
warningcount>2
  style attribute contains potentially dangerous content
  Missing atom:link with rel="self"
```

Dos avisos, cero errores. Los dos se corrigieron: los atributos `style` que Shiki pone en el código se retiran del feed —los lectores los descartan igual—, y se añadió la autorreferencia `atom:link rel="self"`. Segunda pasada:

```
validity>true
errorcount>0
warningcount>1
  aviso: Self reference doesn't match document location
```

**El aviso que queda es un artefacto del método**, no un defecto del feed: al subir el XML como texto, el validador no conoce su URL. Se comprueba validando por URL tras desplegar (E4-o).

El feed declara `xmlns:content` y el idioma `es-mx`, todos los enlaces de su contenido son absolutos y no contiene scripts ni atributos internos de Astro. Los enlaces a `/normativa/…` darán 404 hasta la Etapa 9, que crea esas páginas.

### E4-k — Lighthouse del post

Lighthouse 12.6.1 por su API, con un Chrome lanzado por puppeteer (el `lhci` local falla en Windows al limpiar el perfil, E1-d), perfil móvil, emulación 412×823 y estrangulamiento simulado, sobre el post de prueba servido **sin compresión** —cota superior; Cloudflare comprime en producción—:

```
  performance      100
  accessibility    100
  best-practices   100
  seo              60
LCP:                         1.36 s   (presupuesto 2.0 s)
Peso total transferido:      83691 B   (presupuesto 300 KB = 307200 B)
JS transferido como archivo: 0 B
JS en línea en el HTML:      1137 B
JS total:                    1137 B   (presupuesto 5 KB = 5120 B)
Fuentes transferidas:        57924 B
```

**Los tres presupuestos del criterio se cumplen.** El SEO de 60 es esperado: el borrador lleva `noindex` («Page is blocked from indexing»).

**Defecto encontrado:** la primera pasada dio 96 en buenas prácticas por un error de consola: **`/favicon.ico` devolvía 404**. El sitio no tiene icono desde la Etapa 1, así que *todas* las páginas de producción provocaban ese error. Se evita la petición con `<link rel="icon" href="data:,">` en `LayoutBase`; el icono real es una decisión de marca y queda pendiente.

### E4-l — Accesibilidad y presentación del blog

axe-core con las reglas WCAG 2.1 A/AA y las buenas prácticas, sobre las cinco clases de página del blog, en los dos temas y a 360 y 1280 px:

```
/blog/                                 oscuro   360 px  0 violaciones
/blog/                                 claro   1280 px  0 violaciones
/blog/prueba-infraestructura-uno/      oscuro   360 px  0 violaciones
/blog/prueba-infraestructura-uno/      claro   1280 px  0 violaciones
/blog/prueba-infraestructura-dos/      oscuro   360 px  0 violaciones
/blog/prueba-infraestructura-dos/      claro   1280 px  0 violaciones
/blog/categoria/conductores/           oscuro   360 px  0 violaciones
/blog/categoria/conductores/           claro   1280 px  0 violaciones
/blog/etiqueta/prueba/                 oscuro   360 px  0 violaciones
/blog/etiqueta/prueba/                 claro   1280 px  0 violaciones
TOTAL: 0 violacion(es)
```

Se pasó axe completo porque la regla de regiones desplazables enfocables no forma parte del informe de Lighthouse 12, así que su 100 de accesibilidad no la cubría.

**Tres defectos que solo aparecieron mirando, corregidos:**

1. **Enlaces de paginación sin barra final** (`/blog/2`, `/blog`), cuando todas las URL del sitio terminan en `/`: cada clic costaba una redirección 307 y quedaban URL incoherentes para las canónicas de la Etapa 9. Causa: el `trailingSlash` por omisión de Astro, `'ignore'`. Ahora es `'always'`, y todos los enlaces internos del sitio terminan en barra o son archivos (comprobado sobre `dist/`). La paginación se probó con 13 borradores temporales: 10 en la primera página, 3 en la segunda, enlaces `/blog/2/` y `/blog/`.
2. **El bloque de código del Markdown se veía aplastado** y con el tema oscuro fijo, el mismo defecto que la Etapa 2 corrigió en `BloqueCodigo`. Ahora Shiki emite los dos temas también para el Markdown (`markdown.shikiConfig` en `astro.config.mjs`) y el cuerpo del post tiene estilos de prosa.
3. **La tabla GFM salía sin ningún estilo** («Columna A Columna B / celda uno celda dos»). Ahora tiene celdas, cabecera y desplazamiento propio en móvil.

Capturas (`post-1280.png`, `post-360.png`, `indice-1280.png`) entregadas a Sebastián durante la sesión. Control de regresión de `/diseno/` tras tocar el layout: sin cambios (axe 0 en ambos temas, 22 paradas de teclado con foco visible, `prefers-reduced-motion` respetado).

### E4-m — Caché del contenido: el build falla al borrar el último post

Al borrar los posts de prueba, el build de producción falló sin generar páginas:

```
[vite]: Rolldown failed to resolve import "astro:content-layer-deferred-module?…&fileName=src%2Fcontent%2Fblog%2Fprueba-infraestructura-dos.mdx…" from ".astro\content-modules.mjs".
```

El almacén del content layer (`node_modules/.astro/data-store.json`) conservaba el post borrado. Borrar `.astro/` no bastaba. Se caracterizó en vez de suponerlo:

```
  0) sin posts, cache limpio -> OK
  1) se crean a y b -> OK
  2) se borra b (queda a) -> OK
  3) se borra a (la coleccion queda vacia) -> FALLA (referencia rancia)
  4) tras borrar node_modules/.astro y .astro -> OK
```

**Solo falla al borrar el último post**: el cargador `glob` de Astro 7 limpia las entradas borradas mientras queda alguna, pero no cuando la colección se queda vacía. CI construye desde cero y no lo sufriría. Cloudflare sí, si conserva `node_modules` entre builds, y a Sebastián le pasaría en local. **Corrección:** `npm run build` pasa a ser `astro build --force`, que limpia ese caché en cada build; con un blog pequeño cuesta un segundo. Repetido con `--force`:

```
  1) se crean a y b -> OK
  2) se borra b (queda a) -> OK
  3) se borra a (la coleccion queda vacia), con --force -> OK
```

`LEEME.md` explica el equivalente para el servidor de desarrollo: `npx astro dev --force`.

### E4-n — Batería de cierre en el estado final (sin posts)

```
> npx astro check
Result (46 files):
- 0 errors
- 0 warnings
- 0 hints

> npm test
 Test Files  4 passed (4)
      Tests  91 passed (91)

> npm run lint
exit: 0

> npm run format:check
All matched files use Prettier code style!

> node scripts/verificar-invariantes.mjs
[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 6 verificacion(es) activas, 0 fallo(s)

> npm run build
[build] 8 page(s) built

> npm run portabilidad
verificar-portabilidad: 0 post(s), 0 comparado(s) con su página, 0 fallo(s)
```

**I3 c** entra en esta etapa como sexta comprobación: `Ing.`, `ingeniero titulado`, `cédula`, `licencia profesional` y `colegiado` no pueden aparecer en `src/` ni en `content/` salvo en contextos negativos **declarados como frases exactas**. Hoy hay dos: la del `Descargo` («no un profesionista con cédula») y el ejemplo del propio plan. Una negación no declarada no basta; hay una prueba que lo fija.

**Pruebas: 41 → 91** en cuatro archivos (`blog-schema`, `contenido`, `invariantes`, `lanzamiento`). `git diff --stat` desde el inicio de la etapa tras el bloque P2 (`d5f0d64`): 26 archivos, +3114 / −60.

**Dos defectos del propio proceso, anotados para no repetirlos.** Dos veces, pasar código con barras invertidas por la shell de Git Bash las destruyó en silencio: `'\n'` se convirtió en un salto de línea real y `/\bIng\./` en `/⌫Ing./` —una expresión rota, con un carácter de retroceso, que ni siquiera daba error de sintaxis—. Se repararon construyendo la barra por su código (92) y se buscaron caracteres de control en todo el repositorio: ninguno. Desde entonces, el código con barras invertidas se escribe con la herramienta de archivos, no por la shell.

### E4-o — Producción tras fusionar el PR #7 (2026-09-11)

Checks del PR #7 en verde en Linux, con todos los pasos de CI —entre ellos GLIFOS con harfbuzz y la portabilidad—; preview por rama y por versión respondiendo 200. En producción:

```
https://calcinst.mx/blog/                200
https://calcinst.mx/blog/categoria/conductores/ 200
https://calcinst.mx/blog/rss.xml         200
https://calcinst.mx/blog/prueba-infraestructura-uno/ 404
```

El 404 es el esperado: los posts de prueba nunca se publicaron.

Validador del W3C, **por URL** (`https://validator.w3.org/feed/check.cgi?url=https://calcinst.mx/blog/rss.xml`):

```
  validity>true
  errorcount>0
  warningcount>0
```

**Cero avisos**: validado por URL, la autorreferencia coincide con la ubicación, lo que confirma que el aviso que quedaba en E4-j era un artefacto de subir el XML como texto. Precisión: el feed de producción no tiene items porque no hay posts publicados, así que esta pasada valida el canal; el contenido de los items se validó en E4-j, con 0 errores.

### E4-p — H1 cerrada: rige la NOM-001-SEDE-2012 (AD6, 2026-09-12)

Verificación de Sebastián con tres comprobaciones. La fila de `HIPOTESIS_SITIO.md` queda así:

```
| H1 | La versión de la NOM-001-SEDE que rige y que el sitio citará es la 2018 | S |
  Cerrada 2026-09-12 | REFUTADA. Rige la NOM-001-SEDE-2012, con la Nota
  Aclaratoria del 07/02/2014. |
```

Las cuatro fuentes están íntegras en `HIPOTESIS_SITIO.md` § Evidencia de H1: la ficha del Catálogo Mexicano de Normas (estado «Vigente», DOF 29/11/2012, en vigor 29/5/2013, sin cancelaciones posteriores a 2005); el Informe de la Revisión Sistemática de la SENER (oficio 300.E487/2023), que declara que no se obtuvo el Dictamen Total Final, que la 2018 nunca se publicó como norma definitiva y que su proceso se dio de baja del SPNIC en 2022; el DOF del 06/08/2018, que la publica como **proyecto para consulta pública**; y la Nota Aclaratoria del 07/02/2014.

**Efecto en el código: ninguno.** La cadena ya era `NOM-001-SEDE-2012` desde el bloque anterior. Lo que cambia es que deja de ser provisional y que **se levanta el bloqueo sobre T01**. La cuarta fuente sí tuvo efecto: obligó a AD8.

### E4-q — Capítulo 9 contra Capítulo 10 (AD7)

En la NOM-001-SEDE-2012 el Capítulo 9 es «Instalaciones destinadas al Servicio Público» (artículos 920 a 924); las tablas son el Capítulo 10. Verificado por Sebastián en el índice del texto publicado en el DOF.

**Búsqueda antes**, en todo el repositorio salvo `node_modules`, `.git` y `dist`:

```
> grep -rn "cap9" .
./src/components/CalloutNormativo.astro:12:  /** Referencia tal como se cita: "430-22", "310-15(b)(16)", "cap9-tabla-4". */

> grep -rn "cap10" .
(sin coincidencias)

> grep -rni "capítulo 9|cap. 9|capitulo 9" .
(sin coincidencias)
```

Una sola aparición, en el ejemplo del comentario del componente. No había posts, fixtures ni tests con esa forma, porque el ejemplo nunca llegó a usarse.

**Búsqueda después:**

```
> grep -rn "cap9" .
./DECISIONES_SITIO.md:17   (fila D8: el ejemplo corregido, que nombra la forma vieja para explicarla)
./DECISIONES_SITIO.md:96   (AD7: «el ejemplo de ref de D8 pasa de cap9-tabla-4 a cap10-tabla-4»)
./tests/blog-schema.test.ts:101,109      (fixture, armado por partes)
./tests/invariantes.test.ts:223,229,234,246,247,248,249,258  (fixtures, armados por partes)
```

Las que quedan son deliberadas y de dos clases: prosa que **nombra** la forma equivocada para explicarla, y fixtures de prueba. Los fixtures se arman por partes, uniendo `'cap'` con `'9-tabla-'` y el sufijo, por la misma razón por la que los puntos de código ambiguos se construyen por número: si la ref mala estuviera escrita entera en posición de `ref`, el archivo de pruebas violaría el invariante que verifica. Esa distinción no es cosmética: el invariante busca solo en **posición de ref** (atributo JSX, clave JSON, campo YAML, propiedad de objeto), nunca cualquier mención del texto.

**Prueba negativa, en los dos sitios donde se aplica.** Con un post de prueba cuya `ref` se cambió a `cap9-tabla-5`:

```
> npm run verificar
[FALLA] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
  - src/content/blog/prueba-ad7-ad8.mdx:8 — «cap9-tabla-5»: el Capítulo 9 de la
    NOM-001-SEDE-2012 no contiene tablas; las tablas están en el Capítulo 10 (AD7)
  - src/content/blog/prueba-ad7-ad8.mdx:22 — «cap9-tabla-5»: (mismo mensaje)
codigo de salida: 1

> MOSTRAR_BORRADORES=1 npm run build
[InvalidContentEntryDataError] blog -> prueba-ad7-ad8 data does not match collection schema.
  normativa.0.ref: el Capítulo 9 de la NOM-001-SEDE-2012 no contiene tablas:
  las tablas están en el Capítulo 10 (AD7)
codigo de salida del build: 127
```

Lo detecta en las dos apariciones, la del frontmatter y la del cuerpo. El 127 es el artefacto de libuv en Windows ya documentado en E4-h; el build falla igual, y en Linux sale 1.

Corregida la `ref` al Capítulo 10, las dos comprobaciones pasan y el build sale 0.

**Un defecto real, encontrado por la propia prueba.** El primer regex que escribí exigía la «t» de «capítulo» y por tanto **no atrapaba `cap9-tabla-4`**, que es justo la forma del plan: pasaba los casos con «capitulo» escrito entero y fallaba el central. Lo destapó la prueba parametrizada, no una lectura. Corregido en los dos archivos, haciendo opcional el grupo entero «ítulo».

### E4-r — La versión no identifica un texto único (AD8)

`src/config/norma.ts` documenta ahora qué designa la cadena: el texto publicado el 29/11/2012 **corregido por la Nota Aclaratoria del 07/02/2014** (código 5331914), con el enlace al DOF.

`src/config/nota-aclaratoria.json` es el dato; `src/lib/nota-aclaratoria.ts` lo valida con Zod **al importar**, de modo que un dato mal formado rompe el build en vez de degradarse en silencio (I1). Semilla, con la distinción pedida:

| `ref` | `afectaValor` | Qué corrige |
| --- | --- | --- |
| `cap10-tabla-5` | sí | 10 AWG en TW/THHW/THW/THW-2: 55.68 pasa a 15.68 mm² |
| `310-15(b)(2)(a)` | ~~sí~~ **no**, corregido el 2026-10-04 | ~~Factores de corrección, filas 66-85 °C~~ → la nota corrige la **etiqueta** de un renglón (`91-75` debe decir `71-75`); los factores no cambian. Ver E4-ak |
| `230-95` | no | Cambia el sentido de la disposición |
| `250-53(a)(2)` | no | Cambia el sentido de la disposición |
| `522-25(c)(2)` | no | Cambia el sentido de la disposición |

**El aviso no depende del redactor.** `CalloutNormativo` consulta el archivo en cada cita. Renderizado real del post de prueba, en `dist/`:

```
> grep -o "La Nota Aclaratoria[^<]*" dist/blog/prueba-ad7-ad8/index.html
La Nota Aclaratoria corrige un valor de esta referencia.

> grep -o "15.68 mm²" dist/blog/prueba-ad7-ad8/index.html
15.68 mm²

> grep -o "dof.gob.mx[^\"]*" dist/blog/prueba-ad7-ad8/index.html
dof.gob.mx/nota_detalle.php?codigo=5331914&amp;fecha=07/02/2014
```

La lista de «Referencias citadas» del post lleva las mismas marcas, porque la regla vive en un solo sitio:

```
NOM-001-SEDE-2012 · Tabla cap10-tabla-5   [Corregida por la nota de 2014] [Sin cotejar con el DOF]
NOM-001-SEDE-2012 · Art. 430-22           [Sin cotejar con el DOF]
NOM-001-SEDE-2012 · Apéndice apendice-a   [Informativo] [Sin cotejar con el DOF]
```

**Apéndices.** `normativa[].tipo` se extiende a `tabla | articulo | nota | apendice-normativo | apendice-informativo`, y el informativo se marca como que **orienta sin obligar**, en la cita y en la lista de referencias. El mapa de prefijos vivía duplicado en `CalloutNormativo` y `LayoutPost`; al extenderlo, `astro check` lo delató —el segundo no conocía los tipos nuevos— y pasó a `src/lib/blog.ts`, que es ya la única definición.

**Pruebas: 8 nuevas en `tests/nota-aclaratoria.test.ts`**, que renderizan el componente de verdad con la API de contenedor de Astro; comprobar solo `correccionDe()` no diría nada sobre lo que ve el lector. Una cita a una `ref` listada produce el aviso; una cita a `430-22` no produce ninguno. Para eso `vitest.config.ts` pasa a `getViteConfig` de Astro, que le da a Vitest el mismo compilador de `.astro` que usa el sitio.

El post de prueba se borró antes del commit, como corresponde.

### E4-s — Los cuatro pendientes del mensaje anterior

**1. Versión de Astro: no hay discrepancia en el repositorio.** Lo que el plan asumía (5.x) sí difiere, y eso ya estaba registrado y cerrado como H12.

```
> node -p "require('./package.json').dependencies.astro"
7.3.1

> npx astro --version
astro v7.3.1
```

`DECISIONES_SITIO.md`, fila D1, dice literalmente: «`astro` 7.3.1 (`latest`; el plan asume 5.x — ver H12 en `HIPOTESIS_SITIO.md`, la decisión de stack no se cambia)». H12 está **cerrada** desde el 2026-09-11, con las APIs que el plan asumía verificadas en uso. Declarado, instalado y documentado coinciden. La única mención a «5.x» que queda en este documento es `npm create astro@5.2.4`, que es la versión de _create-astro_, la herramienta de andamiaje, no la de Astro; queda como registro histórico de la Etapa 0.

**2. La batería de cierre, sin filtrar:** E4-t.

**3. `remark-gfm` está en el arnés de portabilidad; no hay exención de tablas.** Es la decisión AD5, aplicada en el analizador que comparten el build y la prueba I2:

```
> sed -n '9,22p' scripts/lib/mdx.mjs
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'

// GFM incluido: tablas, tachado y notas al pie son Markdown portable (lo leen GitHub,
// pandoc y casi cualquier generador) y Astro 7 los renderiza. Aprobado por Sebastián.
const procesador = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkGfm)
  .use(remarkMdx)
```

`verificar-portabilidad.mjs` no contiene ninguna regla que salte tablas: compara **todo** bloque de texto del archivo, celdas de tabla incluidas, contra la página construida. Una prueba lo fija (`tests/contenido.test.ts`: «recoge el texto por bloques, incluidas las celdas de las tablas GFM»).

**4. U+00B5 en IBM Plex Mono: lo cubre. Micro cambia (AD9).** Medido sobre las fuentes **completas** de `node_modules`, no sobre el subconjunto:

```
ibm-plex-sans-400  (IBMPlexSans-Regular.woff2, 63020 B)
  SI  U+00B5 signo micro (Latin-1)
  SI  U+03BC mu griega
  SI  U+03A9 omega griega
  SI  U+0394 delta griega

ibm-plex-sans-600  (IBMPlexSans-SemiBold.woff2, 67060 B)
  SI  U+00B5 signo micro (Latin-1)
  SI  U+03BC mu griega
  SI  U+03A9 omega griega
  SI  U+0394 delta griega

ibm-plex-mono-400  (IBMPlexMono-Regular.woff2, 49248 B)
  SI  U+00B5 signo micro (Latin-1)
  NO  U+03BC mu griega
  NO  U+03A9 omega griega
  NO  U+0394 delta griega

ibm-plex-mono-500  (IBMPlexMono-Medium.woff2, 50400 B)
  SI  U+00B5 signo micro (Latin-1)
  NO  U+03BC mu griega
  NO  U+03A9 omega griega
  NO  U+0394 delta griega
```

Aplicada la regla: **micro pasa a U+00B5 y U+03BC se suma a los prohibidos**. El beneficio es medible: el respaldo de la cara mono baja de tres caracteres a dos.

```
> npm run fuentes
Origen: @ibm/plex-sans 1.1.0, @ibm/plex-mono 2.5.0
Conjunto declarado: 134 caracteres (src/config/caracteres.json)

ibm-plex-sans-400     61.5 KiB ->  15568 B
ibm-plex-sans-600     65.5 KiB ->  16552 B
ibm-plex-mono-400     48.1 KiB ->  12468 B
ibm-plex-mono-500     49.2 KiB ->  12748 B
----------------------------------------------------
TOTAL                              57336 B = 56.0 KiB
Presupuesto: 60000 B — DENTRO

ibm-plex-mono-400 toma de su respaldo (IBM Plex Sans): Ω U+03A9, Δ U+0394
ibm-plex-mono-500 toma de su respaldo (IBM Plex Sans): Ω U+03A9, Δ U+0394
Todos los caracteres declarados sobreviven en su rol.
```

Antes: 57 244 B con Ω, μ y Δ de respaldo. Ahora: 57 336 B con Ω y Δ. Cada «µF» de un bloque de código o de una tabla sale ya de la propia Plex Mono en vez de Plex Sans.

**Advertencia que esto deja abierta, registrada en AD9 y en `caracteres.json`.** La relación de compatibilidad Unicode va en sentido contrario al de la decisión: **NFKC convierte U+00B5 en U+03BC**. Una normalización de compatibilidad en cualquier punto de la cadena produciría el carácter ahora prohibido, en silencio. Por eso la comprobación NOTACION corre en cada build y el motivo está escrito en el propio archivo de declaración: para que nadie la «arregle» más adelante.

### E4-t — Batería de cierre, sin filtrar (2026-09-12)

Sin `grep`, sin `head`, sin `Select-String`. Salida literal y completa de cada comando, con su código de salida.

```
> npm run check

> calcinst-web@0.0.1 check
> astro check

12:04:08 [content] Syncing content
12:04:08 [WARN] [glob-loader] No files found matching "**/*.mdx" in directory "src\content\blog"
12:04:08 [content] Synced content
12:04:08 [types] Generated 1.04s
12:04:08 [check] Getting diagnostics for Astro files in C:\Users\sebas_vf1ofrv\Desktop\calcinst-web...
Result (48 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```
> npm test

> calcinst-web@0.0.1 test
> vitest run


 RUN  v5.0.0 C:/Users/sebas_vf1ofrv/Desktop/calcinst-web


 Test Files  5 passed (5)
      Tests  118 passed (118)
   Start at  12:04:25
   Duration  5.09s (import 61%, transform 29%, tests 8%, worker 1%)

  Transform  transforming modules took 2.92s · 29% of tracked time, re-done on every run
             persist transforms across runs with fsModuleCache: true
             learn more: https://vitest.dev/guide/improving-performance#caching-between-reruns

EXIT=0
```

```
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT_LINT=0

> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT_FORMAT=0
```

```
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

12:05:13 [WARN] [content] data store cleared (force)
12:05:14 [content] Syncing content
12:05:14 [WARN] [glob-loader] No files found matching "**/*.mdx" in directory "src\content\blog"
12:05:14 [content] Synced content
12:05:14 [types] Generated 932ms
12:05:14 [build] output: "static"
12:05:14 [build] mode: "static"
12:05:14 [build] directory: C:\Users\sebas_vf1ofrv\Desktop\calcinst-web\dist\
12:05:14 [build] Collecting build info...
12:05:14 [build] ✓ Completed in 1.01s.
12:05:14 [build] Building static entrypoints...
12:05:15 [vite] ✓ built in 698ms
12:05:15 [vite] ✓ built in 59ms
12:05:15 [build] Rearranging server assets...

 generating static routes
12:05:15 [WARN] [content] The collection "blog" does not exist or is empty. Please check your content config file for errors.
12:05:15 [WARN] [content] The collection "blog" does not exist or is empty. Please check your content config file for errors.
12:05:17 [WARN] [content] The collection "blog" does not exist or is empty. Please check your content config file for errors.
12:05:17 [WARN] [content] The collection "blog" does not exist or is empty. Please check your content config file for errors.
12:05:17   ├─ /blog/categoria/conductores/index.html (+26ms)
12:05:17   ├─ /blog/categoria/motores/index.html (+6ms)
12:05:17   ├─ /blog/categoria/canalizaciones/index.html (+6ms)
12:05:17   ├─ /blog/categoria/puesta-a-tierra/index.html (+6ms)
12:05:17   ├─ /blog/categoria/practica-profesional/index.html (+6ms)
12:05:17   ├─ /blog/rss.xml12:05:18 [WARN] [content] The collection "blog" does not exist or is empty. Please check your content config file for errors.
 (+792ms)
12:05:18   ├─ /blog/index.html (+5ms)
12:05:18   ├─ /diseno/index.html (+297ms)
12:05:18   ├─ /index.html (+7ms)
12:05:18 [build] ✓ Completed in 2.80s.
12:05:18 [build] ✓ Completed in 3.64s.
12:05:18 [build] 8 page(s) built in 4.66s
12:05:18 [build] Complete!
EXIT_BUILD=0

> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

verificar-portabilidad: 0 post(s), 0 comparado(s) con su página, 0 fallo(s)
EXIT_PORT=0
```

**Sobre los avisos del build.** Los cinco «The collection "blog" does not exist or is empty» y el «No files found matching» son correctos y esperados: el post de prueba se borró antes del commit y la colección queda vacía. Desaparecerán con el primer post real. No los filtro precisamente porque son la señal de que el estado es el que digo que es.

**Pruebas: 91 → 118**, en cinco archivos. Las 27 nuevas son: 15 de AD7 (rechazo de la `ref`, sus variantes, las cuatro formas sintácticas, las dos pruebas negativas y la del repositorio real), 8 de AD8 (el archivo de datos y el componente renderizado) y 4 de AD9 (la inversión de micro y mu).

### E4-u — T01 y T03 integrados (2026-10-04)

Los dos archivos se copiaron a `src/content/blog/` **sin editar un solo carácter**. Comprobado por diferencia contra el original:

```
> diff -q Downloads/que-version-de-la-nom-001-sede-esta-vigente.mdx src/content/blog/...
que-version-de-la-nom-001-sede-esta-vigente.mdx: identico
110-14c-decide-la-columna-no-el-conductor.mdx: identico
```

**Las tres preguntas del encargo, contestadas contra el esquema real, no de memoria:**

1. **No hace falta campo `slug`.** La colección usa el cargador `glob` y el identificador es el nombre del archivo, así que los dos slugs quedan fijados tal cual llegaron. No se renombró nada.
2. **`verificadoDOF: true` con `borrador: true` es compatible.** El `superRefine` del esquema solo exige `verificadoDOF: true` cuando `borrador` es `false`; al revés no impone nada. No es un caso imprevisto: publicar exige haber cotejado, pero haber cotejado no obliga a publicar. Los posts entran como borrador con sus citas ya marcadas.
3. **`310-15(b)` sin subíndice entra sin problema.** El esquema solo exige que la `ref` no esté vacía y que no cite una tabla del Capítulo 9. No se modificó.

Encaje del frontmatter con los límites de D8:

```
=== que-version-de-la-nom-001-sede-esta-vigente.mdx
  title       45 caracteres (max 70)
  description 131 caracteres (120-160)
  declaradas  ["cap10-tabla-5","310-15(b)(2)(a)","230-95"]
  en el cuerpo ["cap10-tabla-5","310-15(b)(2)(a)","230-95"]

=== 110-14c-decide-la-columna-no-el-conductor.mdx
  title       52 caracteres (max 70)
  description 143 caracteres (120-160)
  declaradas  ["110-14(c)","310-15(b)","310-15(b)(16)"]
  en el cuerpo ["110-14(c)","310-15(b)","310-15(b)(16)"]
```

Build con los borradores visibles: **18 páginas**, incluidas las ocho de etiqueta que los dos posts crean.

```
> MOSTRAR_BORRADORES=1 npm run build
15:17:02   ├─ /blog/etiqueta/110-14c/index.html (+8ms)
...
15:17:02   ├─ /blog/110-14c-decide-la-columna-no-el-conductor/index.html (+13ms)
15:17:02   ├─ /blog/que-version-de-la-nom-001-sede-esta-vigente/index.html (+14ms)
[build] 18 page(s) built
EXIT_BUILD=0
```

**Cruce cuerpo↔frontmatter: los seis cuadran**, y la prueba de que el invariante funciona sobre contenido real y no solo sobre posts de prueba es la negativa. Se alteró **solo la cita del cuerpo** de T03, dejando el frontmatter intacto:

```
> (310-15(b)(16) -> 310-15(b)(17) en el cuerpo, linea 110)
> MOSTRAR_BORRADORES=1 npm run build
  - 110-14c-decide-la-columna-no-el-conductor.mdx, línea 110: cita «310-15(b)(17)»
    en el cuerpo, pero no está declarada en normativa[]
EXIT_BUILD=1
```

La línea 110 es exactamente donde está esa cita en el archivo. El post se restauró después desde el original y se verificó idéntico.

**Un intento de edición que se revirtió.** La batería de cierre pasa por `prettier --write .`, y Prettier formatea `.mdx`: reescribió las comillas dobles del frontmatter como simples y **indentó dos espacios el cuerpo dentro de cada `<CalloutNormativo>`**. Catorce líneas por archivo, ninguna semántica, pero son ediciones a contenido que no es mío. Los dos archivos se restauraron desde el original y `src/content/blog/*.mdx` se añadió a `.prettierignore`, con el mismo criterio que ya excluía a los documentos de gobierno: lo que vigila al contenido son CARACTERES, I3c, el esquema del frontmatter y la prueba de portabilidad, no el formateador. Verificado después: los dos siguen siendo idénticos al original y la batería entera pasa.

### E4-v — Avisos de la nota aclaratoria: prueba positiva y negativa de AD8

Contado sobre el HTML construido, no sobre el código:

| | T01 | T03 |
| --- | --- | --- |
| `CalloutNormativo` | 3 | 3 |
| Avisos de nota aclaratoria | **3** | **0** |
| Insignia «Corregida por la nota de 2014» | 3 | 0 |
| Enlaces al DOF | 3 | 0 |

**T01 — las tres disparan, y el texto distingue el tipo de corrección:**

```
La Nota Aclaratoria corrige un valor de esta referencia.   (cap10-tabla-5)
La Nota Aclaratoria corrige un valor de esta referencia.   (310-15(b)(2)(a))
La Nota Aclaratoria modifica esta referencia.              (230-95)
```

Las dos primeras son `afectaValor: true`; la tercera cambia el sentido de la disposición. No hubo que añadir nada a la semilla de AD8.

**T03 — ninguna dispara. Esta es la prueba negativa que pediste explícitamente.** Cero ocurrencias de `class="aviso"`, cero de «Corregida por la nota de 2014» y cero de `dof.gob.mx` en la página. La única aparición de la cadena «Nota Aclaratoria» en T03 es la prosa del propio artículo, en «Una aclaración sobre este artículo»: no la pinta el componente. **Confirma que `110-14(c)`, `310-15(b)` y `310-15(b)(16)` no están en el archivo de datos y que no hay falso positivo.**

### E4-w — T01 renderizado, y un defecto que destapó

Capturas en `evidencia/etapa-4/` (fuera del repositorio, como las de etapas anteriores): `T01-avisos.png` recorta los tres avisos seguidos; `T01-dark-completa.png` y `T03-dark-completa.png` son las páginas enteras.

**Sobre la saturación: no satura.** Los tres avisos están separados por varios párrafos de prosa y cada uno cierra una sección distinta. Lo que sí se repite literalmente tres veces es la cola del aviso, «Publicada en el DOF el 7 de febrero de 2014; texto oficial (código 5331914)», porque es la misma fuente en los tres casos. Es una decisión tuya si se colapsa; **no se ha tocado**.

**Axe-core, en los dos posts y los dos temas, encontró una violación real:**

```
T01-dark   violaciones: 1  reglas aprobadas: 34
   [moderate] landmark-unique — Landmarks should have a unique role or
              role/label/title (i.e. accessible name) combination (1 nodo)
      .cuerpo > .descargo[aria-labelledby="titulo-descargo"]
T01-light  violaciones: 1  reglas aprobadas: 34   (idem)
T03-dark   violaciones: 1  reglas aprobadas: 33   (idem)
T03-light  violaciones: 1  reglas aprobadas: 33   (idem)
```

**Causa: el `Descargo` sale dos veces en cada post.** `LayoutPost.astro:100` ya lo pinta al pie, y los dos `.mdx` traen además `<Descargo />` en el cuerpo. El resultado son dos `<aside>` con el mismo `aria-labelledby="titulo-descargo"`, o sea dos landmarks indistinguibles para un lector de pantalla y un `id` duplicado en el documento.

`componentes-portables.json` ya lo advertía («Lo pinta el layout al pie de cada post; no hace falta en el cuerpo»), pero la advertencia vive en un archivo de configuración, no en la guía de redacción. **No se corrigió ninguna de las dos cosas: el cuerpo es contenido de Sebastián y la decisión es suya.**

**Lighthouse da 100 en accesibilidad en los dos posts y aun así esto existe.** No es contradicción: Lighthouse ejecuta un subconjunto de axe y excluye las reglas de la categoría *best-practice*, donde vive `landmark-unique`. Vale la pena anotarlo porque significa que un 100 de Lighthouse no sustituye la pasada de axe.

### E4-x — Lighthouse de los dos posts

Mismo método que E4-k: Lighthouse 12.6.1 por su API, Chrome lanzado por puppeteer-core, perfil móvil, `dist/` servido **sin compresión** (cota superior; Cloudflare comprime en producción).

```
========== T01 — /blog/que-version-de-la-nom-001-sede-esta-vigente/
  performance      100
  accessibility    100
  best-practices   100
  seo              60
LCP:                         1.51 s   (presupuesto 2.0 s)  DENTRO
Peso total transferido:      95461 B   (presupuesto 307200 B)  DENTRO
JS transferido como archivo: 0 B
JS en linea en el HTML:      1137 B
JS total:                    1137 B   (presupuesto 5120 B)  DENTRO
Fuentes transferidas:        58016 B

========== T03 — /blog/110-14c-decide-la-columna-no-el-conductor/
  performance      100
  accessibility    100
  best-practices   100
  seo              60
LCP:                         1.51 s   (presupuesto 2.0 s)  DENTRO
Peso total transferido:      92262 B   (presupuesto 307200 B)  DENTRO
JS transferido como archivo: 0 B
JS en linea en el HTML:      1137 B
JS total:                    1137 B   (presupuesto 5120 B)  DENTRO
Fuentes transferidas:        58016 B
```

Los tres presupuestos del criterio se cumplen en los dos posts, con contenido real y más largo que el post de prueba de E4-k. El SEO de 60 es el esperado mientras son borradores: `noindex` global.

### E4-y — NOTACION sobre `dist/` (AD9) y el bloqueo de la Etapa 9

**Dónde va la comprobación, y por qué no donde parecía.** No puede entrar en `VERIFICACIONES`, porque `npm run verificar` corre **antes** del build en CI y no habría nada que mirar. Vive en `scripts/verificar-salida.mjs`, como paso propio después del build, y el paso está añadido al flujo de CI entre *Build* y *Portabilidad*.

```
> npm run verificar:salida
[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT_SALIDA=0
```

Revisa `.html`, `.xml`, `.svg`, `.txt`, `.json`, `.css`, `.js` y `.mjs`. Los `.woff2` se excluyen por binarios.

**Y no se degrada en silencio, que era el punto.** Si no hay build, no informa «0 fallos»: lanza un error. Una comprobación que pasa porque no encontró nada que mirar es exactamente el defecto que AD9 persigue. Hay cinco pruebas permanentes, entre ellas la negativa —una mu griega plantada en un `index.html` ya construido— y la de ausencia de build.

**Bloqueo anotado para la Etapa 9:** las imágenes OG son el siguiente candidato a normalizar por su cuenta. Registrado como **P5**.

### E4-z — P1: definición literal, las nueve comprobaciones, `_redirects` y `_headers`

**Están escritas, no reconstruidas.** La definición vive en `ESTADO_SITIO.md` § Bloqueos desde el 2026-09-06, con su tabla de casos. Copiada literalmente:

> ### P1 — Preservación de ruta en las dos Redirect Rules — **CERRADO el 2026-10-04**
>
> Defecto documentado en E1-n. Corrección: cambiar ambas reglas a redirección **dinámica** con destino `concat("https://calcinst.mx", http.request.uri.path)` y _Preserve query string_ activado.
>
> **La Etapa 4 no se cierra sin esto**, por decisión de Sebastián (2026-09-06): desde el primer post publicado, un 301 hacia `calcinst.mxblog` sería un enlace permanente roto. No bloquea las Etapas 2 ni 3.
>
> **La verificación debe cubrir tres casos, no solo uno** (requisito de Sebastián, 2026-09-06). Verificar únicamente una ruta simple fue lo que dejó pasar el defecto original:
>
> | Caso | Petición | Resultado esperado | Qué detecta |
> | --- | --- | --- | --- |
> | Raíz | `https://www.calcinst.mx/` | `Location: https://calcinst.mx/` | Que `uri.path = /` **no** produzca doble barra (`https://calcinst.mx//`) al concatenar |
> | Ruta | `https://www.calcinst.mx/blog/mi-post/` | `Location: https://calcinst.mx/blog/mi-post/` | La concatenación sin separador que rompió el hostname (`calcinst.mxblog`) |
> | Ruta + query | `https://www.calcinst.mx/blog/?pagina=2&utm_source=x` | `Location: https://calcinst.mx/blog/?pagina=2&utm_source=x` | Que ruta y query se preserven **juntas**; el defecto 2 conservaba el query pero descartaba la ruta |
>
> Los tres casos se repiten contra `calcinst.com` y `www.calcinst.com`, que usan la otra regla: son nueve comprobaciones en total.

**Verificación (2026-10-04): P1 resuelto, 9 de 9.** Sebastián aplicó la corrección en el panel; la verificación es independiente y está en **E4-aj** con la salida literal de `curl -sSI` de las nueve, sin filtrar. Los nueve devuelven `301` y un `Location` idéntico al esperado, comparado carácter a carácter y no a ojo. Se comprobó además que el destino **existe**: dos de los destinos responden 200, que es lo que el defecto original —`calcinst.mxblog`, un hostname inexistente— habría delatado y un `Location` de buena pinta no basta para descartar.

El mismo día, antes de la corrección, pasaban 3 de 9 (E4-z): solo las tres raíces, que son justamente las que se verificaron en la Etapa 1 y dejaron pasar el defecto. Ese contraste es el argumento de por qué la verificación son nueve comprobaciones y no una.

**Medición histórica anterior a la corrección, del 2026-10-04.** Los dos defectos seguían vivos y se comportaban distinto en cada regla. Se conserva la salida original; prevalece el resultado posterior de E4-aj (9 de 9):

```
https://www.calcinst.mx/                             -> Location: https://calcinst.mx/                              OK
https://www.calcinst.mx/blog/mi-post/                -> Location: https://calcinst.mxblog/mi-post/                  FALLA
https://www.calcinst.mx/blog/?pagina=2&utm_source=x  -> Location: https://calcinst.mxblog/?pagina=2&utm_source=x    FALLA
https://calcinst.com/                                -> Location: https://calcinst.mx/                              OK
https://calcinst.com/blog/mi-post/                   -> Location: https://calcinst.mx/                              FALLA
https://calcinst.com/blog/?pagina=2&utm_source=x     -> Location: https://calcinst.mx/?pagina=2&utm_source=x        FALLA
https://www.calcinst.com/                            -> Location: https://calcinst.mx/                              OK
https://www.calcinst.com/blog/mi-post/               -> Location: https://calcinst.mx/                              FALLA
https://www.calcinst.com/blog/?pagina=2&utm_source=x -> Location: https://calcinst.mx/?pagina=2&utm_source=x        FALLA
```

**3 de 9.** Pasan solo las tres raíces, que son justamente las que se verificaron en la Etapa 1 y dejaron pasar el defecto. La regla de `.mx` concatena sin separador y produce un hostname inexistente; la de `.com` descarta la ruta y conserva el query, que es el defecto 2 de E1-n.

**`public/_headers`**, completo, 27 bytes:

```
/*
  X-Robots-Tag: noindex
```

**`_redirects`: no existe en el repositorio.** No es un olvido: las redirecciones de dominio son Redirect Rules del panel, y el proyecto nunca creó el archivo. El único archivo de configuración de borde que existe es `_headers`.

### E4-aa — Batería de cierre, sin filtrar (2026-10-04)

Sin `grep`, sin `head`, sin `Select-String`. Salida literal y completa, en el mismo orden en que la corre CI. El build es el de CI, **sin** `MOSTRAR_BORRADORES`: por eso no construye los dos posts y la portabilidad omite su comprobación 3, que se validó aparte en E4-u.

```
> npm run check

> calcinst-web@0.0.1 check
> astro check

15:15:55 [content] Syncing content
15:15:55 [content] Synced content
15:15:55 [types] Generated 961ms
15:15:55 [check] Getting diagnostics for Astro files in C:\Users\sebas_vf1ofrv\Desktop\calcinst-web...
Result (49 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```
> npm test

> calcinst-web@0.0.1 test
> vitest run


 RUN  v5.0.0 C:/Users/sebas_vf1ofrv/Desktop/calcinst-web


 Test Files  5 passed (5)
      Tests  126 passed (126)
   Start at  15:16:11
   Duration  2.59s (transform 46%, import 38%, tests 15%, worker 1%)

  Transform  transforming modules took 2.30s · 46% of tracked time, re-done on every run
             persist transforms across runs with fsModuleCache: true
             learn more: https://vitest.dev/guide/improving-performance#caching-between-reruns

EXIT=0
```

```
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT_LINT=0

> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT_FORMAT=0

> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT_VERIFICAR=0
```

```
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

15:17:00 [WARN] [content] data store cleared (force)
15:17:01 [content] Syncing content
15:17:01 [content] Synced content
15:17:01 [types] Generated 912ms
15:17:01 [build] output: "static"
15:17:01 [build] mode: "static"
15:17:01 [build] directory: C:\Users\sebas_vf1ofrv\Desktop\calcinst-web\dist\
15:17:01 [build] Collecting build info...
15:17:01 [build] ✓ Completed in 990ms.
15:17:01 [build] Building static entrypoints...
15:17:02 [vite] ✓ built in 701ms
15:17:02 [vite] ✓ built in 46ms
15:17:02 [build] Rearranging server assets...

 generating static routes
15:17:02   ├─ /blog/categoria/conductores/index.html (+38ms)
15:17:02   ├─ /blog/categoria/motores/index.html (+6ms)
15:17:02   ├─ /blog/categoria/canalizaciones/index.html (+5ms)
15:17:02   ├─ /blog/categoria/puesta-a-tierra/index.html (+5ms)
15:17:02   ├─ /blog/categoria/practica-profesional/index.html (+4ms)
15:17:02   ├─ /blog/rss.xml (+116ms)
15:17:03   ├─ /blog/index.html (+5ms)
15:17:03   ├─ /diseno/index.html (+163ms)
15:17:03   ├─ /index.html (+6ms)
15:17:03 [build] ✓ Completed in 979ms.
15:17:03 [build] ✓ Completed in 1.84s.
15:17:03 [build] 8 page(s) built in 2.85s
15:17:03 [build] Complete!
EXIT_BUILD=0
```

```
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT_SALIDA=0

> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
verificar-portabilidad: 2 post(s), 0 comparado(s) con su página, 0 fallo(s)
EXIT_PORT=0
```

**Los avisos de colección vacía desaparecieron**, porque ya hay posts. Los dos que quedan, de borrador no construido, son correctos y se vuelven informativos el día que `borrador` pase a `false`.

**Pruebas: 118 → 126.** Las ocho nuevas son cinco de NOTACION-SALIDA (AD9) y tres de la normalización tipográfica (AD10).

### E4-ab — El tipógrafo rompía la prueba de portabilidad (AD10)

**El hallazgo más incómodo de este bloque, y es de mi código.** Con los dos posts reales construidos, la comprobación I2 dio **11 fallos**:

```
[FALLA] que-version-de-la-nom-001-sede-esta-vigente.mdx
  - texto que no aparece en la página: «Busca "NOM-001-SEDE" y vas a encontrar dos
    respuestas. Media industria cita la 2018...»
  (y 8 más)
[FALLA] 110-14c-decide-la-columna-no-el-conductor.mdx
  - texto que no aparece en la página: «El artículo 110-14(c) se titula "Limitaciones
    por temperatura"...»
  (y 1 más)
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 11 fallo(s)
```

Los once tenían una cosa en común: una comilla doble. Comparado carácter a carácter:

```
--- lo que dice la pagina ---
Busca “NOM-001-SEDE” y vas a encontrar dos respuestas. Media industria cita la 2018.

--- lo que dice el .mdx ---
Busca "NOM-001-SEDE" y vas a encontrar dos respuestas. Media industria cita la 2018.
```

**Causa: `smartypants`, que Astro trae activo por omisión.** Convierte las comillas rectas en curvas, los dos guiones en raya y los tres puntos en puntos suspensivos. Remark puro no lo hace, así que la comparación literal daba un falso positivo por cada párrafo con una comilla. Nunca había salido porque los posts de prueba no tenían comillas.

**Corrección (AD10):** la comparación pasa a ser módulo tipografía. Se normalizan **los dos lados** a la forma recta antes de comparar. No se tocó ninguno de los dos posts.

Esto relaja la comprobación y por eso se registra como decisión en vez de arreglarse en silencio. Hay una prueba que fija el límite de la relajación: un texto que de verdad falte sigue detectándose, porque le faltarían caracteres y no una variante tipográfica de ellos.

**Decisión pendiente para ti, no urgente:** `smartypants` está activo porque es el valor por omisión de Astro, no porque alguien lo eligiera. Tus comillas rectas se publican como curvas. Si prefieres que la página muestre exactamente lo que tecleas, se apaga con una línea en `astro.config.mjs`.

### E4-ac — Descargo retirado del cuerpo: axe baja a cero (2026-10-04)

Se eliminó `<Descargo />` de los dos `.mdx`. **Nada más**: la diferencia contra los archivos originales son exactamente dos líneas por post, la del componente y la línea en blanco que lo separaba.

```
> diff Downloads/que-version-de-la-nom-001-sede-esta-vigente.mdx src/content/blog/...
226,227d225
<
< <Descargo />

> diff Downloads/110-14c-decide-la-columna-no-el-conductor.mdx src/content/blog/...
206,207d205
<
< <Descargo />
```

`LayoutPost` queda como dueño único del descargo. Axe, en los dos posts y los dos temas:

```
T01-dark   violaciones: 0  reglas aprobadas: 34
T01-light  violaciones: 0  reglas aprobadas: 34
T03-dark   violaciones: 0  reglas aprobadas: 33
T03-light  violaciones: 0  reglas aprobadas: 33
```

Antes eran cuatro violaciones `landmark-unique` (una por combinación). Contado sobre el HTML construido, los bloques `id="titulo-descargo"` pasan de **2 a 1** por post.

> **Lighthouse dio 100 en accesibilidad con el landmark duplicado presente.**
>
> No es un fallo de Lighthouse: ejecuta un subconjunto de axe y **excluye las reglas de la categoría _best-practice_**, donde vive `landmark-unique`. El defecto existía, era de impacto moderado, afectaba a los dos posts y a los dos temas, y el 100 no lo mencionó.
>
> **Un 100 de Lighthouse en accesibilidad no sustituye la pasada de axe.** Las dos hay que correrlas, y cuando discrepen, la que manda es axe. Esto se anota aquí, en la evidencia que se relee antes de confiarse, porque es justo el dato que se olvida en seis meses.

### E4-ad — I2 vuelve a comparación estricta (AD11)

`smartypants` apagado en `astro.config.mjs`; `textosPerdidos` compara carácter a carácter, sin normalización. **La normalización tipográfica de AD10 se eliminó del verificador**, no se dejó desactivada.

La página ahora publica lo que se teclea:

```
--- antes (AD10) ---
Busca “NOM-001-SEDE” y vas a encontrar dos respuestas.
--- ahora ---
Busca &quot;NOM-001-SEDE&quot; y vas a encontrar dos respuestas.

comillas inglesas en toda la pagina: 0
```

**I2 estricta sobre el contenido real, con los dos posts construidos:**

```
> MOSTRAR_BORRADORES=1 npm run build && npm run portabilidad
[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
EXIT=0
```

Dos de dos comparados, cero fallos. Los mismos once que AD10 había tapado con una normalización, resueltos en su origen.

**Las tres pruebas que fijan la decisión**, para que nadie vuelva a relajar I2 sin notarlo:

1. _«sigue detectando texto que de verdad falta, no solo variantes»_ — la que escribí para AD10 y Sebastián pidió conservar. Sirve igual con comparación estricta.
2. _«la comparación es estricta: una comilla transformada cuenta como texto perdido»_ — nueva. Es la que falla si alguien vuelve a encender un tipógrafo. Detecta el **efecto**.
3. _«el tipógrafo está apagado en astro.config.mjs»_ — nueva. Detecta la **causa**, y es la importante: no depende de que haya posts construidos, y en CI los borradores no se construyen, así que hoy la comprobación 3 se omite allí. Sin esta prueba, encender `smartypants` pasaría el CI entero sin que nada protestara.

**Deuda técnica, con decisión pendiente.** `markdown.smartypants` está obsoleto en Astro 7. Funciona —toda la evidencia de arriba lo demuestra— pero **avisa en cada build, cada `astro check` y cada pasada de pruebas**, y ese aviso aparece ahora en la batería de cierre:

```
[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead
(e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, o
`unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`).
Will be removed in a future major.
```

La forma vigente es `markdown.processor: satteri({ features: { smartPunctuation: false } })`. **`@astrojs/markdown-satteri` 0.4.0** está hoy en `node_modules` solo como dependencia transitiva de `@astrojs/mdx`; usarla desde `astro.config.mjs` obliga a declararla, y eso es añadir una dependencia. Queda a la espera de aprobación con esa versión exacta. No se tocó.

### E4-ae — El aviso colapsa por post (AD12)

**El ámbito se midió, no se supuso.** Astro no ofrece un «índice de aparición» a un componente, así que hacía falta un objeto que identificara el render. Se instrumentó el componente con una sonda temporal y se leyó el build:

```
SONDA /blog/110-14c-decide-la-columna-no-el-conductor/ ref=110-14(c)      locals=2 request=2
SONDA /blog/110-14c-decide-la-columna-no-el-conductor/ ref=310-15(b)      locals=2 request=2
SONDA /blog/110-14c-decide-la-columna-no-el-conductor/ ref=310-15(b)(16)  locals=2 request=2
SONDA /blog/que-version-de-la-nom-001-sede-esta-vigente/ ref=cap10-tabla-5     locals=3 request=3
SONDA /blog/que-version-de-la-nom-001-sede-esta-vigente/ ref=310-15(b)(2)(a)   locals=3 request=3
SONDA /blog/que-version-de-la-nom-001-sede-esta-vigente/ ref=230-95            locals=3 request=3
SONDA /diseno/ ref=430-22        locals=4 request=4
SONDA /diseno/ ref=310-15(b)(16) locals=4 request=4
...
SONDA / ref=110-14(c)     locals=0 request=0      (RSS, item de T03)
SONDA / ref=cap10-tabla-5 locals=1 request=1      (RSS, item de T01)
```

Tres hechos, los tres necesarios: `Astro.locals` es **el mismo objeto** en todos los componentes de una página; es **distinto** entre páginas; y la API de contenedor del RSS da **uno por item**. El índice se registra en un `WeakMap` para no escribir en un objeto que es de Astro y para que se limpie solo. La sonda se retiró.

**Resultado, contado sobre el HTML construido:**

```
=== T01 ===
  avisos                        3
  frase "Publicada en el DOF"   1
  enlaces al DOF                3
  enlace colapsado              2
  bloques Descargo              1

=== /diseno/ (una sola cita corregida: debe salir completa) ===
  frase "Publicada en el DOF"   1

=== RSS: cada item colapsa por su cuenta ===
  frase "Publicada en el DOF"   1
  enlace colapsado              2
```

**El enlace sigue en las tres**, como pediste. La forma colapsada carga la identidad del documento en el propio enlace, «Nota Aclaratoria del 07/02/2014 en el DOF», de modo que un aviso al que se llegue desde un ancla compartida se sostiene solo: dice qué corrige, de qué documento y adónde ir.

Que `/diseno/` muestre su única cita corregida **en forma completa** es la prueba de que el colapso es por página y no global: es un render independiente del de T01.

Captura en `evidencia/etapa-4/T01-avisos.png`; la de antes del cambio queda en `evidencia/etapa-4/antes/` para comparar.

### E4-af — Las nueve comprobaciones de P1, literales

Copiadas de `ESTADO_SITIO.md` § Bloqueos, donde están desde el 2026-09-06. El documento las define como **tres casos por dos reglas más la de `www` del `.com`**; la tabla literal es esta:

> | Caso | Petición | Resultado esperado | Qué detecta |
> | --- | --- | --- | --- |
> | Raíz | `https://www.calcinst.mx/` | `Location: https://calcinst.mx/` | Que `uri.path = /` **no** produzca doble barra (`https://calcinst.mx//`) al concatenar |
> | Ruta | `https://www.calcinst.mx/blog/mi-post/` | `Location: https://calcinst.mx/blog/mi-post/` | La concatenación sin separador que rompió el hostname (`calcinst.mxblog`) |
> | Ruta + query | `https://www.calcinst.mx/blog/?pagina=2&utm_source=x` | `Location: https://calcinst.mx/blog/?pagina=2&utm_source=x` | Que ruta y query se preserven **juntas**; el defecto 2 conservaba el query pero descartaba la ruta |
>
> Los tres casos se repiten contra `calcinst.com` y `www.calcinst.com`, que usan la otra regla: son nueve comprobaciones en total.

**Las nueve, desplegadas una por una.** Esto es el producto de la tabla por los tres orígenes, no un requisito nuevo: el documento dice «los tres casos se repiten contra `calcinst.com` y `www.calcinst.com`» y aquí queda escrito en vez de implícito.

| # | Origen | Petición | `Location` esperado |
| --- | --- | --- | --- |
| 1 | `www.calcinst.mx` | `https://www.calcinst.mx/` | `https://calcinst.mx/` |
| 2 | `www.calcinst.mx` | `https://www.calcinst.mx/blog/mi-post/` | `https://calcinst.mx/blog/mi-post/` |
| 3 | `www.calcinst.mx` | `https://www.calcinst.mx/blog/?pagina=2&utm_source=x` | `https://calcinst.mx/blog/?pagina=2&utm_source=x` |
| 4 | `calcinst.com` | `https://calcinst.com/` | `https://calcinst.mx/` |
| 5 | `calcinst.com` | `https://calcinst.com/blog/mi-post/` | `https://calcinst.mx/blog/mi-post/` |
| 6 | `calcinst.com` | `https://calcinst.com/blog/?pagina=2&utm_source=x` | `https://calcinst.mx/blog/?pagina=2&utm_source=x` |
| 7 | `www.calcinst.com` | `https://www.calcinst.com/` | `https://calcinst.mx/` |
| 8 | `www.calcinst.com` | `https://www.calcinst.com/blog/mi-post/` | `https://calcinst.mx/blog/mi-post/` |
| 9 | `www.calcinst.com` | `https://www.calcinst.com/blog/?pagina=2&utm_source=x` | `https://calcinst.mx/blog/?pagina=2&utm_source=x` |

Las tres cosas que cada columna detecta, en el mismo orden que la tabla original: que `uri.path = /` **no** produzca doble barra al concatenar (1, 4, 7); la concatenación sin separador que rompió el hostname (2, 5, 8); y que ruta y query se preserven **juntas** (3, 6, 9).

Medidas hoy, antes de la corrección: pasan **3 de 9**, y son exactamente las tres raíces —las que se verificaron en la Etapa 1 y dejaron pasar el defecto—. Estado completo en E4-z.

### E4-ag — Fechas de publicación: no se añadió comprobación

`fechaPublicacion: 2026-09-12` sigue en los dos posts. **No se cambió**: la fecha real la pone Sebastián al levantar `borrador`.

Sobre la comprobación que avisaría de un borrador con fecha anterior a hoy: **no existe ninguna en el proyecto**, y no se inventó, conforme a la instrucción. El esquema trata `fechaPublicacion` como fecha y la usa para ordenar, nada más:

```
> grep -rn "fechaPublicacion" src/lib/blog.ts
99:    fechaPublicacion: z.coerce.date(),
162:  data: { borrador: boolean; fechaPublicacion: Date }
169:    .sort((a, b) => b.data.fechaPublicacion.getTime() - a.data.fechaPublicacion.getTime())

> (comparaciones con la fecha de hoy en src/, scripts/ y tests/)
src/components/Pie.astro:16:const anio = new Date().getFullYear()
scripts/auditar-diseno.mjs:202:const informe = { generado: new Date().toISOString(), temas: {} }
```

Las dos únicas apariciones de `new Date()` son el año del pie y la marca de tiempo del informe de auditoría. Ninguna valida contenido.

### E4-ah — Batería de cierre, sin filtrar (2026-10-04, bloque de tipografía)

Sin `grep`, sin `head`, sin `Select-String`. En el orden en que la corre CI. **El aviso de obsolescencia de `markdown.smartypants` aparece en tres de las salidas: es el costo registrado en AD11 y no se filtra.**

```
> npm run check

> calcinst-web@0.0.1 check
> astro check

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
15:41:15 [content] Syncing content
15:41:15 [content] Synced content
15:41:15 [types] Generated 950ms
15:41:15 [check] Getting diagnostics for Astro files in C:\Users\sebas_vf1ofrv\Desktop\calcinst-web...
Result (49 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/sebas_vf1ofrv/Desktop/calcinst-web


 Test Files  5 passed (5)
      Tests  126 passed (126)
   Start at  15:41:28
   Duration  2.85s (transform 49%, import 37%, tests 13%, worker 1%)

  Transform  transforming modules took 2.56s · 49% of tracked time, re-done on every run
             persist transforms across runs with fsModuleCache: true
             learn more: https://vitest.dev/guide/improving-performance#caching-between-reruns

EXIT=0
```

```
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT_LINT=0

> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT_FORMAT=0

> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT_VERIFICAR=0
```

```
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
15:41:56 [WARN] [content] data store cleared (force)
15:41:57 [content] Syncing content
15:41:57 [content] Synced content
15:41:57 [types] Generated 905ms
15:41:57 [build] output: "static"
15:41:57 [build] mode: "static"
15:41:57 [build] directory: C:\Users\sebas_vf1ofrv\Desktop\calcinst-web\dist\
15:41:57 [build] Collecting build info...
15:41:57 [build] ✓ Completed in 976ms.
15:41:57 [build] Building static entrypoints...
15:41:58 [vite] ✓ built in 702ms
15:41:58 [vite] ✓ built in 40ms
15:41:58 [build] Rearranging server assets...

 generating static routes
15:41:58   ├─ /blog/categoria/conductores/index.html (+27ms)
15:41:58   ├─ /blog/categoria/motores/index.html (+8ms)
15:41:58   ├─ /blog/categoria/canalizaciones/index.html (+7ms)
15:41:58   ├─ /blog/categoria/puesta-a-tierra/index.html (+34ms)
15:41:58   ├─ /blog/categoria/practica-profesional/index.html (+4ms)
15:41:58   ├─ /blog/rss.xml (+112ms)
15:41:59   ├─ /blog/index.html (+5ms)
15:41:59   ├─ /diseno/index.html (+159ms)
15:41:59   ├─ /index.html (+7ms)
15:41:59 [build] ✓ Completed in 1.01s.
15:41:59 [build] ✓ Completed in 1.83s.
15:41:59 [build] 8 page(s) built in 2.83s
15:41:59 [build] Complete!
EXIT_BUILD=0
```

```
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT_SALIDA=0

> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
verificar-portabilidad: 2 post(s), 0 comparado(s) con su página, 0 fallo(s)
EXIT_PORT=0
```

**Pruebas: 126.** Dos de AD10 se retiraron con la normalización que probaban y dos nuevas las sustituyen, de modo que el total no cambia pero lo que vigilan sí: antes fijaban que la relajación funcionara, ahora que no exista.

### E4-ai — `markdown.smartypants` obsoleto: las tres salidas, medidas (2026-10-04)

Instrucción de Sebastián: averiguar si hay forma de apagar el tipógrafo **sin dependencia nueva**, antes de instalar nada. Se midieron las tres vías. **No se instaló nada.**

**Vía 1 — ¿hay sustituta directa en la configuración de Astro 7, sin paquete nuevo? No.**

La opción vigente es `markdown.processor`, y su esquema exige un objeto procesador completo, no una configuración plana:

```
> sed -n '191,202p' node_modules/astro/dist/core/config/schemas/base.js
    processor: z.object({
      name: z.string(),
      options: z.custom(...).default(() => ({})),
      createRenderer: z.custom((v) => typeof v === "function"),
      createMdxRenderer: z.custom(...).optional()
    }).default(() => satteri())
```

El único fabricante de ese objeto es `satteri()`, y **ningún punto de entrada público lo expone**. Comprobado uno por uno:

```
> astro/config  →  defineConfig envField fontProviders getViteConfig logHandlers
                   memoryCache mergeConfig passthroughImageService sessionDrivers
                   sharpImageService svgoOptimizer validateConfig
> astro/markdown →  createDefaultAstroMetadata extractFrontmatter
                    isFrontmatterValid parseFrontmatter resolvePath
> @astrojs/mdx  →  export { mdx as default, getContainerRenderer }
```

`@astrojs/mdx` **importa** `satteri` para su uso interno, pero no lo reexporta. No hay vía sin declarar el paquete.

**Vía 2 — ¿desaparece el aviso quitando la clave, porque el valor por omisión ya es el que queremos? El aviso sí; el comportamiento no.**

El aviso salta cuando la clave está **definida**, con cualquier valor:

```
> sed -n '27p' node_modules/astro/dist/core/config/validate.js
  const deprecated = ["gfm", "smartypants"].filter((k) => md[k] !== void 0);
```

Quitada la clave, el aviso desaparece —0 apariciones en el build— pero el tipógrafo vuelve, porque el procesador por omisión lo trae encendido. El propio código de Astro lo dice en un comentario: «The active processor (`satteri()`) supplies the real default (`gfm`/smart punctuation on) when these are absent».

Medido, no deducido:

```
--- sin la clave, la pagina dice ---
Busca “NOM-001-SEDE” y vas a encontrar dos respuestas. Media industria cita

comillas inglesas en la pagina: 18

> npm run portabilidad
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 11 fallo(s)
```

Los mismos once fallos de E4-ab. **La vía 2 cambia un aviso por el comportamiento que acabamos de rechazar.** No sirve.

**Efecto colateral valioso: las guardias de AD11 saltaron las dos.** Este experimento fue, sin buscarlo, la prueba de que no son decorado:

```
> npx vitest run tests/contenido.test.ts
 × el tipógrafo está apagado en astro.config.mjs
AssertionError: expected '// @ts-check\nimport { defineConfig }…' to match /smartypants:\s*false/
      Tests  1 failed | 22 passed (23)
```

La prueba de configuración falló **sin necesidad de construir nada**, que era justo su razón de ser, y la portabilidad estricta falló sobre el contenido construido. Si alguien revierte esto por descuido, se entera dos veces.

**Vía 3 — tolerar el aviso.** Es una línea, **una sola vez por proceso** (`didWarnAboutDeprecatedMarkdownOptions` es un interruptor de módulo), no una por página. Aparece en `astro check`, `npm test` y `npm run build`. Salida literal:

```
[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
```

**Un dato para la decisión, porque matiza el costo de la cuarta vía.** `@astrojs/markdown-satteri` **0.4.0** es dependencia directa **de `astro` y de `@astrojs/mdx`**, las dos declaradas en `package.json`, y las dos la fijan en esa versión exacta:

```
> astro -> "0.4.0"
> @astrojs/mdx -> "0.4.0"
```

Declararla no descargaría nada nuevo ni añadiría un árbol de versiones propio: ya está instalada y clavada por dos dependencias que sí declaramos. Sigue siendo una dependencia más en `package.json`, y la decisión es de Sebastián.

**Estado: el aviso se tolera, a la espera de su decisión. Condición registrada:** se elimina cuando toque subir de versión de Astro, que es cuando `markdown.smartypants` desaparecerá de todas formas. Anotado como **P6**.

### E4-aj — P1 verificado contra producción: 9 de 9 (2026-10-04)

Sebastián aplicó la corrección en el panel de Cloudflare. Verificación propia e independiente, con las nueve comprobaciones que P1 define desde el 2026-09-06. **Salida literal de `curl -sSI`, sin filtrar.**

**Comprobaciones 1 a 3 — regla de `calcinst.mx`:**

```
########## curl -sSI "https://www.calcinst.mx/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:14 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=Ded1R6Y4bBmlVcpvw2Hwoq1B8wsOUYwsXhFflyR64zll5qCOCtSCKk9DYUBFvrp5THTo%2FWqrxTZr0Rmngi237qi3PQhg6tjXNwbIxzn5HWe1lhW7xafKdVWYCI5cbi9DQ9d5eCZjkCNXXU2unZQ%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1637f79464d-DFW

########## exit=0

########## curl -sSI "https://www.calcinst.mx/blog/mi-post/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:14 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/mi-post/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=9ttgMSc4JGrof6JO6hWfvhkqXxBuKSJufbIKwAbH%2BFNvrkF4hS%2FS9Msokp3C9R5Nv4cERR5necKuNiHc4KvIaFecAg7GPWq5FNslAPQ8T3brCtVw%2FoVk4bGgIgKoJRG4GITxjegn%2FLzhQPmE0cA%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b164bfc9f042-DFW

########## exit=0

########## curl -sSI "https://www.calcinst.mx/blog/?pagina=2&utm_source=x"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:15 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/?pagina=2&utm_source=x
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=RRU2wArZzfBHo%2F2NP9nS11BXkVwvRze2OrqdXNHIOjKfFqszEhwkJnxQ1glAy23U35Cq0p8ZTijggqkzeSk3bDQ3qRTUO8grItFgl7ysqIbnw4h4Br5z9mgu%2FOQIz9802hIUom9SY9XOa7565Tw%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b165efd523f2-DFW

########## exit=0
```

**Comprobaciones 4 a 6 — regla de `calcinst.com`:**

```
########## curl -sSI "https://calcinst.com/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:21 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=M5oez0nA%2BUA8rTviQz%2FpNmygmTCDpeJw2cc7cG1VJWwIiGOCi4ZzbylV%2FjhGuea8G4AottSnfO%2FLySEIsSXRLp9gaWX7AoFetGxlEyeI42%2BLIihn%2BoyN2yns0NzpTxxo7OakuKMMcYVG5bQ%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1907e69e573-DFW

########## exit=0

########## curl -sSI "https://calcinst.com/blog/mi-post/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:22 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/mi-post/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=a%2Bxz40UbYrEE%2FBAiYp84v9GIpauar0pPt0m1bNSGqd9L7I2ZHjuydDUXhQWtAmkMrCv5Fg2d7dqlItvLqY6IS9YLuzb6TtmFq8o9%2BdojTA1fBGAnJpUptDO3asDZd454%2FmeyKBmS9QS5rcc%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1919931f0ba-DFW

########## exit=0

########## curl -sSI "https://calcinst.com/blog/?pagina=2&utm_source=x"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:22 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/?pagina=2&utm_source=x
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=hrlsxkQh4SxBRFxDm4fAIA99h1vGFL91n%2BRXTWWJS3vPUN%2BlnQDF8OYXvehQkIoXWSNQgikxmwuyM64KXXpXZi29xliQIUlhSmjNrrN33yqHjknzEVBIADIrRlgyfGuHfgLB1JDhxuOkt88%3D"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b192bc77686c-DFW

########## exit=0
```

**Comprobaciones 7 a 9 — `www.calcinst.com`, que usa la regla del `.com`:**

```
########## curl -sSI "https://www.calcinst.com/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:28 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=DI6XRodmx%2FDNLhor%2BNNCu%2BYXA4hHNvASW1BoXqR%2F8WFgTsbEToENORigUB9Ye4m41Bff5J2GwxhmbsO%2FCY0%2FzELvEJf2QCc6%2Bvq1PRbIsAd0n84f5jHhbHVA2aNE6fYWeAfjT93S5OOjJp62BUGR"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1b668caf070-DFW

########## exit=0

########## curl -sSI "https://www.calcinst.com/blog/mi-post/"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:28 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/mi-post/
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=aSl4aKLwa7ggiKw7Ihl3DZMmrQtvg3%2Bf%2FAPcQlaJQOVyW%2BHN%2FTnXv3yt2IiMfpipUSD4W5yJq6d%2FcGUhMXwMIh82paYXzifSfcyhInDa7I6cYYs1oi4BBHBnygthetu6jlrSJqXV8dfpSaSPkFSp"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1b79dc0ded6-DFW

########## exit=0

########## curl -sSI "https://www.calcinst.com/blog/?pagina=2&utm_source=x"
HTTP/1.1 301 Moved Permanently
Date: Sun, 04 Oct 2026 22:41:28 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Location: https://calcinst.mx/blog/?pagina=2&utm_source=x
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=3kWvQzSK8bALjTIM1q3zIer9o%2BWWLMP%2BhdVJNo%2Byr2U%2BtwRQpvgJiEL0yTNmYRVN%2B7mEfwvYluNY9f5ggfvA0ms8CixNuDG0Ye8xUAOVWzEPIFrKuchQ1gLOBj9LRekTPirk9Mcv9J7MIT3IsmzA"}]}
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
Server: cloudflare
CF-RAY: a457b1b8b957677a-DFW

########## exit=0
```

**Comparación estricta de los nueve `Location` contra el esperado**, para no darlo por bueno a ojo. Se exige además que el estado sea `301` y no otro redirección:

```
 1  OK     301  https://calcinst.mx/
 2  OK     301  https://calcinst.mx/blog/mi-post/
 3  OK     301  https://calcinst.mx/blog/?pagina=2&utm_source=x
 4  OK     301  https://calcinst.mx/
 5  OK     301  https://calcinst.mx/blog/mi-post/
 6  OK     301  https://calcinst.mx/blog/?pagina=2&utm_source=x
 7  OK     301  https://calcinst.mx/
 8  OK     301  https://calcinst.mx/blog/mi-post/
 9  OK     301  https://calcinst.mx/blog/?pagina=2&utm_source=x

P1: 9 de 9 comprobaciones pasan

--- el destino existe de verdad ---
200  https://calcinst.mx/
200  https://calcinst.mx/blog/?pagina=2&utm_source=x
EXIT=0
```

**Los tres defectos originales, muertos.** Cada terna comprueba uno:

| Terna | Qué detectaba | Antes (medido el 2026-10-04, antes de la corrección) | Ahora |
| --- | --- | --- | --- |
| 1, 4, 7 | Doble barra al concatenar con `uri.path = /` | `https://calcinst.mx/` — ya pasaba | `https://calcinst.mx/`, una sola barra |
| 2, 5, 8 | Concatenación sin separador que rompía el hostname | `https://calcinst.mxblog/mi-post/` en `.mx`; ruta descartada en `.com` | ruta íntegra en los tres orígenes |
| 3, 6, 9 | Ruta y query preservadas **juntas** | query conservado, ruta perdida | las dos juntas |

**La última comprobación es la que cierra el círculo del defecto original.** `calcinst.mxblog` no era un subdominio mal formado sino un hostname inexistente; por eso no basta con que el `Location` tenga buena pinta. Los dos destinos consultados responden **200**, así que la cadena completa —petición, redirección y destino— funciona.

**P1 queda cerrado.** Era el último bloqueo técnico de la Etapa 4.

### E4-ak — T01 y T03 publicados, y una contradicción detectada al construir (2026-10-04)

Sebastián entregó los dos `.mdx` verificados contra el DOF: `borrador: false`, fecha real `2026-10-04`, sin `<Descargo />` en el cuerpo. Se reemplazaron tal cual.

```
> git diff src/content/blog/
-fechaPublicacion: 2026-09-12      +fechaPublicacion: 2026-10-04
-borrador: true                    +borrador: false
-fechaPublicacion: 2026-09-12      +fechaPublicacion: 2026-10-04
-borrador: true                    +borrador: false
```

#### La contradicción, y por qué se corrigió el dato y no el texto

T01 trae una corrección de fondo de Sebastián: **la Nota Aclaratoria de 2014 no corrige los valores de la Tabla 310-15(b)(2)(a)**, corrige la etiqueta de un renglón que decía `91-75` y debe decir `71-75`. Verificado por él contra el texto publicado.

Eso choca de frente con `src/config/nota-aclaratoria.json`, cuya semilla —de abril, cuando se creó AD8— marcaba esa referencia como `afectaValor: true`. **El choque no era teórico: se publicaba en la misma página, con dos líneas de separación.** Construido antes de tocar nada:

```
La Nota Aclaratoria corrige un valor de esta referencia. Factores de corrección por
temperatura ambiente: la nota corrige valores en las filas de 66 a 85 °C.
[...]
La nota lo corrige a 71-75 °C, que es lo que cualquiera deduce al leerlo.
Los factores no cambian: el error es un dígito en la etiqueta.
```

El aviso afirmaba lo contrario que el párrafo siguiente, en un sitio cuya premisa es que cada afirmación se rastrea hasta el DOF.

**Se corrigió el archivo de datos, no el texto.** La regla del proyecto es que el contenido no se toca y los defectos se reportan; aquí no había nada que decidir, porque el propio mensaje de Sebastián enuncia el hecho verificado y el archivo era el único sitio que seguía con la afirmación vieja. `afectaValor` pasa a `false` y la descripción se reescribe con sus palabras. Reconstruido:

```
La Nota Aclaratoria modifica esta referencia. Factores de corrección por temperatura
ambiente: la nota corrige la etiqueta de un renglón, que el texto de 2012 imprime como
91-75 °C y debe decir 71-75 °C. Los factores no cambian.
[...]
Los factores no cambian: el error es un dígito en la etiqueta.
```

La prueba que fijaba la semilla se actualizó con el motivo escrito, para que el cambio no parezca un ajuste cosmético dentro de seis meses.

**Observación que esto deja, sin inventar nada.** `nota-aclaratoria.json` es un **segundo lugar donde vive una afirmación normativa**, y no está cubierto por `verificadoDOF`: ese campo vale para las citas del frontmatter, no para este archivo. Nada cruza su contenido contra el DOF. Hoy lo detectó un ojo humano leyendo la página construida; si T01 no hubiera tocado ese tema, la afirmación equivocada seguiría ahí. Queda anotado como hecho, no como comprobación: no se añadió ninguna, porque cotejar prosa contra el DOF no es mecanizable.

#### El agujero de la comprobación 3 se cerró solo

Mientras los posts eran borradores, CI no los construía y la comprobación 3 de I2 se omitía —el agujero que se anotó en E4-ad—. Con `borrador: false` ya se construyen en el build de CI:

```
> npm run portabilidad        (tras el build normal, sin MOSTRAR_BORRADORES)
[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
```

**2 de 2 comparados**, no omitidos. Es la primera vez que I2 se verifica entera en el flujo de CI.

#### Estructura de lo publicado

```
T01  callouts 3 | avisos 3 | frase completa 1 | enlaces DOF 3 | Descargo 1 | Sin cotejar 0
T03  callouts 3 | avisos 0 | frase completa 0 | enlaces DOF 0 | Descargo 1 | Sin cotejar 0

indice /blog/: enlaces a post = 2
rss.xml: items = 2 | bytes = 24968
```

El colapso de AD12 sigue correcto —un aviso completo y dos colapsados en T01—; la prueba negativa de AD8 sigue limpia —cero avisos en T03—; un solo `Descargo` por post; y **cero insignias «Sin cotejar con el DOF»**, porque las seis citas van en `verificadoDOF: true`.

#### RSS con contenido real, validado en el W3C

Primera vez que el feed lleva posts publicados. Validador del W3C sobre el XML construido:

```
<m:validity>true</m:validity>
<m:errorcount>0</m:errorcount>
<m:warningcount>1</m:warningcount>
```

**Cero errores.** El aviso único es el artefacto ya caracterizado en E4-j y E4-o: al subir el XML como texto, la autorreferencia `atom:link rel="self"` no coincide con la ubicación de subida. Se reconfirma por URL contra producción más abajo.

#### Accesibilidad y presupuestos, sobre el contenido ya publicado

```
T01-dark   violaciones: 0  reglas aprobadas: 34
T01-light  violaciones: 0  reglas aprobadas: 34
T03-dark   violaciones: 0  reglas aprobadas: 33
T03-light  violaciones: 0  reglas aprobadas: 33
```

```
========== T01 — /blog/que-version-de-la-nom-001-sede-esta-vigente/
  performance      100
  accessibility    100
  best-practices   100
  seo              100
LCP:                         1.51 s   (presupuesto 2.0 s)  DENTRO
Peso total transferido:      95170 B   (presupuesto 307200 B)  DENTRO
JS total:                    1137 B   (presupuesto 5120 B)  DENTRO

========== T03 — /blog/110-14c-decide-la-columna-no-el-conductor/
  performance      100
  accessibility    100
  best-practices   100
  seo              100
LCP:                         1.51 s   (presupuesto 2.0 s)  DENTRO
Peso total transferido:      91357 B   (presupuesto 307200 B)  DENTRO
JS total:                    1137 B   (presupuesto 5120 B)  DENTRO
```

**El SEO pasa de 60 a 100, y conviene no malinterpretarlo.** El 60 de E4-k venía de que `LayoutPost` pinta `<meta name="robots" content="noindex, nofollow">` cuando el post es borrador (`noindex={datos.borrador}`); al publicarse, esa etiqueta desaparece. **En producción los posts siguen sin ser indexables**, porque `public/_headers` emite `X-Robots-Tag: noindex` para todo el sitio. Esa cabecera se retira en la Etapa 9, y es justo donde vive P4. Publicado no es indexado, y hoy el sitio está en lo primero.

#### Dos referencias normativas nuevas que aparecen solo en prosa

Los textos revisados mencionan `310-15(b)(7)` en T03 y `310-15(b)(2)(b)` en T01 sin envolverlas en `CalloutNormativo` ni declararlas en `normativa[]`. **No es un fallo:** el cruce de I3 b cubre las citas marcadas como tales, y una mención en prosa no es una cita. Se anota porque es la frontera de lo que el invariante vigila, y conviene tenerla por escrito antes de que alguien la descubra creyendo que es un hueco.

### E4-al — Verificación en producción tras fusionar el PR #14 (2026-10-04)

Checks del PR en verde en Linux, con todos los pasos de CI —incluida la portabilidad, que esta vez **compara los dos posts en vez de omitirlos**—.

Producción, con los dos posts ya publicados:

```
https://calcinst.mx/blog/                                              200
https://calcinst.mx/blog/que-version-de-la-nom-001-sede-esta-vigente/  200
https://calcinst.mx/blog/110-14c-decide-la-columna-no-el-conductor/    200
https://calcinst.mx/blog/rss.xml                                       200
https://calcinst.mx/blog/categoria/practica-profesional/               200
https://calcinst.mx/blog/etiqueta/dof/                                 200
```

Los 404 de la verificación anterior (E4-o) eran de posts en borrador; ahora responden 200 porque están publicados. Las páginas de categoría y de etiqueta se generan solas desde el frontmatter.

**El aviso corregido, servido desde producción:**

```
La Nota Aclaratoria modifica esta referencia. Factores de corrección por temperatura
ambiente: la nota corrige la etiqueta de un renglón, que el texto de 2012 imprime como
91-75 °C y debe decir 71-75 °C. Los factores no cambian.

avisos: 3 | frase completa: 1 | colapsados: 2
«corrige un valor»: 1   (solo la Tabla 5, que es la única que lo hace)
meta robots noindex en la página: 0
```

AD12 se sostiene en producción —un aviso completo y dos colapsados— y la corrección de la semilla llegó: «corrige un valor» aparece una sola vez en todo T01, en la Tabla 5.

**RSS de producción, validado por URL en el W3C, con items reales por primera vez:**

```
<m:validity>true</m:validity>
<m:errorcount>0</m:errorcount>
<m:warningcount>0</m:warningcount>
```

**Cero errores y cero avisos.** Es la forma más fuerte en que se ha cumplido ese criterio: hasta ahora el feed se había validado con contenido de prueba (E4-j) o sin items (E4-o).

**Publicado no es indexado, y sigue siendo deliberado:**

```
> curl -sSI https://calcinst.mx/blog/que-version-de-la-nom-001-sede-esta-vigente/
HTTP/1.1 200 OK
x-robots-tag: noindex
```

La página ya no lleva `<meta name="robots">` —eso era la marca de borrador— pero `public/_headers` sigue emitiendo la cabecera para todo el sitio. Se retira en la Etapa 9, que es donde vive **P4**: al quitarla hay que emitir `X-Robots-Tag: noindex` condicionado al host para `*.workers.dev`, verificado con `curl -I` contra el dominio canónico y contra el host de workers.dev, las dos salidas literales.

**Con esto la Etapa 4 queda cerrada.** Los siete criterios del plan §6 están cumplidos con evidencia literal, P1 cerrado 9 de 9, y el contenido publicado y servido. El cierre queda sujeto a la verificación de Sebastián, conforme a la regla de puertas: la autoatestación no cuenta como evidencia.

## Decisión resuelta — D2 y "Cloudflare solo despliega lo que pasó CI"

D2 establece: *"Cloudflare solo despliega lo que pasó CI"*. La integración Git de Workers Builds no satisface ese enunciado por sí sola, porque Cloudflare construye al recibir un push, en paralelo con GitHub Actions y sin conocer su resultado.

**Resuelto el 2026-09-06 en la opción A:** integración Git más protección de rama en GitHub exigiendo el check `verificar`. `main` solo recibe commits que ya pasaron CI, de modo que lo que Cloudflare despliega también pasó CI. No requiere tokens, ni secretos en el repositorio, ni `wrangler` como dependencia. Evidencia en E1-o.

La opción B descartada era desplegar desde GitHub Actions con `wrangler deploy` tras el job `verificar`: cumple el enunciado de forma más literal, pero exige guardar un token de API de Cloudflare como secreto y fijar `wrangler` como dependencia. Se descarta por coste y superficie de riesgo, no por incapacidad técnica.

## Bloqueos

### P1 — Preservación de ruta en las dos Redirect Rules (corte: antes de cerrar la Etapa 4)

**CERRADO el 2026-10-04, E4-aj: 9 de 9 comprobaciones.** El corte y los requisitos
que siguen son el antecedente histórico; no constituyen un bloqueo vigente (HC-d).

Defecto documentado en E1-n. Corrección: cambiar ambas reglas a redirección **dinámica** con destino `concat("https://calcinst.mx", http.request.uri.path)` y *Preserve query string* activado.

**La Etapa 4 no se cierra sin esto**, por decisión de Sebastián (2026-09-06): desde el primer post publicado, un 301 hacia `calcinst.mxblog` sería un enlace permanente roto. No bloquea las Etapas 2 ni 3.

**La verificación debe cubrir tres casos, no solo uno** (requisito de Sebastián, 2026-09-06). Verificar únicamente una ruta simple fue lo que dejó pasar el defecto original:

| Caso | Petición | Resultado esperado | Qué detecta |
|---|---|---|---|
| Raíz | `https://www.calcinst.mx/` | `Location: https://calcinst.mx/` | Que `uri.path = /` **no** produzca doble barra (`https://calcinst.mx//`) al concatenar |
| Ruta | `https://www.calcinst.mx/blog/mi-post/` | `Location: https://calcinst.mx/blog/mi-post/` | La concatenación sin separador que rompió el hostname (`calcinst.mxblog`) |
| Ruta + query | `https://www.calcinst.mx/blog/?pagina=2&utm_source=x` | `Location: https://calcinst.mx/blog/?pagina=2&utm_source=x` | Que ruta y query se preserven **juntas**; el defecto 2 conservaba el query pero descartaba la ruta |

Los tres casos se repiten contra `calcinst.com` y `www.calcinst.com`, que usan la otra regla: son nueve comprobaciones en total.

### P2 — Juego de caracteres declarado como dato del proyecto (corte: antes de iniciar la Etapa 4)

**CERRADO el 2026-09-11, E4-a … E4-e.** Para micro prevalece la revisión posterior
AD9/E4-s del 2026-09-12: U+00B5 permitido, U+03BC prohibido; fuentes 57 336 B.
La resolución inicial que se conserva más abajo describe el estado anterior (HC-d).

Registrado a pedido de Sebastián (2026-09-10). **Requisito:** el juego de caracteres de las fuentes se declara explícitamente como dato versionado del proyecto, no se deriva del contenido existente, y **el build falla si un `.mdx` usa un carácter fuera del conjunto declarado**.

**Corrección de una premisa, con su causa.** Los 18 símbolos que motivaron el registro (`²` `°` `Ω` `±` `≈` `×` `≤` `≥` `µ`, las mayúsculas acentuadas y `¿` `¡`) **sí están declarados** en `scripts/generar-fuentes.mjs`: el conjunto se escribió a mano con notación técnica incluida, no se derivó del contenido. La redacción de E2-a («los 141 caracteres que el sitio usa») era imprecisa e inducía justo esa lectura; lo correcto es «los 141 caracteres declarados».

**Pero el problema de fondo existe, y es peor que el registrado: declarar un carácter no garantiza su glifo.** `subset-font` descarta en silencio lo que la fuente de origen no contiene. Medido el 2026-09-10 con harfbuzz sobre las fuentes ya generadas (descomprimidas a TrueType, porque harfbuzz no lee WOFF2 directamente; un primer intento sin descomprimir dio 0 glifos, artefacto de medición descartado):

```
ibm-plex-sans-400    glifos: 131 de 141 | sin glifo: ≤ ≥ ≈ Ω μ Δ → ← ✓ ✗
ibm-plex-sans-600    glifos: 131 de 141 | sin glifo: ≤ ≥ ≈ Ω μ Δ → ← ✓ ✗
ibm-plex-mono-400    glifos: 131 de 141 | sin glifo: ≤ ≥ ≈ Ω μ Δ → ← ✓ ✗
ibm-plex-mono-500    glifos: 131 de 141 | sin glifo: ≤ ≥ ≈ Ω μ Δ → ← ✓ ✗
```

**Diez caracteres declarados no tienen glifo en ninguna de las cuatro caras**, y varios son exactamente de los que el contenido normativo necesitará. Hoy ningún texto los usa, así que no hay daño visible; en cuanto un post escriba «≤ 3 %» o «Ω», el navegador los tomará de una fuente del sistema y mezclará tipografías dentro de una misma expresión.

**Causa:** el generador parte de los archivos `latin` de Fontsource, que siguen el rango `latin` de Google Fonts. Ese rango incluye U+2191 `↑` y U+2193 `↓` como excepción, pero no U+2192 `→` ni U+2190 `←`, ni el bloque griego, ni los operadores matemáticos — de ahí que `↑ ↓` sí aparezcan y `→ ←` no. **No es una carencia de IBM Plex:** la fuente completa oficial (`@ibm/plex-sans` 1.1.0, `fonts/complete/woff2/IBMPlexSans-Regular.woff2`) tiene 9 de los 10; solo le falta `✗`.

```
IBM Plex Sans Regular (completa)   ≤✔ ≥✔ ≈✔ Ω✔ μ✔ Δ✔ →✔ ←✔ ✓✔ ✗✘
```

La cobertura de **IBM Plex Mono completa no se pudo verificar** en esta sesión: la ruta armada en `@ibm/plex-mono` 2.5.0 dio 404 y el paquete unificado `@ibm/plex` 6.4.1 devuelve 403 en jsDelivr. Queda como primer paso de la resolución.

**Qué debe cumplir la resolución de P2:**

1. El conjunto vive en un archivo de datos versionado (por ejemplo, `src/config/caracteres.json`), no como constante dentro de un script.
2. El generador subconjunta desde las fuentes **completas** de IBM, no desde los recortes `latin` de Fontsource.
3. **Comprobación A:** todo carácter declarado tiene glifo en las cuatro caras generadas. Hoy fallaría con 10 caracteres — que es exactamente lo que debe detectar.
4. **Comprobación B:** todo carácter usado en un `.mdx` pertenece al conjunto declarado; si no, el build falla, nombrando archivo, línea y carácter.
5. Decidir qué hacer con `✗`, que no existe en IBM Plex: quitarlo del conjunto o aceptarlo documentado como carácter de otra fuente.
6. Decidir entre `µ` (U+00B5, signo micro, sí cubierto hoy) y `μ` (U+03BC, mu griega, no cubierta): son caracteres distintos que se ven igual, y la comprobación B obligará a usar uno de forma coherente.
7. Volver a medir el presupuesto de fuentes: añadir griego, operadores y flechas crece los archivos, que hoy suman 51.1 KiB de 60 KB.

**Resolución (2026-09-11): P2 cerrado**, como primer bloque de la Etapa 4. Decisiones en `DECISIONES_SITIO.md`, AD4; evidencia en E4-a … E4-e. De los siete requisitos de arriba: (1) el conjunto vive en `src/config/caracteres.json`; (2) se subconjunta desde IBM Plex completa; (3) la comprobación GLIFOS es bloqueante en CI y en el generador; (4) CARACTERES rechaza en `.md`/`.mdx` todo carácter no declarado; (5) `✗` sale del conjunto y pasa a SVG; (6) micro = μ (U+03BC), µ (U+00B5) prohibido; (7) el presupuesto se cumple en lectura estricta, 57 244 B. Hallazgo que corrigió la premisa: IBM Plex Mono no tiene griego ni completa; se cubre con IBM Plex Sans de respaldo, comprobado en el navegador (E4-d).

### P3 — Las URL de preview por PR dejaron de generarse (corte: antes de iniciar la Etapa 4)

**CERRADO el 2026-09-11, PR #5 y AD3.** Prevalece la resolución y verificación
registrada al final de este bloque; las alternativas pendientes anteriores son historia (HC-d).

Registrado a pedido de Sebastián (2026-09-10): la Etapa 4 depende de poder revisar cada PR en su preview.

**El síntoma empezó un PR antes de lo que se creía.** Contenido de los comentarios de Cloudflare, leído por API:

| PR | Fecha | Comentario de Cloudflare | Columna «Preview URL» |
|---|---|---|---|
| #1 | 2026-09-05 18:04 | «Deployment successful» | **sí**: `https://prueba-i5-humo-calcinst-web.instcalc.workers.dev` |
| #2 | 2026-09-06 02:43 | «Deployment successful» | **no** |
| #3 | 2026-09-08 14:55 | ninguno | — |

Al cerrar la Etapa 1 solo se revisó que el check de Workers Builds pasara, no el contenido del comentario; por eso la pérdida de la URL en el PR #2 pasó inadvertida.

**Correlación:** entre el PR #1 y el #2 entró el commit `9efa9e4`, que declaró `routes` con `custom_domain` en `wrangler.jsonc`. Además, `https://calcinst-web.instcalc.workers.dev/`, que respondía 200 al conectar el repositorio, **hoy devuelve 404**: algo desactivó el subdominio `workers.dev`, del que dependen las preview URLs.

**Lo que dice la documentación, y por qué no cierra el diagnóstico.** `https://developers.cloudflare.com/workers/wrangler/configuration/` indica que `workers_dev` vale `true` por omisión y que `preview_urls` hereda ese valor, **sin mencionar** que declarar `routes` lo cambie. La evidencia apunta a ese commit, pero la documentación no lo respalda: no se afirma una causa. Lo que sí documenta `https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/` es que `preview_urls` se puede fijar en el archivo de wrangler y que **ese archivo prevalece sobre el dashboard en cada despliegue**.

**Corrección aplicada (commit `f0b2b47`):** declarar ambos campos explícitamente en lugar de depender de valores por omisión que la evidencia y la documentación no reconcilian — `"workers_dev": false` (producción no se sirve en `workers.dev`, que es además el estado observado y evita un host duplicado del canónico) y `"preview_urls": true`. El PR de la Etapa 3 es la prueba; resultado en E3-g.

**Resultado (2026-09-10): no resolvió.** En el PR #4 no hubo comentario y la URL de preview de la versión desplegada devuelve 404 (E3-g). Con `workers_dev` en `false` no hay previews, declare lo que declare `preview_urls`.

**Decisión pendiente de Sebastián — el siguiente paso tiene un costo que no es técnico:**

- **Opción A — `workers_dev: true`.** Lo más probable es que devuelva las previews: era el estado al conectar el repositorio, cuando el PR #1 sí las tuvo. Pero expone producción en un **segundo host público** (`calcinst-web.instcalc.workers.dev`), cuando D2 fija un único canónico. Hasta la Etapa 9 no daña la indexación, porque todo el sitio lleva `noindex`; desde la 9, las etiquetas canónicas —que esa etapa introduce de todos modos— tendrían que cubrir también ese host.
- **Opción B — no usar previews de Cloudflare.** Revisar cada PR en local (`npm run build && npm run preview`) o con un artefacto del CI. No expone nada más, pero pierde la revisión en el entorno real, que es lo que la Etapa 4 quería para leer los posts antes de publicarlos.

Recomendación: **A**. El segundo host existió desde el primer día hasta el commit `9efa9e4`; mientras rija `noindex` no tiene efecto sobre buscadores, y la mitigación definitiva (canónicas) ya está en el plan. Se aplicaría en un commit propio y se verificaría con el primer PR siguiente.

**Resolución (2026-09-11): opción A, con condición.** Decisión de Sebastián, registrada como AD3 en `DECISIONES_SITIO.md`: `"workers_dev": true` en `wrangler.jsonc`. Sebastián corrigió además la recomendación anterior: **las canónicas no resuelven esto «del todo»** — una canónica es una señal, no una directiva —, y la condición queda como P4. Verificación exigida: que la preview del PR siguiente responda 200, con la URL registrada; si sigue en 404, detenerse y reportarlo sin improvisar alternativas.

**Verificación (2026-09-11, PR #5): P3 resuelto.** Las dos URL de preview responden 200:

```
=== https://7344e1de-calcinst-web.instcalc.workers.dev/diseno/ ===
HTTP/1.1 200 OK
Content-Type: text/html
x-robots-tag: noindex
=== https://p3-previews-y-h1-calcinst-web.instcalc.workers.dev/diseno/ ===
HTTP/1.1 200 OK
Content-Type: text/html
x-robots-tag: noindex
```

- **Por versión:** `https://7344e1de-calcinst-web.instcalc.workers.dev/` — el prefijo es el `Version ID` (`7344e1de-377c-4a39-b250-7e1f66c60ef9`) que publica el check de Workers Builds.
- **Por rama:** `https://p3-previews-y-h1-calcinst-web.instcalc.workers.dev/` — estable mientras exista la rama.

**Sirve el código de la rama, no una versión anterior:** su `/diseno/` ya cita «NOM-001-SEDE-2012», mientras producción seguía citando «NOM-001-SEDE-2018» en el mismo momento.

**El comentario del bot no es una señal fiable.** En el PR #5 el comentario de Cloudflare se creó a las 17:09:46 con «🔵 In progress» y **nunca se actualizó**, aunque el check de Workers Builds terminó en `pass`. Desde aquí, la URL de preview se obtiene del `Version ID` del check o del alias de rama, y se verifica con `curl`; el comentario se toma como decorativo.

**Efecto en producción tras fusionar:** `https://calcinst-web.instcalc.workers.dev/` pasa de 404 a servir el sitio. Es el costo aceptado en AD3, cubierto hoy por el `noindex` global y a partir de la Etapa 9 por P4.

### P4 — `noindex` condicionado al host `*.workers.dev` (destino: Etapa 9)

Condición de AD3, fijada por Sebastián el 2026-09-11. Texto literal:

> Al retirar el noindex global, emitir X-Robots-Tag: noindex condicionado al host para peticiones que llegan por *.workers.dev. Verificación: `curl -I` contra el dominio canónico y contra el host workers.dev, ambas salidas literales. La canónica no sustituye esta verificación.

**Viabilidad, comprobada en la documentación** (`https://developers.cloudflare.com/workers/static-assets/headers/`): `_headers` admite reglas con URL absoluta, y el ejemplo que da la propia página es exactamente este caso — `https://myworker.mysubdomain.workers.dev/*` con `X-Robots-Tag: noindex`. Se resuelve con una regla en `public/_headers`, sin código de Worker. Dos advertencias de la misma página: la URL absoluta debe empezar por `https`, y las reglas de `_headers` no se aplican a respuestas generadas por código de Worker (hoy no hay ninguna).

**Lo que la Etapa 9 no debe pasar por alto:** las previews también viven en `*.workers.dev` (`<versión>-calcinst-web.instcalc.workers.dev`, `<rama>-calcinst-web.instcalc.workers.dev`), así que la regla tiene que cubrir esos hosts y no solo el de producción. **No se ha comprobado** que `_headers` acepte un comodín en el host; si no lo acepta, hará falta una alternativa, que se decidirá entonces. La verificación con `curl -I` debe incluir un host de preview además de `calcinst-web.instcalc.workers.dev` y del canónico.

### P5 — Normalización Unicode fuera del alcance del check (destino: Etapa 9)

Registrado a pedido de Sebastián (2026-10-04), como consecuencia de AD9.

NFKC convierte U+00B5 en U+03BC, así que la relación de compatibilidad empuja en sentido contrario a la forma elegida para micro. `verificar-salida.mjs` ya cierra la ventana del HTML construido (E4-y), pero solo mira lo que hay en `dist/`.

**Lo que queda abierto:** las **imágenes OG** son el siguiente candidato a normalizar por su cuenta. Se generan fuera de este flujo —el texto pasa por un renderizador de fuentes que puede aplicar su propia normalización— y una imagen no se revisa leyendo `dist/` como texto. Cuando la Etapa 9 las añada, hay que comprobar explícitamente qué punto de código acaba dibujado, no cuál se le pasó.

### P6 — Aviso de obsolescencia de `markdown.smartypants` (corte: al subir de versión de Astro)

Tolerado a propósito, no olvidado. `markdown.smartypants: false` funciona y es lo que mantiene el tipógrafo apagado (AD11), pero Astro 7 lo marca obsoleto y lo avisa **una vez por proceso** en `astro check`, `npm test` y `npm run build`.

Las tres salidas se midieron antes de proponer nada (E4-ai): no hay sustituta en la configuración sin declarar un paquete, y quitar la clave silencia el aviso pero devuelve las comillas inglesas y rompe I2 con los mismos once fallos. **Se eligió el aviso antes que la dependencia.**

**Condición de cierre:** se elimina cuando toque subir de versión de Astro, que es cuando `markdown.smartypants` desaparece de todas formas. En ese momento la forma vigente —`markdown.processor`— ya habrá que adoptarla, y la decisión sobre `@astrojs/markdown-satteri` se toma entonces con el cambio de major delante, no para silenciar una línea.

**Mientras tanto, el aviso no se filtra de la batería de cierre.** Una batería con ruido es una que se deja de leer, así que el ruido que queda está aquí identificado y acotado: una línea, una vez por comando, de causa conocida. Si aparece cualquier otro aviso, no es este.

### Otros pendientes

- **H11** (corte vencido en Etapa 0): confirmar que D4/D5 coinciden con la memoria del proyecto; si no, se emite el addendum que corresponda. Único punto de gobierno abierto desde la Etapa 0.
- **Correo de contacto público** (corte: Etapa 6). `SITIO.correoContacto` está en `null` a propósito: publicar una dirección es decisión de Sebastián. Lo necesitan la página de Contacto (Etapa 6) y el correo alterno que exige I1 en el formulario (Etapa 8).
- **Revisión de `capacidades.json` — de Sebastián; bloquea la Etapa 5, no la 4.** (1) Nombres y descripciones son redacción provisional (`"redaccionProvisional": true`). (2) Los `motivo` se copiaron de §4.3, que cita `ESTADO_PROYECTO.md` del 2026-07-30, y pueden estar desfasados. La revisión debe distinguir **dos cosas distintas**: (a) si las correcciones de los Art. 430-22 y 430-24 ya se aplicaron al motor de cálculo, y (b) si existe el **caso de referencia calculado a mano**. **Solo (b) permite pasar** `sizing-caso-1`, `sizing-caso-2` y `sizing-caso-3-alimentador` a `verificado`: que el código esté corregido no demuestra que calcule bien. (3) `normativa[]` está vacío en todas las capacidades: poblarlo es contenido normativo y debe cotejarse con el DOF (I3).
- **Inicio sin `LayoutBase`** (corte: Etapa 5). `index.astro` sigue siendo la página mínima de la Etapa 1. Ponerle la barra de navegación ahora publicaría en la portada enlaces a páginas que aún no existen (`/producto/`, `/blog/`…); la Etapa 5 la reconstruye sobre el layout.

  Aclaración HC-d: `/blog/` ya existe y está publicado (E4-al); ese ejemplo es
  histórico. Siguen pendientes `/producto/` y las páginas de sus etapas respectivas.
- **Icono del sitio** (decisión de marca; corte: Etapa 10, cuyo criterio exige Lighthouse ≥ 95 en buenas prácticas). Hoy `LayoutBase` declara `<link rel="icon" href="data:,">` solo para que el navegador no pida `/favicon.ico` y registre un 404 en cada página (E4-k).
- **Enlaces a `/normativa/…`** (corte: Etapa 9). `CalloutNormativo` y el RSS ya enlazan a `/normativa/{ref}/`, que no existe hasta la Etapa 9: esos enlaces dan 404 mientras tanto.
- **`enforce_admins`: cerrado, no pendiente.** Permanece en `false` por decisión consciente de Sebastián; queda registrado en `DECISIONES_SITIO.md`, AD1.

**Para iniciar la Etapa 4 debían estar resueltos P2 y P3**, y para cerrarla, P1. **Los tres lo están**: P2 y P3 el 2026-09-11, P1 el 2026-10-04 (E4-aj). Además la Etapa 4 depende de contenido humano: los posts T01 y T03 los redacta Sebastián. **H1 dejó de ser un bloqueo el 2026-09-12**: Sebastián la cerró como refutada (AD6, E4-p), así que T01 ya no espera por la versión de la norma.

## Nota sobre E0-f

E0-f (salidas de `git status --porcelain`, `git log --oneline` y `Get-ChildItem -Force` del commit único) se presenta en el mensaje de cierre de la sesión y no dentro de este archivo: el archivo no puede contener la evidencia de su propio commit sin generar un segundo commit, prohibido por el protocolo ("un solo commit").

## Addenda

### A1 — D2: Pages vs Workers con activos estáticos (2026-09-05)

**Alcance:** este addendum toca únicamente el *cómo se despliega* de D2. No reabre D1 (stack), ni el resto de D2 (Cloudflare como proveedor, `calcinst.mx` canónico, `main` = producción, CI en GitHub Actions), ni ninguna otra decisión.

**Hallazgo 1 — `_headers` y `_redirects` en Workers con activos estáticos: soportados, misma sintaxis.**

- `https://developers.cloudflare.com/workers/static-assets/headers/` — el archivo `_headers` existe en Workers con el mismo formato de bloques (`[url]` seguido de `[nombre]: [valor]` indentado) y se coloca en el directorio de activos estáticos (`public/` con framework). Límites documentados: 100 reglas y 2 000 caracteres por línea. Limitación explícita anotada: *"Custom headers defined in the `_headers` file are not applied to responses generated by your Worker code"* — no afecta a este sitio, porque el `noindex` de la Etapa 1 (y su retiro en la Etapa 9) aplica sobre respuestas de activos estáticos, que es justo lo que sí cubre. Sí es un dato a recordar en fase 2: las respuestas generadas por código de Worker (p. ej. el *webhook* de Stripe) deberán fijar sus cabeceras en el propio código.
- `https://developers.cloudflare.com/workers/static-assets/redirects/` — el archivo `_redirects` existe en Workers con la sintaxis `[origen] [destino] [código?]`, admite 301/302/303/307/308 (302 por omisión), *splats* (`*`) y *placeholders* (`:nombre`). Límite documentado: 2 000 redirecciones estáticas y 100 dinámicas. No admite coincidencia por *query parameters*, país, idioma ni cookie — irrelevante aquí, porque las redirecciones de dominio (D2, `www.` y `.com` → apex) se resuelven con **Redirect Rules a nivel de zone**, no con `_redirects`, que es intra-proyecto. El uso previsto de `_redirects` en el plan es el de D8: 301 internas al renombrar un `slug` de post, y para eso basta y sobra.

**Hallazgo 2 — Preview deployments por pull request en Workers Builds: existen de forma nativa, con un interruptor que hay que encender.**

- `https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/` — la casilla *"Builds for non-production branches"* habilita builds en toda rama distinta de la de producción; **viene desactivada por omisión** y se activa en Settings → Build → Branch control.
- `https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/` — con el repositorio conectado, cada rama tiene su propia URL de preview estable, que se publica **como comentario en cada pull request** y siempre apunta a la última versión de esa rama. En builds de preview el comando de despliegue se sustituye por `wrangler versions upload`, que crea una versión sin promoverla a producción. Limitación documentada: no se generan preview URLs para Workers que implementen Durable Objects (este sitio no los usa).
- Diferencia real frente a Pages: en Pages los previews por rama están activos por omisión; en Workers son una casilla. Es fricción de configuración de una sola vez, no una capacidad ausente.

**Hallazgo 3 (no pedido, observado directamente y decisivo) — el adaptador que ya usamos produce un Worker, no un proyecto de Pages.**

En la prueba de humo I5 (E1-f), `@astrojs/cloudflare` 14.3.0 generó `dist/server/wrangler.json` con `"main": "entry.mjs"` y `"assets": { "binding": "ASSETS", "directory": "../client" }`. Es exactamente la forma de un *Worker con activos estáticos*. Elegir Pages significaría, en fase 2, desplegar contra el modelo que el propio adaptador de Astro ya no emite por omisión.

**Decisión: Workers con activos estáticos** (en lugar de Cloudflare Pages), porque los dos criterios que sostenían la recomendación original se cumplen igual —`_headers` y `_redirects` con la misma sintaxis (1), y previews por PR de forma nativa (2)— y porque el criterio que hacía preferible a Cloudflare en D2 (ruta a funciones serverless en fase 2 sin cambiar de proveedor) queda mejor servido por el destino que el adaptador de Astro ya genera (3). Se suma que el panel de Cloudflare hoy no ofrece Pages en el menú del dominio para proyectos nuevos.

**Costo de este cambio respecto al plan original: ninguno.** No hay repositorio conectado, no hay despliegue, no hay DNS apuntando a un proyecto. Lo único que cambia en el repositorio es el destino del despliegue; `public/_headers` se conserva tal cual (misma sintaxis) y ningún archivo de contenido, componente o configuración de build se altera. Tomar esta decisión después de conectar el repositorio sí habría sido una migración.

**Consecuencia operativa para esta etapa:** al conectar, hay que activar la casilla *Builds for non-production branches*, sin la cual el PR de la prueba de humo I5 no genera preview y la puerta de la Etapa 1 no se puede cerrar.

### A2 — El conmutador de tema es JS plano, no una isla React (2026-09-08)

**Contradicción del plan consigo mismo.** §4.1 y §3.5 sitúan el conmutador en `src/components/islas/ConmutadorTema.tsx`, es decir, una isla React. I4 fija un presupuesto de **5 KB de JS** en páginas de contenido. React más ReactDOM rondan los 45 KB comprimidos: cumplir ambas cosas es imposible.

**Resolución: manda el invariante.** El propio plan ya apuntaba a esta salida sin decirlo — en los riesgos de la Etapa 10 pide resolver el parpadeo de tema «con script inline bloqueante de < 300 bytes en `<head>`», que es JS plano, no React.

Implementación: `src/components/ScriptTema.astro` (fijador bloqueante en `<head>`, 241 B medidos) y `src/components/ConmutadorTema.astro` (el botón y su listener). El proyecto **no tiene dependencia de React**, y el JS total de la página más cargada es de 1.42 KiB.

**Costo de revertir:** medio. Volver a React exigiría añadir `@astrojs/react`, `react` y `react-dom`, y renegociar I4. No hay motivo previsible para hacerlo: ningún componente de la Etapa 2 necesita estado de cliente más allá de tres listeners.

### A3 — Dos tokens de color corregidos y uno nuevo (2026-09-08)

Los contrastes de §3.2 eran estimaciones y el propio plan pedía verificarlos con herramienta. Medidos sobre el render real, dos no llegaban al umbral que exige el criterio de la etapa:

| Token | Valor del plan | Medido (peor fondo) | Valor corregido | Medido tras corregir |
|---|---|---|---|---|
| `--fg-2` (oscuro) | `#6B7885` | 3.64 sobre `--bg-2` | `#7D8894` | 4.56 |
| `--accent` (claro) | `#9A6700` | 4.30 sobre `--bg-2` | `#956400` | 4.52 |

El plan ya admitía la fragilidad de `--fg-2` («solo para texto ≥ 18 px o no esencial»), pero el criterio de la Etapa 2 pide 4.5:1 para texto sin esa excepción, así que se corrige en vez de documentar una salvedad.

**Token nuevo: `--color-line-ui`.** §3.2 define un único `--color-line` para «bordes, separadores», marcado como decorativo. Pero §3.5 usa ese mismo borde como el único indicador visual del botón `secundario`, y el borde de un control interactivo sí está sujeto a WCAG 1.4.11 (3:1). Separarlos evita la disyuntiva entre subir el contraste de todos los separadores —lo que ensuciaría la dirección visual densa y sobria— o dejar los controles por debajo del umbral:

- `--color-line` sigue siendo decorativo (paneles, separadores). Medido: 1.46 / 1.25.
- `--color-line-ui` es para bordes de controles. Medido: 3.56 / 3.05 en oscuro, 3.27 / 3.08 en claro.

El tema claro completa además los tokens que §3.2 dejaba sin especificar (`--fg-2`, `--color-line`, `--color-grid`, `--ok`, `--warn`, `--danger`), todos verificados en los tres fondos.

**Costo de revertir:** nulo. Son valores en un archivo de tokens.

### A4 — La página de diseño se sirve en `/diseno/`, no en `/_diseno/` (2026-09-08)

El plan pedía `src/pages/_diseno.astro` sirviendo `/_diseno/`. **Es imposible en Astro:** los archivos con prefijo `_` dentro de `src/pages` quedan excluidos del enrutado por diseño, precisamente para poder colocar ahí archivos que no son páginas.

Comprobado, no supuesto: se creó `src/pages/_prueba.astro`, se construyó, y la salida solo contenía `index.html` — ninguna ruta para el archivo con guion bajo.

La página se sirve en `/diseno/` con `<meta name="robots" content="noindex, nofollow">`. **Pendiente para la Etapa 9:** excluirla del sitemap explícitamente. Hoy todo el sitio lleva `X-Robots-Tag: noindex` por cabecera, pero esa cabecera se retira en la Etapa 9, y a partir de entonces el `noindex` de esta página depende solo de su propia etiqueta.

**Costo de revertir:** bajo. Cambiar la ruta después exigiría una redirección 301, pero es una página interna sin enlaces entrantes.

### A5 — El sistema de diseño no usa utilidades de Tailwind (2026-09-08)

D1 fija el stack «Astro + MDX + Tailwind CSS v4», y así sigue: `tailwindcss` y `@tailwindcss/vite` continúan instalados y configurados en `astro.config.mjs`. Pero los componentes de la Etapa 2 se escribieron con **propiedades personalizadas CSS y estilos con ámbito**, no con clases de utilidad.

Razón: §3 describe un sistema de *tokens*, y expresarlo como variables CSS lo hace legible desde cualquier componente, comprobable desde el navegador (que es como se midió el contraste en E2-b) y portable si algún día el stack cambia, lo que empuja en la dirección de I2. Mantener a la vez el *preflight* de Tailwind y el reset propio de `tokens.css` duplicaba reglas sin aportar nada, así que se eliminó `src/styles/global.css`, que era el único punto de entrada de Tailwind y no lo usaba nadie.

Tailwind queda disponible: la etapa que necesite utilidades solo tiene que volver a importarlo. **No se cambia D1.**

**Costo de revertir:** nulo. Es un `@import` de una línea.

### A6 — Tailwind desinstalado; resuelve A5 (2026-09-10)

A5 dejó Tailwind instalado sin uso. Sebastián pidió decidirlo con fecha de corte; se desinstaló en la Etapa 3 (commit `e12657c`). Decisión, razones y efecto sobre D1 en `DECISIONES_SITIO.md`, AD2. A5 se conserva sin editar como registro de la situación previa.

### A7 — Decisiones de implementación de la Etapa 3 que precisan el plan (2026-09-10)

Ninguna cambia una decisión D1–D8; se registran porque el código hace algo más preciso o más estricto de lo que el plan dice literalmente.

1. **`TEXTO` gana dos campos sobre §4.2.** El plan define `accion`, `banner` y `descarga`. Se añaden `pie` —el criterio de la etapa exige que el pie cambie con el estado, y §4.2 no le daba texto— e `insignia` `{ tono, texto }`, que es el mapeo estado→insignia que la Etapa 2 dejó prometido al quitar a `Insignia` sus variantes de estado. En `disponible`, `pie` es `null`: un producto ya lanzado no necesita anunciar su estado en cada pie de página.
2. **I7 compara sin acentos y sin mayúsculas.** El plan lista cuatro literales exactos; comparados al pie de la letra, «Próximamente» con mayúscula, «PROXIMAMENTE» o «Unete a la lista» se colarían. Se normalizan contenido y literales antes de comparar.
3. **I7 recorre `src/` excepto `src/config/`, no «cualquier archivo fuera de `src/config/`».** Leído literalmente, el enunciado del plan haría fallar al propio verificador, a los documentos de gobierno y a las pruebas, que necesariamente nombran esos literales. El objetivo del invariante es el código y el contenido del sitio, que viven en `src/`.
4. **Consecuencia deliberada de I7: los componentes no pueden comparar estados.** `proximamente` es a la vez literal prohibido y nombre de la clave del estado, así que escribir `ESTADOS.proximamente` fuera de `src/config/` también falla. Es lo buscado: toda lógica que dependa del estado vive en la configuración (por ejemplo, la regla de «Precios» de §4.4 es una función pura en `navegacion.ts`) y los componentes solo reciben valores ya resueltos. Hay una prueba que lo fija.
5. **`astro.config.mjs` importa el dominio de `sitio.ts`** en vez de repetirlo, para que el canónico tenga una sola fuente.
6. **`index.astro` no pasa todavía a `LayoutBase`** (ver «Otros pendientes»): la barra publicaría en la portada enlaces a páginas inexistentes.

### A8 — Diferencias de la Etapa 4 con el plan, por Astro 7 y por lo encontrado al construir (2026-09-11)

Ninguna cambia una decisión D1–D8; se registran porque el código difiere de la letra del plan.

1. **La configuración de colecciones va en `src/content.config.ts`**, no en `src/content/config.ts`: es el archivo que busca Astro 7 (comprobado en su código).
2. **El índice paginado es `[...page].astro`**, no `[...pagina].astro`: `paginate()` de Astro 7 exige que el parámetro se llame `page` y fallaría con `PageNumberParamNotFound`. La URL no cambia: `/blog/2/`.
3. **Los posts no importan componentes**: se inyectan con `<Content components={…} />`. Un `import` en un `.mdx` no es portable, e I2 lo rechaza.
4. **`@astrojs/mdx` 8 no usa remark** (usa `markdown-satteri`). La prueba de portabilidad «con remark puro» es, por eso, un análisis independiente del motor del sitio, y **acepta GFM** por decisión de Sebastián (AD5).
5. **Borradores con `MOSTRAR_BORRADORES=1`**: el plan dice que se excluyen del build de producción, pero no cómo validarlos. La variable existe solo para eso y nunca se configura en Cloudflare.
6. **El cruce cuerpo↔frontmatter compara también tipo y versión**, no solo la referencia, y señala la línea **del archivo**.
7. **`trailingSlash: 'always'`** en `astro.config.mjs`, para que todas las URL que genera Astro terminen en barra, como fija D8.
8. **`npm run build` usa `astro build --force`**, por un caso límite de Astro 7: al borrar el último post, el caché de contenido rompe el build (E4-m).
9. **I3 c admite contextos negativos como frases exactas**, no por heurística: hoy, la del `Descargo` y el ejemplo del propio plan.

### A9 — Decisiones de continuidad recibidas antes de la Etapa 5 (2026-10-24)

Autoridad: `TRASPASO_ETAPA5.md` §4, aportado por Sebastián como instrucción de esta
sesión. No autoriza iniciar la Etapa 5 ni cambiar `capacidades.json`.

1. **H10 se replantea:** la comparación de Inicio/Producto contrasta proceso y
   controles, sin atribuir errores a la hoja de un tercero. Sustituye el enfoque del
   plan §6, Etapa 5, y §8 H10. Puede apoyarse en la corrección pública de la Tabla 5
   por el DOF; no afirma superioridad no medida ni generaliza defectos de una hoja.
   El plan original permanece íntegro; H10 conserva su texto histórico y registra
   el estado «replanteada». La redacción y publicación se realizarán en su etapa.
2. **CTA decidido:** en `proximamente` llevará al blog con texto descriptivo; en
   la Etapa 8 volverá «Únete a la lista» con un destino real. La lógica seguirá en
   `lanzamiento.ts` (I7). Decisión registrada, implementación pendiente fuera de
   las cuatro tareas de este bloque. No se crean descarga ni formulario.
3. **Verificación de capacidades:** se realiza en el repositorio del motor con
   los cuatro elementos de referencia de §5 del traspaso. El sitio consume el
   inventario confirmado; no certifica el motor. Antes de modificarlo, Sebastián
   debe indicar dónde está el trabajo posterior al 18 de agosto o si no está
   publicado. El diagnóstico de octubre es contexto autoritativo del producto,
   no una lista de tareas del sitio ni una invitación a auditar de nuevo `main`.


## Evidencia de cierre del bloque de higiene

### HC-e — Batería local completa (2026-10-24)

Comandos en el orden solicitado. `npm` se ejecuta mediante Node y el CLI local
11.13.0 autorizado, sin modificar scripts del proyecto. `NO_COLOR=1` solicita
salida sin color; no se filtran líneas. Cada salida se guarda inmediatamente.

```text
> npm run check

> calcinst-web@0.0.1 check
> astro check

EPERM: operation not permitted, mkdir 'C:\Users\Sebastian\AppData\Roaming\astro\Config'
  Location:
    C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\node_modules\@astrojs\telemetry\dist\config.js:56:8
  Stack trace:
    at Object.mkdirSync (node:fs:1410:26)
    at get store (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/config.js:38:10)
    at AstroTelemetry.getConfigWithFallback (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/index.js:40:38)
    at get isDisabled (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/index.js:69:17)
    at notify (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/astro/dist/cli/telemetry/index.js:5:19)
EXIT=1
```

```text
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web


 Test Files  5 passed (5)
      Tests  126 passed (126)
   Start at  10:11:50
   Duration  3.18s (import 56%, transform 29%, tests 14%, worker 1%)

EXIT=0
```

```text
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT=0
```

```text
> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

```text
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```text
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

EPERM: operation not permitted, mkdir 'C:\Users\Sebastian\AppData\Roaming\astro\Config'
  Location:
    C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\node_modules\@astrojs\telemetry\dist\config.js:56:8
  Stack trace:
    at Object.mkdirSync (node:fs:1410:26)
    at get store (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/config.js:38:10)
    at AstroTelemetry.getConfigWithFallback (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/index.js:40:38)
    at get isDisabled (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/@astrojs/telemetry/dist/index.js:69:17)
    at notify (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/node_modules/astro/dist/cli/telemetry/index.js:5:19)
EXIT=1
```

```text
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/scripts/verificar-invariantes.mjs:206
    throw new Error(
          ^

Error: verificarNotacionEnSalida: no hay archivos de texto en dist/. Ejecuta el build antes.
    at verificarNotacionEnSalida (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/scripts/verificar-invariantes.mjs:206:11)
    at main (file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/scripts/verificar-salida.mjs:21:18)
    at file:///C:/Users/Sebastian/Documents/ChatGPT/Calc%20Inst/calcinst-web/scripts/verificar-salida.mjs:33:3

Node.js v24.22.1
EXIT=1
```

```text
> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx (no construido: borrador en un build sin MOSTRAR_BORRADORES; se omite la comprobación 3)
verificar-portabilidad: 2 post(s), 0 comparado(s) con su página, 0 fallo(s)
EXIT=0
```


### HC-f — Repetición de la batería con permisos de ejecución (2026-10-24)

HC-e conserva el intento completo: check/build fallaron con EPERM al crear
AppData/Roaming/astro/Config; verificar:salida falló por ausencia de dist.
Portabilidad salió 0 pero comparó 0 páginas: no acredita el criterio. Se repite
la batería completa con aprobación fuera del sandbox, sin cambiar código ni
filtrar salidas. Se configura stdout de Python como UTF-8 para mostrar los
acentos; el archivo de evidencia ya se escribía en UTF-8.

```text
> npm run check

> calcinst-web@0.0.1 check
> astro check

▶ Astro collects anonymous usage data.
  This information helps us improve Astro.
  Run "astro telemetry disable" to opt-out.
  https://astro.build/telemetry

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
10:12:31 [content] Syncing content
10:12:31 [content] Synced content
10:12:31 [types] Generated 684ms
10:12:31 [check] Getting diagnostics for Astro files in C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web...
Result (49 files): 
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```text
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web


 Test Files  5 passed (5)
      Tests  126 passed (126)
   Start at  10:12:40
   Duration  3.24s (import 55%, transform 36%, tests 9%, worker 1%)

EXIT=0
```

```text
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT=0
```

```text
> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

```text
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```text
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
10:12:50 [WARN] [content] data store cleared (force)
10:12:51 [content] Syncing content
10:12:51 [content] Synced content
10:12:51 [types] Generated 490ms
10:12:51 [build] output: "static"
10:12:51 [build] mode: "static"
10:12:51 [build] directory: C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\dist\
10:12:51 [build] Collecting build info...
10:12:51 [build] ✓ Completed in 546ms.
10:12:51 [build] Building static entrypoints...
10:12:51 [vite] ✓ built in 408ms
10:12:51 [vite] ✓ built in 26ms
10:12:51 [build] Rearranging server assets...

 generating static routes 
10:12:52   ├─ /blog/categoria/conductores/index.html (+24ms) 
10:12:52   ├─ /blog/categoria/motores/index.html (+3ms) 
10:12:52   ├─ /blog/categoria/canalizaciones/index.html (+3ms) 
10:12:52   ├─ /blog/categoria/puesta-a-tierra/index.html (+3ms) 
10:12:52   ├─ /blog/categoria/practica-profesional/index.html (+3ms) 
10:12:52   ├─ /blog/etiqueta/110-14c/index.html (+5ms) 
10:12:52   ├─ /blog/etiqueta/ampacidad/index.html (+4ms) 
10:12:52   ├─ /blog/etiqueta/dof/index.html (+5ms) 
10:12:52   ├─ /blog/etiqueta/nom-001-sede/index.html (+7ms) 
10:12:52   ├─ /blog/etiqueta/temperatura/index.html (+5ms) 
10:12:52   ├─ /blog/etiqueta/terminales/index.html (+7ms) 
10:12:52   ├─ /blog/etiqueta/verificacion/index.html (+6ms) 
10:12:52   ├─ /blog/etiqueta/vigencia/index.html (+4ms) 
10:12:52   ├─ /blog/rss.xml (+91ms) 
10:12:52   ├─ /blog/110-14c-decide-la-columna-no-el-conductor/index.html (+7ms) 
10:12:52   ├─ /blog/que-version-de-la-nom-001-sede-esta-vigente/index.html (+6ms) 
10:12:52   ├─ /blog/index.html (+4ms) 
10:12:52   ├─ /diseno/index.html (+121ms) 
10:12:52   ├─ /index.html (+3ms) 
10:12:52 ✓ Completed in 663ms.

10:12:52 [build] ✓ Completed in 1.16s.
10:12:52 [build] 18 page(s) built in 1.71s
10:12:52 [build] Complete!
EXIT=0
```

```text
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT=0
```

```text
> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
EXIT=0
```


### HC-g — CI y descarga efectiva del artefacto Lighthouse (2026-10-24)

Run: https://github.com/sebashealy/calcinst-web/actions/runs/40110247188
Job: https://github.com/sebashealy/calcinst-web/actions/runs/40110247188/job/120920273434
Head de la rama probado: `699cc452cfda17291eb310d5c2c10ebce511f124`.
Checkout de integración que ejecutó Actions: `9a896db263ac83f6e99afcbe08525b9f18f6a335`.
Resultado consultado por API: `completed`, `success`; subida de Lighthouse `success`.

Se comprobó el listado de artefactos y **se ejecutó la descarga del ZIP** mediante
el conector GitHub (`download_workflow_artifact`), no solo la existencia del enlace.
La herramienta devolvió el archivo `lighthouse-HC-c.zip`, MIME `application/zip`,
referencia `file_00000000970881f59a9cfc14c4265695`, sin error. El enlace temporal de
esa descarga no se versiona; la ruta estable de GitHub es:

https://github.com/sebashealy/calcinst-web/actions/runs/40110247188/artifacts/12566057136

| Dato comprobado | Valor |
|---|---|
| Nombre | lighthouse |
| ID | 12566057136 |
| Tamaño | 7 238 503 bytes |
| Archivos subidos, según el log del job | 22 |
| Informes Lighthouse generados, según el log | 5 |
| Expirado al consultar | false |
| Creado | 2026-10-24T16:11:21Z |
| Expira | 2027-01-22T16:09:29Z |
| SHA-256 del ZIP, API y log coincidentes | 14000a78c2df4b29597e81588b21c895c5f4f84c3653434c8423f2c0a47b55ad |

Esto cumple la prueba de conservación de HC-c. No cambia los umbrales de Lighthouse
ni acredita criterios de una Etapa 5 todavía no autorizada. El run corresponde al
cambio funcional; los commits posteriores solo completan documentación. El CI del
último commit del PR debe comprobarse antes de fusionar.

### HC-h — Resultado de cierre y transferencia

HC-f terminó con **exit 0 en los ocho comandos**, en el orden solicitado: check
49 archivos, 0 errores/avisos/hints; 126 pruebas en 5 archivos; lint y formato limpios;
7 verificaciones sin fallos; 18 páginas; notación de salida sin fallos; portabilidad
2 posts, 2 comparados, 0 fallos. Coincide con todos los números de la línea base.
Las salidas completas están arriba, sin filtrado; HC-e conserva el intento fallido
por permisos. No se sustituye ese intento por el resultado posterior.

Avisos distintos de P6 que se observaron y no se ocultan:

- Local: aviso inicial de telemetría de Astro y `[WARN] [content] data store cleared
  (force)` por el build con `--force` ya decidido en A8/E4-m.
- Instalación: deprecaciones y 34 vulnerabilidades (detalle literal en HC-d).
- CI: `punycode` (DEP0040), `url.parse()` (DEP0169), acciones v4 dirigidas a Node 20
  ejecutadas por el runner con Node 24; aviso de scripts de instalación de IBM Plex
  no cubiertos por `allowScripts`; `GitHub token not set` de Lighthouse. El upload
  del artefacto sí pasó. No se cambiaron acciones, permisos, scripts ni dependencias
  para silenciar estos avisos. CI usa Node 24.21.0/npm 11.19.0; local usa
  Node 24.22.1/npm 11.13.0. Las dependencias siguen fijadas por el mismo lockfile.

**Continuidad:** el bloque contiene plan y traspaso preservados, corrección H1/JSON,
conservación de Lighthouse verificada y notas históricas alineadas. Etapa 4 cerrada
y ratificada por el traspaso; Etapa 5 no iniciada ni autorizada. P4/P5/P6 siguen en
sus destinos originales. No se tocó `capacidades.json`, la aplicación, Cloudflare
ni las páginas de etapas futuras. La decisión de CTA al blog está registrada en A9
pero su implementación no se ejecutó dentro de estas cuatro tareas de higiene.

**Siguiente paso:** revisar el PR #16 sin fusionarlo automáticamente. Antes del
inventario, Sebastián debe responder: ¿en qué rama del repositorio privado
`calcinst` está el trabajo posterior al 18 de agosto, o no está publicado? No inferir
la respuesta desde `main` ni ejecutar tareas del diagnóstico de la aplicación.
Después, solicitar el bloque concreto que corresponda; la Etapa 5 requiere su
propia autorización expresa. Leer `TRASPASO_ETAPA5.md`, este bloque HC-a … HC-h,
`HIPOTESIS_SITIO.md`, `DECISIONES_SITIO.md` y el plan original antes de continuar.

Comprobación final de conservación sobre los blobs ya versionados (no solo sobre
los archivos del checkout): el cuerpo de `PLAN_SITIO_WEB.md` coincide byte a byte
con el adjunto tras retirar la nota inicial, y `TRASPASO_ETAPA5.md` coincide íntegro.
La comparación contra la base de `capacidades.json`, `package.json`,
`package-lock.json`, `wrangler.jsonc` y `lanzamiento.ts` no produjo diferencias.
Git avisó de la conversión CRLF a LF al incorporar salidas capturadas en Windows;
es la política existente de `.gitattributes`, no un cambio de contenido ni un aviso
que se atribuya a P6.


### E5-b — Inventario auditado y comprobación dirigida del motor (2026-10-27)

Se actualiza `src/config/capacidades.json` desde el ZIP identificado en E5-a.
Se retiran los motivos históricos de 430-22/430-24 y aluminio seleccionable.
Protecciones pasa de planeado a implementado (ADR-0016). Memoria pasa a
verificado exclusivamente como exportación para revisión: MEM1 acredita PDF
real, comparación con CSV y pruebas independientes; no se promete certificación
ni validez legal. Ft conserva verificado por ADR-0013/FT1 y pruebas ejecutadas.
Fa conserva su alcance de portadores por tubo. Casos 1–3 y caída permanecen
implementados: los defectos antiguos están corregidos, pero no se declara cerrada
la cobertura normativa de la afirmación comercial (tensiones estimadas, cascadas,
fórmula de caída). La fuente ya no es julio y los motivos explicitan los límites.
Las referencias DOF se atribuyen al expediente del motor y E4-ak; no se hizo
un nuevo cotejo de tablas oficiales durante esta sesión. Las capacidades sin
cálculo normativo (dibujo, distancias geométricas, exportaciones) no requieren
referencias normativas; caída/protecciones quedan sin referencias publicables
hasta cerrar ese cotejo. No se añaden cotización ni funcionalidades de otras etapas.

Comando ejecutado en la copia del ZIP, sin instalar paquetes:
`node node_modules/vitest/vitest.mjs run tests/engine/ftYAmpacidad.test.ts tests/engine/flcIntegracion.test.ts tests/engine/faTramosMixtos.test.ts tests/engine/cascadaAlimentadores.test.ts tests/export/memoriaModelo.test.ts`.
Salida completa (exit 0):

```text
 RUN  v4.1.7 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/revision-calcinst-94b7661f/calcinst

 Test Files  5 passed (5)
      Tests  101 passed (101)
   Start at  15:45:04
   Duration  2.41s (transform 2.67s, setup 0ms, import 3.78s, tests 874ms, environment 1ms)
```

### E5-c — Demostración y captura real (2026-10-27)

`demo.calcinst.json`: CAS1-R1 sintético (tres motores de 30, 20 y 15 HP a 440 V,
THHW-LS cobre; tres TD en cascada), solo se cambian nombre e id. No contiene datos
de clientes. Hash inicial f078e6372514fe6bee6d063b2e3961f4889f587ea7d30598fb9571f060480370.
Se ejecuta la aplicación desde su fuente con las dependencias incluidas en el ZIP.
No se modifica su código ni se usa su dist antiguo. Vite puede generar caché local.
`node scripts/generar-capturas.mjs`: el primer intento en sandbox agotó 30000 ms
(TimeoutError de Puppeteer); la repetición con permiso para Chrome local terminó:

```text
Captura real 2560 × 1600 (2×); demostración cargada; errores: 0
```

PNG inicial: 261486 bytes. Inspección visual realizada. La captura corresponde a
1280 × 800 CSS con densidad 2; procedimiento en `scripts/generar-capturas.md`,
script reproducible y resultado en `public/capturas/`. No se retocan resultados.

### E5-d — Inicio, Producto y CTA (implementación; verificación pendiente)

Se sustituye la portada mínima y se crea `/producto/`, con LayoutBase, Boton,
Insignia, Tarjeta, Tabla y tokens existentes. `CapacidadesProducto.astro` filtra
el inventario en un único lugar; pendientes se muestran solo en «En desarrollo».
`CapturaProducto.astro` comparte la captura con dimensiones y explicación.
`src/styles/producto.css` aporta composición adaptable sin JS ni dependencias.
La comparación se limita a proceso y controles según A9/H10; no reproduce hojas
de terceros ni afirma superioridad medida. Se conserva noindex.
`lanzamiento.ts` resuelve el destino por estado: blog durante desarrollo, descarga
para los estados posteriores. No se crea ninguna ruta de etapa futura.
Pendiente: batería, prueba del HTML, auditoría visual/accesibilidad y Lighthouse.

### E5-e — Batería local del sitio (2026-10-27)

Salidas completas, sin filtrar. Se usa npm 11.13.0 local con las dependencias ya instaladas.

```text
> npm run check

> calcinst-web@0.0.1 check
> astro check

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
15:51:24 [content] Syncing content
15:51:24 [content] Synced content
15:51:24 [types] Generated 1.72s
15:51:24 [check] Getting diagnostics for Astro files in C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web...
Result (56 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```text
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web


 Test Files  6 passed (6)
      Tests  134 passed (134)
   Start at  15:51:55
   Duration  9.03s (import 74%, transform 18%, tests 6%, worker 2%)

EXIT=0
```

```text
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT=0
```

```text
> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
[warn] scripts/generar-capturas.mjs
[warn] src/pages/index.astro
[warn] Code style issues found in 2 files. Run Prettier with --write to fix.
EXIT=1
```

```text
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```text
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
15:52:47 [WARN] [content] data store cleared (force)
15:52:48 [content] Syncing content
15:52:48 [content] Synced content
15:52:48 [types] Generated 897ms
15:52:48 [build] output: "static"
15:52:48 [build] mode: "static"
15:52:48 [build] directory: C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\dist\
15:52:48 [build] Collecting build info...
15:52:48 [build] ✓ Completed in 993ms.
15:52:48 [build] Building static entrypoints...
15:52:50 [vite] ✓ built in 1.99s
15:52:50 [vite] ✓ built in 43ms
15:52:50 [build] Rearranging server assets...

 generating static routes
15:52:55   ├─ /blog/categoria/conductores/index.html (+94ms)
15:52:55   ├─ /blog/categoria/motores/index.html (+8ms)
15:52:55   ├─ /blog/categoria/canalizaciones/index.html (+8ms)
15:52:55   ├─ /blog/categoria/puesta-a-tierra/index.html (+48ms)
15:52:55   ├─ /blog/categoria/practica-profesional/index.html (+5ms)
15:52:55   ├─ /blog/etiqueta/110-14c/index.html (+6ms)
15:52:55   ├─ /blog/etiqueta/ampacidad/index.html (+6ms)
15:52:55   ├─ /blog/etiqueta/dof/index.html (+9ms)
15:52:55   ├─ /blog/etiqueta/nom-001-sede/index.html (+7ms)
15:52:55   ├─ /blog/etiqueta/temperatura/index.html (+10ms)
15:52:55   ├─ /blog/etiqueta/terminales/index.html (+14ms)
15:52:55   ├─ /blog/etiqueta/verificacion/index.html (+12ms)
15:52:55   ├─ /blog/etiqueta/vigencia/index.html (+11ms)
15:52:55   ├─ /blog/rss.xml (+1.76s)
15:52:57   ├─ /blog/110-14c-decide-la-columna-no-el-conductor/index.html (+9ms)
15:52:57   ├─ /blog/que-version-de-la-nom-001-sede-esta-vigente/index.html (+8ms)
15:52:57   ├─ /blog/index.html (+5ms)
15:52:57   ├─ /diseno/index.html (+236ms)
15:52:57   ├─ /producto/index.html (+8ms)
15:52:57   ├─ /index.html (+7ms)
15:52:57 ✓ Completed in 7.08s.

15:52:57 [build] ✓ Completed in 9.21s.
15:52:57 [build] 19 page(s) built in 10.22s
15:52:57 [build] Complete!
EXIT=0
```

```text
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT=0
```

```text
> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
EXIT=0
```


### E5-f — Captura definitiva, HTML y auditoría local (2026-10-27)

Se corrigió el formato señalado por E5-e en `scripts/generar-capturas.mjs` e
`index.astro` con Prettier existente. `prettier --check .` pasó después.
No se borran las salidas fallidas: E5-e conserva el exit 1 original.
La interrupción posterior de permisos fue un fallo de revisión automática por
límite de uso, no una ejecución ni un rechazo por riesgo. Al continuar se ejecutó
Chrome con permiso y terminó sin errores.

La captura final cierra Resultados y usa Ajustar a pantalla mediante controles
reales. Muestra completo el plano sintético. El pie se precisó para no afirmar que
la imagen muestra resultados. PNG 2560 × 1600, 158295 bytes, SHA-256
`1a5015c94b1465a9b327b301c1759b664132414f5789deca933dd75487e70a2c`.
Demo formateada, sin cambios semánticos: SHA-256
`35f07734e51ad7d2aed91dd11fa52a1c7af8efedd2634a1839b537950f34e800`.
El hash inicial de E5-c corresponde a la serialización anterior a Prettier.

Comandos y resultados reales:

- `node scripts/generar-capturas.mjs`: exit 0, captura real 2×, 0 errores.
- `npm run build` (npm local aprobado): exit 0, 19 páginas. Última compilación
  19:45:49, después del ajuste del pie. Persiste advertencia histórica de
  deprecación `markdown.smartypants`; no se cambia el procesador del blog.
- `node scripts/verificar-producto.mjs`: ambas páginas coinciden con el inventario;
  estados y dimensiones correctos. Esta puerta se incorpora a CI tras build.
  Antes de compilar, su ejecución había encontrado el dist antiguo sin Producto;
  no se interpreta aquel resultado como prueba del código nuevo.
- `node scripts/auditar-producto.mjs`: servidor estático local y Chrome, sin caché,
  `/` y `/producto/`, oscuro/claro, 360/768/1280 px: 12 variantes. Cero violaciones
  axe WCAG A/AA, errores JS, desbordamiento de página o focos sin contorno. Skip link
  primero, Escape cierra menú y devuelve foco, reduced-motion sin transiciones.
  Se conserva el scroll horizontal enfocable de Tabla en móvil. Esto no sustituye
  una prueba manual con lector de pantalla ni certifica accesibilidad completa.
- Peso final sin compresión: Inicio 238997 bytes; Producto 241207 bytes. Incluye
  documento y recursos transferidos en navegador limpio; cumple Inicio ≤ 600 KB.

Evidencia local ignorada por Git según la convención existente:
`evidencia/etapa-5/captura.json`, `auditoria.json` y doce PNG de páginas.
Se inspeccionaron visualmente Inicio oscuro 1280 y Producto claro 360, además de
la captura original: sin recortes de página, imagen proporcionada y estados
separados. La comparación usa la tabla reutilizable con scroll interno en móvil.
Las ocho pruebas nuevas cubren promoción indebida, cambios de estado, capacidad
extra, omisión de pendientes, fecha/promesa, dimensiones y destino del CTA.
Son parte de las 134 pruebas de E5-e; no constituyen verificación del motor.

Lighthouse CLI 12.6.1, mediante @lhci/cli ya instalado:
`node node_modules/@lhci/cli/src/cli.js collect --url=http://localhost/ --url=http://localhost/producto/ --numberOfRuns=1`
con `CHROME_PATH` apuntando a Chrome instalado. Exit 0. Informes copiados a
`evidencia/etapa-5/lhr-1793151917888.{json,html}` y
`lhr-1793151932223.{json,html}`. Una ejecución por URL, móvil predeterminado
412 × 823, CPU ×4, 4G simulado; no es una medición física ni exactamente Moto G4.

| Página | Rendimiento | Accesibilidad | LCP | CLS | Bytes Lighthouse |
| --- | --- | --- | --- | --- | --- |
| Inicio | 98 | 100 | 2257,651 ms | 0 | 223966 |
| Producto | 98 | 100 | 2256,127 ms | 0 | 224660 |

El informe precede únicamente al cambio textual de 14 bytes del pie; la auditoría
visual/de accesibilidad se repitió después. Diferencia de pesos: el servidor de
LHCI comprime, el auditor estático no. **I4 LCP ≤ 2,0 s no acreditado**: no se
confunde el score 98 con ese umbral. El elemento LCP es la captura; el informe
atribuye unos 1599 ms a demora de renderizado. Debe investigarse la ruta crítica
antes del cierre, con el perfil acordado, sin ocultar ni relajar el presupuesto.
No se endurecen globalmente las puertas de la Etapa 10 ni se cambia Cloudflare.

### E5-g — Transferencia y siguiente bloque

Etapa 5 autorizada, implementada localmente y todavía en curso. Rama
`etapa5/inicio-producto`, base `1577743`; cambios sin commit. PR #16 es dependencia
sin fusionar según la última consulta registrada; comprobar de nuevo antes de
preparar integración. Esta sesión no creó commit, push, PR ni despliegue.

Archivos del bloque:

- Inicio se modifica y Producto se crea; composición en `src/styles/producto.css`.
- `CapacidadesProducto.astro` y `CapturaProducto.astro` comparten inventario e imagen.
- `src/config/capacidades.json` actualiza fuentes y límites; `lanzamiento.ts` lleva
  al blog durante desarrollo. No se anuncia dimensionamiento verificado.
- `demo.calcinst.json`, PNG y `scripts/generar-capturas.{md,mjs}` permiten reproducción
  con la copia del ZIP identificada en E5-a. Su fuente no está disponible en las
  ramas consultadas de GitHub: conservar el ZIP; no incorporarlo al sitio.
- `scripts/verificar-producto.mjs`, `tests/producto.test.ts` y CI añaden la puerta
  de HTML; `scripts/auditar-producto.mjs` produce evidencia local reutilizable.
- Este documento y la nota del traspaso mantienen continuidad. Plan original,
  decisiones, dependencias y configuración de despliegue no cambiaron.

Próximo bloque concreto: estudiar LCP con los informes conservados; medir con el
perfil de I4 y corregir la causa dentro de la arquitectura aprobada. Repetir las
pruebas afectadas, no inventar resultados ni borrar el primer informe. Después,
Sebastián debe revisar diseño, redacción, inventario y límites; conservar el paquete
de evidencia como adjunto de la revisión antes de declarar cierre. El noindex y
los enlaces reservados a etapas futuras siguen vigentes. Quedan pendientes fuera
de esta etapa las validaciones normativas de casos 1–3, caída y protecciones,
la distribución Tauri y los textos legales de la aplicación.

Para retomar: leer PLAN, DECISIONES, HIPOTESIS y este ESTADO; comprobar rama,
`git status` y base del PR #16; no reconstruir ni instalar dependencias nuevas.
Con las dependencias existentes ejecutar check/test/lint/format:check/verificar,
build, verificar:salida, portabilidad y `node scripts/verificar-producto.mjs`.
Auditoría de navegador: comando E5-f. No crear addenda por cambios ordinarios.
Las decisiones que contradigan lo aprobado, dependencias nuevas, publicación y
cierre humano requieren su autorización específica.

### E5-h — Contraste de rendimiento y experimento descartado (2026-10-27)

Se midieron tres ejecuciones por página con las opciones adicionales de LHCI:
`--settings.screenEmulation.width=360 --settings.screenEmulation.height=640 --settings.screenEmulation.deviceScaleFactor=3 --settings.screenEmulation.mobile=true --settings.screenEmulation.disabled=false`.
Se mantuvieron red 4G simulada y CPU ×4; es viewport de Moto G4, no dispositivo
físico ni emulación exacta de su CPU. Informes `lhr-1793152149781` a
`lhr-1793152215144` (consultar los JSON conservados para los nombres exactos).
LCP de Inicio: 2256,186 / 2256,810 / 2253,989 ms; Producto:
2254,022 / 2255,645 / 2254,814 ms. Los valores exactos están en los JSON.
Inicio muestra CLS de 0,033–0,049 en este viewport: el CLS 0 de E5-f es específico
al viewport de 412 px, no una garantía global. Producto mantiene CLS 0.

Se ensayó una precarga de IBM Plex Sans 400/600 mediante un slot head temporal.
Resultado: Inicio LCP 2273,805 ms y CLS 0,021; Producto LCP 2256,706 ms y CLS 0.
No resolvió el objetivo y se retiró íntegramente: LayoutBase no cambia.
Informes del experimento: `lhr-1793152276494` y `lhr-1793152290996`, JSON/HTML en
`evidencia/etapa-5`. No se conservan cambios de rendimiento sin beneficio demostrado.
El check posterior dio 0 errores/avisos/hints; 134 pruebas pasaron de nuevo.

**Punto de continuación:** resolver LCP y el pequeño cambio de geometría del texto
al cargar fuentes a 360 px; usar los informes antes de tocar estilos comunes.
E5-g sigue vigente. Este bloque entrega las dos páginas y su evidencia funcional;
no es un cierre de etapa. No hay autorización de publicación ni aprobación humana
del resultado visual. La revisión del ZIP no equivale a certificación normativa.

Se retiraron únicamente espacios finales de las nuevas salidas de consola para
pasar `git diff --check`; su contenido y resultados no cambian. La evidencia
histórica anterior se conserva. Los comandos finales de invariantes, salida y
portabilidad pasaron: 7 controles, 0 fallos; 2 posts comparados, 0 fallos.

Última reconstrucción sin precargas: 19:52:41, exit 0, 19 páginas. Lint terminó
sin errores. Inventario de cambios de este corte (stat no incluye archivos nuevos):

```text
 .github/workflows/ci.yml    |   3 +
 ESTADO_SITIO.md             | 392 ++++++++++++++++++++++++++++++++++++++++++++
 TRASPASO_ETAPA5.md          |   5 +
 src/config/capacidades.json | 107 +++++++++---
 src/config/lanzamiento.ts   |  14 +-
 src/pages/index.astro       |  57 +++++--
 6 files changed, 531 insertions(+), 47 deletions(-)
```

Archivos nuevos sin seguimiento (11):

```text
demo.calcinst.json
public/capturas/calcinst-demo.png
scripts/auditar-producto.mjs
scripts/generar-capturas.md
scripts/generar-capturas.mjs
scripts/verificar-producto.mjs
src/components/CapacidadesProducto.astro
src/components/CapturaProducto.astro
src/pages/producto.astro
src/styles/producto.css
tests/producto.test.ts
```

El control final de formato detectó finales de línea tras retirar el experimento;
Prettier los normalizó en los tres Astro afectados y format:check pasó. No cambió
el HTML. git diff --check pasó. Paquete local: evidencia/etapa-5-evidencia.zip;
conservar como adjunto antes del cierre (ignorado por Git).

### E5-i — Respaldo en GitHub autorizado (2026-10-27)

Sebastián solicita commits y pushes para dejar actualizado el repositorio antes
 de continuar. Se autoriza guardar el bloque parcial; no se interpreta como
aprobación del cierre de la etapa o de sus resultados pendientes. Se prepara
un PR en borrador desde `etapa5/inicio-producto`, con base
`mantenimiento/continuidad-pre-etapa5`, porque el PR #16 sigue abierto y sin
fusionar (consulta del conector y fetch de esta sesión). Main permanece intacta.

Se conserva además `evidencia/etapa-5-evidencia.zip` como excepción puntual al
ignore de evidencia generada: contiene capturas sintéticas e informes locales,
no el código ni el ZIP privado de CalcInst. Permite recuperar los resultados
al cambiar de computadora. No se cambia la regla general del gitignore.
El paquete ya generado mide 6102187 bytes; su hash se registra a continuación.
Las referencias a cambios sin commit en E5-g describen el corte anterior;
esta entrada y el PR registran la sincronización posterior. LCP y revisión
humana siguen pendientes. El push puede activar previews existentes de la rama;
no se cambia la configuración de Cloudflare ni se fusiona a producción.

SHA-256 del paquete de evidencia: e9fc1eb22dcc20df3c1ce8d2fa401248eda8ab41a7e5b475ca84df42319438c3.

Confirmación de publicación del bloque: commit `ac0691a` subido a
`origin/etapa5/inicio-producto`; PR #17 en borrador:
https://github.com/sebashealy/calcinst-web/pull/17 . Base: rama del PR #16.
El paquete de evidencia y los 18 archivos del bloque están incluidos en ese commit.
CI remoto pendiente de resultado en este corte; consultar Checks del PR #17.
Para continuar, usar esa rama; no main. No hay fusión ni cierre de etapa.

### E5-j — Diagnóstico de rendimiento y correcciones en curso (2026-10-27)

Se retoma desde `bdd9394`, árbol limpio. CI remoto del PR #17 para ese commit:
https://github.com/sebashealy/calcinst-web/actions/runs/40617987822 , completed/success.
La evidencia de E5-i está versionada; su conservación ya no depende del equipo.

En los informes a 360 px el elemento LCP es `p.introduccion`; a 412 px era la
captura. No se puede atribuir ambos perfiles a la imagen. La petición CSS externa
es bloqueante. Se prueba `build.inlineStylesheets: 'always'`, API comprobada en
el código y los tipos de Astro 7.3.1 instalado. Mantiene tokens y estilos, a costa
de repetir CSS en cada HTML y perder su caché independiente entre páginas.
Primera medición: Inicio 1971,995 ms, Producto 2106,602 ms. Aún no basta por sí sola.

Diagnóstico en Chrome, reteniendo peticiones de fuentes y midiendo geometría:
el rótulo de Inicio pasa de 22,39 a 44,78 px y la introducción de 96 a 128 px
al cambiar de la fuente de respaldo a IBM Plex. Se acortan rótulo e introducción
sin cambiar el alcance. Ambos conservan luego su altura; no se oculta contenido
ni se retrasa su visualización. Con CSS incluido y precarga de las cuatro caras
locales existentes, CLS medido es 0, LCP 2127,360 / 2108,595 ms; todavía pendiente.
No se añade fuente, dependencia ni JS. Sigue `font-display: swap`.

Siguiente prueba: quitar prioridad alta a la captura bajo el hero y usar su carga
lazy existente, conforme al plan para imágenes fuera del primer pantallazo.
Los informes intermedios están en `evidencia/etapa-5-rendimiento/` y no sustituyen
las mediciones finales ni autorizan cerrar la etapa. Validación del blog también
se incluye porque la entrega de CSS y fuentes afecta LayoutBase.

Corrección conservada tras medir: CSS incluido en HTML + precarga de las cuatro
caras locales + captura con carga lazy/prioridad automática + textos de Inicio
más breves. Sin prioridad alta de imagen, LCP 1222,884 ms en Inicio y 1207,412 ms
en Producto; CLS 0 en ambos. Informes intermedios `lhr-1793153115654` y
`lhr-1793153129223`. No se altera ni comprime artificialmente la captura original.
El resultado apunta a competencia de red entre imagen y fuentes; las mediciones
comparadas fundamentan el cambio, sin afirmar una causa exclusiva en todos los equipos.

Se añade `lighthouserc.etapa5.json` como perfil local reproducible: 360 × 640,
DPR 3, móvil, tres ejecuciones de Inicio/Producto/un post. Reutiliza Lighthouse
instalado, sin dependencias nuevas. Valida el peor resultado de LCP ≤ 2000 ms,
CLS ≤ 0,01 y peso ≤ 600000 bytes. El límite de 300 KB del blog se comprueba además
con su resultado, no queda cubierto por ese umbral general. No reemplaza la
configuración global ni adelanta el endurecimiento completo de la Etapa 10.
Comando: `node node_modules/@lhci/cli/src/cli.js autorun --config=lighthouserc.etapa5.json`
con CHROME_PATH al Chrome instalado. Pendiente consignar el resultado al terminar.

Resultado del perfil de tres repeticiones: exit 0, 9 informes, aserciones aprobadas.
Salida final:

```text
Checking assertions against 3 URL(s), 9 total run(s)
All results processed!
Dumping 9 reports to disk at evidencia/etapa-5-rendimiento/final...
Done writing reports to disk.
Done running autorun.
```

| Página | LCP de las 3 ejecuciones (ms, redondeados) | CLS | Peso transferido |
| --- | --- | --- | --- |
| Inicio | 1208,53 / 1207,01 / 1204,62 | 0 | 223359 B |
| Producto | 1204,26 / 1204,69 / 1203,62 | 0 | 224033 B |
| Post 110-14c | 1205,22 / 1206,44 / 1205,30 | 0 | 68012 B |

Las primeras dos mediciones del post son 1205,22 / 1206,44 ms; la tercera se
conserva en el informe final. El peso del blog queda por debajo de 300 KB.
Se mantienen los informes previos; la mejora no borra el LCP fallido de E5-f/h.

### E5-k — Batería tras corregir rendimiento (2026-10-27)

Salidas completas, sin filtrar. Se usa npm 11.13.0 local con las dependencias ya instaladas.

```text
> npm run check

> calcinst-web@0.0.1 check
> astro check

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
20:09:53 [content] Syncing content
20:09:53 [content] Synced content
20:09:53 [types] Generated 669ms
20:09:53 [check] Getting diagnostics for Astro files in C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web...
Result (57 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```text
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web


 Test Files  6 passed (6)
      Tests  134 passed (134)
   Start at  20:10:01
   Duration  4.73s (import 71%, transform 23%, tests 6%)

EXIT=0
```

```text
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT=0
```

```text
> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

```text
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```text
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
20:10:14 [WARN] [content] data store cleared (force)
20:10:14 [content] Syncing content
20:10:14 [content] Synced content
20:10:14 [types] Generated 587ms
20:10:14 [build] output: "static"
20:10:14 [build] mode: "static"
20:10:14 [build] directory: C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\dist\
20:10:14 [build] Collecting build info...
20:10:14 [build] ✓ Completed in 648ms.
20:10:14 [build] Building static entrypoints...
20:10:17 [vite] ✓ built in 2.75s
20:10:17 [vite] ✓ built in 41ms
20:10:17 [build] Rearranging server assets...

 generating static routes
20:10:18   ├─ /blog/categoria/conductores/index.html (+22ms)
20:10:18   ├─ /blog/categoria/motores/index.html (+3ms)
20:10:18   ├─ /blog/categoria/canalizaciones/index.html (+2ms)
20:10:18   ├─ /blog/categoria/puesta-a-tierra/index.html (+2ms)
20:10:18   ├─ /blog/categoria/practica-profesional/index.html (+3ms)
20:10:18   ├─ /blog/etiqueta/110-14c/index.html (+4ms)
20:10:18   ├─ /blog/etiqueta/ampacidad/index.html (+4ms)
20:10:18   ├─ /blog/etiqueta/dof/index.html (+3ms)
20:10:18   ├─ /blog/etiqueta/nom-001-sede/index.html (+4ms)
20:10:18   ├─ /blog/etiqueta/temperatura/index.html (+4ms)
20:10:18   ├─ /blog/etiqueta/terminales/index.html (+4ms)
20:10:18   ├─ /blog/etiqueta/verificacion/index.html (+5ms)
20:10:18   ├─ /blog/etiqueta/vigencia/index.html (+3ms)
20:10:18   ├─ /blog/rss.xml (+139ms)
20:10:18   ├─ /blog/110-14c-decide-la-columna-no-el-conductor/index.html (+5ms)
20:10:18   ├─ /blog/que-version-de-la-nom-001-sede-esta-vigente/index.html (+4ms)
20:10:18   ├─ /blog/index.html (+9ms)
20:10:18   ├─ /diseno/index.html (+123ms)
20:10:18   ├─ /producto/index.html (+6ms)
20:10:18   ├─ /index.html (+4ms)
20:10:18 ✓ Completed in 716ms.

20:10:18 [build] ✓ Completed in 3.63s.
20:10:18 [build] 19 page(s) built in 4.29s
20:10:18 [build] Complete!
EXIT=0
```

```text
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT=0
```

```text
> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
EXIT=0
```


### E5-l — Resultado, evidencia y transferencia del bloque de rendimiento

Control adicional 412 × 823, DPR 1,75, mismo perfil y una repetición por ruta:
Inicio 1207,172 ms; Producto 1218,625 ms; post 1207,323 ms; CLS 0 en los tres.
Comando de E5-j con `--collect.numberOfRuns=1`,
`--collect.settings.screenEmulation.width=412`,
`--collect.settings.screenEmulation.height=823`,
`--collect.settings.screenEmulation.deviceScaleFactor=1.75` y
`--upload.outputDir=evidencia/etapa-5-rendimiento/control-412`.
Exit 0, las aserciones pasan. Rendimiento y accesibilidad: 100 en las doce
mediciones finales (nueve a 360 y tres a 412). Son mediciones de laboratorio
local, no métricas de usuarios reales ni prueba del despliegue de producción.

La batería E5-k pasa los ocho comandos. Validación adicional del HTML:

```text
dist/index.html: HTML coincide con inventario; estados y dimensiones correctos
dist/producto/index.html: HTML coincide con inventario; estados y dimensiones correctos
```

La primera auditoría de navegador del bloque falló (exit 1) porque se lanzó
mientras la batería reconstruía dist: Producto oscuro 768/1280 recibió contenido
incompleto, bytes 0, sin skip link y con fallo meta-viewport. Se conserva
`auditoria-durante-build.json`; no se contabiliza como éxito. El auditor ahora
exige HTTP 200 antes de examinar accesibilidad y explica que no debe ejecutarse
durante el build. Se repitió después del build estable: **exit 0**, 12 variantes,
0 violaciones axe, 0 errores JS, sin desbordamiento; foco, skip link, Escape y
reduced-motion correctos. Inicio 239006 B y Producto 241246 B sin compresión.
Lint del auditor y format:check volvieron a pasar tras añadir la comprobación.

Cambios definitivos: `astro.config.mjs` incluye estilos en HTML; `LayoutBase.astro`
precarga las cuatro caras de las fuentes ya existentes; Inicio acorta rótulo e
introducción; Inicio/Producto dejan de forzar carga prioritaria de la captura.
No cambian tokens, fuentes, dependencias, norma, estados del inventario ni los
resultados de CalcInst. Se añade el perfil local `lighthouserc.etapa5.json`.
La auditoría del blog y portabilidad 2/2 cubren el cambio compartido de entrega.
El coste aceptado es repetir CSS dentro de cada HTML; evitar la petición bloqueante
mejora la primera visita. Si el CSS crece, medir de nuevo antes de cambiar esta opción.
Es un ajuste de implementación para I4, no una sustitución del stack ni una decisión
que requiera reescribir el plan. No se modifica el perfil global de CI de Etapa 10.

Se conservan el paquete anterior y el nuevo `evidencia/etapa-5-rendimiento.zip`,
con informes intermedios/finales, manifiestos, auditoría fallida y correcta,
diagnóstico de fuentes y doce capturas actualizadas. Inspección visual de Inicio
móvil: contenido completo, captura real, sección pendiente diferenciada.
La captura de la aplicación no fue regenerada ni alterada por este ajuste.

**Siguiente paso:** revisión de Sebastián de Inicio/Producto, sus textos, límites
del inventario y captura. La corrección del LCP queda acreditada localmente; no
cierra por sí sola la etapa. Resolver integración del PR #16 antes de llevar #17
a main. Continuar en `etapa5/inicio-producto`; comprobar Checks del último commit.
Para reproducir: batería habitual → build completo → verificar-producto → auditoría
(sin build concurrente) → LHCI con lighthouserc.etapa5.json. No instalar paquetes
nuevos ni trabajar en CalcInst. No adelantar legales, descargas, normativa o formularios.

Paquete de este bloque: 14440966 bytes, SHA-256 `b40d7f918adca7ffd2ee6d158bbd68320aa489e95e4b10dffe02e4e290d6d5ea`.

### E5-m — CI remoto y entrega para revisión (2026-10-28)

Se confirma por el conector GitHub que el CI del commit de rendimiento `31f882e`
terminó `completed / success`:
https://github.com/sebashealy/calcinst-web/actions/runs/40619684129 .
El PR #17 contiene ese commit y continúa abierto, en borrador y sin fusionar.
Su descripción ya refleja LCP 1,20–1,22 s, CLS 0 y revisión humana pendiente;
la actualización de descripción del intento anterior no había quedado aplicada.

Los dos paquetes de evidencia están versionados. El siguiente paso es revisar
Inicio y Producto con Sebastián (diseño, textos, captura y límites del inventario),
no repetir la implementación ni iniciar otra etapa. Después de esa revisión se
podrá decidir el cierre y la integración de los PR #16 y #17. Main no se modificó.
Esta entrada es documental; el éxito citado corresponde exactamente a `31f882e`,
no se atribuye anticipadamente al commit que incorpora esta nota.

### E5-n — Aprobación humana y preparación de continuidad (2026-10-28)

Tras la entrega de Inicio/Producto para revisar diseño, textos, captura y funciones,
Sebastián responde: «excelente me gusto mucho, continuemos». Se registra su
aprobación de la vista previa de `31f882e`. Después autoriza expresamente:
«Sí, fusionar ambos PR cuando sus comprobaciones pasen». No es autorización para
publicar textos legales de otra etapa ni para cambiar capacidades normativas.

| Criterio Etapa 5 | Evidencia y resultado |
| --- | --- |
| Inicio/Producto consumen inventario y lanzamiento | E5-d; componentes compartidos y CTA al blog |
| Promoción limitada a verificadas; pendientes diferenciadas | E5-e/k, 134 pruebas; verificador de HTML en ambas rutas |
| Hero sin fechas ni promesas fuera de insignia | prueba negativa y validación HTML E5-f/l |
| Captura real sintética a 2×, dimensiones y estabilidad | E5-c/f; 2560×1600; CLS 0 en perfiles finales E5-j/l |
| Inicio ≤600 KB | E5-l: 239006 B sin compresión |
| Capturas 360/768/1280 e informe Lighthouse | dos paquetes de evidencia versionados; auditoría 12 variantes |
| Revisión humana | respuesta anterior sobre la preview entregada; no sustituye verificación del motor |

CI de `edf5a0d`: completed/success, run 40739615554:
https://github.com/sebashealy/calcinst-web/actions/runs/40739615554 .
PR #16 fusionado con merge commit `f64448720799dc7af5f9eaddf64411a34e076d9a`;
se conservó la historia. PR #17 se redirigió a main y salió de borrador. Antes de
fusionarlo debe pasar la comprobación de esta última nota sobre la base definitiva.
El resultado de integración se registrará sin atribuirlo por anticipado.

Preparación de Etapa 6 (plan, todavía sin implementar páginas nuevas):

1. Configuración: correo público elegido expresamente `instcalc@gmail.com`.
   Identidad personal no decidida: Sebastián indica «No se si usar mi nombre».
   Presentar CalcInst como marca; no inventar nombre ni generar Person ficticio.
2. Crear Quiénes somos y Contacto sobre LayoutBase, con descripción honesta del
   proyecto y enlace mailto. No añadir formulario, reservas de descarga ni listas.
3. Crear 404 con Inicio/Blog y lista de artículos publicados, reutilizando colección.
4. Modelar legales MDX con version, fechaVigencia y publicado; borradores excluidos
   de publicación hasta revisión humana. Resolver identidad/domicilio del responsable,
   tratamientos y proveedores reales antes de dar por válido el aviso. Person con
   jobTitle del plan y sin hasCredential queda pendiente de identidad aprobada.
5. Probar estados publicado/no publicado y fechas, I3(c), enlaces, teclado/axe,
   capturas a 360 px y batería habitual. Registrar evidencia E6 solo al iniciar el bloque.

H2: consulta preparatoria a la fuente oficial de Cámara de Diputados el 2026-10-28,
https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf . El documento consultado
indica ley nueva del 20-03-2025, última reforma del 14-11-2025; artículo 2 XV identifica
la Secretaría Anticorrupción y Buen Gobierno. No se cierra H2: falta revisión del
aviso concreto por Sebastián y, de ser posible, su asesor. No se publica texto legal
ni se trata la marca por sí sola como identidad legal confirmada.

Para retomar: completar integración #17 y comprobar despliegue; continuar el plan
anterior en rama de Etapa 6. Mantener identidad como pendiente. La configuración
actual todavía conserva correoContacto=null; el valor elegido se aplicará en esa
etapa. Plan original, decisiones aprobadas y restricciones de etapas futuras intactos.

### E5-o — Integración confirmada y cierre (2026-10-28)

CI del último head `2e31f26999884ec84290d1842f4006c73b65917a` completado con
success: https://github.com/sebashealy/calcinst-web/actions/runs/40741550475 .
Tras ese resultado se ejecuta la autorización expresa de Sebastián:

- PR #16 fusionado: `f64448720799dc7af5f9eaddf64411a34e076d9a`.
- PR #17, retarget a main, fusionado: `22a129d7b132139cd1a961fc08ef8e4169edd243`.
- `git fetch origin`, `git switch main`, `git merge --ff-only origin/main`:
  main local y origin/main idénticos en `22a129d`, árbol limpio.

Etapa 5 cerrada por criterios E5-n + aprobación humana + integración. No se
reclasifica ninguna capacidad del motor. El push a main activa el despliegue
existente; la fusión por sí sola no acredita que Cloudflare haya terminado.
No se cambia su configuración. Conservar PR y CI como referencias de integración.
Las menciones anteriores de integración pendiente son cortes históricos.

### E6-a — Preparación de contenido, identidad pendiente (2026-10-28)

Rama `etapa6/preparacion-contenido` desde main `22a129d`. Se registra el cierre
anterior y se aplica en `src/config/sitio.ts` el correo elegido expresamente por
Sebastián: `instcalc@gmail.com`. El tipo nullable se conserva por compatibilidad.
No se envía correo ni se añade formulario. No hay todavía páginas de Etapa 6.

Ante la solicitud de nombre público, Sebastián responde: «No se si usar mi nombre».
La identidad continúa sin decisión: no usar nombre supuesto ni JSON-LD Person
con datos ficticios. Propuesta de presentación: CalcInst como marca, descripción
del proyecto y sus límites. Esto no sustituye la identidad legal del responsable.
El artículo 15 I del texto oficial consultado exige identidad y domicilio del
responsable en el aviso; resolverlo antes de aprobar su publicación. Fuente y
versión consultada en E5-n; H2 sigue abierta para la revisión del aviso concreto.

Plan de implementación E5-n vigente: Quiénes somos, Contacto y 404 primero;
colección y páginas legales como borradores después, con publicación condicionada
a revisión humana. Datos personales, domicilio y figura del responsable no se
inventan. Person y el cierre de Etapa 6 dependen de esa decisión. No adelantar
suscripciones, descargas, normativa ni comercio. Preparación en PR separado;
no implica autorización de fusión de la futura Etapa 6 ni aprobación de sus legales.

Verificación de preparación: Prettier de sitio.ts correcto, 7 invariantes/0 fallos
y git diff --check sin errores. No se atribuye una batería nueva de 134 pruebas
a este cambio de configuración; esa evidencia corresponde a la Etapa 5.

Confirmación posterior de producción (2026-10-28): solicitudes HTTP reales a
https://calcinst.mx/ y https://calcinst.mx/producto/ devolvieron 200; ambas
respuestas contienen inventario verificado, «En desarrollo» y la captura real.
Esto confirma la entrega de las páginas tras la integración, no una nueva
medición de Lighthouse en producción.

Preparación guardada en PR #18 (borrador):
https://github.com/sebashealy/calcinst-web/pull/18 . Continuar en
`etapa6/preparacion-contenido`. CI del PR pendiente al registrar esta entrada.

### E6-b — Implementación autorizada de páginas y puerta legal (2026-10-28)

Sebastián autoriza: «Pasemos a la etapa 6». Se continúa en la rama y PR #18,
árbol limpio al comenzar. Identidad personal sigue pendiente; correo elegido
instcalc@gmail.com. No se atribuyen nombre, equipo, credenciales ni empresa.

Se crea LayoutContenido sobre LayoutBase para las páginas informativas, con
medida de lectura y tokens existentes. Quiénes somos presenta CalcInst y sus
límites; Contacto usa mailto sin formulario; 404 lista solo posts de publicables()
y ofrece Inicio/Blog. Se crean Términos/Privacidad con un aviso de documento en
revisión, sin servir el cuerpo de sus borradores.

Colección legal en src/content.config.ts y src/lib/legal.ts: versión, fecha real,
publicado, revisión humana, pendientes, responsable y domicilio. Publicar exige
revisión, fecha y pendientes vacíos; privacidad exige responsable/domicilio.
legalPublicable también rechaza fechas futuras con día civil de Ciudad de México.
La publicación es estática: cambiar fecha o aprobación requiere reconstrucción.
Una bandera no demuestra la revisión: su autorización real debe registrarse aquí.

Los dos MDX son borradores internos versionados, no documentos legales terminados:
contienen el texto propuesto y tareas de comprobación. No se publica su cuerpo ni
se expone en una ruta de descarga. El repositorio GitHub puede contenerlos como
fuente de trabajo; la exclusión de publicación se refiere al sitio servido.
No se afirma que solo se trate correo ni se inventa el tratamiento del hosting.
La consulta legal preparatoria de E5-n no cierra H2 ni sustituye revisión humana.
Person queda pendiente porque no hay identidad aprobada; no crear datos ficticios.

Pruebas nuevas: publicación hoy/pasado/futuro, borradores, revisión ausente,
pendientes, identidad/domicilio, fechas inexistentes y datos inválidos. Se conserva
la arquitectura y dependencias; no se cambia Cloudflare ni se crean formularios.
Comprobación inicial: Astro check, 0 errores/avisos/hints; invariantes 7/0.
Siguiente: batería completa, inspección de HTML para asegurar que no se filtran
los borradores y auditoría visual/accesibilidad de las cinco rutas.

### E6-c — Batería local de contenido y legales (2026-10-28)

Salidas completas, sin filtrar. Se usa npm 11.13.0 local con las dependencias ya instaladas.

```text
> npm run check

> calcinst-web@0.0.1 check
> astro check

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
12:16:58 [content] Syncing content
12:16:58 [content] Synced content
12:16:58 [types] Generated 599ms
12:16:58 [check] Getting diagnostics for Astro files in C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web...
Result (66 files):
- 0 errors
- 0 warnings
- 0 hints

EXIT=0
```

```text
> npm test

> calcinst-web@0.0.1 test
> vitest run

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.

 RUN  v5.0.0 C:/Users/Sebastian/Documents/ChatGPT/Calc Inst/calcinst-web


 Test Files  7 passed (7)
      Tests  150 passed (150)
   Start at  12:17:08
   Duration  7.19s (import 74%, transform 18%, tests 5%, worker 3%)

EXIT=0
```

```text
> npm run lint

> calcinst-web@0.0.1 lint
> eslint .

EXIT=0
```

```text
> npm run format:check

> calcinst-web@0.0.1 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
EXIT=0
```

```text
> npm run verificar

> calcinst-web@0.0.1 verificar
> node scripts/verificar-invariantes.mjs

[OK] I7 — el estado de lanzamiento vive solo en src/config/
[OK] TOKENS — el color se define solo en src/styles/tokens.css
[OK] NOTACION — ningún punto de código prohibido por caracteres.json
[OK] CARACTERES — el contenido .md/.mdx solo usa caracteres declarados
[OK] REFNORMA — ninguna ref cita una tabla del Capítulo 9 (las tablas son el Capítulo 10)
[OK] I3c — ningún término de credencial profesional fuera de contextos negativos
[OK] GLIFOS — ningún carácter declarado se pierde al subconjuntar las fuentes
verificar-invariantes: 7 verificacion(es) activas, 0 fallo(s)
EXIT=0
```

```text
> npm run build

> calcinst-web@0.0.1 build
> astro build --force

[astro] `markdown.smartypants` is deprecated. Move it onto your processor instead (e.g. `satteri({ features: { gfm: false, smartPunctuation: false } })`, or `unified({ gfm: false, smartypants: false })` from `@astrojs/markdown-remark`). Will be removed in a future major.
12:17:49 [WARN] [content] data store cleared (force)
12:17:50 [content] Syncing content
12:17:50 [content] Synced content
12:17:50 [types] Generated 666ms
12:17:50 [build] output: "static"
12:17:50 [build] mode: "static"
12:17:50 [build] directory: C:\Users\Sebastian\Documents\ChatGPT\Calc Inst\calcinst-web\dist\
12:17:50 [build] Collecting build info...
12:17:50 [build] ✓ Completed in 744ms.
12:17:50 [build] Building static entrypoints...
12:17:52 [vite] ✓ built in 1.54s
12:17:52 [vite] ✓ built in 32ms
12:17:52 [build] Rearranging server assets...

 generating static routes
12:17:55   ├─ /404.html (+48ms)
12:17:55   ├─ /blog/categoria/conductores/index.html (+9ms)
12:17:55   ├─ /blog/categoria/motores/index.html (+6ms)
12:17:55   ├─ /blog/categoria/canalizaciones/index.html (+5ms)
12:17:55   ├─ /blog/categoria/puesta-a-tierra/index.html (+41ms)
12:17:55   ├─ /blog/categoria/practica-profesional/index.html (+4ms)
12:17:55   ├─ /blog/etiqueta/110-14c/index.html (+5ms)
12:17:55   ├─ /blog/etiqueta/ampacidad/index.html (+4ms)
12:17:55   ├─ /blog/etiqueta/dof/index.html (+5ms)
12:17:55   ├─ /blog/etiqueta/nom-001-sede/index.html (+33ms)
12:17:55   ├─ /blog/etiqueta/temperatura/index.html (+4ms)
12:17:55   ├─ /blog/etiqueta/terminales/index.html (+4ms)
12:17:55   ├─ /blog/etiqueta/verificacion/index.html (+3ms)
12:17:55   ├─ /blog/etiqueta/vigencia/index.html (+4ms)
12:17:55   ├─ /blog/rss.xml (+1.39s)
12:17:57   ├─ /blog/110-14c-decide-la-columna-no-el-conductor/index.html (+7ms)
12:17:57   ├─ /blog/que-version-de-la-nom-001-sede-esta-vigente/index.html (+5ms)
12:17:57   ├─ /blog/index.html (+3ms)
12:17:57   ├─ /contacto/index.html (+4ms)
12:17:57   ├─ /diseno/index.html (+172ms)
12:17:57   ├─ /privacidad/index.html (+11ms)
12:17:57   ├─ /producto/index.html (+6ms)
12:17:57   ├─ /quienes-somos/index.html (+4ms)
12:17:57   ├─ /terminos/index.html (+5ms)
12:17:57   ├─ /index.html (+6ms)
12:17:57 ✓ Completed in 5.32s.

12:17:57 [build] ✓ Completed in 6.98s.
12:17:57 [build] 24 page(s) built in 7.74s
12:17:57 [build] Complete!
EXIT=0
```

```text
> npm run verificar:salida

> calcinst-web@0.0.1 verificar:salida
> node scripts/verificar-salida.mjs

[OK] NOTACION-SALIDA — ningún punto de código prohibido en dist/
verificar-salida: 0 fallo(s)
EXIT=0
```

```text
> npm run portabilidad

> calcinst-web@0.0.1 portabilidad
> node scripts/verificar-portabilidad.mjs

[OK] 110-14c-decide-la-columna-no-el-conductor.mdx
[OK] que-version-de-la-nom-001-sede-esta-vigente.mdx
verificar-portabilidad: 2 post(s), 2 comparado(s) con su página, 0 fallo(s)
EXIT=0
```


### E6-d — Salida pública y 404 (2026-10-28)

La batería E6-c termina exit 0 en los ocho comandos: 150 pruebas/7 archivos,
check sin errores, lint/formato correctos, 7 invariantes/0 fallos, 24 páginas y
portabilidad 2/2. La puerta de HTML de Inicio/Producto también pasa; no se reabren
ni se alteran sus capacidades.

Inspección de dist: Términos/Privacidad contienen data-legal-pendiente y el correo,
sin formularios ni cuerpo del borrador. Búsqueda en todos los HTML/JS/JSON de dist
sin «Borrador interno: no publicar». 404.html existe y enlaza ambos posts publicados.
No se interpreta una ruta de aviso como un aviso de privacidad válido.

El código de la página 404 no basta para Workers: su valor predeterminado de
assets.not_found_handling es none. Se añade `404-page` en wrangler.jsonc para
que las rutas inexistentes sirvan 404.html conservando HTTP 404. Fuente oficial
consultada el 2026-10-28:
https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/ .
Es la configuración de entrega requerida por la página de esta etapa, no una
migración ni un cambio de dominio, rutas, Workers code o dashboard. Las rutas
normativas reservadas siguen inexistentes y con HTTP 404. La frase «no se cambia
Cloudflare» de E6-b describe el primer bloque; este ajuste posterior se identifica
expresamente aquí. Falta confirmar su comportamiento en la preview desplegada.

Se reutiliza scripts/auditar-producto.mjs con --etapa6: cinco rutas, ambos temas,
360/768/1280. El servidor local emula 404.html con HTTP 404 para la ruta de prueba;
esto prueba la interfaz y no acredita por sí mismo la configuración remota.
Lint del auditor y formato del auditor/Wrangler pasaron después del ajuste.

### E6-e — Auditoría y transferencia del primer bloque (2026-10-28)

`node scripts/auditar-producto.mjs --etapa6`: exit 0, 30 combinaciones de cinco
páginas × oscuro/claro × 360/768/1280. Axe sin violaciones, sin errores JS ni
scroll horizontal de página; skip link, foco visible, Escape y reduced-motion
correctos. Pesos sin compresión: Quiénes somos 74049 B; Contacto 73743 B;
avisos legales 73196 B cada uno; 404 73531 B. Se inspeccionaron visualmente las
cinco capturas a 360 px: títulos y enlaces legibles, correo completo, sin recortes.
El JSON y treinta capturas quedan conservados en evidencia/etapa-6-evidencia.zip.

Archivos: LayoutContenido, DocumentoLegal, cinco páginas, dos MDX borradores,
lib/legal.ts, tests/legal.test.ts, colección legal, opción 404 de Wrangler y
extensión reutilizable del auditor. No se cambian capacidades ni lanzamiento.

Etapa 6 en curso, no cerrada. Implementado y probado: páginas informativas,
mailto, 404 local, colección y exclusión de borradores. Pendiente: comprobación
remota del 404, revisión visual humana, identidad/domicilio, Person, aviso y términos
completos aprobados, confirmación de tratamientos/proveedores (H2). El build
correcto y las banderas de metadatos no equivalen a aprobación legal.

Para retomar: PR #18 y rama etapa6/preparacion-contenido, leer este corte y E6-b/d.
No cambiar publicado/revisionHumana ni completar nombre/domicilio por inferencia.
Revisar los borradores en src/content/legal y cerrar pendientes antes de publicar.
Las rutas legales actuales solo muestran aviso de revisión. No fusionar esta
etapa a main sin nueva autorización; la autorización de fusión previa fue #16/#17.

Paquete: 1143345 bytes; SHA-256 `24a52e24e91f272da2d1f9c63e9b79540e38450ad95b6bfa4ac9a8e1ce6c3899`.

### E6-f — Verificación remota y continuidad (2026-10-28)

Revisión comprobada: `f8c6564df593fd3bafa25ffb297547403fd23b60`, PR #18,
rama `etapa6/preparacion-contenido`. Los checks `verificar` y
`Workers Builds: calcinst-web` terminaron `success` para esta revisión.
CI: https://github.com/sebashealy/calcinst-web/actions/runs/40744266815 .
Workers build: `c92d4a3a-af39-4ccc-aeaa-b206e605cf59`;
versión: `d1015c6d-5526-47c4-9f25-de5445aed881`.

Vista previa comprobada: https://d1015c6d-calcinst-web.instcalc.workers.dev .
Se ejecutó `Invoke-WebRequest -SkipHttpErrorCheck` para cada ruta y se inspeccionó
StatusCode y Content. Resultados reales:

| Ruta | HTTP | Aviso legal pendiente | Cuerpo de borrador expuesto |
| --- | --- | --- | --- |
| /quienes-somos/ | 200 | No | No |
| /contacto/ | 200 | No | No |
| /terminos/ | 200 | Sí | No |
| /privacidad/ | 200 | Sí | No |
| /ruta-inexistente-etapa6/ | 404 | No | No |
| /normativa/ref-no-existe/ | 404 | No | No |

Las seis respuestas contienen enlace al blog; Contacto y ambos avisos contienen
instcalc@gmail.com. Se buscó el marcador `Borrador interno: no publicar` en las
seis respuestas y no apareció. La exclusión completa en dist se documenta en E6-d.
Esto resuelve el pendiente de comprobación remota del 404 de E6-d/E6-e; no
implementa rutas normativas. Las evidencias CI citadas corresponden al commit
anterior, no acreditan automáticamente commits documentales posteriores.

Siguiente paso: revisión humana de Quiénes somos, Contacto y 404 en esta preview.
Mantener la presentación como CalcInst mientras el usuario decide si publica su
nombre. Después, resolver responsable/domicilio y tratamientos/proveedores de H2,
completar y aprobar los textos legales antes de activar su publicación. Person
sigue pendiente de identidad confirmada. No completar datos ni aprobación legal
por inferencia. PR #18 continúa en borrador; su fusión requiere autorización
expresa. Etapa 6 sigue en curso; no se modifica producción en este bloque.

Traspaso: leer el último corte, E6-b a E6-f, DECISIONES_SITIO.md,
HIPOTESIS_SITIO.md y el apartado Etapa 6 de PLAN_SITIO_WEB.md. Código relevante:
src/pages/{quienes-somos,contacto,404,terminos,privacidad}.astro,
src/layouts/LayoutContenido.astro, src/components/DocumentoLegal.astro,
src/lib/legal.ts, src/content/legal/ y tests/legal.test.ts. Evidencia visual:
evidencia/etapa-6-evidencia.zip. No se añaden dependencias ni se modifica CalcInst.

### E6-g — Aprobación visual e inventario para el aviso (2026-10-28)

El usuario responde «Excelente apruebo, continuemos con lo que sigue» tras la
entrega de las páginas de E6-f. Se registra la aprobación de las páginas
informativas y 404 presentadas. Los borradores legales no fueron mostrados como
textos definitivos: esta aprobación no activa publicado/revisionHumana, no cierra
la etapa ni se interpreta como orden de fusionar el PR #18.

Se amplía exclusivamente el borrador privado src/content/legal/privacidad.mdx
con evidencia del código: localStorage/tema (claro u oscuro, sin vencimiento
programado ni transmisión en esos componentes), contacto mediante mailto y
fuentes locales. Búsqueda ejecutada con rg en src/, public/ y wrangler.jsonc de
localStorage, sessionStorage, document.cookie, analytics, beacon, fetch, form y
buttondown: solo coincidieron la lectura y escritura de tema. Se leyeron
LayoutBase, ScriptTema, ConmutadorTema y Wrangler para contextualizar el resultado.
No se deduce ausencia global de registros o cookies del proveedor. No se accedió
al buzón ni al dashboard. La finalidad del cambio es redactar sobre el tratamiento
real y no copiar «solo correo» o Buttondown activo del plan histórico.

Se consultó de nuevo https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf :
texto vigente con reforma DOF 14-11-2025, artículo 15.I identidad y domicilio;
artículo 2.XV identifica a la Secretaría Anticorrupción y Buen Gobierno.
H2 permanece abierta hasta completar y revisar el aviso aplicable al proyecto.

Se solicitaron al usuario dos datos: definición del responsable/domicilio y
operación del buzón (accesos, finalidad, reenvíos y conservación). Pendientes de
respuesta; no inferir información personal ni publicar datos recibidos sin dejar
claro su destino. Próximo paso: incorporar respuestas, revisar proveedores y
preparar textos completos para aprobación humana. Person y propiedad intelectual
también requieren titular confirmado. Mantener PR #18 en borrador.

Validación de este bloque: npm run check terminó exit 0, 66 archivos,
0 errores/advertencias/hints. Persiste el aviso de configuración obsoleta
markdown.smartypants ya documentado. Primer intento restringido interrumpido
sin resultados; la ejecución con permisos ampliados produjo el resultado anterior.
git diff --check pasó. No se repitió la auditoría visual: el cambio de contenido
permanece en un borrador no publicable y no modifica las páginas aprobadas.
