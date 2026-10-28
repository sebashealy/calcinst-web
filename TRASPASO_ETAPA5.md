# Traspaso de contexto — calcinst-web, antes de la Etapa 5

- **Fecha:** 2026-10-24
- **Para:** la sesión que continúe el sitio (Codex u otra)
- **Base verificada:** `sebashealy/calcinst-web`, `main` en
  `e7728a4d6fc4c9b9c3680475a8e546889dd5bbf0`, del 2026-10-04 17:21 (-0600),
  clonado e inspeccionado el 2026-10-24.
- **Destino:** este documento se commitea al repositorio.

---

## 0. Lo que el repositorio ya tiene, y no hay que reconstruir

`ESTADO_SITIO.md` son **3 389 líneas** y contienen la cadena de evidencia
completa de las Etapas 0 a 4, los addenda **AD2 a AD12**, los bloqueos
**P4, P5 y P6** con su redacción literal, y la observación sobre
`nota-aclaratoria.json`. `HIPOTESIS_SITIO.md` tiene H1 con sus cuatro
fuentes. `DECISIONES_SITIO.md` tiene D1–D8 con las versiones medidas.

La continuidad del **sitio** está en el repositorio y está bien. Lo que
falta es acotado y está en §1.

---

## 1. Lo que falta o está mal en el repositorio

Verificado archivo por archivo sobre el clon del commit citado.

### 1.1 `PLAN_SITIO_WEB.md` no está en el repositorio

Confirmado: no está en la raíz ni en ningún subdirectorio. Vive en
`C:/Users/Sebastian/Downloads/` de una computadora que ya no es la de
trabajo.

Es el único defecto real de continuidad del sitio, y es grave porque
`capacidades.json` lo cita como su fuente y `ESTADO_SITIO.md` lo
referencia en todas las etapas.

**Decisión: el plan entra al repositorio sin reescribirse**, como
`PLAN_SITIO_WEB.md` en la raíz, con una nota al inicio que diga que las
correcciones se emiten como addenda en `ESTADO_SITIO.md` y nunca editando
el plan. Las dos correcciones conocidas quedan señaladas en esa nota, no
aplicadas al texto:

- **AD7**: las tablas de relleno de tubería y de resistencia/reactancia
  están en el **Capítulo 10**, no en el 9. El plan usa la numeración del
  NEC en T06, T10, T14 y en el ejemplo de `ref` de D8.
- **H12**: el stack es **Astro 7.3.1**, no 5.x. El plan no es autoridad
  técnica sobre la API de Astro.

### 1.2 La evidencia de H1 tiene una redacción superada

En `HIPOTESIS_SITIO.md`, la fuente 4 del bloque «Evidencia de H1» dice:

> «Afecta a CalcInst en la Tabla 5 … y en la Tabla 310-15(b)(2)(a)
> (factores de corrección, **filas 66-85 °C**)»

y cierra con:

> «el publicado en 2012 y el corregido en 2014 difieren **en valores de al
> menos dos tablas** que CalcInst usa»

**Las dos frases son incorrectas**, y la corrección está registrada en
`ESTADO_SITIO.md` (E4-ak) pero nunca se trasladó aquí. Lo verificado el
2026-10-04 contra el texto publicado:

- En la Tabla 310-15(b)(2)(a) la nota **no corrige valores**. Corrige la
  **etiqueta de un renglón**: el texto de 2012 imprime «91-75» y debe
  decir «71-75». Los factores de las filas 66-70, 71-75, 76-80 y 81-85
  son idénticos antes y después.
- Por lo tanto **solo una tabla difiere en valores**: la Tabla 5 del
  Capítulo 10 (10 AWG en TW/THHW/THW/THW-2, de 55.68 a 15.68 mm²).
- Dato que no está en ningún lado del repositorio y conviene registrar:
  **la misma errata «91-75» sigue sin corregir** en la Tabla
  310-15(b)(2)(b), la de base 40 °C. La nota de 2014 no la toca.

`src/config/nota-aclaratoria.json` ya tiene la entrada correcta
(`afectaValor: false`, con la descripción de la etiqueta). Lo que queda
desalineado es su propio campo `descripcion` de nivel superior, que
todavía dice «difieren en valores» en plural.

### 1.3 `capacidades.json` está desactualizado en su origen

El archivo declara:

