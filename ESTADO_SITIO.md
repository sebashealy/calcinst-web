# ESTADO_SITIO.md — Estado vivo del sitio CalcInst

> Creado en la Etapa 0 (2026-09-05) conforme a `PLAN_SITIO_WEB.md` v1.0.

## Última etapa cerrada

Etapa 3 — 2026-09-10. Evidencia presentada en E3-a … E3-h (E3-g: prueba de P3, negativa). **El cierre queda sujeto a la verificación de Sebastián**, conforme a la regla de puertas del plan; la autoatestación no cuenta como evidencia.

Cotejo criterio por criterio (plan §6, Etapa 3):

| Criterio de aceptación | Estado | Evidencia |
|---|---|---|
| Cambiar `ESTADO_LANZAMIENTO` a cada valor cambia el botón de acción y el pie sin tocar otro archivo (`git diff --stat` = 1 archivo) | cumplido | E3-b: tres transiciones, `1 file changed` en cada una; pruebas e invariantes pasan sin modificarse en los tres estados |
| El script I7 falla con un literal prohibido y vuelve a pasar al quitarlo (prueba negativa documentada) | cumplido | E3-d: exit 1 señalando archivo y línea, exit 0 al retirarlo; además permanente en CI |
| Menú móvil operable con teclado y lector de pantalla (`aria-expanded`, `Escape` cierra) | cumplido con límite | E3-e: teclado verificado y árbol de accesibilidad correcto en los tres momentos. **No** se probó con un lector real; queda sugerida una comprobación de un minuto con Narrador |

Evidencia pedida: tres `git diff --stat` y captura de cada estado (E3-b, E3-c), salida del script en fallo y en éxito (E3-d), conteo de pruebas antes y después (E3-h: 0 → 31).

Riesgos anotados de la etapa, cubiertos con prueba: «el estado se filtra a `producto.json`» (dos pruebas en `tests/lanzamiento.test.ts`) y «menú móvil sin cierre por `Escape`» (E3-e y la auditoría de E3-f).

También en esta etapa, a pedido de Sebastián: **P2** (juego de caracteres) y **P3** (URL de preview) registrados en «Bloqueos», y Tailwind desinstalado (**AD2** en `DECISIONES_SITIO.md`, **A6** aquí). Addendum **A7** con las decisiones de implementación que precisan el plan.

## Siguiente etapa

Etapa 4 — Blog completo, con dos posts reales.

Criterios de aceptación (copiados del plan, §6, Etapa 4):

> **Criterios de aceptación:** un post sin `normativa` rompe el build (prueba negativa); un post con `verificadoDOF: false` y `borrador: false` rompe el build; un `CalloutNormativo` en el cuerpo no declarado en el frontmatter rompe el build; `rss.xml` valida en el validador W3C; el post renderizado con `remark` puro conserva todo el texto; Lighthouse del post: LCP ≤ 2.0 s, JS ≤ 5 KB, peso ≤ 300 KB; los dos posts tienen todas sus citas con `verificadoDOF: true` (con nota de qué versión del DOF se consultó, ver H1).

> **Evidencia:** salidas de las tres pruebas negativas; resultado del validador RSS; informe Lighthouse; `git diff --stat`; conteo de tests.

> **Riesgos:** el redactor (humano) publica con `verificadoDOF: true` sin haber verificado — esto no lo detecta el código; se mitiga con la regla del calendario editorial (§7: la verificación se hace en la sesión de redacción, no al publicar).

**Precondiciones antes de empezar la Etapa 4** (detalle en «Bloqueos»):

- **P2** — el juego de caracteres como dato del proyecto, con las dos comprobaciones de build. Hoy 10 caracteres declarados no tienen glifo.
- **P3** — resuelto por Sebastián en la opción A (`workers_dev: true`, AD3); pendiente de comprobar que la preview del PR siguiente responde 200 (ver P3).
- **H1** — refutada provisionalmente: la vigente sería la NOM-001-SEDE-2012. La verificación definitiva es de Sebastián y bloquea la **publicación** de T01, no la infraestructura de la Etapa 4.
- **Contenido humano:** T01 y T03 los redacta Sebastián; el andamiaje de la Etapa 4 puede construirse antes, pero la etapa no cierra sin los dos posts.

**Para cerrarla:** **P1**, las Redirect Rules con sus nueve comprobaciones.

Dependencias que la Etapa 4 probablemente pedirá, **sin instalar**: `@astrojs/rss` (4.0.19 al 2026-09-05, en D1). Zod ya viene con Astro (`astro/zod`), así que el esquema del frontmatter no necesita dependencia propia; se confirmará al empezar.

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

## Decisión resuelta — D2 y "Cloudflare solo despliega lo que pasó CI"

