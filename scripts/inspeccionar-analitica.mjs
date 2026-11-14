// Inspección acotada del sitio público; no usa perfiles ni sesiones personales.
// No conserva tokens, cookies, cuerpos de mediciones ni parámetros de URL.
import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})
const informes = []
const urlPublica = (valor) => {
  const url = new URL(valor)
  return url.origin + url.pathname
}
try {
  for (const ruta of ['/', '/producto/']) {
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    const solicitudes = []
    const respuestas = []
    const fallos = []
    const esAnalitica = (url) => /cloudflareinsights\.com|\/cdn-cgi\/rum/.test(url)
    page.on('request', (request) => {
      if (!esAnalitica(request.url())) return
      let campos = []
      try {
        campos = Object.keys(JSON.parse(request.postData() ?? '{}')).sort()
      } catch {
        // No se imprime el cuerpo si no es JSON.
      }
      solicitudes.push({ url: urlPublica(request.url()), metodo: request.method(), campos })
    })
    page.on('response', (response) => {
      if (esAnalitica(response.url()))
        respuestas.push({ url: urlPublica(response.url()), estado: response.status() })
    })
    page.on('requestfailed', (request) => {
      if (esAnalitica(request.url()))
        fallos.push({ url: urlPublica(request.url()), error: request.failure()?.errorText })
    })
    const response = await page.goto('https://calcinst.mx' + ruta, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    })
    const scripts = await page.$$eval('script[src]', (nodes) =>
      nodes.map((node) => {
        const url = new URL(node.src)
        return url.origin + url.pathname
      }),
    )
    const almacenamiento = await page.evaluate(() => ({
      localStorage: Object.keys(localStorage).sort(),
      sessionStorage: Object.keys(sessionStorage).sort(),
    }))
    const cookies = (await context.cookies()).map(({ name, domain }) => ({ name, domain }))
    // Salir de la página permite observar también mediciones de fin de visita.
    await page.goto('about:blank', { waitUntil: 'networkidle0' })
    informes.push({
      ruta,
      estado: response?.status(),
      scripts,
      almacenamiento,
      cookies,
      solicitudes,
      respuestas,
      fallos,
    })
    await context.close()
  }
  console.log(JSON.stringify({ fechaUTC: new Date().toISOString(), informes }, null, 2))
} finally {
  await browser.close()
}