```json
"fuente": "PLAN_SITIO_WEB.md §4.3, con datos de ESTADO_PROYECTO.md del 2026-07-30",
"redaccionProvisional": true
```

Datos de julio. Los motivos de `sizing-caso-1`, `sizing-caso-2` y
`sizing-caso-3-alimentador` dicen que falta corregir los Arts. 430-22 y
430-24, y eso ya no describe el código: las correcciones se aplicaron el
2026-08-06 con ADR-0001 y ADR-0002. Los once `normativa[]` están vacíos.

Ver §3 para la propuesta de sustitución.

### 1.4 Lo que falta porque es de la Etapa 5

Confirmado ausente, y es lo esperado: `src/pages/producto.astro`,
`demo.calcinst.json`, `scripts/generar-capturas.md` y `public/capturas/`.
`src/pages/` solo tiene `blog/`, `diseno.astro` e `index.astro`.

---

## 2. CalcInst: el hueco real

### 2.1 Lo que se pudo verificar

`sebashealy/calcinst` es un **repositorio privado** y el trabajo del sitio
no lo toca: aquí solo se modifica `calcinst-web`. El diagnóstico anterior
sí pudo leerlo, y reportó `main` en el commit `2f4c187`, del **18 de
agosto de 2026**, con dos commits en todo el historial.

### 2.2 La fuente sobre el estado del producto

**`DIAGNOSTICO_PRELANZAMIENTO.md` se adjunta a esta sesión.** Está
fechado el **2026-10-17** con anotaciones hasta el 23, y es la descripción
autoritativa del producto. No la resumas aquí ni la copies al
repositorio: cítala.

Describe un motor muy por delante de ese `main` de agosto: 967 pruebas,
ADR-0001 a ADR-0022, etapas de validación cerradas con evidencia propia,
y capacidades que el inventario del sitio no lista (relleno de tubería,
charola portacables, memoria en PDF, exportación del plano, proyectos en
archivo).

**Ese documento es contexto para `capacidades.json`, no una lista de
tareas de esta sesión.** El build roto, el rendimiento del lienzo, las
protecciones y los defectos del motor se arreglan en el repositorio de la
aplicación, con su propio encargo. Aquí no se toca nada de eso.

**Pregunta abierta, y afecta a un solo archivo de este repositorio:** en
qué rama del repositorio privado está ese trabajo, o si no está publicado.
La respuesta decide si `capacidades.json` se confirma contra código o se
escribe desde el diagnóstico. Sebastián la contesta; no se infiere
auditando `main`.

La distinción que importa: **la página describe el producto, no una rama
de un repositorio.**

### 2.3 Defectos abiertos que cambian lo que el sitio puede decir

El `DIAGNOSTICO_PRELANZAMIENTO.md` documenta defectos **no conservadores
y sin corregir**:

| ID | Defecto | A qué capacidad pega |
|---|---|---|
| **H7** | `calculateFt` elige la tabla de Ft (30 °C o 40 °C) por cercanía. Con proyecto a más de 35 °C sale la de 40 °C: a 38 °C da 1.00 en vez de 0.91 | `correccion-temperatura`, hoy **verificado** |
| **H6** | Tabla 310-15(b)(16): 1 AWG cobre 90 °C está como 150 A; la NOM-2012 dice 145 A | Toda la cadena de dimensionamiento |
| **H9** | Art. 430-6(a)(1): la corriente del motor se calcula con HP, FP y η en vez de leerse de las Tablas 430-247 a 430-250 | Todo el dimensionamiento |

Además: el aluminio se puede seleccionar con una constante de caída que
lleva un `TODO` de verificación; la tierra entra al llenado del tubo con
sección nominal en vez de real (N1); y **el build de la aplicación falla**
con tres errores de TypeScript, así que hoy no hay instalador posible.

### 2.4 El alcance de la v1.0, que el sitio todavía no dice

**CalcInst v1.0 es para instalaciones de motores trifásicos.** Quedan
fuera: circuitos de una y dos fases, alumbrado y contactos, demanda del
Art. 220, conductores en paralelo, cortocircuito y cajas del Art. 314.

Es material de portada, no letra pequeña.

---

## 3. `capacidades.json` — propuesta

**Derivada del `DIAGNOSTICO_PRELANZAMIENTO.md`, no de inspección directa
del código del motor.** Sebastián la confirma antes de que se escriba.

