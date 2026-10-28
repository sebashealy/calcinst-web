# Capturas reales de CalcInst

Fuente de la aplicación: ZIP aportado por Sebastián, SHA-256
`94b7661f44a6a0022d97712e59e66c759329aa92d075042c05ce3dba74483da8`.
No usar el `dist/` del ZIP: no acredita la compilación del código más reciente.

1. Extraer una copia fuera del sitio. Con las dependencias incluidas, ejecutar
   `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4318` en esa copia.
   No instalar dependencias sin autorización de versiones.
2. En el repositorio del sitio, ejecutar `node scripts/generar-capturas.mjs`.
   Requiere Chrome instalado; `CHROME_PATH` permite elegir su ejecutable.
3. El script abre un perfil temporal limpio y carga `demo.calcinst.json` en el
   autoguardado de ese perfil. No toca proyectos personales. Usa 1280 × 800 CSS,
   densidad 2×; captura 2560 × 1600 píxeles, sin alterar el DOM ni los resultados.
   Cierra el panel de resultados y pulsa «Ajustar a pantalla» para mostrar todo el plano.
4. Inspeccionar `public/capturas/calcinst-demo.png`: retícula, nodos, resultados,
   ningún dato de clientes. El proyecto es CAS1-R1 sintético del expediente del
   motor, con solo nombre e identificador adaptados al sitio. El reloj de
   autoguardado puede cambiar: reproducible no significa idéntico byte a byte.
5. Conservar `evidencia/etapa-5/captura.json`, hash del proyecto, errores de
   ejecución y tamaño del PNG en ESTADO_SITIO.md. El PNG se versiona; la evidencia
   generada se adjunta al cierre según la convención existente.

La captura incluye cálculos de una versión de desarrollo. Su pie explica que
requieren revisión. No constituye validación normativa ni evidencia de Tauri.
