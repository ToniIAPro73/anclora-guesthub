---
title: ANCLORA_BRANDING_FAVICON_SPEC
type: standard
estado: activo
scope: branding
tags: [branding, standards, anclora, favicon]
related:
  - "[[ANCLORA_BRANDING_MASTER_CONTRACT]]"
  - "[[ANCLORA_BRANDING_ICON_SYSTEM]]"
---

# ANCLORA_BRANDING_FAVICON_SPEC

> Referencia: [[ANCLORA_BRANDING_MASTER_CONTRACT]]

## Objetivo

Definir el paquete de favicons que cada aplicación del ecosistema debe generar e implementar. Garantizar reconocimiento y diferenciación a todos los tamaños.

> **Favicons por tier (CHG-0014, 2026-09-25):** todos los favicons, `favicon.ico` multirresolución, apple-touch, iconos PWA/maskable y SVG con raster embebido se generan desde el logo del tier de la app (o de su app de origen, en showcases), conservando nombres, prefijos, rutas y dimensiones existentes. Ver `ANCLORA_BRANDING_ICON_SYSTEM.md` § "Sistema de logos por tier".

## Paquete obligatorio por app

| Archivo | Formato | Tamaño | Uso |
|---------|---------|--------|-----|
| `favicon.ico` | ICO multi-resolución | 16, 32, 48, 64, 128, 256 px | `<link rel="icon">` fallback universal |
| `favicon-32.png` | PNG (RGBA) | 32×32 px | `<link rel="icon" type="image/png">` pestaña de navegador |
| `favicon-512.png` | PNG (RGBA) | 512×512 px | PWA manifest, social sharing |
| `apple-touch-icon.png` | PNG (RGBA) | 180×180 px | iOS home screen |

## Proceso de generación

1. Partir del icono canónico de la app (1024×1024, fondo transparente) definido en [[ANCLORA_BRANDING_ICON_SYSTEM]]
2. Detectar el círculo del icono (excluir fondo negro si lo hay)
3. Aplicar máscara circular con antialiasing (supersampling ×4 mínimo)
4. Recortar al bounding box del círculo con 5px de padding
5. Redimensionar a cada tamaño objetivo usando LANCZOS
6. Generar el `.ico` con todos los tamaños embebidos

## Implementación HTML

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
```

## Implementación por framework

### Next.js (App Router — v13.4+)

Colocar directamente en `app/`:
```
app/
├── favicon.ico
├── icon.png            ← renombrar favicon-32.png
├── apple-icon.png      ← renombrar apple-touch-icon.png
```
Next.js genera las etiquetas `<link>` automáticamente.

### Next.js (Pages Router)

Colocar en `public/` y añadir manualmente en `pages/_document.tsx` usando `next/head`.

### Vite / CRA / Nuxt / SvelteKit / Astro / Angular

Colocar en `public/` (o `static/` en SvelteKit) y referenciar en `index.html` o configuración del framework. Ver detalle completo en la guía de frameworks generada previamente.

## PWA manifest

```json
{
  "name": "[Nombre de la app]",
  "short_name": "[Nombre corto]",
  "icons": [
    { "src": "/favicon-32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

## Nomenclatura de archivos por app

> **Revisado 2026-08-03:** esta sección documentaba un esquema de prefijo por app (`group_favicon.ico`, `advisor_favicon.ico`, etc.) que nunca fue la convención real dominante en el ecosistema — una auditoría del workspace completo (24 repos de producto) encontró que GroundSync, Linguo Cam y las 4 apps showcase ya usaban nombres sin prefijo, y que el propio Next.js App Router genera sus iconos de convención de archivo (`favicon.ico`, `icon.png`, `apple-icon.png`) siempre sin prefijo. Se normalizaron los 13 repos que sí llevaban prefijo (renombrado + referencias de código corregidas) para converger en una única convención sin prefijo. Esta tabla de prefijos queda obsoleta y se sustituye por la regla única de abajo.

**Convención única (sin prefijo), todas las apps:**

| Archivo | Uso |
|---------|-----|
| `favicon.ico` | Fallback universal, `<link rel="icon">` |
| `favicon-32.png` | Pestaña de navegador |
| `favicon-512.png` | PWA manifest, social sharing |
| `apple-touch-icon.png` | iOS home screen (180×180) |

No se antepone el nombre de la app al archivo — la carpeta (`public/`, `public/brand/`, o el `app/` de Next.js) ya proporciona el contexto de a qué app pertenece cada favicon. Esto aplica a las 24 apps de producto del workspace (`Anclora.code-workspace`), incluidas `anclora-private-estates` y `anclora-private-estates-landing` (comparten el mismo paquete, sin prefijo `pe_`).

## Validación de diferenciación a 32px

A 32px, el borde ocupa ~3px y es el elemento de máxima superficie relativa. Verificar:
1. El color del borde identifica el grupo (plata mono → plata → cobre → oro)
2. El color dominante del interior es distinguible del de las otras apps del mismo grupo
3. Las ondas, aunque finas (~4px), aportan un destello del color de acento

### Test por grupo

| Grupo | Apps en el grupo | Diferenciación a 32px |
|-------|------------------|-----------------------|
| Entidad Matriz | Anclora Group | Plata monocromático — inconfundible |
| Internas | Advisor, Nexus, Content Gen, FileStudio, Fiscal, VisionFlow, Linguo Cam | Interior azul+teal, índigo+oro, marrón+coral, carbón+teal claro, navy+dorado, índigo+azul, verde pastel+lima — 7 apps en el grupo; Linguo Cam (lima, 103°) queda ≥30° de todas las demás; siguen existiendo dos pares por debajo del mínimo de 30° de hue (ver advertencia de gobernanza en `ANCLORA_BRANDING_MASTER_CONTRACT.md`); distinguibles en la práctica por diferencia de saturación/luminosidad aunque el hue esté cerca |
| Premium | Impulso, Data Lab, Talent *(pausado)*, Synergi, Command Ctr, GuestHub, GroundSync | Naranja, verde, azul, púrpura, azul/violeta, dorado apagado y verde musgo — 7 hues, con una colisión exacta preexistente (Data Lab/EnergyScan, no forman parte de la misma vista) y una separación estrecha (Impulso/GuestHub, 16°); la colisión GroundSync/Talent (7°) detectada 2026-08-03 quedó resuelta reasignando GroundSync a 100° (verde musgo, ≥30° de todos) |
| Ultra | Private Estates, Private Estates Landing | Oro monocromático+teal — inconfundible; ambas apps comparten el mismo favicon (misma marca, misma app conceptualmente) |

## Criterio de cumplimiento

Una app no cumple esta spec si:
- Falta alguno de los 4 archivos del paquete
- El favicon no corresponde al icono canónico actual definido en [[ANCLORA_BRANDING_ICON_SYSTEM]]
- El fondo no es transparente
- El tamaño del `.ico` no contiene las 6 resoluciones requeridas
- Usa nombres con prefijo de app (`<app>_favicon.ico`) en lugar de la convención única sin prefijo
