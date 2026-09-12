# HIPOTESIS_SITIO.md — Registro de suposiciones del sitio CalcInst

> Creado en la Etapa 0 (2026-09-05) conforme a `PLAN_SITIO_WEB.md` v1.0, §8.
> Dueños: S = Sebastián, CC = Claude Code. Las fuentes de H3 y H9 están en
> `ESTADO_SITIO.md` § Evidencia Etapa 0 (E0-c y E0-d). H12 proviene del paso P2 (E0-b).

| ID | Hipótesis | Dueño | Corte | Si es falsa | Estado |
|---|---|---|---|---|---|
| H1 | La versión de la NOM-001-SEDE que rige y que el sitio citará es la 2018 | S | Cerrada 2026-09-12 | **REFUTADA.** Rige la NOM-001-SEDE-2012, con la Nota Aclaratoria del 07/02/2014. Ver «Evidencia de H1» más abajo. Efecto en el sitio: la cadena de versión es `NOM-001-SEDE-2012` en `src/config/norma.ts`, que además documenta que esa cadena designa el texto de 2012 **corregido por la nota de 2014** (AD8); la numeración de artículos y tablas no cambia (la 2012 se apoya en el NEC 2011; la renumeración a 310.16 es del NEC 2020) |
| H2 | La ley aplicable al aviso de privacidad en 2026 es la LFPDPPP (versión vigente tras la reforma de 2025 que reorganizó la autoridad garante). Debe verificarse el texto vigente y el nombre de la autoridad antes de la Etapa 6 | S (con abogado) | Etapa 6 | Cambian referencias y autoridad en el aviso; el modelo de consentimiento (finalidad + opt-in + ARCO) se mantiene | abierta |
| H3 | `calcinst.mx` y `calcinst.com` están disponibles | CC verifica en Etapa 0 | Etapa 0 | Se decide canónico entre los disponibles; se registra en `DECISIONES_SITIO.md` | **confirmada** (2026-09-05). `calcinst.mx`: "Disponible/Available" según el whois autoritativo de NIC México (`whois.mx`, sintaxis `=dominio`, con consulta de control). `calcinst.com`: no registrado según RDAP del registro (`rdap.verisign.com`, HTTP 404). Evidencia literal en E0-c |
| H4 | La figura fiscal del vendedor (persona física con actividad empresarial / RESICO / persona moral) se decide con el contador antes de `disponible` | S | Antes de `disponible` | Cambia el "responsable" del aviso de privacidad y la mecánica de retenciones en D5; no cambia el sitio v1 | abierta |
| H5 | Existen o pueden producirse capturas presentables del lienzo en tema oscuro desde `demo.calcinst.json` antes de la Etapa 5 | S | Etapa 5 | La Etapa 5 se retrasa; **no** se sustituyen por maquetas ni ilustraciones (§3.1) | abierta |
| H6 | Tauri 2 sigue siendo la decisión de empaquetado (así lo registra `DECISIONES.md`); `ESTADO_PROYECTO.md` aún lista "Persistencia Supabase + login" como pendiente, lo que sugiere una arquitectura web multiusuario que contradice la distribución de escritorio con licencia sin conexión. Se asume que Supabase queda descartado o pospuesto | S | Etapa 7 | Si se mantiene Supabase, D4/D5 y el portal de cuenta de fase 2 cambian de forma; el sitio v1 no | abierta |
| H7 | La beta se publica solo para Windows x64 | S | Etapa 7 | Se agregan artefactos; requiere resolver firma/notarización macOS | abierta |
| H8 | Existe una vía de firma de código Windows accesible a una persona física a costo razonable (CA con certificado OV, o Azure Trusted Signing si admite personas físicas). Se verifica en el momento de la beta, no ahora | S | Antes de `beta` | La beta sale sin firma con la explicación de SmartScreen redactada en la Etapa 7 | abierta |
| H9 | Buttondown ofrece un endpoint público de suscripción utilizable desde un formulario propio sin exponer la clave de API | CC verifica en Etapa 0 | Etapa 0 | Se usa Kit, o una Pages Function mínima con addendum | **confirmada** (2026-09-05) en documentación oficial: (a) endpoint `embed-subscribe` como `action` de un `<form>` HTML sin clave de API (`docs.buttondown.com/building-your-subscriber-base`); (b) double opt-in activo por defecto (`docs.buttondown.com/double-opt-in`); (c) exportación CSV (`docs.buttondown.com/data-exports-subscriber`). Matiz para la Etapa 8: la documentación pide no usar `fetch` contra `embed-subscribe` (el suscriptor puede necesitar seguir la respuesta para CAPTCHA/validación); detalle en E0-d |
| H10 | Los errores documentados en `examen1_2.xlsx` (fórmula de tubería, factor de caída, 430-22/430-24) son representativos de la práctica común y pueden describirse en T14 sin identificar el archivo ni a su autor | S | Antes de T14 | T14 se reescribe como lista de verificación genérica | abierta |
| H11 | Las decisiones D4 y D5 son las que la memoria del proyecto ya apuntaba (licencia anual con fallback perpetuo; CFDI con contador); este plan las formaliza, no las contradice | S | Etapa 0 | Se emite addendum A1 con la corrección | abierta |
| H12 | **Hallazgo de P2 (E0-b, 2026-09-05):** `astro@latest` en el registro npm es **7.3.1**, no 5.x como asume D1 del plan; los paquetes acompañantes también van por majors posteriores (`@astrojs/mdx` 8.0.0, `@astrojs/cloudflare` 14.3.0). La hipótesis implícita del plan ("Astro 5") ya no describe el `latest` publicado. Conforme al protocolo de la Etapa 0, la decisión de stack **no se cambia** aquí; la Etapa 1 debe decidir (con autorización del humano) si se usa `astro@latest` 7.x o se fija una versión, y verificar que la documentación citada por el plan (Content Collections, adaptador Cloudflare, islas) siga vigente en esa major | S | Etapa 1 | Si Astro 7.x cambió APIs que el plan asume (Content Collections/Zod, adaptador Cloudflare, islas React), la Etapa 1 lo documenta como addendum en `ESTADO_SITIO.md` sin reescribir el plan | **cerrada** (2026-09-11). Astro 7.3.1 autorizado en la puerta de la Etapa 1 (E1-a), y verificadas en uso las APIs que el plan asumía: el adaptador Cloudflare en la prueba I5 (E1-f, E1-k); las colecciones de contenido con el cargador `glob` y Zod 4 vía `astro/zod`, y la API de contenedor para el RSS, en la Etapa 4. Diferencias encontradas, ninguna estructural: la configuración va en `src/content.config.ts` y no en `src/content/config.ts`; `paginate()` exige un parámetro llamado `page`; `@astrojs/mdx` 8 ya no usa remark sino `markdown-satteri` (addendum A8) |

