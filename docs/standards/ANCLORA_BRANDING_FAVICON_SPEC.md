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

| App | Prefijo | Ejemplo |
|-----|---------|---------|
| `anclora-group` | `group_` | `group_favicon.ico` |
| `anclora-advisor-ai` | `advisor_` | `advisor_favicon.ico` |
| `anclora-nexus` | `nexus_` | `nexus_favicon.ico` |
| `anclora-content-generator-ai` | `contentgen_` | `contentgen_favicon.ico` |
| `anclora-filestudio` *(añadido 2026-08)* | `filestudio_` | `filestudio_favicon.ico` |
| `anclora-fiscal` *(añadido 2026-08)* | `fiscal_` | `fiscal_favicon.ico` |
| `anclora-visionflow` *(añadido 2026-08)* | `visionflow_` | `visionflow_favicon.ico` |
| `anclora-impulso` | `impulso_` | `impulso_favicon.ico` |
| `anclora-data-lab` | `datalab_` | `datalab_favicon.ico` |
| `anclora-talent` *(pausado)* | `talent_` | `talent_favicon.ico` |
| `anclora-synergi` | `synergi_` | `synergi_favicon.ico` |
| `anclora-command-center` | `commandcenter_` | `commandcenter_favicon.ico` |
| `anclora-guesthub` *(añadido 2026-08)* | `guesthub_` | `guesthub_favicon.ico` |
| `anclora-private-estates` | `pe_` | `pe_favicon.ico` |
| `anclora-private-estates-landing-page` | `pe_` | Comparte favicon con PE web app |
| `anclora-group-landing` | `grouplanding_` | `grouplanding_favicon.ico` |

## Validación de diferenciación a 32px

A 32px, el borde ocupa ~3px y es el elemento de máxima superficie relativa. Verificar:
1. El color del borde identifica el grupo (plata mono → plata → cobre → oro)
2. El color dominante del interior es distinguible del de las otras apps del mismo grupo
3. Las ondas, aunque finas (~4px), aportan un destello del color de acento

### Test por grupo

| Grupo | Apps en el grupo | Diferenciación a 32px |
|-------|------------------|-----------------------|
| Entidad Matriz | Anclora Group | Plata monocromático — inconfundible |
| Internas | Advisor, Nexus, Content Gen, FileStudio, Fiscal, VisionFlow | Interior azul+teal, índigo+oro, marrón+coral, carbón+teal claro, navy+dorado, índigo+azul — con 6 apps en el grupo, dos pares caen por debajo del mínimo de 30° de hue (ver advertencia de gobernanza en `ANCLORA_BRANDING_MASTER_CONTRACT.md`); distinguibles en la práctica por diferencia de saturación/luminosidad aunque el hue esté cerca |
| Premium | Impulso, Data Lab, Talent *(pausado)*, Synergi, Command Ctr, GuestHub | Naranja, verde, azul, púrpura, azul/violeta y dorado apagado — 6 hues, con una colisión exacta preexistente (Data Lab/EnergyScan, no forman parte de la misma vista) y una separación estrecha (Impulso/GuestHub, 16°) |
| Ultra | Private Estates, Private Estates Landing | Oro monocromático+teal — inconfundible; ambas apps comparten el mismo favicon (misma marca, misma app conceptualmente) |

## Criterio de cumplimiento

Una app no cumple esta spec si:
- Falta alguno de los 4 archivos del paquete
- El favicon no corresponde al icono canónico actual definido en [[ANCLORA_BRANDING_ICON_SYSTEM]]
- El fondo no es transparente
- El tamaño del `.ico` no contiene las 6 resoluciones requeridas
- No usa la nomenclatura de prefijo asignada
