#!/usr/bin/env node
/**
 * auditar-diseno.mjs — evidencia de la Etapa 2.
 *
 * Sirve `dist/`, abre /diseno/ en ambos temas y produce:
 *   1. La matriz de contraste token × fondo, leyendo los colores YA RENDERIZADOS
 *      con getComputedStyle. No lee el CSS fuente: mide lo que ve el navegador.
 *   2. Una pasada de axe-core sobre la página, en los dos temas.
 *   3. Capturas a 360 px y 1280 px, en los dos temas.
 *
 * Usa el Chrome instalado en el sistema mediante puppeteer-core; no descarga
 * ningún navegador.
 *
 *   node scripts/auditar-diseno.mjs [directorio-de-salida]
 */
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import axeCore from 'axe-core'

const { source: axeSource } = axeCore

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(RAIZ, 'dist')
const SALIDA = process.argv[2] ?? path.join(RAIZ, 'evidencia', 'etapa-2')

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
}

function localizarChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH
  const candidatos = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]
  const encontrado = candidatos.find((c) => existsSync(c))
  if (!encontrado) {
    throw new Error(
      'No se encontró Chrome. Define CHROME_PATH con la ruta al ejecutable y vuelve a intentar.',
    )
  }
  return encontrado
}

/** Servidor estático mínimo sobre dist/, con resolución de directorio a index.html. */
function servir(directorio) {
  const servidor = createServer(async (peticion, respuesta) => {
    try {
      const url = new URL(peticion.url, 'http://localhost')
      let ruta = path.join(directorio, decodeURIComponent(url.pathname))
      if (!path.extname(ruta)) ruta = path.join(ruta, 'index.html')
      const cuerpo = await readFile(ruta)
      respuesta.writeHead(200, {
        'content-type': TIPOS[path.extname(ruta)] ?? 'application/octet-stream',
      })
      respuesta.end(cuerpo)
    } catch {
      // Nada se pierde en silencio: el 404 se ve en la consola del navegador.
      respuesta.writeHead(404, { 'content-type': 'text/plain' })
      respuesta.end('no encontrado')
    }
  })
  return new Promise((resolver) => {
    servidor.listen(0, '127.0.0.1', () => resolver({ servidor, puerto: servidor.address().port }))
  })
}

/** Contraste WCAG 2.x a partir de dos colores rgb() ya resueltos por el navegador. */
const CONTRASTE_EN_PAGINA = `
(() => {
  const aRgb = (s) => s.match(/\\d+(\\.\\d+)?/g).slice(0, 3).map(Number);
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const leer = (t) => getComputedStyle(document.documentElement).getPropertyValue(t).trim();
  const aRgbDeToken = (t) => { const d = document.createElement('div'); d.style.color = leer(t); document.body.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return aRgb(c); };
  const fondos = ['--bg-0', '--bg-1', '--bg-2'];
  const frente = ['--fg-0', '--fg-1', '--fg-2', '--accent', '--link', '--ok', '--warn', '--danger', '--color-line-ui', '--color-line'];
  const filas = frente.map((t) => ({
    token: t,
    valor: leer(t),
    ratios: fondos.map((f) => Number(ratio(aRgbDeToken(t), aRgbDeToken(f)).toFixed(2))),
  }));
  const textoSobreAccent = Number(ratio(aRgbDeToken('--accent-texto'), aRgbDeToken('--accent')).toFixed(2));
  return { fondos, filas, textoSobreAccent };
})()
`

/** Tokens que rotulan texto y por tanto deben llegar a 4.5:1 (AA). */
const TOKENS_DE_TEXTO = [
  '--fg-0',
  '--fg-1',
  '--fg-2',
  '--accent',
  '--link',
  '--ok',
  '--warn',
  '--danger',
]
/** Tokens de componente de interfaz: 3:1 basta (WCAG 1.4.11). `--color-line` es decorativo. */
const TOKENS_DE_UI = ['--color-line-ui']

