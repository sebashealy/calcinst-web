/**
 * nota-aclaratoria.ts — la Nota Aclaratoria del 07/02/2014 a la NOM-001-SEDE-2012
 * (AD8).
 *
 * La versión sola no identifica un texto único: el publicado en el DOF el
 * 29/11/2012 y el corregido por esta nota difieren en valores, al menos en dos
 * tablas que CalcInst usa. En vez de añadir un campo por cita —que dependería de
 * que el redactor se acuerde—, la lista de referencias corregidas es un dato del
 * proyecto y `CalloutNormativo` la consulta en cada cita.
 *
 * El esquema se aplica al importar: un dato mal formado rompe el build en vez de
 * degradarse en silencio (I1).
 */
import { z } from 'astro/zod'
import datos from '../config/nota-aclaratoria.json'

const esquemaReferencia = z.object({
  /** La `ref` tal como se cita, idéntica a la de `normativa[].ref`. */
  ref: z.string().min(1),
  descripcion: z.string().min(1),
  /** `true` si la nota cambia un valor; `false` si cambia el sentido de la disposición. */
  afectaValor: z.boolean(),
})

const esquemaNota = z.object({
  descripcion: z.string().min(1),
  fuente: z.object({
    titulo: z.string().min(1),
    fechaDOF: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    codigoDOF: z.string().min(1),
    url: z.url(),
    alcance: z.string().min(1),
  }),
  referencias: z.array(esquemaReferencia).min(1),
})

export type ReferenciaCorregida = z.infer<typeof esquemaReferencia>

/** Falla al importar si `nota-aclaratoria.json` no cumple el esquema. */
export const NOTA_ACLARATORIA = esquemaNota.parse(datos)

const POR_REF = new Map(NOTA_ACLARATORIA.referencias.map((r) => [r.ref, r]))

if (POR_REF.size !== NOTA_ACLARATORIA.referencias.length) {
  throw new Error('nota-aclaratoria.json: hay referencias repetidas')
}

/** La corrección que la nota hizo a esa `ref`, o `undefined` si no la tocó. */
export const correccionDe = (ref: string): ReferenciaCorregida | undefined => POR_REF.get(ref)

/** Fecha de la nota en el formato que se pinta: «7 de febrero de 2014». */
export const FECHA_NOTA = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long',
  timeZone: 'UTC',
}).format(new Date(NOTA_ACLARATORIA.fuente.fechaDOF))
