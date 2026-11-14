import { z } from 'astro/zod'

const fecha = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((valor) => {
    const d = new Date(`${valor}T00:00:00Z`)
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === valor
  }, 'Fecha de calendario inválida')

export const esquemaLegal = z
  .object({
    titulo: z.string().trim().min(1),
    tipo: z.enum(['terminos', 'privacidad']),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    fechaVigencia: fecha.nullable(),
    publicado: z.boolean(),
    revisionHumana: z.boolean(),
    pendientes: z.array(z.string().trim().min(1)),
    responsable: z.string().trim().min(1).nullable(),
    domicilio: z.string().trim().min(1).nullable(),
  })
  .superRefine((datos, ctx) => {
    if (!datos.publicado) return
    if (!datos.revisionHumana || !datos.fechaVigencia || datos.pendientes.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Publicar exige revisión humana, fecha y ningún pendiente.',
      })
    }
    if (datos.tipo === 'privacidad' && (!datos.responsable || !datos.domicilio)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Privacidad exige identidad y domicilio del responsable.',
      })
    }
  })

export function legalPublicable(datos: unknown, hoy: string): boolean {
  const resultado = esquemaLegal.safeParse(datos)
  return (
    fecha.safeParse(hoy).success &&
    resultado.success &&
    resultado.data.publicado &&
    resultado.data.fechaVigencia !== null &&
    resultado.data.fechaVigencia <= hoy
  )
}

export function fechaMexico(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}