/**
 * Recorre la página con Tab y comprueba tres cosas del criterio de la etapa:
 * que el enlace de salto sea el primer parada, que todo elemento enfocado
 * muestre un indicador visible, y que Escape cierre el menú móvil sin atrapar
 * el foco.
 */
async function recorrerConTeclado(pagina) {
  await pagina.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
  await pagina.evaluate(() => document.body.focus())

  const orden = []
  const sinFocoVisible = []
  let saltoEsPrimero = false

  for (let i = 0; i < 40; i++) {
    await pagina.keyboard.press('Tab')
    const info = await pagina.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const e = getComputedStyle(el)
      const ancho = parseFloat(e.outlineWidth) || 0
      const solido = e.outlineStyle !== 'none' && ancho > 0
      return {
        etiqueta: el.tagName.toLowerCase(),
        texto: (el.textContent ?? '').trim().slice(0, 40),
        focoVisible: solido,
      }
    })
    if (!info) break
    if (i === 0) saltoEsPrimero = /saltar al contenido/i.test(info.texto)
    orden.push(`${info.etiqueta}: ${info.texto}`)
    if (!info.focoVisible) sinFocoVisible.push(`${info.etiqueta}: ${info.texto}`)
    const fin = await pagina.evaluate(() => document.activeElement?.closest('footer') !== null)
    if (fin && i > 5) break
  }

  // Menú móvil: abrir con el botón, cerrar con Escape.
  await pagina.setViewport({ width: 360, height: 800, deviceScaleFactor: 1 })
  await pagina.click('[data-menu-boton]')
  const abierto = await pagina.$eval('[data-menu-boton]', (b) => b.getAttribute('aria-expanded'))
  await pagina.keyboard.press('Escape')
  const cerrado = await pagina.$eval('[data-menu-boton]', (b) => b.getAttribute('aria-expanded'))
  const focoVuelve = await pagina.evaluate(
    () => document.activeElement?.hasAttribute('data-menu-boton') ?? false,
  )

  return {
    paradas: orden.length,
    orden,
    sinFocoVisible,
    saltoEsPrimero,
    escapeCierraMenu: abierto === 'true' && cerrado === 'false' && focoVuelve,
  }
}