| id | Hoy | Propuesto | Motivo correcto |
|---|---|---|---|
| `dibujo-reticula-metros` | verificado | **verificado** | Sin dependencia normativa |
| `distancias-grafo` | verificado | **verificado** | El defecto de rendimiento de `findPath` no afecta la corrección del resultado |
| `factor-agrupamiento` | verificado | **verificado**, condicionado | La etapa FA1 tiene evidencia con casos a mano. Confirmar que cumple el criterio de §5 antes de conservarlo |
| `correccion-temperatura` | verificado | **implementado** | **Defecto H7 abierto y no conservador.** No es cautela: la tabla de Ft se elige por cercanía y a 38 °C da 1.00 en vez de 0.91 |
| `sizing-caso-1` | implementado | **implementado** | 430-22 corregido (ADR-0001): el motivo actual está desactualizado. Falta el Art. 430-6 (H9, rama sin fusionar) y un valor incorrecto en la tabla de ampacidad (H6) |
| `sizing-caso-2` | implementado | **implementado** | Ídem |
| `sizing-caso-3-alimentador` | implementado | **implementado** | 430-24 corregido (ADR-0002/0003) y Bug 4 cerrado: el motivo actual está desactualizado. Falta 430-6, y los supuestos H4/H5 no están a la vista del usuario |
| `caida-tension` | implementado | **implementado** | La constante del aluminio lleva un `TODO` de verificación y el aluminio se puede seleccionar |
| `protecciones` | planeado | **planeado** | No iniciado. El ITM actual es provisional. **No aparece como funcionalidad** |
| `memoria-calculo-exportable` | planeado | **implementado** | Construida el 2026-10-22 (ADR-0020). Textos de responsabilidad provisionales |
| `exportacion-csv` | verificado | **verificado** | Con descripción acotada. No prometer exportación completa de alimentadores ni diagnósticos |

**Capacidades nuevas a evaluar**, que el producto ya tiene y el inventario
no lista: relleno de tubería (TUB1–TUB3), charola portacables (CHAR1),
exportación del plano (ADR-0021), proyectos en archivo (ADR-0022). La de
tubería arrastra el defecto N1.

**Consecuencia dura, y es la correcta:** hasta que 430-6, H6 y H7 estén
resueltos, el sitio **no puede afirmar que dimensiona conductores
conforme a la NOM**. El texto permitido es el del §9.4 del plan, con el
dimensionamiento declarado «en verificación normativa». Es incómodo y es
exactamente lo que el mecanismo de `capacidades.json` existe para forzar.

Al escribir el archivo: `redaccionProvisional` pasa a `false`, la `fuente`
deja de citar datos de julio, y los `normativa[]` se llenan o se declara
por qué quedan vacíos.

---

## 4. Decisiones

### 4.1 Etapa 4 — cerrada

Se cerró el 2026-10-04 con evidencia E4-a a E4-al en `ESTADO_SITIO.md`.
Los siete criterios cumplidos, P1 en 9 de 9, dos artículos publicados y
servidos, pruebas de 41 a 126.

La observación de que fusionar el PR #15 no equivale a una ratificación
formal es metodológicamente correcta. Este documento es el rastro que
faltaba. **No se reabre.**

### 4.2 Quién verifica qué

- Las capacidades de **cálculo normativo** se verifican en el repositorio
  del motor. Cualquier cambio a CalcInst es un encargo separado.
- El sitio **consume** el estado del inventario; no lo decide.
- Los casos de referencia se construyen **después** de que el Art. 430-6
  esté fusionado. Calcular a mano una cadena cuyo primer eslabón está mal
  sería certificar el error con esmero.

### 4.3 La llamada a la acción

El texto vigente invita a una lista que no existe y apunta a
`/descarga/`, que es de la Etapa 7. El formulario es de la Etapa 8 y el
invariante I6 lo bloquea hasta que los legales de la Etapa 6 se publiquen.
No hay destino legítimo hoy.

**Decisión: en estado `proximamente` la acción principal lleva al blog.**
Es lo único que existe y es el activo que el plan define como imán. En
`lanzamiento.ts`, `TEXTO.proximamente.accion` cambia a un texto que
describa lo que pasa al pulsar y el destino a `/blog/`.

En la Etapa 8 vuelve «Únete a la lista» con su destino real: un cambio de
una línea, que es para lo que I7 existe.

### 4.4 La comparación con Excel (H10)