D2 establece: *"Cloudflare solo despliega lo que pasó CI"*. La integración Git de Workers Builds no satisface ese enunciado por sí sola, porque Cloudflare construye al recibir un push, en paralelo con GitHub Actions y sin conocer su resultado.

**Resuelto el 2026-09-06 en la opción A:** integración Git más protección de rama en GitHub exigiendo el check `verificar`. `main` solo recibe commits que ya pasaron CI, de modo que lo que Cloudflare despliega también pasó CI. No requiere tokens, ni secretos en el repositorio, ni `wrangler` como dependencia. Evidencia en E1-o.

La opción B descartada era desplegar desde GitHub Actions con `wrangler deploy` tras el job `verificar`: cumple el enunciado de forma más literal, pero exige guardar un token de API de Cloudflare como secreto y fijar `wrangler` como dependencia. Se descarta por coste y superficie de riesgo, no por incapacidad técnica.

## Bloqueos

### P1 — Preservación de ruta en las dos Redirect Rules (corte: antes de cerrar la Etapa 4)

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

### P3 — Las URL de preview por PR dejaron de generarse (corte: antes de iniciar la Etapa 4)

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

<!-- P3-RESULTADO -->

### P4 — `noindex` condicionado al host `*.workers.dev` (destino: Etapa 9)

Condición de AD3, fijada por Sebastián el 2026-09-11. Texto literal:

> Al retirar el noindex global, emitir X-Robots-Tag: noindex condicionado al host para peticiones que llegan por *.workers.dev. Verificación: `curl -I` contra el dominio canónico y contra el host workers.dev, ambas salidas literales. La canónica no sustituye esta verificación.

**Viabilidad, comprobada en la documentación** (`https://developers.cloudflare.com/workers/static-assets/headers/`): `_headers` admite reglas con URL absoluta, y el ejemplo que da la propia página es exactamente este caso — `https://myworker.mysubdomain.workers.dev/*` con `X-Robots-Tag: noindex`. Se resuelve con una regla en `public/_headers`, sin código de Worker. Dos advertencias de la misma página: la URL absoluta debe empezar por `https`, y las reglas de `_headers` no se aplican a respuestas generadas por código de Worker (hoy no hay ninguna).

**Lo que la Etapa 9 no debe pasar por alto:** las previews también viven en `*.workers.dev` (`<versión>-calcinst-web.instcalc.workers.dev`, `<rama>-calcinst-web.instcalc.workers.dev`), así que la regla tiene que cubrir esos hosts y no solo el de producción. **No se ha comprobado** que `_headers` acepte un comodín en el host; si no lo acepta, hará falta una alternativa, que se decidirá entonces. La verificación con `curl -I` debe incluir un host de preview además de `calcinst-web.instcalc.workers.dev` y del canónico.

### Otros pendientes

- **H11** (corte vencido en Etapa 0): confirmar que D4/D5 coinciden con la memoria del proyecto; si no, se emite el addendum que corresponda. Único punto de gobierno abierto desde la Etapa 0.
- **Correo de contacto público** (corte: Etapa 6). `SITIO.correoContacto` está en `null` a propósito: publicar una dirección es decisión de Sebastián. Lo necesitan la página de Contacto (Etapa 6) y el correo alterno que exige I1 en el formulario (Etapa 8).
- **Revisión de `capacidades.json` — de Sebastián; bloquea la Etapa 5, no la 4.** (1) Nombres y descripciones son redacción provisional (`"redaccionProvisional": true`). (2) Los `motivo` se copiaron de §4.3, que cita `ESTADO_PROYECTO.md` del 2026-07-30, y pueden estar desfasados. La revisión debe distinguir **dos cosas distintas**: (a) si las correcciones de los Art. 430-22 y 430-24 ya se aplicaron al motor de cálculo, y (b) si existe el **caso de referencia calculado a mano**. **Solo (b) permite pasar** `sizing-caso-1`, `sizing-caso-2` y `sizing-caso-3-alimentador` a `verificado`: que el código esté corregido no demuestra que calcule bien. (3) `normativa[]` está vacío en todas las capacidades: poblarlo es contenido normativo y debe cotejarse con el DOF (I3).
- **Inicio sin `LayoutBase`** (corte: Etapa 5). `index.astro` sigue siendo la página mínima de la Etapa 1. Ponerle la barra de navegación ahora publicaría en la portada enlaces a páginas que aún no existen (`/producto/`, `/blog/`…); la Etapa 5 la reconstruye sobre el layout.
- **`enforce_admins`: cerrado, no pendiente.** Permanece en `false` por decisión consciente de Sebastián; queda registrado en `DECISIONES_SITIO.md`, AD1.

**Para iniciar la Etapa 4 deben estar resueltos P2 y P3**, y para cerrarla, P1. Además la Etapa 4 depende de contenido humano: los posts T01 y T03 los redacta Sebastián, y T01 exige cerrar antes H1 (versión vigente de la NOM).

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
