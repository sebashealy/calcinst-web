# ESTADO_SITIO.md — Estado vivo del sitio CalcInst

> Creado en la Etapa 0 (2026-09-05) conforme a `PLAN_SITIO_WEB.md` v1.0.

## Última etapa cerrada

Etapa 0 — 2026-09-05. Evidencia presentada (E0-a … E0-e en este documento; E0-f en el mensaje de cierre de la sesión). El cierre queda sujeto a la verificación de los criterios de aceptación por el humano, conforme a la regla de puertas del plan.

## Siguiente etapa

Etapa 1 — Andamiaje, tooling, página en blanco desplegada al dominio.

Criterios de aceptación (copiados del plan, §6, Etapa 1):

> **Criterios de aceptación:** `npm run build` genera `dist/` estático; CI verde en PR; `https://calcinst.mx` responde 200 con TLS y `www.` y `.com` redirigen 301; prueba de humo I5 documentada y rama borrada; Lighthouse CI corre (presupuestos aún laxos).

> **Evidencia:** URL de producción; `curl -I` de las cuatro URLs (apex, www, .com, .com/www); captura del panel de Cloudflare Pages; enlace al run de CI; `git diff --stat`.

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

## Evidencia Etapa 1 (en curso, 2026-09-05)

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

## Decisión pendiente — D2 y "Cloudflare solo despliega lo que pasó CI"

D2 establece: *"Cloudflare solo despliega lo que pasó CI"*. La integración Git de Workers Builds **no satisface ese enunciado por sí sola**: Cloudflare observa el repositorio y construye al recibir un push, en paralelo con GitHub Actions y sin conocer su resultado. Un commit roto en `main` se desplegaría antes de que CI lo reporte. Se registra aquí en vez de resolverse por cuenta propia, porque cambia la forma del despliegue y conviene decidirlo antes de conectar:

- **Opción A (recomendada, barata):** conectar la integración Git y proteger `main` en GitHub (exigir que el check `verificar` pase antes de fusionar, y prohibir push directo). `main` solo recibe commits que pasaron CI, así que lo que Cloudflare despliega ya pasó CI. No requiere tokens ni secretos.
- **Opción B:** no usar la integración Git; desplegar desde GitHub Actions con `wrangler deploy` en un job posterior a `verificar`. Cumple el enunciado de forma literal, pero exige guardar un token de API de Cloudflare como secreto del repositorio y fijar `wrangler` como dependencia (4.129.0 al 2026-09-05, **no instalada**: requiere tu aprobación conforme a la regla de dependencias).

## Bloqueos

Todo lo que puede hacerse sin el dashboard está hecho. Faltan estas acciones de Sebastián:

1. **Elegir entre la opción A y la B** de la sección anterior.
2. **Conectar el repositorio** en Cloudflare (Workers & Pages → Create → Workers → Connect to Git), dando acceso **solo** a `calcinst-web`: build `npm run build`, directorio de salida `dist`, rama de producción `main`. Activar en Settings → Build → Branch control la casilla **"Builds for non-production branches"**, sin la cual el PR #1 no genera preview y la prueba de humo I5 no puede verificarse.
3. **Registrar `calcinst.com`** en Cloudflare (el `.mx` ya está con zone activo). Verificado aún no registrado el 2026-09-05 por la tarde: RDAP de Verisign devuelve HTTP 404.
4. **H11** (corte vencido en Etapa 0): confirmar que D4/D5 coinciden con la memoria del proyecto; si no, se emite el addendum siguiente.

Hecho 1–3, la sesión puede cerrar la etapa: `curl` al preview de `/api/ping`, borrado de `prueba/i5-humo`, dominio personalizado, Redirect Rules y `curl -I` de las cuatro URLs.

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