El plan la describe «basada en los errores documentados de
`examen1_2.xlsx`, sin nombrar el archivo ni a terceros».

**Decisión: no se hace así.** Atribuir errores a la hoja de un tercero,
aunque no se le nombre, es el riesgo que el expediente legal señala,
agravado porque Sebastián es estudiante sin cédula. Y ya no hace falta:
la Nota Aclaratoria del DOF ofrece un error documentado por la **propia
autoridad** (Tabla 5, 10 AWG, 55.68 contra 15.68) que cualquiera puede
verificar y que no pertenece a nadie.

La comparación de la Etapa 5 contrasta **proceso y controles**: qué pasos
hay que acertar a mano, qué se recalcula solo al mover una carga, qué
queda registrado con su artículo. No afirma superioridad no medida ni
generaliza defectos de una hoja a todas.

H10 se cierra como «replanteada», no como refutada.

---

## 5. Dos reglas de método que no están escritas en el repositorio

**La extracción automática de texto del PDF del DOF no es fiable para
tablas.** Al transcribir la Tabla 430-250 aparecieron tres celdas
corruptas de unas doscientas, incluida una (10 hp / 575 V) que daba «44»
donde el valor es 11. Regla: toda tabla normativa se transcribe a mano y
se coteja contra la **imagen** de la página, nunca contra la extracción.

**Qué cuenta como caso de referencia.** Cuatro cosas, las cuatro:
entradas completas y fijas; el resultado calculado a mano paso a paso con
el artículo o tabla citado en cada paso; el resultado del motor; y la
coincidencia registrada con fecha. Un test que compara el motor contra un
número que salió del propio motor **no es un caso de referencia**, ni lo
es un ejercicio resuelto de un libro, porque la fuente tiene que ser la
norma.

---

## 6. Hallazgos del diagnóstico anterior que se conservan

No hay que repetir este trabajo:

- **El artefacto de Lighthouse nunca se conservó.** El CI apunta a una
  carpeta oculta y el paso corre con `include-hidden-files: false`. Un CI
  verde no demuestra que el informe exista. Arreglarlo es una línea.
- **La configuración de Lighthouse no es una puerta.** Solo avisa por
  debajo de 0.8 y tiene SEO desactivado.
- **La prueba que recorre `normativa[]`** no acredita nada mientras los
  arreglos estén vacíos.

---

## 7. Qué hacer, en orden

1. **Commitear `PLAN_SITIO_WEB.md`** y este documento (§1.1).
2. **Corregir la evidencia de H1** en `HIPOTESIS_SITIO.md` y el campo
   `descripcion` de `nota-aclaratoria.json` (§1.2).
3. **Confirmar en qué rama del repositorio privado está el trabajo de
   octubre** (§2.2). La respuesta decide si la tabla de §3 se confirma
   contra código o se escribe desde el diagnóstico del producto.
4. **Arreglar la conservación del artefacto de Lighthouse** en el CI.
5. **Confirmar y escribir `capacidades.json`** (§3).
6. **Resolver el proyecto demostrativo y las capturas** (H5). Requiere la
   aplicación corriendo: no se puede hacer desde el repositorio del sitio.
7. Recién entonces, construir Inicio y Producto.

Los pasos 1 a 4 son higiene y continuidad, y no necesitan autorización de
etapa. Del 5 en adelante es Etapa 5 y la autoriza Sebastián.

---

## 8. Lo que no cambia

- Astro 7.3.1, MDX, CSS con tokens, Cloudflare Workers. Sin React, sin
  Tailwind, sin dependencias nuevas.
- Los siete invariantes I1 a I7 y sus verificadores.
- La batería de cierre se ejecuta y se pega **sin filtrar**. Nada de
  `grep`, `head` ni `Select-String` sobre esas salidas: un grep mal puesto
  ya ocultó un error de tipos una vez.
- La evidencia se escribe a `ESTADO_SITIO.md` inmediatamente después de
  cada bloque, no al final. Una etapa parcial con evidencia escrita es un
  resultado aceptable; una etapa «completa» sin evidencia no lo es.
- Las etiquetas de evidencia las asigna quien ejecuta, verificando antes
  cuáles están ocupadas. Para la Etapa 5, continuar con E5-a.
- Nada de `/normativa/`, descarga, formularios, legales, analítica ni
  comercio: cada uno tiene su etapa.