/** Con `prefers-reduced-motion: reduce` no debe quedar ninguna transición ni animación. */
async function comprobarMovimientoReducido(pagina) {
  await pagina.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await pagina.reload({ waitUntil: 'networkidle0' })
  const conMovimiento = await pagina.evaluate(() => {
    const sospechosos = []
    for (const el of document.querySelectorAll('a, button, .transicionable, .girador')) {
      const e = getComputedStyle(el)
      const transita = e.transitionDuration.split(',').some((d) => parseFloat(d) > 0)
      const anima = e.animationName !== 'none' && parseFloat(e.animationDuration) > 0
      if (transita || anima) {
        sospechosos.push(`${el.tagName.toLowerCase()}.${el.className}`.slice(0, 60))
      }
    }
    return sospechosos
  })
  await pagina.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  return { respetado: conMovimiento.length === 0, conMovimiento }
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error('No existe dist/. Ejecuta `npm run build` antes de auditar.')
  }
  await mkdir(SALIDA, { recursive: true })

  const { servidor, puerto } = await servir(DIST)
  const navegador = await puppeteer.launch({
    executablePath: localizarChrome(),
    headless: 'shell',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
  })

  const informe = { generado: new Date().toISOString(), temas: {} }
  let fallos = 0

  try {
    for (const tema of ['oscuro', 'claro']) {
      const pagina = await navegador.newPage()
      await pagina.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: tema === 'claro' ? 'light' : 'dark' },
        { name: 'prefers-reduced-motion', value: 'no-preference' },
      ])
      await pagina.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 })
      await pagina.goto(`http://127.0.0.1:${puerto}/diseno/`, { waitUntil: 'networkidle0' })

      // Fija el tema explícitamente para no depender solo de la media query.
      await pagina.evaluate((t) => {
        document.documentElement.dataset.tema = t
      }, tema)
      await pagina.evaluate(() => document.fonts.ready)

      const contraste = await pagina.evaluate(CONTRASTE_EN_PAGINA)

      // axe-core, inyectado como fuente: es la herramienta que nombra el plan.
      await pagina.evaluate(axeSource)
      const axe = await pagina.evaluate(async () => {
        const r = await window.axe.run(document, {
          resultTypes: ['violations'],
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        })
        return r.violations.map((v) => ({
          id: v.id,
          impacto: v.impact,
          descripcion: v.description,
          nodos: v.nodes.length,
          ejemplo: v.nodes[0]?.html?.slice(0, 160) ?? '',
        }))
      })

      for (const ancho of [360, 1280]) {
        await pagina.setViewport({ width: ancho, height: 900, deviceScaleFactor: 2 })
        await new Promise((r) => setTimeout(r, 150))
        await pagina.screenshot({
          path: path.join(SALIDA, `diseno-${tema}-${ancho}.png`),
          fullPage: true,
        })
      }

      const teclado = await recorrerConTeclado(pagina)
      const movimiento = await comprobarMovimientoReducido(pagina)

      const incumplen = contraste.filas.filter((f) => {
        const minimo = TOKENS_DE_TEXTO.includes(f.token)
          ? 4.5
          : TOKENS_DE_UI.includes(f.token)
            ? 3
            : 0
        return minimo > 0 && Math.min(...f.ratios) < minimo
      })

      informe.temas[tema] = {
        contraste,
        axe,
        teclado,
        movimiento,
        incumplen: incumplen.map((f) => f.token),
      }
      fallos +=
        incumplen.length +
        axe.filter((v) => ['critical', 'serious'].includes(v.impacto)).length +
        teclado.sinFocoVisible.length +
        (teclado.saltoEsPrimero ? 0 : 1) +
        (teclado.escapeCierraMenu ? 0 : 1) +
        (movimiento.respetado ? 0 : 1)

      // ---- salida legible ----
      console.log(`\n=== TEMA ${tema.toUpperCase()} ===`)
      console.log('token'.padEnd(17) + 'valor'.padEnd(10) + 'bg-0    bg-1    bg-2   veredicto')
      for (const f of contraste.filas) {
        const minimo = TOKENS_DE_TEXTO.includes(f.token)
          ? 4.5
          : TOKENS_DE_UI.includes(f.token)
            ? 3
            : null
        const peor = Math.min(...f.ratios)
        const veredicto =
          minimo === null
            ? 'decorativo'
            : peor >= minimo
              ? `OK (>=${minimo})`
              : `FALLA (<${minimo})`
        console.log(
          f.token.padEnd(17) +
            f.valor.padEnd(10) +
            f.ratios.map((r) => String(r.toFixed(2)).padStart(6)).join('  ') +
            '   ' +
            veredicto,
        )
      }
      console.log(`texto sobre --accent: ${contraste.textoSobreAccent.toFixed(2)}`)
      console.log(`axe-core: ${axe.length} violacion(es)`)
      for (const v of axe) console.log(`  [${v.impacto}] ${v.id} — ${v.nodos} nodo(s)`)
      console.log(
        `teclado: ${teclado.paradas} paradas · salto primero: ${teclado.saltoEsPrimero ? 'si' : 'NO'}` +
          ` · sin foco visible: ${teclado.sinFocoVisible.length}` +
          ` · Escape cierra menu y devuelve foco: ${teclado.escapeCierraMenu ? 'si' : 'NO'}`,
      )
      console.log(
        `prefers-reduced-motion: ${movimiento.respetado ? 'respetado' : `${movimiento.conMovimiento.length} elemento(s) siguen animados`}`,
      )
      await pagina.close()
    }
  } finally {
    await navegador.close()
    servidor.close()
  }

  await writeFile(path.join(SALIDA, 'informe.json'), JSON.stringify(informe, null, 2))
  console.log(`\nCapturas e informe en: ${SALIDA}`)
  console.log(
    fallos === 0 ? 'RESULTADO: sin incumplimientos.' : `RESULTADO: ${fallos} incumplimiento(s).`,
  )
  if (fallos > 0) process.exitCode = 1
}

await main()
