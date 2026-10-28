import puppeteer from 'puppeteer-core'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const url = process.argv[2] ?? 'http://127.0.0.1:4318/'
if (!['127.0.0.1', 'localhost'].includes(new URL(url).hostname)) {
  throw new Error('La captura exige una aplicación local de demostración.')
}
const demo = await readFile('demo.calcinst.json', 'utf8')
await mkdir('public/capturas', { recursive: true })
await mkdir('evidencia/etapa-5', { recursive: true })
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})
try {
  const page = await browser.newPage()
  const errores = []
  page.on('pageerror', (e) => errores.push(String(e)))
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 })
  await page.evaluateOnNewDocument((proyecto) => {
    localStorage.setItem('calcinst:project', proyecto)
  }, demo)
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.waitForSelector('canvas')
  await page.click('[title="Cerrar panel"]')
  await page.click('[title="Ajustar a pantalla"]')
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/capturas/calcinst-demo.png' })
  const texto = await page.$eval('body', (e) => e.innerText)
  if (!texto.includes('Demostración CalcInst') || errores.length) {
    throw new Error(`Captura inválida: ${JSON.stringify({ errores, texto })}`)
  }
  await writeFile(
    'evidencia/etapa-5/captura.json',
    JSON.stringify(
      {
        url,
        viewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
        pixeles: [2560, 1600],
        demoSha256: createHash('sha256').update(demo).digest('hex'),
        errores,
        texto,
      },
      null,
      2,
    ),
  )
  console.log('Captura real 2560 × 1600 (2×); demostración cargada; errores:', errores.length)
} finally {
  await browser.close()
}
