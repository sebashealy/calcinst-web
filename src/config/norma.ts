/**
 * norma.ts — versión de la NOM-001-SEDE que cita el sitio.
 *
 * Fuente única de la cadena: el esquema del frontmatter del blog (Etapa 4) la
 * toma como valor por omisión y los ejemplos de /diseno/ la leen de aquí.
 * Cambiar de versión es cambiar esta línea, como previó el plan para H1.
 *
 * **Qué texto designa esta cadena (AD8).** «NOM-001-SEDE-2012» a secas es
 * ambiguo: designa aquí el texto publicado en el DOF el **29 de noviembre de
 * 2012** (en vigor desde el 29 de mayo de 2013) **corregido por la Nota
 * Aclaratoria publicada en el DOF el 7 de febrero de 2014** (código 5331914),
 * que además de erratas de redacción corrige «algunos valores». Las referencias
 * que esa nota tocó están en `src/config/nota-aclaratoria.json` y
 * `CalloutNormativo` las avisa sola, sin depender de que el redactor se acuerde.
 *
 * H1 quedó **refutada** el 2026-09-12 con la verificación de Sebastián: rige la
 * 2012; la 2018 nunca se expidió (se publicó el 06/08/2018 solo como proyecto
 * para consulta pública y su proceso se dio de baja del SPNIC en 2022). Ver
 * `HIPOTESIS_SITIO.md`. La numeración de artículos y tablas es la de 2012, que
 * se apoya en el NEC 2011: la renumeración a 310.16 es del NEC 2020 y no aplica.
 */
export const VERSION_NOM = 'NOM-001-SEDE-2012'
