#!/usr/bin/env node
/**
 * verificar-invariantes.mjs — verificación de invariantes del proyecto en CI.
 *
 * Contrato: sale con código 0 si todas las verificaciones activas pasan;
 * con código 1 si alguna falla, listando cada fallo por su invariante.
 *
 * Verificaciones activas:
 *  - I7 (Etapa 3): literales de estado de lanzamiento fuera de src/config/.
 *  - TOKENS (Etapa 2): colores literales fuera de src/styles/tokens.css.
 *  - NOTACION (P2): puntos de código prohibidos por caracteres.json (el signo de
 *    ohm, el signo micro, el incremento, los ornamentos que van como SVG).
 *  - CARACTERES (P2): ningún .md/.mdx usa un carácter fuera del conjunto declarado.
 *  - GLIFOS (P2, bloqueante): ningún carácter declarado se pierde al subconjuntar.
 *  - I3c (Etapa 4): términos de credencial profesional en src/ y content/, salvo
 *    en contextos negativos declarados.
 *
 * Pendientes, cada una en su etapa:
 *  - I1 (Etapa 8): bloques catch vacíos en src/.
 *
 * Las funciones se exportan para que tests/invariantes.test.ts las ejerza con
 * árboles de prueba: así la prueba negativa de I7 corre en cada CI en lugar de
 * ser una comprobación manual que se hace una vez.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { aTextoCodigo, leerConjunto, verificarGlifos } from './lib/fuentes.mjs'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * Literales de estado de lanzamiento (§4.2). Se comparan sin acentos y sin
 * distinguir mayúsculas, de modo que «Próximamente», «PROXIMAMENTE» y
 * «Unete a la lista» también se detectan.
 *
 * `proximamente` coincide además con el nombre de la clave del estado: es
 * deliberado. Un componente que escribe `ESTADOS.proximamente` está comparando
 * estados, y esa lógica debe vivir en src/config/.
 */
export const LITERALES_DE_ESTADO = [
  'próximamente',
  'proximamente',
  'Descargar beta',
  'Únete a la lista',
]

/** Quita diacríticos y pasa a minúsculas. */
export const normalizar = (texto) => texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const PATRONES_ESTADO = [...new Set(LITERALES_DE_ESTADO.map(normalizar))]

const EXTENSIONES_TEXTO = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.md', '.mdx', '.json', '.css']

/**
 * @param {string} contenido
 * @returns {Array<{ linea: number, literal: string }>}
 */
export function literalesDeEstado(contenido) {
  const hallazgos = []
  contenido.split('\n').forEach((linea, i) => {
    const plana = normalizar(linea)
    for (const patron of PATRONES_ESTADO) {
      if (plana.includes(patron)) hallazgos.push({ linea: i + 1, literal: patron })
    }
  })
  return hallazgos
}