## Evidencia de H1 (verificada por Sebastián, 2026-09-12)

H1 se cierra como **refutada**. La verificación es de Sebastián, según lo acordado en
la autorización de la Etapa 4; aquí queda registrada con sus fuentes.

1. **Catálogo Mexicano de Normas, Secretaría de Economía** — ficha NOM-001-SEDE-2012:
   estado «Vigente», DOF 29/11/2012, en vigor 29/5/2013. Histórico de cancelaciones:
   1999 y 2005; ninguna posterior.
   `platiica.economia.gob.mx/normalizacion/nom-001-sede-2012/`
2. **Informe de la Revisión Sistemática de la NOM-001-SEDE-2012** (SENER, oficio
   300.E487/2023, 24/07/2023). Declara literalmente que no se obtuvo el Dictamen Total
   Final y que la NOM-001-SEDE-2018 nunca fue publicada en el DOF como norma definitiva.
   Concluye la necesidad de **modificar** la NOM-001-SEDE-2012. Registra además que el
   proceso del PROY-NOM-001-SEDE-2018 se dio de baja en el SPNIC 2022.
3. **DOF 06/08/2018**, edición matutina, secciones 2ª a 10ª: «Proyecto de Norma Oficial
   Mexicana PROY-NOM-001-SEDE-2018, Instalaciones Eléctricas (utilización)». Publicación
   para consulta pública, no expedición.
4. **Nota Aclaratoria, DOF 07/02/2014** (código 5331914): corrige errores gramaticales,
   ortográficos, de congruencia y de redacción, «así como en algunos valores». Afecta a
   CalcInst en la Tabla 5 (10 AWG TW/THHW/THW/THW-2: 55.68 pasa a 15.68 mm²) y en la
   Tabla 310-15(b)(2)(a) (factores de corrección, filas 66-85 °C). **No toca** 310-15(b)(16),
   310-15(b)(3)(a), 430-22, 430-24, 250-122 ni 110-14(c).

La fuente 4 es la que obligó a AD8: la cadena «NOM-001-SEDE-2012» sola no identifica un
texto único, porque el publicado en 2012 y el corregido en 2014 difieren en valores de al
menos dos tablas que CalcInst usa.
