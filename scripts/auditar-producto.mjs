import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import axeCore from 'axe-core'

const root = path.resolve('dist')
const salida = 'evidencia/etapa-5'
await mkdir(salida, { recursive: true })
const tipos = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
}
const server = createServer(async (req, res) => {
  try {
    let file = path.resolve(
      root,
      '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
    )
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Fuera de dist')
    if (!path.extname(file)) file = path.join(file, 'index.html')
    res.setHeader(
      'Content-Type',
      (tipos[path.extname(file)] ?? 'application/octet-stream') + '; charset=utf-8',
    )
    res.end(await readFile(file))
  } catch {
    res.writeHead(404)
    res.end()
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})
const informes = []
try {
  for (const ruta of ['/', '/producto/']) {
    for (const tema of ['dark', 'light']) {
      for (const ancho of [360, 768, 1280]) {
        const page = await browser.newPage()
        const errores = []
        page.on('pageerror', (e) => errores.push(String(e)))
        await page.setCacheEnabled(false)
        await page.setViewport({ width: ancho, height: 900, deviceScaleFactor: 1 })
        await page.emulateMediaFeatures([
          { name: 'prefers-color-scheme', value: tema },
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        const respuesta = await page.goto(`http://127.0.0.1:${server.address().port}${ruta}`, {
          waitUntil: 'networkidle0',
        })
        if (respuesta?.status() !== 200) {
          throw new Error(
            `No se puede auditar ${ruta}: HTTP ${respuesta?.status()}. Ejecutar después del build, sin reconstruir dist durante la auditoría.`,
          )
        }
        await page.evaluate(() => document.fonts.ready)
        await page.evaluate(axeCore.source)
        const datos = await page.evaluate(async () => {
          const axe = await window.axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
          })
          return {
            desborda: document.documentElement.scrollWidth > innerWidth,
            axe: axe.violations.map((v) => ({
              id: v.id,
              impacto: v.impact,
              nodos: v.nodes.map((n) => n.target),
            })),
            bytes:
              performance.getEntriesByType('resource').reduce((n, r) => n + r.transferSize, 0) +
              performance.getEntriesByType('navigation')[0].transferSize,
            movimiento: [...document.querySelectorAll('a,button')].some((e) =>
              getComputedStyle(e)
                .transitionDuration.split(',')
                .some((x) => parseFloat(x) > 0),
            ),
          }
        })
        await page.keyboard.press('Tab')
        const salto = await page.evaluate(
          () => document.activeElement?.textContent === 'Saltar al contenido',
        )
        const sinFoco = []
        for (let i = 0; i < 35; i++) {
          const foco = await page.evaluate(() => {
            const e = document.activeElement
            return e && e !== document.body && getComputedStyle(e).outlineStyle === 'none'
              ? e.outerHTML.slice(0, 120)
              : null
          })
          if (foco) sinFoco.push(foco)
          await page.keyboard.press('Tab')
        }
        const menu = await page.$('[data-menu-boton]')
        let escape = true
        if (menu && (await menu.isVisible())) {
          await menu.click()
          await page.keyboard.press('Escape')
          escape = await page.$eval(
            '[data-menu-boton]',
            (e) => e.getAttribute('aria-expanded') === 'false' && e === document.activeElement,
          )
        }
        await page.screenshot({
          path: `${salida}/${ruta === '/' ? 'inicio' : 'producto'}-${tema}-${ancho}.png`,
          fullPage: true,
        })
        const informe = { ruta, tema, ancho, ...datos, salto, sinFoco, escape, errores }
        informes.push(informe)
        console.log(JSON.stringify(informe))
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
  server.close()
}
await writeFile(`${salida}/auditoria.json`, JSON.stringify(informes, null, 2))
if (
  informes.some(
    (i) =>
      i.desborda ||
      i.axe.length ||
      !i.salto ||
      i.sinFoco.length ||
      !i.escape ||
      i.errores.length ||
      i.movimiento ||
      i.bytes > 600000,
  )
)
  process.exitCode = 1