const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1,5})?\b/
const FUNCION_COLOR = /\b(?:rgba?|hsla?|oklch|color-mix)\s*\(/

/** @param {string} linea */
export function tieneColorLiteral(linea) {
  // Las variables de Shiki no son colores escritos a mano.
  if (linea.includes('--shiki')) return false
  return HEX.test(linea) || FUNCION_COLOR.test(linea)
}

/**
 * Lista recursiva de archivos bajo `raiz/directorio` con alguna de las
 * extensiones dadas, como rutas relativas a `raiz` con barras normales.
 *
 * @param {string} raiz
 * @param {string} directorio
 * @param {string[]} extensiones
 * @returns {string[]}
 */
function archivos(raiz, directorio, extensiones) {
  let entradas
  try {
    entradas = readdirSync(path.join(raiz, directorio))
  } catch {
    // El directorio no existe todavía en esta etapa: no es un fallo.
    return []
  }
  return entradas.flatMap((entrada) => {
    const relativa = `${directorio}/${entrada}`
    if (statSync(path.join(raiz, relativa)).isDirectory()) {
      return archivos(raiz, relativa, extensiones)
    }
    return extensiones.includes(path.extname(entrada)) ? [relativa] : []
  })
}

const leer = (raiz, relativa) => readFileSync(path.join(raiz, relativa), 'utf8')

/**
 * I7: el estado de lanzamiento vive en un solo lugar. Recorre todo `src/`
 * salvo `src/config/`, que es precisamente donde esos literales deben estar.
 *
 * @param {string} [raiz]
 * @returns {string[]}
 */
export function verificarI7(raiz = RAIZ) {
  return archivos(raiz, 'src', EXTENSIONES_TEXTO)
    .filter((relativa) => !relativa.startsWith('src/config/'))
    .flatMap((relativa) =>
      literalesDeEstado(leer(raiz, relativa)).map(
        ({ linea, literal }) => `${relativa}:${linea} — contiene «${literal}»`,
      ),
    )
}

/**
 * TOKENS: el color se define solo en `src/styles/tokens.css`. Mitiga el riesgo
 * que el plan anota para la Etapa 2: colores sueltos que escapan a la
 * verificación de contraste.
 *
 * @param {string} [raiz]
 * @returns {string[]}
 */
export function verificarTokens(raiz = RAIZ) {
  return ['src/components', 'src/pages', 'src/layouts']
    .flatMap((dir) => archivos(raiz, dir, ['.astro', '.ts', '.tsx']))
    .flatMap((relativa) =>
      leer(raiz, relativa)
        .split('\n')
        .flatMap((linea, i) =>
          tieneColorLiteral(linea) ? [`${relativa}:${i + 1} — ${linea.trim().slice(0, 90)}`] : [],
        ),
    )
}

/** Directorios donde vive el contenido: `src/content/` y, si algún día existe, `content/`. */
const DIRECTORIOS_DE_CONTENIDO = ['src/content', 'content']

/**
 * NOTACION: los puntos de código que `caracteres.json` prohíbe no aparecen en
 * `src/` ni en `content/`. El mensaje dice qué usar en su lugar.
 *
 * @param {string} [raiz]
 * @returns {string[]}
 */
export function verificarNotacion(raiz = RAIZ) {
  const { prohibidos } = leerConjunto(raiz)
  const porCodigo = new Map(prohibidos.map((p) => [p.cp, p]))
  return ['src', 'content']
    .flatMap((dir) => archivos(raiz, dir, EXTENSIONES_TEXTO))
    .flatMap((relativa) =>
      leer(raiz, relativa)
        .split('\n')
        .flatMap((linea, i) =>
          [...linea].flatMap((c, col) => {
            const p = porCodigo.get(c.codePointAt(0))
            return p
              ? [
                  `${relativa}:${i + 1}:${col + 1} — ${p.codigo} (${p.nombre}); usar ${p.sugerencia}`,
                ]
              : []
          }),
        ),
    )
}

/**
 * CARACTERES: todo carácter de un .md o .mdx pertenece al conjunto declarado.
 * Saltos de línea y tabuladores son estructura, no texto, y se admiten.
 *
 * @param {string} [raiz]
 * @returns {string[]}
 */
export function verificarCaracteres(raiz = RAIZ) {
  const { declarados } = leerConjunto(raiz)
  const estructura = new Set([0x09, 0x0a, 0x0d])
  return DIRECTORIOS_DE_CONTENIDO.flatMap((dir) => archivos(raiz, dir, ['.md', '.mdx'])).flatMap(
    (relativa) =>
      leer(raiz, relativa)
        .split('\n')
        .flatMap((linea, i) =>
          [...linea].flatMap((c, col) => {
            const cp = c.codePointAt(0)
            return declarados.has(cp) || estructura.has(cp)
              ? []
              : [
                  `${relativa}:${i + 1}:${col + 1} — ${aTextoCodigo(cp)} fuera del conjunto declarado`,
                ]
          }),
        ),
  )
}

/**
 * GLIFOS: comprobación A de P2, bloqueante. Ningún carácter declarado se pierde
 * al subconjuntar; si una cara mono lo toma de su respaldo, el resultado lo dice.
 *
 * @param {string} [raiz]
 * @returns {Promise<string[]>}
 */
export async function verificarGlifosDeclarados(raiz = RAIZ) {
  const { fallos } = await verificarGlifos({ raiz })
  return fallos
}

/**
 * I3 c — la autoridad del sitio son las citas, no una credencial (§9.1). Estos
 * términos no pueden aparecer en `src/` ni en `content/`. «Ing.» se compara
 * tal cual (mayúscula y punto, para no confundirlo con otras palabras); el resto,
 * sin acentos ni mayúsculas.
 */
export const TERMINOS_DE_CREDENCIAL = [
  { termino: 'Ing.', patron: /\bIng\./ },
  { termino: 'ingeniero titulado', patron: /ingeniero titulado/ },
  { termino: 'cédula', patron: /cedula/ },
  { termino: 'licencia profesional', patron: /licencia profesional/ },
  { termino: 'colegiado', patron: /colegiad[oa]/ },
]

/**
 * Contextos negativos admitidos, como frases exactas (sin acentos ni mayúsculas).
 * Una línea que contenga una de ellas puede nombrar el término que niega.
 * Cada entrada nueva es una decisión editorial: amplía lo que el sitio dice.
 */
export const CONTEXTOS_NEGATIVOS = [
  // Descargo.astro, texto fijo de §9.1 del plan.
  'no un profesionista con cedula',
  // Ejemplo que el propio plan da en §5 para I3 c.
  'no soy ingeniero titulado',
]

/**
 * @param {string} contenido
 * @returns {Array<{ linea: number, termino: string }>}
 */
export function terminosDeCredencial(contenido) {
  const negativos = CONTEXTOS_NEGATIVOS.map(normalizar)
  const hallazgos = []
  contenido.split('\n').forEach((linea, i) => {
    const plana = normalizar(linea)
    for (const { termino, patron } of TERMINOS_DE_CREDENCIAL) {
      const objetivo = termino === 'Ing.' ? linea : plana
      if (!patron.test(objetivo)) continue
      const excusado = negativos.some((n) => plana.includes(n) && n.includes(normalizar(termino)))
      if (!excusado) hallazgos.push({ linea: i + 1, termino })
    }
  })
  return hallazgos
}

/**
 * @param {string} [raiz]
 * @returns {string[]}
 */
export function verificarI3c(raiz = RAIZ) {
  return ['src', 'content']
    .flatMap((dir) => archivos(raiz, dir, EXTENSIONES_TEXTO))
    .flatMap((relativa) =>
      terminosDeCredencial(leer(raiz, relativa)).map(
        ({ linea, termino }) =>
          `${relativa}:${linea} — «${termino}» fuera de un contexto negativo declarado`,
      ),
    )
}

/** @type {Array<{ invariante: string, descripcion: string, verificar: (raiz?: string) => string[] | Promise<string[]> }>} */
export const VERIFICACIONES = [
  {
    invariante: 'I7',
    descripcion: 'el estado de lanzamiento vive solo en src/config/',
    verificar: verificarI7,
  },
  {
    invariante: 'TOKENS',
    descripcion: 'el color se define solo en src/styles/tokens.css',
    verificar: verificarTokens,
  },
  {
    invariante: 'NOTACION',
    descripcion: 'ningún punto de código prohibido por caracteres.json',
    verificar: verificarNotacion,
  },
  {
    invariante: 'CARACTERES',
    descripcion: 'el contenido .md/.mdx solo usa caracteres declarados',
    verificar: verificarCaracteres,
  },
  {
    invariante: 'I3c',
    descripcion: 'ningún término de credencial profesional fuera de contextos negativos',
    verificar: verificarI3c,
  },
  {
    invariante: 'GLIFOS',
    descripcion: 'ningún carácter declarado se pierde al subconjuntar las fuentes',
    verificar: verificarGlifosDeclarados,
  },
]

async function main() {
  let totalFallos = 0
  for (const { invariante, descripcion, verificar } of VERIFICACIONES) {
    const fallos = await verificar()
    if (fallos.length > 0) {
      totalFallos += fallos.length
      console.error(`[FALLA] ${invariante} — ${descripcion}`)
      for (const fallo of fallos) console.error(`  - ${fallo}`)
    } else {
      console.log(`[OK] ${invariante} — ${descripcion}`)
    }
  }
  console.log(
    `verificar-invariantes: ${VERIFICACIONES.length} verificacion(es) activas, ${totalFallos} fallo(s)`,
  )
  // exitCode y no process.exit(): cortar el proceso mientras harfbuzz (WASM)
  // cierra sus recursos dispara una asercion de libuv en Windows y sale con 127.
  process.exitCode = totalFallos === 0 ? 0 : 1
}

// Solo se ejecuta como programa; al importarlo desde las pruebas no hace nada.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
