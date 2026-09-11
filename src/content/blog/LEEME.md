# Cómo se escribe un post

Cada post es un archivo `.mdx` en esta carpeta. El nombre del archivo es el slug y la URL será `/blog/{slug}/`: minúsculas con guiones, sin fecha ni categoría, y **no se cambia una vez publicado** (D8). Si hubiera que cambiarlo, el anterior se anota en `slugsAnteriores` y se añade un 301 en `public/_redirects`.

Este archivo no es un post: la colección solo lee `.mdx`.

## Frontmatter

```yaml
title: Máximo 70 caracteres
description: Entre 120 y 160 caracteres; es la descripción que ven los buscadores.
fechaPublicacion: 2026-10-01
categoria: conductores # conductores | motores | canalizaciones | puesta-a-tierra | practica-profesional
etiquetas: [ampacidad, temperatura] # minúsculas con guiones
normativa: # al menos una referencia
  - ref: '310-15(b)(16)'
    tipo: tabla # articulo | tabla | nota
    verificadoDOF: false # solo Sebastián lo pone en true, tras cotejar con el DOF
borrador: true # obligatorio y explícito
```

Campos opcionales: `fechaActualizacion` (obligatoria si hay erratas), `erratas`, `slugsAnteriores`, `imagenPortada`. La `version` de cada referencia toma por omisión la de `src/config/norma.ts`.

## Lo que rompe el build

- Un post sin `normativa`.
- Un post con `borrador: false` y alguna referencia con `verificadoDOF: false`.
- Un `<CalloutNormativo ref="…">` en el cuerpo cuya referencia no esté declarada en `normativa`, o con otro tipo u otra versión.
- Un carácter fuera del conjunto de `src/config/caracteres.json`, o uno de sus prohibidos: el signo de ohm, el signo micro y el incremento tienen formas correctas declaradas allí.
- Un slug con mayúsculas, con fecha, solo numérico o reservado.

## Componentes

Los posts no importan nada. Solo pueden usar los componentes de `componentes-portables.json`, que el layout ya inyecta: `CalloutNormativo`, `Tabla`, `BloqueCodigo`, `AvisoErrata` y `Descargo`. Las erratas y el descargo los pinta el layout solo; en el cuerpo casi siempre basta con `CalloutNormativo`.

```mdx
<CalloutNormativo ref="310-15(b)(16)" tipo="tabla">
  Texto que se apoya en esa tabla.
</CalloutNormativo>
```

## Borradores

Un post con `borrador: true` no se publica. Para verlo en local: `MOSTRAR_BORRADORES=1 npm run build && npm run preview`.

## Si el servidor de desarrollo falla tras borrar un post

Astro 7 no limpia su caché de contenido cuando se borra el **último** post de la colección, y el build falla con un error de `content-layer-deferred-module`. `npm run build` ya usa `--force` para evitarlo; en desarrollo, reinicia con `npx astro dev --force`.
